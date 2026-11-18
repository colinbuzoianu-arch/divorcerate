import { NextRequest, NextResponse } from "next/server";
import { getResult, isPaid, kvConfigured } from "@/lib/kv";
import { getOrCreateNarrative } from "@/lib/narrative";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Generates (or returns the cached) paid narrative for a result. Called by the
 * result page client-side so the page can render immediately and show a
 * "preparing your report" state instead of blocking the server render.
 */
export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const headers = { "X-Robots-Tag": "noindex" };
  if (!kvConfigured()) return NextResponse.json({ error: "Not configured." }, { status: 503, headers });

  const id = params.id;
  if (!id || !/^[0-9a-fA-F-]{10,64}$/.test(id)) {
    return NextResponse.json({ error: "Not found." }, { status: 404, headers });
  }

  if (!(await isPaid(id))) {
    return NextResponse.json({ error: "Not paid." }, { status: 403, headers });
  }

  const full = await getResult(id);
  if (!full) return NextResponse.json({ error: "Result not found or expired." }, { status: 404, headers });

  const narrative = await getOrCreateNarrative(id, full);
  if (!narrative) return NextResponse.json({ error: "Generation failed." }, { status: 502, headers });

  return NextResponse.json({ narrative }, { headers });
}
