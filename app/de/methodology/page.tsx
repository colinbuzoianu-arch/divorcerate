import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import SetHtmlLang from "@/components/SetHtmlLang";
import { WEIGHTS } from "@/lib/scoring";

export const metadata: Metadata = {
  title: "Methodik: So funktioniert der Beziehungs-Score | CoupleIQ",
  description:
    "Genau wie CoupleIQ deine Beziehung bewertet: die acht Dimensionen, die wir messen, wie sie gewichtet werden, die Forschungsthemen, auf die wir uns stützen, und was der Score dir sagen kann und was nicht.",
  alternates: {
    canonical: "https://splitornot.com/de/methodology",
    languages: {
      en: "https://splitornot.com/methodology",
      de: "https://splitornot.com/de/methodology",
      "x-default": "https://splitornot.com/methodology",
    },
  },
};

const DIMENSIONS: { key: keyof typeof WEIGHTS; label: string; blurb: string }[] = [
  { key: "communication", label: "Kommunikation", blurb: "Wie ihr redet, wenn es wirklich darauf ankommt." },
  { key: "conflictRepair", label: "Konflikt & Versöhnung", blurb: "Nicht ob ihr streitet, sondern wie ihr wieder zueinanderfindet." },
  { key: "contempt", label: "Verachtung", blurb: "Sarkasmus, Augenrollen, Abwertung – bewertet als ihre Abwesenheit." },
  { key: "friendship", label: "Freundschaft & Nähe", blurb: "Sich wirklich gekannt fühlen, nicht nur nebeneinanderher leben." },
  { key: "respect", label: "Respekt", blurb: "Respektiert, nicht bloß geduldet." },
  { key: "trust", label: "Vertrauen", blurb: "Verlässlichkeit, Ehrlichkeit und emotionale Sicherheit." },
  { key: "support", label: "Unterstützung & Stress", blurb: "Ob Druck euch zusammenbringt oder auseinandertreibt." },
  { key: "vision", label: "Gemeinsame Vision", blurb: "Ob ihr auf dieselbe Zukunft hinarbeitet." },
];

const h2 = { fontFamily: "var(--serif)", fontWeight: 400, fontSize: 32, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.05, margin: "0 0 1rem" } as const;
const p = { fontSize: 15, color: "var(--text-2)", lineHeight: 1.75, margin: "0 0 1rem" } as const;
const card = { background: "#fff", border: "1px solid var(--line-light)", borderRadius: 24, padding: "1.75rem" } as const;

export default function MethodologyPageDe() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem 4rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <SetHtmlLang lang="de" />
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <Link href="/de" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/de/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Test starten →</Link>
        </div>

        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Methodik</p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 48, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1rem" }}>
          So funktioniert der Score
        </h1>
        <p style={{ fontSize: 17, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          Dein Beziehungs-Score wird aus deinen Antworten nach einer festen, veröffentlichten Methode berechnet –
          nicht von einer KI erfunden. Gleiche Antworten ergeben immer denselben Score. Hier ist genau, wie.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <section style={card}>
            <h2 style={h2}>Was wir messen</h2>
            <p style={p}>Deine fünfzehn Antworten fließen in acht Dimensionen ein, jede von 0 bis 100 bewertet (höher ist gesünder):</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {DIMENSIONS.map((d) => (
                <li key={d.key} style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--text)" }}>{d.label}.</strong> {d.blurb}
                </li>
              ))}
            </ul>
          </section>

          <section style={card}>
            <h2 style={h2}>Wie es gewichtet wird</h2>
            <p style={p}>
              Der Gesamtscore ist ein gewichteter Mittelwert der acht Dimensionen. Verachtung, Konflikt &amp; Versöhnung
              und Freundschaft haben das größte Gewicht, weil sie die Themen sind, die in der unten genannten Forschung
              am konsistentesten mit Beziehungsverläufen verbunden sind. Die Gewichte sind fest und stehen an einer
              Stelle in unserem Code:
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
              Der Score ordnet dich dann einem von fünf Bereichen zu: Kritischer Punkt (0–29), Bruchlinie (30–49),
              Gelbe Zone (50–64), Stabiles Fundament (65–79) und Fester Boden (80–100). Dein Beziehungsmuster wird
              nach festen Regeln aus denselben Antworten gewählt; die KI erklärt dein Ergebnis nur in verständlicher
              Sprache – die Zahlen berechnet sie nie.
            </p>
          </section>

          <section style={card}>
            <h2 style={h2}>Worauf es sich stützt</h2>
            <p style={p}>
              Die Fragen und Dimensionen sind von bekannten Themen der Beziehungsforschung inspiriert. Dies ist ein
              Werkzeug zur Selbstreflexion, keine Nachbildung einer einzelnen Studie oder eines Messinstruments:
            </p>
            <ul style={{ paddingLeft: "1.2rem", margin: 0, display: "grid", gap: 8, fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
              <li>Die „vier apokalyptischen Reiter\" (Kritik, Verachtung, Abwehr, Mauern) und Versöhnungsversuche – Gottman, J. &amp; Silver, N., <em>The Seven Principles for Making Marriage Work</em> (1999).</li>
              <li>Emotionale Freundschaft und das „Sound Relationship House\" – Gottman, J., <em>The Relationship Cure</em> (2001).</li>
              <li>Bindung und emotionale Ansprechbarkeit – Johnson, S., <em>Hold Me Tight</em> (2008); Hazan, C. &amp; Shaver, P. (1987).</li>
            </ul>
          </section>

          <section style={card}>
            <h2 style={h2}>Was es dir nicht sagen kann</h2>
            <ul style={{ paddingLeft: "1.2rem", margin: 0, display: "grid", gap: 8, fontSize: 14, color: "var(--text-2)", lineHeight: 1.6 }}>
              <li>Es ist <strong>keine</strong> Diagnose und sagt nicht voraus, ob ihr euch trennen werdet.</li>
              <li>Es spiegelt <strong>eine Perspektive</strong> – deine. Dein:e Partner:in antwortet vielleicht anders.</li>
              <li>Es ist <strong>kein validiertes klinisches Instrument</strong> und ersetzt keine qualifizierte Paartherapie.</li>
            </ul>
          </section>

          <section style={{ ...card, background: "var(--paper-2)" }}>
            <h2 style={{ ...h2, fontSize: 24 }}>Unabhängige Prüfung</h2>
            <p style={{ ...p, margin: 0 }}>
              Diese Methode wurde noch nicht unabhängig von einer lizenzierten Fachperson geprüft. Sobald das geschehen
              ist, nennen wir hier die prüfende Person und ihre Qualifikation. Bis dahin machen wir keine Aussagen wie
              „geprüft von\" oder „klinisch validiert\".
            </p>
          </section>
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/de/relationship-test" style={{ background: "var(--violet-deep)", color: "#fff", borderRadius: 999, padding: "14px 30px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Kostenlosen Test starten →
          </Link>
        </div>
      </div>
    </main>
  );
}
