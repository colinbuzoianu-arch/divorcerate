import { NextRequest, NextResponse } from "next/server";
import { getResult, isPaid, getNarrative, kvConfigured } from "@/lib/kv";
import { toFreeResult, ResultResponse } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns a stored result. Free fields always; the full report (with the paid
 * narrative) only once paid AND the narrative has been generated and cached.
 * This endpoint never generates the narrative — that happens on the /r/[id]
 * page — so the /success poll stays cheap.
 */
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const headers = { "X-Robots-Tag": "noindex" };

  if (!kvConfigured()) {
    return NextResponse.json({ error: "Result storage is not configured." }, { status: 503, headers });
  }

  const id = params.id;
  if (!id || !/^[0-9a-fA-F-]{10,64}$/.test(id)) {
    return NextResponse.json({ error: "Not found." }, { status: 404, headers });
  }

  const full = await getResult(id);
  if (!full) {
    return NextResponse.json({ error: "Result not found or expired." }, { status: 404, headers });
  }

  const paid = await isPaid(id);
  if (!paid) {
    const payload: ResultResponse = { resultId: id, paid: false, result: toFreeResult(full) };
    return NextResponse.json(payload, { headers });
  }

  const narrative = await getNarrative(id);
  const payload: ResultResponse = {
    resultId: id,
    paid: true,
    result: narrative ? { ...full, narrative } : full,
  };
  return NextResponse.json(payload, { headers });
}
