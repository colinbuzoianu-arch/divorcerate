import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { getResult, isPaid, kvConfigured } from "@/lib/kv";
import { getOrCreateNarrative } from "@/lib/narrative";
import { ReportDocument } from "@/lib/pdf/ReportDocument";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Server-rendered PDF download of the paid full report (Phase 6.3). Paid-only.
 * Ensures the narrative exists (generating + caching it if needed), then renders
 * the PDF with @react-pdf/renderer.
 */
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const headers = { "X-Robots-Tag": "noindex" };
  if (!kvConfigured()) return NextResponse.json({ error: "Not configured." }, { status: 503, headers });

  const id = params.id;
  if (!id || !/^[0-9a-fA-F-]{10,64}$/.test(id)) return NextResponse.json({ error: "Not found." }, { status: 404, headers });

  if (!(await isPaid(id))) return NextResponse.json({ error: "This report is locked." }, { status: 403, headers });

  const full = await getResult(id);
  if (!full) return NextResponse.json({ error: "Result not found or expired." }, { status: 404, headers });

  const narrative = await getOrCreateNarrative(id, full);
  const result = narrative ? { ...full, narrative } : full;

  const element = React.createElement(ReportDocument, { result, locale: result.locale ?? "en" }) as unknown as Parameters<typeof renderToBuffer>[0];
  const buffer = await renderToBuffer(element);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="coupleiq-relationship-report.pdf"',
      "X-Robots-Tag": "noindex",
    },
  });
}
