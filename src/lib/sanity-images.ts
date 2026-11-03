import { findImageSlot, type ImageOverrides } from "./image-slots";

const version = "v2025-02-19";

function configuration() {
  const projectId = process.env.SANITY_PROJECT_ID || "";
  const dataset = process.env.SANITY_DATASET || "production";
  const token = process.env.SANITY_API_TOKEN || "";
  if (!/^[a-z0-9]+$/.test(projectId) || !/^[a-z0-9_-]+$/.test(dataset) || !token) throw new Error("CMS_NOT_CONFIGURED");
  return { projectId, dataset, token };
}

export function sanityConfigured() {
  try { configuration(); return true; } catch { return false; }
}

async function sanityRequest(path: string, init: RequestInit = {}) {
  const { projectId, token } = configuration();
  const response = await fetch(`https://${projectId}.api.sanity.io/${version}/${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("SANITY_REQUEST_FAILED");
  return response.json();
}

export async function readImageOverrides(): Promise<ImageOverrides> {
  if (!sanityConfigured()) return {};
  const { projectId, dataset } = configuration();
  const query = '*[_type == "siteImage" && !(_id in path("drafts.**"))]{slot,alt,_updatedAt,"url":image.asset->url}';
  const data = await sanityRequest(`data/query/${dataset}?query=${encodeURIComponent(query)}&perspective=published`);
  const images: ImageOverrides = {};
  for (const item of data.result || []) {
    if (typeof item.slot !== "string" || !findImageSlot(item.slot) || typeof item.url !== "string") continue;
    if (!item.url.startsWith(`https://cdn.sanity.io/images/${projectId}/${dataset}/`)) continue;
    images[item.slot] = { url: item.url, alt: typeof item.alt === "string" ? item.alt : "", updatedAt: item._updatedAt || "" };
  }
  return images;
}

export async function replaceImage(slot: string, bytes: Uint8Array, mime: string, alt: string) {
  if (!findImageSlot(slot)) throw new Error("INVALID_SLOT");
  const { dataset } = configuration();
  const extension = mime.split("/")[1];
  const asset = await sanityRequest(`assets/images/${dataset}?filename=${encodeURIComponent(`${slot}.${extension}`)}`, {
    method: "POST", headers: { "Content-Type": mime }, body: new Uint8Array(bytes).buffer,
  });
  if (!asset.document?._id) throw new Error("SANITY_REQUEST_FAILED");
  await sanityRequest(`data/mutate/${dataset}?visibility=sync`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ createOrReplace: {
      _id: `site-image-${slot.replaceAll(".", "-")}`, _type: "siteImage", slot, alt,
      image: { _type: "image", asset: { _type: "reference", _ref: asset.document._id } },
    } }] }),
  });
}

export async function resetImage(slot: string) {
  if (!findImageSlot(slot)) throw new Error("INVALID_SLOT");
  const { dataset } = configuration();
  await sanityRequest(`data/mutate/${dataset}?visibility=sync`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mutations: [{ delete: { id: `site-image-${slot.replaceAll(".", "-")}` } }] }),
  });
}
