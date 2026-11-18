import { NextRequest, NextResponse } from "next/server";
import { getResult, isPaid, kvConfigured } from "@/lib/kv";
import { toFreeResult, ResultResponse } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns a stored result. Free fields always; the full report only once the
 * result has been marked paid by the verified Stripe webhook (Phase 1.2).
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
  const payload: ResultResponse = {
    resultId: id,
    paid,
    result: paid ? full : toFreeResult(full),
  };
  return NextResponse.json(payload, { headers });
}
