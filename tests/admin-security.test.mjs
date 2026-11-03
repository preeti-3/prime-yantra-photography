import assert from "node:assert/strict";
import { test } from "node:test";
import { adminConfigured, validCredentials, createSession, validSession, sameOrigin, imageMime, SESSION_SECONDS } from "../src/lib/admin-security.ts";

process.env.ADMIN_USERNAME = "studio-owner";
process.env.ADMIN_PASSWORD = "test-password-not-for-production";
process.env.ADMIN_SESSION_SECRET = "test-session-secret-not-for-production-123456";

test("credentials fail closed when secrets are missing or too short", () => {
  const key = process.env.ADMIN_SESSION_SECRET;
  process.env.ADMIN_SESSION_SECRET = "short";
  assert.equal(adminConfigured(), false);
  assert.equal(validCredentials("studio-owner", process.env.ADMIN_PASSWORD), false);
  process.env.ADMIN_SESSION_SECRET = key;
  assert.equal(validCredentials("studio-owner", process.env.ADMIN_PASSWORD), true);
  assert.equal(validCredentials("wrong", process.env.ADMIN_PASSWORD), false);
  assert.equal(validCredentials("studio-owner", "wrong"), false);
});

test("signed sessions reject tampering, expiry, malformed tokens and password rotation", () => {
  const now = Date.now();
  const token = createSession(now);
  assert.equal(validSession(token, now + 1), true);
  assert.equal(validSession(token, now + SESSION_SECONDS * 1000), false);
  const [payload, signature] = token.split(".");
  assert.equal(validSession(`${payload}.${signature.slice(0, -3)}abc`, now), false);
  assert.equal(validSession(`${payload}.${signature}.extra`, now), false);
  assert.equal(validSession(undefined, now), false);
  const password = process.env.ADMIN_PASSWORD;
  process.env.ADMIN_PASSWORD = "a-different-long-test-password";
  assert.equal(validSession(token, now), false);
  process.env.ADMIN_PASSWORD = password;
});

test("writes require a matching origin, including its protocol and port", () => {
  const request = (origin) => new Request("https://example.com/api/admin/images", { headers: origin ? { origin } : {} });
  assert.equal(sameOrigin(request("https://example.com")), true);
  for (const origin of [undefined, "null", "http://example.com", "https://example.com.attacker.test", "https://example.com:444"]) assert.equal(sameOrigin(request(origin)), false);
  assert.equal(sameOrigin(new Request("http://localhost/api/admin/images", { headers: { host: "portfolio.example.com", origin: "https://portfolio.example.com", "x-forwarded-proto": "https" } })), true);
  assert.equal(sameOrigin(new Request("http://localhost/api/admin/images", { headers: { host: "portfolio.example.com", origin: "https://attacker.invalid", "x-forwarded-proto": "https" } })), false);
});

test("file contents determine image type, rejecting renamed scripts and SVG", () => {
  assert.equal(imageMime(Uint8Array.of(255, 216, 255, 224)), "image/jpeg");
  assert.equal(imageMime(Uint8Array.of(137, 80, 78, 71, 13, 10, 26, 10)), "image/png");
  assert.equal(imageMime(Buffer.from("GIF89a...")), "image/gif");
  assert.equal(imageMime(Buffer.from("RIFF1234WEBP")), "image/webp");
  assert.equal(imageMime(Buffer.from('<svg onload="alert(1)"></svg>')), undefined);
  assert.equal(imageMime(Buffer.from("<script>alert(1)</script>")), undefined);
  assert.equal(imageMime(new Uint8Array()), undefined);
});
