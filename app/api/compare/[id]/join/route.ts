import { NextRequest, NextResponse } from "next/server";
import { getResult, kvConfigured } from "@/lib/kv";
import { joinComparison } from "@/lib/comparison";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Partner B links their result to the comparison (Phase 6.2). Joining is B's
 * consent to share their dimension scores (never their answers).
 */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!kvConfigured()) return NextResponse.json({ error: "Not configured." }, { status: 503 });

  const id = params.id;
  if (!id || !/^[0-9a-fA-F-]{10,64}$/.test(id)) return NextResponse.json({ error: "Not found." }, { status: 404 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body." }, { status: 400 }); }
  const resultId = (body as { resultId?: string })?.resultId;
  if (!resultId || !/^[0-9a-fA-F-]{10,64}$/.test(resultId)) {
    return NextResponse.json({ error: "Missing result." }, { status: 400 });
  }

  const result = await getResult(resultId);
  if (!result) return NextResponse.json({ error: "Result not found or expired." }, { status: 404 });

  const updated = await joinComparison(id, resultId);
  if (!updated) return NextResponse.json({ error: "Comparison not found or expired." }, { status: 404 });

  return NextResponse.json({ ok: true });
}
