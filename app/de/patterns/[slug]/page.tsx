import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PATTERNS_DE } from "@/lib/patterns.de";
import { getPatternLocalized } from "@/lib/patterns";
import BrandMark from "@/components/layout/BrandMark";
import BackToResult from "@/components/BackToResult";
import SetHtmlLang from "@/components/SetHtmlLang";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/pages";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return PATTERNS_DE.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getPatternLocalized(params.slug, "de");
  if (!p) return {};
  return {
    title: `${p.name}: was es ist, warum es passiert, was hilft | CoupleIQ`,
    description: p.lede,
    alternates: {
      canonical: `${SITE_URL}/de/patterns/${p.slug}`,
      languages: {
        en: `${SITE_URL}/patterns/${p.slug}`,
        de: `${SITE_URL}/de/patterns/${p.slug}`,
        "x-default": `${SITE_URL}/patterns/${p.slug}`,
      },
    },
    openGraph: { title: `${p.name} | CoupleIQ`, description: p.lede, type: "article", url: `${SITE_URL}/de/patterns/${p.slug}`, locale: "de_DE" },
  };
}

const h2 = { fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.05, margin: "0 0 0.9rem" } as const;
const para = { fontSize: 15.5, color: "var(--text-2)", lineHeight: 1.8, margin: "0 0 1rem" } as const;
const card = { background: "#fff", border: "1px solid var(--line-light)", borderRadius: 24, padding: "1.75rem" } as const;

export default function PatternPageDe({ params }: Props) {
  const p = getPatternLocalized(params.slug, "de");
  if (!p) notFound();

  const related = p.related.map((s) => getPatternLocalized(s, "de")).filter(Boolean) as NonNullable<ReturnType<typeof getPatternLocalized>>[];

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem 4rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <SetHtmlLang lang="de" />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.name, description: p.lede, author: { "@type": "Organization", name: "CoupleIQ" }, publisher: { "@type": "Organization", name: "CoupleIQ" }, mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/de/patterns/${p.slug}` }, inLanguage: "de" }} />
      <JsonLd data={breadcrumbLd([{ name: "Start", path: "/de" }, { name: "Muster", path: `/de/patterns/${p.slug}` }, { name: p.name, path: `/de/patterns/${p.slug}` }])} />

      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <Link href="/de" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/de/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Test starten →</Link>
        </div>

        <BackToResult />

        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Beziehungsmuster</p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 48, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1rem" }}>{p.name}</h1>
        <p style={{ fontSize: 18, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "2.5rem" }}>{p.lede}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <section style={card}>
            <h2 style={h2}>Was es ist</h2>
            {p.whatItIs.map((t, i) => <p key={i} style={para}>{t}</p>)}
          </section>
          <section style={card}>
            <h2 style={h2}>Wie es sich anfühlt</h2>
            {p.howItFeels.map((t, i) => <p key={i} style={para}>{t}</p>)}
          </section>
          <section style={card}>
            <h2 style={h2}>Warum es passiert</h2>
            {p.whyItHappens.map((t, i) => <p key={i} style={para}>{t}</p>)}
          </section>
          <section style={card}>
            <h2 style={h2}>Was hilft</h2>
            <div style={{ display: "grid", gap: 14 }}>
              {p.whatHelps.map((w, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--violet-deep)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>{w.title}</p>
                    <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>{w.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section style={{ ...card, background: "var(--paper-2)" }}>
            <h2 style={{ ...h2, fontSize: 24 }}>Wann du dir Hilfe holen solltest</h2>
            {p.whenToGetHelp.map((t, i) => <p key={i} style={{ ...para, margin: i === p.whenToGetHelp.length - 1 ? 0 : "0 0 1rem" }}>{t}</p>)}
            <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 12 }}>
              Wenn du dich jemals nicht sicher fühlst, siehe <Link href="/de/support-resources" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>Hilfsangebote</Link>.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div style={{ background: "var(--ink)", color: "var(--on-dark)", borderRadius: 32, padding: "2.5rem 2rem", marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, marginBottom: "0.5rem", lineHeight: 1.1 }}>In welchem Muster steckt ihr?</p>
          <p style={{ color: "var(--on-dark-2)", fontSize: 14, marginBottom: "1.5rem", lineHeight: 1.6 }}>Mach den kostenlosen, privaten Beziehungstest und finde es heraus – in etwa fünf Minuten.</p>
          <Link href="/de/relationship-test" style={{ background: "var(--on-dark)", color: "var(--ink)", borderRadius: 999, padding: "14px 30px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>Kostenlosen Test starten →</Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 16 }}>Verwandte Muster</p>
            <div style={{ display: "grid", gap: 10 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/de/patterns/${r.slug}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid var(--line-light)", borderRadius: 16, padding: "1rem 1.25rem", display: "block" }}>
                  <p style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", marginBottom: 2 }}>{r.name}</p>
                  <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{r.lede}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
