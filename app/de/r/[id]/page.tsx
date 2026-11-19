import type { Metadata } from "next";
import Link from "next/link";
import { getResult, isPaid as isPaidKv, getNarrative, kvConfigured } from "@/lib/kv";
import { toFreeResult } from "@/lib/types";
import type { StoredResult, FreeResult } from "@/lib/types";
import ResultView from "@/components/analyzer/ResultView";
import BrandMark from "@/components/layout/BrandMark";
import SetHtmlLang from "@/components/SetHtmlLang";

export const dynamic = "force-dynamic";

// Result pages are private and must never be indexed (SEO rule 4).
export const metadata: Metadata = {
  title: "Dein Beziehungsergebnis | CoupleIQ",
  robots: { index: false, follow: false },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", padding: "1.5rem 1rem 3rem", fontFamily: "var(--sans)", color: "var(--on-dark)" }}>
      <SetHtmlLang lang="de" />
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <Link href="/de" style={{ textDecoration: "none" }}><BrandMark onDark /></Link>
          <Link href="/de/relationship-test" style={{ fontSize: 13, color: "var(--on-dark-2)", textDecoration: "none" }}>Test erneut machen</Link>
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
      <Link href="/de/relationship-test" style={{ background: "#4B3FB0", color: "#fff", borderRadius: 999, padding: "13px 26px", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
        Zum Beziehungstest
      </Link>
    </div>
  );
}

export default async function ResultPageDe({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!kvConfigured() || !/^[0-9a-fA-F-]{10,64}$/.test(id)) {
    return <Shell><NotFoundCard title="Ergebnis nicht verfügbar" body="Wir konnten dieses Ergebnis nicht öffnen. Es ist vielleicht abgelaufen, oder der Link ist unvollständig." /></Shell>;
  }

  const full = await getResult(id);
  if (!full) {
    return (
      <Shell>
        <NotFoundCard
          title="Dieses Ergebnis ist abgelaufen"
          body="Ergebnisse werden 30 Tage lang gespeichert und dann gelöscht. Du kannst den Test erneut machen, um ein frisches Ergebnis zu erhalten."
        />
      </Shell>
    );
  }

  const paid = await isPaidKv(id);
  let result: StoredResult | FreeResult = paid ? full : toFreeResult(full);
  if (paid) {
    const narrative = await getNarrative(id);
    if (narrative) result = { ...full, narrative };
  }
  // Ensure the client renders in German even for older results missing locale.
  result = { ...result, locale: "de" };

  return (
    <Shell>
      <ResultView result={result} isPaid={paid} resultId={id} />
    </Shell>
  );
}
