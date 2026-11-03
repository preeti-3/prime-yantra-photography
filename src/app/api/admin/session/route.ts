import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminConfigured, createSession, sameOrigin, SESSION_COOKIE, SESSION_SECONDS, validCredentials } from "@/lib/admin-security";

const attempts = new Map<string, { count: number; until: number }>();

export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  if (!adminConfigured()) return NextResponse.json({ error: "Admin access has not been configured." }, { status: 503 });
  if (Number(request.headers.get("content-length")) > 4096) return NextResponse.json({ error: "Invalid request." }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  if (attempts.size >= 1000) {
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
    if (attempts.size >= 1000 && !attempts.has(ip)) return NextResponse.json({ error: "Please try again later." }, { status: 429 });
  }
  const previous = attempts.get(ip);
  if (previous && previous.until > now && previous.count >= 10) return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  try {
    const { username, password } = await request.json();
    if (typeof username !== "string" || typeof password !== "string" || username.length > 100 || password.length > 1024) throw new Error("Invalid input");
    if (!validCredentials(username, password)) {
      attempts.set(ip, { count: previous && previous.until > now ? previous.count + 1 : 1, until: previous && previous.until > now ? previous.until : now + 15 * 60 * 1000 });
      return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
    }
    attempts.delete(ip);
    (await cookies()).set(SESSION_COOKIE, createSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: SESSION_SECONDS });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  (await cookies()).delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
