import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import { WEIGHTS } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Methodology: how the relationship health score works | CoupleIQ",
  description:
    "Exactly how CoupleIQ scores your relationship: the eight dimensions we measure, how they're weighted, the research themes we draw on, and what the score can and can't tell you.",
  alternates: { canonical: "https://splitornot.com/methodology" },
};

const DIMENSIONS: { key: keyof typeof WEIGHTS; label: string; blurb: string }[] = [
  { key: "communication", label: "Communication", blurb: "How you talk when it actually matters." },
  { key: "conflictRepair", label: "Conflict & repair", blurb: "Not whether you fight, but how you find your way back." },
  { key: "contempt", label: "Contempt", blurb: "Sarcasm, eye-rolling, dismissal — scored as its absence." },
  { key: "friendship", label: "Friendship & intimacy", blurb: "Feeling truly known, not just coexisting." },
  { key: "respect", label: "Respect", blurb: "Respected, not merely tolerated." },
  { key: "trust", label: "Trust", blurb: "Reliability, honesty and emotional safety." },
  { key: "support", label: "Support & stress", blurb: "Whether pressure pushes you together or apart." },
  { key: "vision", label: "Shared vision", blurb: "Whether you're building toward the same future." },
];

const h2 = { fontFamily: "var(--serif)", fontWeight: 400, fontSize: 32, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.05, margin: "0 0 1rem" } as const;
const p = { fontSize: 15, color: "var(--text-2)", lineHeight: 1.75, margin: "0 0 1rem" } as const;
const card = { background: "#fff", border: "1px solid var(--line-light)", borderRadius: 24, padding: "1.75rem" } as const;

export default function MethodologyPage() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem 4rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Take the test →</Link>
        </div>

        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Methodology</p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 48, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1rem" }}>
          How the score works
        </h1>
        <p style={{ fontSize: 17, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Your Relationship Health Score is computed from your answers by a fixed, published method —
          not invented by AI. The same answers always produce the same score. Here is exactly how.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <section style={card}>
            <h2 style={h2}>What we measure</h2>
            <p style={p}>Your fifteen answers roll up into eight dimensions, each scored from 0 to 100 (higher is healthier):</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {DIMENSIONS.map((d) => (
                <li key={d.key} style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--text)" }}>{d.label}.</strong> {d.blurb}
                </li>
              ))}
            </ul>
          </section>

          <section style={card}>
            <h2 style={h2}>How it&apos;s weighted</h2>
            <p style={p}>
              The overall score is a weighted mean of the eight dimensions. Contempt, conflict &amp; repair,
              and friendship carry the most weight, because they are the themes most consistently linked to
              relationship outcomes in the research below. The weights are fixed and live in one place in
              our code:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              {DIMENSIONS.map((d) => (
                <li key={d.key} style={{ display: "grid", gridTemplateColumns: "1fr auto", fontSize: 14, color: "var(--text-2)", borderBottom: "1px solid var(--line-light)", padding: "6px 0" }}>
                  <span>{d.label}</span>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--text)" }}>×{WEIGHTS[d.key].toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p style={{ ...p, margin: "1rem 0 0" }}>
              The score then places you in one of five bands: Critical Point (0–29), Fault Line (30–49),
              Amber Zone (50–64), Stable Foundation (65–79) and Solid Ground (80–100). Your relationship
              pattern is chosen by fixed rules from the same answers; the AI only explains your result in
              plain language — it never computes the numbers.
            </p>
          </section>

          <section style={card}>
            <h2 style={h2}>What it draws on</h2>
            <p style={p}>
              The questions and dimensions are inspired by well-known themes from relationship research.
              This is a self-reflection tool, not a reproduction of any single study or instrument:
            </p>
            <ul style={{ paddingLeft: "1.2rem", margin: 0, display: "grid", gap: 8, fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
              <li>The &quot;Four Horsemen&quot; (criticism, contempt, defensiveness, stonewalling) and repair attempts — Gottman, J. &amp; Silver, N., <em>The Seven Principles for Making Marriage Work</em> (1999).</li>
              <li>Emotional friendship and the &quot;Sound Relationship House&quot; — Gottman, J., <em>The Relationship Cure</em> (2001).</li>
              <li>Attachment and emotional responsiveness — Johnson, S., <em>Hold Me Tight</em> (2008); Hazan, C. &amp; Shaver, P. (1987).</li>
            </ul>
          </section>

          <section style={card}>
            <h2 style={h2}>What it can&apos;t tell you</h2>
            <ul style={{ paddingLeft: "1.2rem", margin: 0, display: "grid", gap: 8, fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
              <li>It is <strong>not</strong> a diagnosis, and it does not predict whether you will break up.</li>
              <li>It reflects <strong>one perspective</strong> — yours. Your partner may answer differently.</li>
              <li>It is <strong>not a validated clinical instrument</strong>, and it does not replace a qualified couples therapist.</li>
            </ul>
          </section>

          <section style={{ ...card, background: "var(--paper-2)" }}>
            <h2 style={{ ...h2, fontSize: 24 }}>Independent review</h2>
            <p style={{ ...p, margin: 0 }}>
              This method has not yet been independently reviewed by a licensed professional. When it has,
              we will name the reviewer and their credentials here. Until then we make no &quot;reviewed by&quot;
              or &quot;clinically validated&quot; claims.
            </p>
          </section>
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/relationship-test" style={{ background: "var(--violet-deep)", color: "#fff", borderRadius: 999, padding: "14px 30px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Take the free test →
          </Link>
        </div>
      </div>
    </main>
  );
}
