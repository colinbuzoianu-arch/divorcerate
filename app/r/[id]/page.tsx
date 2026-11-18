import type { Metadata } from "next";
import Link from "next/link";
import { getResult, isPaid as isPaidKv, kvConfigured } from "@/lib/kv";
import { toFreeResult } from "@/lib/types";
import type { StoredResult, FreeResult } from "@/lib/types";
import { getOrCreateNarrative } from "@/lib/narrative";
import ResultView from "@/components/analyzer/ResultView";
import BrandMark from "@/components/layout/BrandMark";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Result pages are private and must never be indexed (SEO rule 4).
export const metadata: Metadata = {
  title: "Your relationship result | CoupleIQ",
  robots: { index: false, follow: false },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", padding: "1.5rem 1rem 3rem", fontFamily: "var(--sans)", color: "var(--on-dark)" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}><BrandMark onDark /></Link>
          <Link href="/relationship-test" style={{ fontSize: 13, color: "var(--on-dark-2)", textDecoration: "none" }}>Take the test again</Link>
        </div>
        {children}
      </div>
    </main>
  );
}

function NotFoundCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #efefed", padding: "2.5rem 2rem", textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
      <p style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 28, color: "#1a1a1a", marginBottom: 8, lineHeight: 1.1 }}>{title}</p>
      <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7, marginBottom: "1.5rem" }}>{body}</p>
      <Link href="/relationship-test" style={{ background: "#4B3FB0", color: "#fff", borderRadius: 999, padding: "13px 26px", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
        Take the relationship test
      </Link>
    </div>
  );
}

export default async function ResultPage({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!kvConfigured() || !/^[0-9a-fA-F-]{10,64}$/.test(id)) {
    return <Shell><NotFoundCard title="Result not available" body="We couldn't open this result. It may have expired, or the link may be incomplete." /></Shell>;
  }

  const full = await getResult(id);
  if (!full) {
    return (
      <Shell>
        <NotFoundCard
          title="This result has expired"
          body="Results are kept for 30 days and then deleted. You can take the test again to get a fresh one."
        />
      </Shell>
    );
  }

  const paid = await isPaidKv(id);
  let result: StoredResult | FreeResult = paid ? full : toFreeResult(full);
  if (paid) {
    // Generate the paid narrative once, then cache it (Phase 3.2).
    const narrative = await getOrCreateNarrative(id, full);
    if (narrative) result = { ...full, narrative };
  }

  return (
    <Shell>
      <ResultView result={result} isPaid={paid} resultId={id} />
    </Shell>
  );
}
