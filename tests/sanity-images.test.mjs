import assert from "node:assert/strict";
import { test, mock } from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import ts from "typescript";

// Load the actual TS service with the same relative imports, without a running Next server.
const nativeRequire = createRequire(import.meta.url);
const modules = new Map();
function load(path) {
  if (modules.has(path)) return modules.get(path).exports;
  const loadedModule = { exports: {} };
  modules.set(path, loadedModule);
  const javascript = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const require = (specifier) => specifier.startsWith(".") ? load(resolve(dirname(path), `${specifier}.ts`)) : nativeRequire(specifier);
  new Function("require", "module", "exports", javascript)(require, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const cms = load(resolve("src/lib/sanity-images.ts"));
process.env.SANITY_PROJECT_ID = "testproject";
process.env.SANITY_DATASET = "production";
process.env.SANITY_API_TOKEN = "test-server-token";

test("unconfigured CMS preserves the original local images without a network request", async () => {
  const token = process.env.SANITY_API_TOKEN;
  delete process.env.SANITY_API_TOKEN;
  const fetch = mock.method(globalThis, "fetch", () => { throw new Error("Unexpected network call"); });
  try { assert.deepEqual(await cms.readImageOverrides(), {}); assert.equal(fetch.mock.callCount(), 0); }
  finally { process.env.SANITY_API_TOKEN = token; mock.restoreAll(); }
});

test("only known image positions and this project's asset URLs reach the public site", async () => {
  const url = "https://cdn.sanity.io/images/testproject/production/valid-800x600.jpg";
  mock.method(globalThis, "fetch", async () => Response.json({ result: [
    { slot: "home.imgFrame", url, alt: "Wedding portrait", _updatedAt: "today" },
    { slot: "home.imgRectangle", url: "javascript:alert(1)" },
    { slot: "unknown", url },
    { slot: "about.imgFrame", url: "https://cdn.sanity.io/images/another/production/image.jpg" },
  ] }));
  try { assert.deepEqual(await cms.readImageOverrides(), { "home.imgFrame": { url, alt: "Wedding portrait", updatedAt: "today" } }); }
  finally { mock.restoreAll(); }
});

test("replacement uploads the file then atomically replaces only the selected position", async () => {
  const requests = [];
  mock.method(globalThis, "fetch", async (url, init) => {
    requests.push({ url, init });
    return requests.length === 1 ? Response.json({ document: { _id: "image-test-800x600-jpg" } }) : Response.json({ results: [] });
  });
  try {
    await cms.replaceImage("home.imgFrame", Uint8Array.of(255, 216, 255), "image/jpeg", "New portrait");
    assert.equal(requests.length, 2);
    assert.match(requests[0].url, /assets\/images\/production/);
    assert.equal(requests[0].init.headers.Authorization, "Bearer test-server-token");
    const mutation = JSON.parse(requests[1].init.body).mutations[0].createOrReplace;
    assert.equal(mutation._id, "site-image-home-imgFrame");
    assert.equal(mutation.slot, "home.imgFrame");
    assert.equal(mutation.image.asset._ref, "image-test-800x600-jpg");
    assert.equal(mutation.alt, "New portrait");
    assert.match(requests[1].url, /visibility=sync/);
  } finally { mock.restoreAll(); }
});

test("failed uploads do not overwrite the existing image, and unknown positions are rejected", async () => {
  const fetch = mock.method(globalThis, "fetch", async () => new Response("failure", { status: 500 }));
  try {
    await assert.rejects(cms.replaceImage("home.imgFrame", new Uint8Array(), "image/jpeg", "Portrait"), /SANITY_REQUEST_FAILED/);
    assert.equal(fetch.mock.callCount(), 1);
    await assert.rejects(cms.replaceImage("invalid", new Uint8Array(), "image/jpeg", "Portrait"), /INVALID_SLOT/);
    assert.equal(fetch.mock.callCount(), 1);
  } finally { mock.restoreAll(); }
});

test("restore deletes only the selected override, preserving other images and stored assets", async () => {
  let mutation;
  mock.method(globalThis, "fetch", async (_url, init) => { mutation = JSON.parse(init.body); return Response.json({ results: [] }); });
  try {
    await cms.resetImage("about.imgFrame");
    assert.deepEqual(mutation, { mutations: [{ delete: { id: "site-image-about-imgFrame" } }] });
  } finally { mock.restoreAll(); }
});
