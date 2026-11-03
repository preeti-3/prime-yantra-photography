import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { imageMime, MAX_IMAGE_BYTES, sameOrigin, SESSION_COOKIE, validSession } from "@/lib/admin-security";
import { findImageSlot } from "@/lib/image-slots";
import { replaceImage, resetImage } from "@/lib/sanity-images";

export const runtime = "nodejs";

async function authorize(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  if (!validSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
}

export async function POST(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;
  if (Number(request.headers.get("content-length")) > MAX_IMAGE_BYTES + 20000) return NextResponse.json({ error: "Please choose an image smaller than 4 MB." }, { status: 413 });
  try {
    const form = await request.formData();
    const slot = String(form.get("slot") || "");
    const alt = String(form.get("alt") || "").trim();
    const file = form.get("image");
    if (!findImageSlot(slot) || !alt || alt.length > 300 || !(file instanceof File)) return NextResponse.json({ error: "Choose an image position, image file, and description (up to 300 characters)." }, { status: 400 });
    if (file.size > MAX_IMAGE_BYTES || file.size === 0) return NextResponse.json({ error: "Please choose an image smaller than 4 MB." }, { status: 413 });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const mime = imageMime(bytes);
    if (!mime) return NextResponse.json({ error: "Upload a JPG, PNG, WebP or GIF image." }, { status: 400 });
    await replaceImage(slot, bytes, mime, alt);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The image could not be published. Check the Sanity connection and try again. Your previous image is unchanged." }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;
  try {
    const { slot } = await request.json();
    if (typeof slot !== "string" || !findImageSlot(slot)) return NextResponse.json({ error: "Invalid image position." }, { status: 400 });
    await resetImage(slot);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The original image could not be restored. Please try again." }, { status: 502 });
  }
}
