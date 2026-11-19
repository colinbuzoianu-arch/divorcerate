import type { Metadata } from "next";
import Link from "next/link";
import { kvConfigured } from "@/lib/kv";
import { getComparison, loadComparisonResults, computeComparison } from "@/lib/comparison";
import BrandMark from "@/components/layout/BrandMark";
import RadarChart from "@/components/RadarChart";
import SetHtmlLang from "@/components/SetHtmlLang";
import { CompareUnlock } from "@/components/compare/CompareActions";
import CompareWaiting from "@/components/compare/CompareWaiting";
import { dimensionLabel } from "@/lib/i18n/scoring";
import type { DimensionKey } from "@/lib/scoring";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Euer Paar-Vergleich | CoupleIQ",
  robots: { index: false, follow: false },
};

// German conversation prompts, keyed by the biggest-gap dimension.
const PROMPT_DE: Record<string, string> = {
  communication: "Ihr erlebt sehr unterschiedlich, wie ihr schwierige Dinge besprecht. Fragt euch gegenseitig: Wenn wir uneinig sind, was brauchst du dann am meisten von mir?",
  conflictRepair: "Ihr erholt euch unterschiedlich schnell von Streit. Sprecht darüber: Was hilft dir nach einem Streit wirklich, dich wieder verbunden zu fühlen?",
  contempt: "Eine:r von euch spürt die Schärfe im Konflikt stärker als die:der andere. Frag sanft: Gibt es etwas, das ich im Streit tue, das mehr wehtut, als mir bewusst ist?",
  friendship: "Ihr erlebt eure Nähe und Freundschaft unterschiedlich. Versuch: Was ist eine kleine Sache, die dich mir nah fühlen lässt?",
  respect: "Ihr fühlt euch unterschiedlich stark respektiert. Fragt euch: Wann fühlst du dich von mir am meisten – und am wenigsten – respektiert?",
  trust: "Vertrauen fühlt sich für euch beide gerade unterschiedlich an. Sprecht darüber: Gibt es etwas, das dir helfen würde, mir mehr zu vertrauen?",
  support: "Ihr erlebt Unterstützung unter Stress unterschiedlich. Fragt: Wenn du gestresst bist, was willst du dann wirklich von mir?",
  vision: "Euer Gefühl für eine gemeinsame Zukunft unterscheidet sich. Nehmt euch Zeit zu reden: Wo sehen wir uns jeweils in fünf Jahren?",
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem 4rem", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <SetHtmlLang lang="de" />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <Link href="/de" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/de/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Zum Test →</Link>
        </div>
        {children}
      </div>
    </main>
  );
}

const card = { background: "#fff", border: "1px solid var(--line-light)", borderRadius: 24, padding: "1.75rem" } as const;
const h1 = { fontFamily: "var(--serif)", fontWeight: 400, fontSize: 40, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.75rem" } as const;
const dl = (key: string, fallback: string) => dimensionLabel.de[key as DimensionKey] ?? fallback;

export default async function ComparePageDe({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!kvConfigured() || !/^[0-9a-fA-F-]{10,64}$/.test(id)) {
    return <Shell><div style={{ ...card, textAlign: "center" }}><p style={{ ...h1, fontSize: 28 }}>Vergleich nicht verfügbar</p><p style={{ color: "var(--text-2)" }}>Dieser Link ist vielleicht unvollständig oder abgelaufen.</p></div></Shell>;
  }

  const comp = await getComparison(id);
  if (!comp) {
    return <Shell><div style={{ ...card, textAlign: "center" }}><p style={{ ...h1, fontSize: 28 }}>Dieser Vergleich ist abgelaufen</p><p style={{ color: "var(--text-2)", marginBottom: 16 }}>Vergleiche werden 30 Tage lang gespeichert und dann gelöscht. Du kannst aus deinem Ergebnis einen neuen starten.</p><Link href="/de/relationship-test" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>Zum Test →</Link></div></Shell>;
  }

  if (!comp.bResultId) {
    return <Shell><CompareWaiting id={id} locale="de" /></Shell>;
  }

  if (!comp.paid) {
    return (
      <Shell>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Paar-Vergleich</p>
        <h1 style={h1}>Ihr seid beide dabei</h1>
        <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Ihr habt beide den Test gemacht. Schalte euren privaten Vergleich frei, um Dimension für Dimension zu sehen, wo ihr übereinstimmt und wo ihr euch unterscheidet – plus drei Gesprächsimpulse für eure größten Unterschiede. Er löscht sich nach 30 Tagen automatisch.
        </p>
        <div style={card}>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "grid", gap: 10 }}>
            {["Eure beiden Gesundheits-Scores nebeneinander", "Alle acht Dimensionen verglichen, mit hervorgehobenen Unterschieden", "Drei Gesprächsimpulse für eure größten Unterschiede", "Privat – keine:r sieht je die Antworten der:des anderen"].map((t) => (
              <li key={t} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-2)" }}><span style={{ color: "var(--violet-deep)", fontWeight: 700 }}>✓</span> {t}</li>
            ))}
          </ul>
          <CompareUnlock id={id} locale="de" />
        </div>
      </Shell>
    );
  }

  const both = await loadComparisonResults(comp);
  if (!both) {
    return <Shell><div style={{ ...card, textAlign: "center" }}><p style={{ ...h1, fontSize: 28 }}>Ein Ergebnis ist abgelaufen</p><p style={{ color: "var(--text-2)" }}>Eines der beiden Ergebnisse ist nicht mehr verfügbar, daher können wir den Vergleich nicht zeigen.</p></div></Shell>;
  }
  const view = computeComparison(both.a, both.b);
  const prompts = [...view.dimensions].sort((x, y) => y.gap - x.gap).slice(0, 3).map((d) => PROMPT_DE[d.key]).filter(Boolean);

  return (
    <Shell>
      <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Paar-Vergleich</p>
      <h1 style={h1}>Wo ihr übereinstimmt – und euch unterscheidet</h1>
      <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Zwei Perspektiven, nebeneinander. <span style={{ color: "var(--violet-deep)", fontWeight: 600 }}>Partner 1</span> ist, wer den Vergleich gestartet hat; <span style={{ color: "var(--ember-deep)", fontWeight: 600 }}>Partner 2</span> ist der oder die Dazugekommene.
      </p>

      <div style={{ ...card, display: "flex", justifyContent: "space-around", textAlign: "center", marginBottom: "1.25rem" }}>
        <div>
          <p style={{ fontFamily: "var(--serif)", fontSize: 44, color: "var(--violet-deep)", lineHeight: 1 }}>{view.overall.a}</p>
          <p style={{ fontSize: 12, color: "var(--text-2)" }}>Partner 1 Gesundheits-Score</p>
        </div>
        <div style={{ width: 1, background: "var(--line-light)" }} />
        <div>
          <p style={{ fontFamily: "var(--serif)", fontSize: 44, color: "var(--ember-deep)", lineHeight: 1 }}>{view.overall.b}</p>
          <p style={{ fontSize: 12, color: "var(--text-2)" }}>Partner 2 Gesundheits-Score</p>
        </div>
      </div>

      <div style={{ marginBottom: "1.25rem" }}>
        <RadarChart
          dimensions={view.dimensions.map((d) => ({ key: d.key, label: dl(d.key, d.label), score: d.a }))}
          compare={view.dimensions.map((d) => d.b)}
          legend={{ a: "Partner 1", b: "Partner 2" }}
        />
      </div>

      <div style={{ ...card, marginBottom: "1.25rem" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Dimension für Dimension</p>
        <div style={{ display: "grid", gap: 16 }}>
          {view.dimensions.map((d) => (
            <div key={d.key}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: "var(--text)" }}>{dl(d.key, d.label)}</span>
                <span style={{ color: d.gap >= 25 ? "var(--ember-deep)" : "var(--text-2)", fontFamily: "var(--mono)", fontSize: 11 }}>{d.gap >= 25 ? `${d.gap} Unterschied` : "einig"}</span>
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

      {prompts.length > 0 && (
        <div style={card}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Sprecht darüber</p>
          <div style={{ display: "grid", gap: 12 }}>
            {prompts.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "13px 16px", background: "var(--paper-2)", borderRadius: 14, alignItems: "flex-start" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--violet-deep)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ fontSize: 12, color: "var(--text-2)", textAlign: "center", marginTop: "1.5rem", lineHeight: 1.6 }}>
        Dieser Vergleich spiegelt zwei Selbsteinschätzungen und löscht sich nach 30 Tagen automatisch. Er dient der Reflexion, nicht als Urteil über eure Beziehung.
      </p>
    </Shell>
  );
}
