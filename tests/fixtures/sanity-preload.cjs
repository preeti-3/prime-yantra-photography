// Local integration-test fixture. It intercepts ONLY the explicit fake project below.
const originalFetch = globalThis.fetch;
const images = new Map();
globalThis.fetch = async (input, init = {}) => {
  const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
  if (url.hostname !== "primeyatratest.api.sanity.io") return originalFetch(input, init);
  if (url.pathname.includes("/data/query/")) return Response.json({ result: [...images.values()] });
  if (url.pathname.includes("/assets/images/")) return Response.json({ document: { _id: "image-fixture-1x1-png" } });
  if (url.pathname.includes("/data/mutate/")) {
    for (const mutation of JSON.parse(init.body).mutations) {
      if (mutation.createOrReplace) {
        const document = mutation.createOrReplace;
        images.set(document._id, { slot: document.slot, alt: document.alt, _updatedAt: new Date().toISOString(), url: "https://cdn.sanity.io/images/primeyatratest/production/fixture-1x1.png" });
      }
      if (mutation.delete) images.delete(mutation.delete.id);
    }
    return Response.json({ results: [] });
  }
  return new Response("Unexpected fixture request", { status: 500 });
};
