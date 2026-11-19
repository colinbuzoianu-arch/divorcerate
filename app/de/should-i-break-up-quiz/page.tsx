import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import MiniQuiz from "@/components/MiniQuiz";
import JsonLd from "@/components/JsonLd";
import SetHtmlLang from "@/components/SetHtmlLang";
import { faqPageLd } from "@/lib/seo";
import { MINI_QUIZZES_DE } from "@/lib/quizzes/de";

export const metadata: Metadata = {
  title: "Soll ich mich trennen? Ein kostenloser Test zur Entscheidung | CoupleIQ",
  description:
    "Ein kostenloser, privater Test „Soll ich mich trennen?\". Acht ehrliche Fragen, um eine harte Phase vom Ende zu unterscheiden – und was die Zeichen wirklich bedeuten.",
  alternates: {
    canonical: "https://splitornot.com/de/should-i-break-up-quiz",
    languages: { en: "https://splitornot.com/should-i-break-up-quiz", de: "https://splitornot.com/de/should-i-break-up-quiz", "x-default": "https://splitornot.com/should-i-break-up-quiz" },
  },
};

const faqs = [
  { q: "Kann ein Test mir wirklich sagen, ob ich mich trennen soll?", a: "Nein – und sei vorsichtig bei jedem, der das behauptet. Kein Test kann das für dich entscheiden. Was ein guter kann: dir helfen, zu ordnen, was du schon fühlst, Muster zu bemerken, die du gemieden hast, und vor einem Gespräch oder einer Entscheidung klarer zu werden. Das Urteil liegt immer bei dir." },
  { q: "Ist dieser Test privat?", a: "Ja. Dieser kurze Test wird vollständig in deinem Browser ausgewertet – deine Antworten werden nie irgendwohin gesendet oder gespeichert. Der längere Beziehungstest ist ebenfalls privat und braucht kein Konto." },
  { q: "Was ist der Unterschied zwischen diesem und dem vollständigen Test?", a: "Das hier ist ein Bauchgefühl-Check mit acht Fragen. Der vollständige Beziehungstest bewertet acht Dimensionen deiner Beziehung, benennt dein Muster und gibt dir konkrete nächste Schritte – ein viel vollständigeres Bild, wenn du bereit dafür bist." },
  { q: "Was, wenn ich Angst vor meinem:r Partner:in habe?", a: "Dann ist ein Test gerade nicht das, was du brauchst. Angst, Kontrolle und sich nicht sicher fühlen sind keine Beziehungsprobleme zum „Daran-Arbeiten\" – sie sind Gründe, vertrauliche Hilfe zu suchen. Siehe unsere Hilfsangebote." },
];

const h2 = { fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 0.9rem" } as const;
const para = { fontSize: 15.5, color: "var(--text-2)", lineHeight: 1.8, margin: "0 0 1rem" } as const;
const li = { fontSize: 15, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 8 } as const;

export default function ShouldIBreakUpQuizPageDe() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem 4rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <SetHtmlLang lang="de" />
      <JsonLd data={faqPageLd(faqs)} />
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <Link href="/de" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/de/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Zum Test →</Link>
        </div>

        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Kostenlos · Privat · 2 Minuten</p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 48, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1rem" }}>
          Soll ich mich trennen?
        </h1>
        <p style={{ fontSize: 18, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "2rem" }}>
          Wenn du die Frage stellst, weißt du schon, dass sich etwas nicht richtig anfühlt. Dieser kurze, private
          Test entscheidet nicht für dich – aber er hilft dir, klarer darüber nachzudenken, ob das, worin du steckst,
          eine harte Phase ist oder etwas Größeres.
        </p>

        <div style={{ marginBottom: "2.5rem" }}>
          <MiniQuiz config={MINI_QUIZZES_DE["should-i-break-up"]} locale="de" />
        </div>

        <article style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <section>
            <h2 style={h2}>Warum „soll ich mich trennen?\" so schwer zu beantworten ist</h2>
            <p style={para}>
              Fast niemand beendet eine Beziehung aus einem einzigen klaren, dramatischen Grund. Viel öfter ist es
              eine langsame Anhäufung kleinerer Dinge – eine verblassende Freundschaft, ein Vertrauen, das nie ganz
              wieder aufgebaut wurde, das Gefühl, auf Eierschalen zu gehen, eine Zukunft, die du dir nicht mehr
              vorstellen kannst. Weil keines davon ein einzelnes, benennbares Ereignis ist, sind sie leicht
              anzuzweifeln. Du sagst dir, dass jedes Paar das durchmacht. Manchmal stimmt das. Manchmal ist es, wie
              Menschen irgendwo bleiben, das vor Jahren aufgehört hat, gut für sie zu sein.
            </p>
            <p style={para}>
              Die Frage ist wirklich schwer, weil zwei Dinge zugleich wahr sein können: Du kannst jemanden lieben und
              trotzdem in einer Beziehung sein, die nicht funktioniert. Zwiespalt ist kein Zeichen, dass du dramatisch
              bist – er ist die normale emotionale Textur einer schweren Entscheidung. Das Ziel ist nicht, den Zweifel
              verschwinden zu lassen. Es ist, ihn gut genug zu verstehen, um danach zu handeln, in welche Richtung auch
              immer für dich richtig ist.
            </p>
          </section>

          <section>
            <h2 style={h2}>Zeichen, dass es eine harte Phase sein könnte</h2>
            <p style={para}>Schwere Zeiten sind normal, und sie sind oft überstehbar. Es könnte eher eine harte Phase sein, wenn:</p>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li style={li}>Ihr euch im Grunde noch respektiert und mögt, selbst wenn ihr frustriert seid.</li>
              <li style={li}>Die Belastung auf etwas Konkretes und Äußeres zurückgeht – ein Baby, ein Jobverlust, Trauer, Krankheit.</li>
              <li style={li}>Ihr beide wollt, dass es funktioniert, und bereit seid, etwas dafür zu tun.</li>
              <li style={li}>Ihr euch nach einem Streit noch versöhnen könnt – jemand wird weicher, und ihr findet zurück.</li>
              <li style={li}>Du dir die Zukunft vorstellst und sie:ihn noch darin haben willst.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>Zeichen, die man ernster nehmen sollte</h2>
            <p style={para}>Manche Muster schaukeln sich eher auf, als dass sie vergehen. Es lohnt genauere Aufmerksamkeit, wenn:</p>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li style={li}>Es Verachtung gibt – Sarkasmus, Spott, Augenrollen, ein Gefühl, von oben herab behandelt zu werden. Die Forschung behandelt das als die zersetzendste Dynamik, die ein Paar haben kann.</li>
              <li style={li}>Du dich durchgängig missachtet, übersehen oder innerhalb der Beziehung einsamer fühlst, als du außerhalb wärst.</li>
              <li style={li}>Vertrauen gebrochen und nie wirklich wieder aufgebaut wurde.</li>
              <li style={li}>Du die:der Einzige bist, die:der es versucht, und das seit Langem.</li>
              <li style={li}>Du nicht magst, wer du in der Beziehung geworden bist.</li>
              <li style={li}>Was euch vor allem zusammenhält, Praktisches und Angst sind, nicht Verbindung.</li>
            </ul>
            <p style={{ ...para, marginTop: "1rem" }}>
              Keines davon ist ein automatisches Urteil. Aber mehrere davon zusammen sind genau das, was ein kurzer
              Test dir ehrlicher zeigen kann – und was eine vollständigere Einschätzung im Detail kartieren kann.
            </p>
          </section>

          <section>
            <h2 style={h2}>Was dieser Test dir sagen kann – und was nicht</h2>
            <p style={para}>
              Das ist ein Werkzeug zur Reflexion, keine Diagnose und keine Vorhersage. Es spiegelt deine Sicht an einem
              einzigen Tag, und dein:e Partner:in würde vielleicht ganz anders antworten. Es kann dir nicht sagen, was
              du tun sollst, und es kann nicht alles berücksichtigen, was deine Beziehung zu deiner macht. Was es kann:
              dem Wirbel in deinem Kopf etwas Form geben und dich zu den Gesprächen – oder der Unterstützung – weisen,
              die wirklich etwas bewegen könnten.
            </p>
            <p style={para}>
              Wenn du tiefer gehen willst, bewertet der{" "}
              <Link href="/de/relationship-test" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>vollständige Beziehungstest</Link>{" "}
              acht Dimensionen – Kommunikation, Konflikt und Versöhnung, Verachtung, Freundschaft, Respekt, Vertrauen,
              Unterstützung und gemeinsame Vision –, benennt dein{" "}
              <Link href="/de/patterns/pursuer-withdrawer" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>Beziehungsmuster</Link> und zeigt dir, worauf du dich konzentrieren solltest.
            </p>
          </section>

          <section style={{ background: "var(--paper-2)", borderRadius: 24, padding: "1.75rem" }}>
            <h2 style={{ ...h2, fontSize: 24 }}>Wenn du dich nicht sicher fühlst</h2>
            <p style={{ ...para, margin: 0 }}>
              Wenn du Angst vor deinem:r Partner:in hast, dich kontrolliert oder zu Hause nicht sicher fühlst, ist das
              keine Frage für einen Test. Das sind keine Probleme zum „Daran-Arbeiten\" – es sind Gründe, vertrauliche
              Hilfe zu suchen. Bitte sieh unsere{" "}
              <Link href="/de/support-resources" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>Hilfsangebote</Link>. Deine Sicherheit geht vor.
            </p>
          </section>

          <section>
            <h2 style={h2}>Fragen, beantwortet</h2>
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
          <Link href="/de/relationship-test" style={{ background: "var(--violet-deep)", color: "#fff", borderRadius: 999, padding: "14px 30px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Zum vollständigen Beziehungstest →
          </Link>
        </div>
      </div>
    </main>
  );
}
