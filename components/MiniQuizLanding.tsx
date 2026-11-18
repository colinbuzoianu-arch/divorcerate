import Link from "next/link";
import type { MiniQuiz as MiniQuizConfig } from "@/lib/quizzes/types";
import MiniQuiz from "@/components/MiniQuiz";
import BrandMark from "@/components/layout/BrandMark";
import JsonLd from "@/components/JsonLd";
import { faqPageLd } from "@/lib/seo";
import { MINI_QUIZZES } from "@/lib/quizzes/registry";

export interface LandingSection { heading: string; body: string[]; }
export interface LandingFaq { q: string; a: string; }

/**
 * Shared layout for mini-quiz landing pages (Phase 4.2): header, hero, the quiz
 * island, unique editorial sections, FAQ (+ FAQPage JSON-LD) and a CTA. Each
 * route supplies its own copy so every page is unique for SEO.
 */
export default function MiniQuizLanding({
  config,
  eyebrow,
  title,
  lede,
  sections,
  faqs,
  safetyNote = false,
}: {
  config: MiniQuizConfig;
  eyebrow: string;
  title: string;
  lede: string;
  sections: LandingSection[];
  faqs: LandingFaq[];
  safetyNote?: boolean;
}) {
  const h2 = { fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 0.9rem" } as const;
  const para = { fontSize: 15.5, color: "var(--text-2)", lineHeight: 1.8, margin: "0 0 1rem" } as const;

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem 4rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <JsonLd data={faqPageLd(faqs)} />
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Full test →</Link>
        </div>

        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>{eyebrow}</p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 48, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1rem" }}>{title}</h1>
        <p style={{ fontSize: 18, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "2rem" }}>{lede}</p>

        <div style={{ marginBottom: "2.5rem" }}>
          <MiniQuiz config={config} />
        </div>

        <article style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 style={h2}>{s.heading}</h2>
              {s.body.map((p, i) => <p key={i} style={para}>{p}</p>)}
            </section>
          ))}

          {safetyNote && (
            <section style={{ background: "var(--paper-2)", borderRadius: 24, padding: "1.75rem" }}>
              <h2 style={{ ...h2, fontSize: 24 }}>If you don&apos;t feel safe</h2>
              <p style={{ ...para, margin: 0 }}>
                If you feel afraid of your partner, controlled, or unsafe at home, this is not a question for a
                quiz — those are reasons to reach out for confidential help, not things to &quot;work on.&quot;
                Please see our{" "}
                <Link href="/support-resources" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>support resources</Link>. Your safety comes first.
              </p>
            </section>
          )}

          <section>
            <h2 style={h2}>Questions, answered</h2>
            <div>
              {faqs.map((f) => (
                <details key={f.q} style={{ borderBottom: "1px solid var(--line-light)", padding: "14px 0" }}>
                  <summary style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", cursor: "pointer" }}>{f.q}</summary>
                  <p style={{ ...para, margin: "10px 0 0", fontSize: 14.5 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/relationship-test" style={{ background: "var(--violet-deep)", color: "#fff", borderRadius: 999, padding: "14px 30px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Take the full relationship test →
          </Link>
        </div>

        {/* More free quizzes */}
        <div style={{ marginTop: "2.5rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 16 }}>More free quizzes</p>
          <div style={{ display: "grid", gap: 10 }}>
            {MINI_QUIZZES.filter((qz) => !qz.href.includes(config.slug)).map((qz) => (
              <Link key={qz.href} href={qz.href} style={{ textDecoration: "none", background: "#fff", border: "1px solid var(--line-light)", borderRadius: 16, padding: "1rem 1.25rem", display: "block" }}>
                <p style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", marginBottom: 2 }}>{qz.title}</p>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{qz.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
