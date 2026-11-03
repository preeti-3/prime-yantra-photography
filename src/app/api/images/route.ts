import { NextResponse } from "next/server";
import { readImageOverrides } from "@/lib/sanity-images";

export const dynamic = "force-dynamic";
export async function GET() {
  try {
    return NextResponse.json(await readImageOverrides(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Images are temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
