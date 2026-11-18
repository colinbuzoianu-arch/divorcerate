import type { Metadata } from "next";
import Link from "next/link";
import { getResult, isPaid as isPaidKv, kvConfigured } from "@/lib/kv";
import { toFreeResult } from "@/lib/types";
import ResultView from "@/components/analyzer/ResultView";

export const dynamic = "force-dynamic";

// Result pages are private and must never be indexed (SEO rule 4).
export const metadata: Metadata = {
  title: "Your relationship result | CoupleIQ",
  robots: { index: false, follow: false },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ background: "#f0efed", minHeight: "100vh", padding: "1.5rem 1rem 3rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src="/logo.png" alt="CoupleIQ" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
              Couple<span style={{ color: "#534ab7" }}>IQ</span>
            </span>
          </Link>
          <Link href="/relationship-test" style={{ fontSize: 13, color: "#999", textDecoration: "none" }}>Take the test again</Link>
        </div>
        {children}
      </div>
    </main>
  );
}

function NotFoundCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #efefed", padding: "2.5rem 2rem", textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
      <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>{title}</p>
      <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7, marginBottom: "1.5rem" }}>{body}</p>
      <Link href="/relationship-test" style={{ background: "#534ab7", color: "#fff", borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
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
  const result = paid ? full : toFreeResult(full);

  return (
    <Shell>
      <ResultView result={result} isPaid={paid} resultId={id} />
    </Shell>
  );
}
