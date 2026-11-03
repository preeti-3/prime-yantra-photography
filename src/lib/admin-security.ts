import { createHmac, createHash, timingSafeEqual, randomBytes } from "node:crypto";

export const SESSION_COOKIE = "prime_yatra_admin";
export const SESSION_SECONDS = 8 * 60 * 60;

function secret() {
  const password = process.env.ADMIN_PASSWORD || "";
  const key = process.env.ADMIN_SESSION_SECRET || "";
  if (password.length < 12 || key.length < 32) throw new Error("ADMIN_NOT_CONFIGURED");
  return createHmac("sha256", key).update(password).digest();
}

export function adminConfigured() {
  try { secret(); return true; } catch { return false; }
}

export function validCredentials(username: string, password: string) {
  if (!adminConfigured()) return false;
  const digest = (value: string) => createHash("sha256").update(value).digest();
  const userMatches = timingSafeEqual(digest(username), digest(process.env.ADMIN_USERNAME || "admin"));
  const passwordMatches = timingSafeEqual(digest(password), digest(process.env.ADMIN_PASSWORD || ""));
  return userMatches && passwordMatches;
}

export function createSession(now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ expires: now + SESSION_SECONDS * 1000, nonce: randomBytes(16).toString("hex") })).toString("base64url");
  return `${payload}.${createHmac("sha256", secret()).update(payload).digest("base64url")}`;
}

export function validSession(token: string | undefined, now = Date.now()) {
  if (!token || token.length > 1024) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payload, signature] = parts;
    const expected = createHmac("sha256", secret()).update(payload).digest();
    const actual = Buffer.from(signature, "base64url");
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
    const { expires } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof expires === "number" && expires > now && expires <= now + SESSION_SECONDS * 1000;
  } catch { return false; }
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  // Next can use an internal hostname in request.url. Browsers send the public
  // hostname in Host; the trusted host proxy supplies the external protocol.
  const url = new URL(request.url);
  const host = request.headers.get("host") || url.host;
  const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || url.protocol.slice(0, -1);
  if (protocol !== "http" && protocol !== "https") return false;
  return origin === `${protocol}://${host}`;
}

export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export function imageMime(bytes: Uint8Array): string | undefined {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if ([137, 80, 78, 71, 13, 10, 26, 10].every((b, i) => bytes[i] === b)) return "image/png";
  if (Buffer.from(bytes.subarray(0, 4)).toString() === "RIFF" && Buffer.from(bytes.subarray(8, 12)).toString() === "WEBP") return "image/webp";
  if (["GIF87a", "GIF89a"].includes(Buffer.from(bytes.subarray(0, 6)).toString())) return "image/gif";
  return undefined;
}
