import type { Metadata } from "next";
import Link from "next/link";
import { kvConfigured } from "@/lib/kv";
import { getComparison, loadComparisonResults, computeComparison } from "@/lib/comparison";
import BrandMark from "@/components/layout/BrandMark";
import RadarChart from "@/components/RadarChart";
import { CompareInvite, CompareUnlock } from "@/components/compare/CompareActions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Your couple comparison | CoupleIQ",
  robots: { index: false, follow: false },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem 4rem", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Take the test →</Link>
        </div>
        {children}
      </div>
    </main>
  );
}

const card = { background: "#fff", border: "1px solid var(--line-light)", borderRadius: 24, padding: "1.75rem" } as const;
const h1 = { fontFamily: "var(--serif)", fontWeight: 400, fontSize: 40, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.75rem" } as const;

export default async function ComparePage({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!kvConfigured() || !/^[0-9a-fA-F-]{10,64}$/.test(id)) {
    return <Shell><div style={{ ...card, textAlign: "center" }}><p style={{ ...h1, fontSize: 28 }}>Comparison not available</p><p style={{ color: "var(--text-2)" }}>This link may be incomplete or expired.</p></div></Shell>;
  }

  const comp = await getComparison(id);
  if (!comp) {
    return <Shell><div style={{ ...card, textAlign: "center" }}><p style={{ ...h1, fontSize: 28 }}>This comparison has expired</p><p style={{ color: "var(--text-2)", marginBottom: 16 }}>Comparisons are kept for 30 days, then deleted. You can start a fresh one from your result.</p><Link href="/relationship-test" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>Take the test →</Link></div></Shell>;
  }

  // Waiting for the partner to take the test.
  if (!comp.bResultId) {
    return (
      <Shell>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Couple comparison</p>
        <h1 style={h1}>Waiting for your partner</h1>
        <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          You and your partner take the test on your own. Once you both have, we&apos;ll show you where you see things the same way and where you differ — using only your eight dimension scores, never your answers. Nothing is shared unless you both take part.
        </p>
        <div style={card}><CompareInvite id={id} /></div>
      </Shell>
    );
  }

  // Both have taken it, but it isn't unlocked yet.
  if (!comp.paid) {
    return (
      <Shell>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Couple comparison</p>
        <h1 style={h1}>You&apos;re both in</h1>
        <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Both of you have taken the test. Unlock your private comparison to see, dimension by dimension, where you align and where you differ — plus three conversation prompts to help you talk about the gaps. It auto-deletes after 30 days.
        </p>
        <div style={card}>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "grid", gap: 10 }}>
            {["Your two health scores, side by side", "All eight dimensions compared, with the gaps highlighted", "Three conversation prompts for your biggest differences", "Private — neither of you ever sees the other's answers"].map((t) => (
              <li key={t} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-2)" }}><span style={{ color: "var(--violet-deep)", fontWeight: 700 }}>✓</span> {t}</li>
            ))}
          </ul>
          <CompareUnlock id={id} />
        </div>
      </Shell>
    );
  }

  // Unlocked — render the comparison.
  const both = await loadComparisonResults(comp);
  if (!both) {
    return <Shell><div style={{ ...card, textAlign: "center" }}><p style={{ ...h1, fontSize: 28 }}>A result has expired</p><p style={{ color: "var(--text-2)" }}>One of the two results is no longer available, so we can&apos;t show the comparison.</p></div></Shell>;
  }
  const view = computeComparison(both.a, both.b);

  return (
    <Shell>
      <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Couple comparison</p>
      <h1 style={h1}>Where you align — and differ</h1>
      <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Two perspectives, side by side. <span style={{ color: "var(--violet-deep)", fontWeight: 600 }}>Partner 1</span> is whoever started this comparison; <span style={{ color: "var(--ember-deep)", fontWeight: 600 }}>Partner 2</span> is the partner who joined.
      </p>

      {/* Overall */}
      <div style={{ ...card, display: "flex", justifyContent: "space-around", textAlign: "center", marginBottom: "1.25rem" }}>
        <div>
          <p style={{ fontFamily: "var(--serif)", fontSize: 44, color: "var(--violet-deep)", lineHeight: 1 }}>{view.overall.a}</p>
          <p style={{ fontSize: 12, color: "var(--text-2)" }}>Partner 1 health score</p>
        </div>
        <div style={{ width: 1, background: "var(--line-light)" }} />
        <div>
          <p style={{ fontFamily: "var(--serif)", fontSize: 44, color: "var(--ember-deep)", lineHeight: 1 }}>{view.overall.b}</p>
          <p style={{ fontSize: 12, color: "var(--text-2)" }}>Partner 2 health score</p>
        </div>
      </div>

      {/* Overlaid radar */}
      <div style={{ marginBottom: "1.25rem" }}>
        <RadarChart
          dimensions={view.dimensions.map((d) => ({ key: d.key, label: d.label, score: d.a }))}
          compare={view.dimensions.map((d) => d.b)}
          legend={{ a: "Partner 1", b: "Partner 2" }}
        />
      </div>

      {/* Dimensions */}
      <div style={{ ...card, marginBottom: "1.25rem" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Dimension by dimension</p>
        <div style={{ display: "grid", gap: 16 }}>
          {view.dimensions.map((d) => (
            <div key={d.key}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--text)" }}>{d.label}</span>
                <span style={{ color: d.gap >= 25 ? "var(--ember-deep)" : "var(--text-2)", fontFamily: "var(--mono)", fontSize: 11 }}>{d.gap >= 25 ? `${d.gap} gap` : "aligned"}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "20px 1fr 28px", gap: 8, alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: "var(--violet-deep)", fontFamily: "var(--mono)" }}>P1</span>
                <span style={{ height: 6, borderRadius: 6, background: "#f0eff3" }}><span style={{ display: "block", height: "100%", width: `${d.a}%`, background: "var(--violet-deep)", borderRadius: 6 }} /></span>
                <b style={{ fontFamily: "var(--mono)", fontSize: 11, textAlign: "right", color: "var(--text)" }}>{d.a}</b>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "20px 1fr 28px", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: "var(--ember-deep)", fontFamily: "var(--mono)" }}>P2</span>
                <span style={{ height: 6, borderRadius: 6, background: "#f0eff3" }}><span style={{ display: "block", height: "100%", width: `${d.b}%`, background: "var(--ember-deep)", borderRadius: 6 }} /></span>
                <b style={{ fontFamily: "var(--mono)", fontSize: 11, textAlign: "right", color: "var(--text)" }}>{d.b}</b>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prompts */}
      {view.prompts.length > 0 && (
        <div style={card}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Talk about these</p>
          <div style={{ display: "grid", gap: 12 }}>
            {view.prompts.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "13px 16px", background: "var(--paper-2)", borderRadius: 14, alignItems: "flex-start" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--violet-deep)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ fontSize: 12, color: "var(--text-2)", textAlign: "center", marginTop: "1.5rem", lineHeight: 1.6 }}>
        This comparison reflects two self-assessments and auto-deletes after 30 days. It&apos;s for reflection, not a verdict on your relationship.
      </p>
    </Shell>
  );
}
