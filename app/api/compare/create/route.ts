import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getResult, kvConfigured } from "@/lib/kv";
import { createComparison } from "@/lib/comparison";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Partner A starts a comparison from their own result (Phase 6.2). Creating it
 * is A's consent to share their dimension scores (never their answers).
 */
export async function POST(req: NextRequest) {
  if (!kvConfigured()) return NextResponse.json({ error: "Not configured." }, { status: 503 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body." }, { status: 400 }); }
  const resultId = (body as { resultId?: string })?.resultId;
  if (!resultId || !/^[0-9a-fA-F-]{10,64}$/.test(resultId)) {
    return NextResponse.json({ error: "Missing result." }, { status: 400 });
  }

  const result = await getResult(resultId);
  if (!result) return NextResponse.json({ error: "Result not found or expired." }, { status: 404 });

  const id = randomUUID();
  await createComparison(id, resultId);
  return NextResponse.json({ id });
}
