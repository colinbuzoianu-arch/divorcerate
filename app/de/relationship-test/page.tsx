import type { Metadata } from "next";
import Link from "next/link";
import Analyzer from "@/components/analyzer/Analyzer";
import SetHtmlLang from "@/components/SetHtmlLang";
import { getApp } from "@/lib/i18n/app";

const t = getApp("de").testPage;

export const metadata: Metadata = {
  title: "Beziehungstest: Kostenloser, privater Beziehungs-Check | CoupleIQ",
  description:
    "Mach den kostenlosen, privaten 5-Minuten-Beziehungstest. Beantworte 15 Fragen dazu, wie ihr kommuniziert, mit Konflikten umgeht, euch versöhnt und vertraut – und sieh, wo eure Beziehung steht.",
  alternates: {
    canonical: "https://splitornot.com/de/relationship-test",
    languages: {
      en: "https://splitornot.com/relationship-test",
      de: "https://splitornot.com/de/relationship-test",
      "x-default": "https://splitornot.com/relationship-test",
    },
  },
};

export default function RelationshipTestPageDe({ searchParams }: { searchParams: { compare?: string } }) {
  const comparing = Boolean(searchParams?.compare);
  const [bannerBefore, bannerAfter] = t.compareBanner.split("{scores}");
  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", padding: "1.5rem 1rem 3rem", fontFamily: "var(--sans)", color: "var(--on-dark)" }}>
      <SetHtmlLang lang="de" />
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        {comparing && (
          <div style={{ maxWidth: 620, margin: "0 auto 1.25rem", background: "rgba(139,124,255,0.12)", border: "1px solid var(--line-dark)", borderRadius: 16, padding: "12px 16px", fontSize: 13, color: "var(--on-dark-2)", lineHeight: 1.6 }}>
            {bannerBefore}<strong style={{ color: "var(--on-dark)" }}>{t.compareScores}</strong>{bannerAfter}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <Link href="/de" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span aria-hidden="true" style={{ position: "relative", width: 30, height: 22, flex: "none" }}>
              <span style={{ position: "absolute", top: 0, left: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--violet)", mixBlendMode: "screen" }} />
              <span style={{ position: "absolute", top: 0, right: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--ember)", mixBlendMode: "screen" }} />
            </span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--on-dark)", letterSpacing: "-0.01em" }}>CoupleIQ</span>
          </Link>
          <Link href="/de" style={{ fontSize: 13, color: "var(--on-dark-2)", textDecoration: "none" }}>{t.home}</Link>
        </div>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 40, color: "var(--on-dark)", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1 }}>
            {t.title}
          </h1>
          <p style={{ fontSize: 15, color: "var(--on-dark-2)", lineHeight: 1.6, maxWidth: 460, margin: "0 auto" }}>
            {t.subtitle}
          </p>
        </div>

        <Analyzer locale="de" />

        <p style={{ marginTop: "1.5rem", fontSize: 12, color: "var(--on-dark-2)", textAlign: "center", lineHeight: 1.6 }}>
          {t.disclaimerPre}
          <Link href="/de/support-resources" style={{ color: "var(--on-dark)", textDecoration: "underline" }}>{t.supportLink}</Link>.
        </p>
      </div>
    </main>
  );
}
