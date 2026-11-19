import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import "../styles/landing.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import HeroThreads from "@/components/landing/HeroThreads";
import JsonLd from "@/components/JsonLd";
import SetHtmlLang from "@/components/SetHtmlLang";
import { faqPageLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Beziehungstest: Kostenloser, privater Beziehungs-Check | CoupleIQ",
  description:
    "Ein kostenloser, privater 5-Minuten-Beziehungstest. Sieh über acht Dimensionen, wo deine Beziehung steht, erkenne dein Beziehungsmuster und erhalte klare nächste Schritte.",
  alternates: {
    canonical: "https://splitornot.com/de",
    languages: {
      en: "https://splitornot.com",
      de: "https://splitornot.com/de",
      "x-default": "https://splitornot.com",
    },
  },
  openGraph: {
    title: "Beziehungstest: Kostenloser, privater Beziehungs-Check | CoupleIQ",
    description: "Ein ehrlicher, wissenschaftlich fundierter Blick auf deine Beziehung in 5 Minuten.",
    url: "https://splitornot.com/de",
    locale: "de_DE",
    type: "website",
  },
};

const ARROW = (
  <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"></path></svg>
);
const CHECK = (
  <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9.5l4 4 8-9"></path></svg>
);

const patterns = [
  { n: "01", cls: "p1", slug: "validated-couple", art: <><span className="o v"></span><span className="o e"></span></>, title: "Validierendes Paar", desc: "Ruhiger Streit, echter Respekt und eine starke Freundschaft als Basis." },
  { n: "02", cls: "p2", slug: "volatile-couple", art: <><span className="o v"></span><span className="o e"></span></>, title: "Erregbares Paar", desc: "Viel Hitze, viel Leidenschaft und schnelle, intensive Versöhnung." },
  { n: "03", cls: "p3", slug: "conflict-avoiders", art: <><span className="o v"></span><span className="divider"></span><span className="o e"></span></>, title: "Konfliktvermeider", desc: "An der Oberfläche friedlich, während Probleme leise untergehen." },
  { n: "04", cls: "p4", slug: "pursuer-withdrawer", art: <><span className="o e"></span><span className="o v"></span></>, title: "Verfolger–Rückzieher", desc: "Eine:r sucht Nähe; der oder die andere zieht sich zurück, um klarzukommen." },
  { n: "05", cls: "p5", slug: "drifting-couple", art: <><span className="o v"></span><span className="o e"></span></>, title: "Driftendes Paar", desc: "Früher nah, jetzt nebeneinander. Die Freundschaft verblasst ohne Streit." },
  { n: "06", cls: "p6", slug: "crisis-bonded", art: <><span className="ring"></span><span className="o v"></span><span className="o e"></span></>, title: "Krisenverbunden", desc: "Zusammengehalten mehr durch gemeinsamen Druck als durch gemeinsame Nähe." },
  { n: "07", cls: "p7", slug: "hostile-detached", art: <><span className="o v"></span><span className="gap"></span><span className="o e"></span></>, title: "Feindselig–distanziert", desc: "Verachtung da, Distanz wächst. Das Muster, das man ernst nehmen sollte." },
];

const dims: [string, string, string][] = [
  ["01", "Kommunikation", "Wie ihr redet, wenn es wirklich darauf ankommt."],
  ["02", "Konflikt & Versöhnung", "Nicht ob ihr streitet, sondern wie ihr wieder zueinanderfindet."],
  ["03", "Verachtung", "Augenrollen, Sarkasmus, Abwertung. Das leise Gift."],
  ["04", "Freundschaft & Nähe", "Sich wirklich gekannt fühlen, nicht nur nebeneinanderher leben."],
  ["05", "Respekt", "Respektiert, nicht bloß geduldet."],
  ["06", "Vertrauen", "Verlässlichkeit, Ehrlichkeit und emotionale Sicherheit."],
  ["07", "Unterstützung & Stress", "Ob Druck euch zusammenbringt oder auseinandertreibt."],
  ["08", "Gemeinsame Vision", "Ob ihr auf dieselbe Zukunft hinarbeitet."],
];

const marqueeItems = ["Kommunikation", "Konflikt & Versöhnung", "Verachtung", "Freundschaft", "Respekt", "Vertrauen", "Unterstützung", "Gemeinsame Vision"];

const deQuizzes = [
  { href: "/de/should-i-break-up-quiz", title: "Soll ich mich trennen?", blurb: "Du bist hin- und hergerissen. Zehn Fragen, um die Lage klarer zu sehen." },
  { href: "/de/four-horsemen-quiz", title: "Die vier Reiter", blurb: "Erkenne die vier Kommunikationsmuster, die Beziehungen am stärksten gefährden." },
  { href: "/de/attachment-style-quiz", title: "Bindungstyp-Test", blurb: "Finde heraus, wie du in Nähe tickst – sicher, ängstlich oder vermeidend." },
  { href: "/de/is-my-relationship-toxic-quiz", title: "Ist meine Beziehung toxisch?", blurb: "Ehrliche Fragen zu den Zeichen, die man leicht wegerklärt." },
  { href: "/de/relationship-compatibility-test", title: "Kompatibilitätstest", blurb: "Wie gut passt ihr in dem zusammen, was langfristig zählt?" },
];

const faqs = [
  { q: "Ist das wissenschaftlich validiert?", a: "Nein, und wir tun nicht so. Die Fragen greifen etablierte Forschungsthemen auf; es ist ein Werkzeug zur Reflexion, kein validiertes klinisches Instrument." },
  { q: "Was passiert mit meinen Antworten?", a: "Sie werden nur verwendet, um dein Ergebnis zu erstellen, und nicht gespeichert. Dein Ergebnis liegt 30 Tage lang unter einem privaten Link und wird dann gelöscht. Du brauchst kein Konto. Unsere Datenschutzerklärung listet genau auf, was gespeichert wird und welche Anbieter beteiligt sind." },
  { q: "Können wir ihn gemeinsam machen?", a: "Ja. Ihr macht den Test jeweils für euch und vergleicht dann privat nebeneinander – nur eure Scores werden geteilt, nie eure Antworten, und nur, wenn ihr beide zustimmt. Die Unterschiede sind oft aufschlussreicher als die Punktzahlen." },
  { q: "Ersetzt das eine Paartherapie?", a: "Nein. Viele nutzen ihr Ergebnis, um zu entscheiden, ob sie eine Fachperson aufsuchen, oder um mit etwas Konkretem in die erste Sitzung zu gehen." },
  { q: "Warum ist der vollständige Bericht kostenpflichtig?", a: "Das kostenlose Ergebnis gibt dir die Kernaussage. Der vollständige Bericht erklärt jede Dimension und gibt dir konkrete nächste Schritte. Das ist der Teil, dessen Erstellung uns etwas kostet – und der Teil, der dir beim Handeln hilft." },
];

export default function HomeDe() {
  return (
    <div className="cq">
      <SetHtmlLang lang="de" />
      <JsonLd data={faqPageLd(faqs)} />
      <svg className="grain" aria-hidden="true"><filter id="cqn"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch"></feTurbulence></filter><rect width="100%" height="100%" filter="url(#cqn)"></rect></svg>

      <SiteHeader locale="de" />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
        <HeroThreads />
        <div className="hero-vignette" aria-hidden="true"></div>
        <div className="wrap">
          <p className="eyebrow mono">Bleiben oder gehen · Ein kostenloser Beziehungstest</p>
          <h1>Zwei Menschen.<span className="l2">Ein <span className="it grad">ehrliches</span> Bild.</span></h1>
          <div className="hero-row">
            <div className="hero-copy">
              <p>Fünfzehn Fragen dazu, wie ihr redet, streitet, euch versöhnt und vertraut – daraus wird <strong>ein klares Bild davon, wo eure Beziehung steht</strong> und was als Nächstes zu tun ist.</p>
              <div className="ctas">
                <Link className="btn btn-light" href="/de/relationship-test">Kostenlosen Test starten {ARROW}</Link>
                <a className="btn btn-ghost" href="#how">So funktioniert's</a>
              </div>
              <div className="meta mono"><span>15 Fragen</span><span>Etwa 5 Minuten</span><span>Kein Konto</span></div>
            </div>

            <aside className="preview" aria-label="Beispiel-Ergebnis">
              <div className="preview-top"><span className="mono">Dein Ergebnis</span><span className="pill">Beispiel</span></div>
              <div className="score"><span className="n">58</span><span className="of">/ 100 Beziehungs-Score</span></div>
              <p className="band">Gelbe Zone</p>
              <div className="bars">
                <div className="bar"><span>Versöhnung</span><span className="t"><i style={{ width: "48%" }}></i></span><b>48</b></div>
                <div className="bar"><span>Freundschaft</span><span className="t"><i style={{ width: "66%" }}></i></span><b>66</b></div>
                <div className="bar"><span>Vertrauen</span><span className="t"><i style={{ width: "71%" }}></i></span><b>71</b></div>
                <div className="bar"><span>Verachtung</span><span className="t"><i style={{ width: "82%" }}></i></span><b>82</b></div>
              </div>
              <div className="preview-foot"><span>Kostenlos starten</span><strong>Etwa 5 Minuten</strong></div>
            </aside>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) =>
            marqueeItems.map((m, i) => (
              <Fragment key={`${dup}-${i}`}>
                <span>{m}</span>
                <span className="dot"></span>
              </Fragment>
            ))
          )}
        </div>
      </div>

      {/* SO FUNKTIONIERT'S */}
      <section className="paper sec" id="how">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Das Schwierige ist nicht die Antwort. Es ist, <span className="it">die Frage zu stellen.</span></h2>
            <p className="lede">CoupleIQ gibt dir einen privaten, strukturierten Weg, deine Beziehung anzuschauen – ohne Therapiepraxis, ohne Konto und ohne Streit.</p>
          </div>
          <div className="steps">
            <svg className="thread" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
              <path className="a" d="M0 60 C 200 0, 300 120, 420 60 S 700 0, 820 60 S 1060 120, 1200 50"></path>
              <path className="b" d="M0 70 C 180 120, 320 10, 430 70 S 680 120, 810 60 S 1080 0, 1200 70"></path>
            </svg>
            <article className="step reveal">
              <span className="num">01</span>
              <h3>Ehrlich antworten</h3>
              <p>Fünfzehn Fragen zu Kommunikation, Konflikt, emotionaler Nähe, Stress und Vertrauen. Denk an euren letzten echten Streit, nicht an euren besten Tag.</p>
            </article>
            <article className="step reveal">
              <span className="num">02</span>
              <h3>Dein Muster erkennen</h3>
              <p>Deine Antworten werden über acht Dimensionen bewertet und einem von sieben Beziehungsmustern zugeordnet. Gleiche Antworten, gleicher Score – jedes Mal.</p>
            </article>
            <article className="step reveal">
              <span className="num">03</span>
              <h3>Wissen, was als Nächstes kommt</h3>
              <p>Eine verständliche Einschätzung deiner Stärken und deines größten Risikos, mit konkreten nächsten Schritten. Der vollständige Bericht geht tiefer.</p>
            </article>
          </div>
        </div>
      </section>

      {/* WAS WIR MESSEN */}
      <section className="ink sec" id="method">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Acht Dinge, die <span className="it grad">leise entscheiden</span>, wie eine Beziehung läuft.</h2>
            <p className="lede">Aufgebaut auf bekannten Themen aus der Beziehungsforschung: die vier apokalyptischen Reiter, Versöhnungsversuche, emotionale Freundschaft und Bindung. <Link href="/de/methodology" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>Unsere Bewertungsmethode ist vollständig veröffentlicht.</Link></p>
          </div>
          <div className="measure">
            <div className="radar-wrap reveal">
              <svg className="radar" viewBox="0 0 440 440" role="img" aria-label="Beispiel-Radardiagramm, das zwei Partner über acht Dimensionen vergleicht">
                <polygon className="ring" points="220.0,177.5 250.1,189.9 262.5,220.0 250.1,250.1 220.0,262.5 189.9,250.1 177.5,220.0 189.9,189.9"></polygon>
                <polygon className="ring" points="220.0,135.0 280.1,159.9 305.0,220.0 280.1,280.1 220.0,305.0 159.9,280.1 135.0,220.0 159.9,159.9"></polygon>
                <polygon className="ring" points="220.0,92.5 310.2,129.8 347.5,220.0 310.2,310.2 220.0,347.5 129.8,310.2 92.5,220.0 129.8,129.8"></polygon>
                <polygon className="ring" points="220.0,50.0 340.2,99.8 390.0,220.0 340.2,340.2 220.0,390.0 99.8,340.2 50.0,220.0 99.8,99.8"></polygon>
                <line className="axis" x1="220" y1="220" x2="220" y2="50"></line>
                <line className="axis" x1="220" y1="220" x2="340.2" y2="99.8"></line>
                <line className="axis" x1="220" y1="220" x2="390" y2="220"></line>
                <line className="axis" x1="220" y1="220" x2="340.2" y2="340.2"></line>
                <line className="axis" x1="220" y1="220" x2="220" y2="390"></line>
                <line className="axis" x1="220" y1="220" x2="99.8" y2="340.2"></line>
                <line className="axis" x1="220" y1="220" x2="50" y2="220"></line>
                <line className="axis" x1="220" y1="220" x2="99.8" y2="99.8"></line>
                <polygon className="them" points="220.0,114.6 280.1,159.9 350.9,220.0 292.1,292.1 220.0,342.4 143.1,296.9 148.6,220.0 128.6,128.6"></polygon>
                <polygon className="you" points="220.0,94.2 289.7,150.3 359.4,220.0 277.7,277.7 220.0,332.2 134.7,305.3 126.5,220.0 144.3,144.3"></polygon>
                <text className="lbl mid" x="220" y="30">KOMMUNIKATION</text>
                <text className="lbl" x="352" y="86">VERSÖHNUNG</text>
                <text className="lbl" x="400" y="224">VERACHTUNG</text>
                <text className="lbl" x="352" y="364">FREUNDSCHAFT</text>
                <text className="lbl mid" x="220" y="414">RESPEKT</text>
                <text className="lbl end" x="90" y="364">VERTRAUEN</text>
                <text className="lbl end" x="40" y="224">HALT</text>
                <text className="lbl end" x="90" y="86">VISION</text>
              </svg>
              <div className="legend"><span>Du</span><span>Dein:e Partner:in</span></div>
            </div>
            <ol className="dims">
              {dims.map(([k, h, p]) => (
                <li key={k}><span className="k">{k}</span><div><h3>{h}</h3><p>{p}</p></div></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* MUSTER */}
      <section className="ink sec" id="patterns" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Sieben Muster. <span className="it">Welches seid ihr?</span></h2>
            <p className="lede">Jedes Ergebnis benennt die Dynamik, in der ihr steckt – denn ein Muster, das du benennen kannst, ist ein Muster, das du verändern kannst.</p>
          </div>
        </div>
        <div className="rail">
          {patterns.map((p) => (
            <Link className="pcard" href={`/de/patterns/${p.slug}`} key={p.n}>
              <div className={`art ${p.cls}`} aria-hidden="true">{p.art}</div>
              <div className="pbody">
                <span className="mono">Muster {p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="more">Mehr lesen {ARROW}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MEHR KOSTENLOSE QUIZZE */}
      <section className="paper sec" id="quizzes" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Mehr kostenlose <span className="it">Quizze.</span></h2>
            <p className="lede">Schnelle, private Zwei-Minuten-Quizze zu konkreten Fragen. Jedes endet mit dem Weg zum vollständigen Test.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {deQuizzes.map((qz) => (
              <Link key={qz.href} href={qz.href} style={{ textDecoration: "none", color: "var(--text)", border: "1px solid var(--line-light)", borderRadius: 24, padding: "1.5rem", background: "var(--paper)", display: "block" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 26, lineHeight: 1.1, marginBottom: 8 }}>{qz.title}</h3>
                <p style={{ color: "var(--text-2)", fontSize: 15, lineHeight: 1.6 }}>{qz.blurb}</p>
                <span className="mono" style={{ display: "inline-block", marginTop: 12, color: "var(--violet-deep)" }}>Zum Quiz →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPEKTRUM */}
      <section className="paper sec">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Wo <span className="it">landest du?</span></h2>
            <p className="lede">Dein Beziehungs-Score reicht von 0 bis 100 und ordnet dich einem von fünf Bereichen zu – jeder mit eigener Bedeutung und eigenen nächsten Schritten.</p>
          </div>
          <div className="spectrum reveal">
            <div className="spec-bar" aria-hidden="true"><span className="spec-marker" data-label="Beispiel: 58"></span></div>
            <div className="spec-labels">
              <div><span className="mono">0–29</span><h3>Kritischer Punkt</h3><p>Ernste Belastung. Muster, die sich aufschaukeln – und wo Unterstützung am meisten hilft.</p></div>
              <div><span className="mono">30–49</span><h3>Bruchlinie</h3><p>Mehrere deutliche Muster, die man bald angehen sollte.</p></div>
              <div><span className="mono">50–64</span><h3>Gelbe Zone</h3><p>Echte Stärken, echte Risiken. Kleine Veränderungen zählen hier am meisten.</p></div>
              <div><span className="mono">65–79</span><h3>Stabiles Fundament</h3><p>Im Kern gesund, mit ein paar Dingen, die man im Blick behalten sollte.</p></div>
              <div><span className="mono">80–100</span><h3>Fester Boden</h3><p>Starke Schutzfaktoren. Mach weiter, was funktioniert.</p></div>
            </div>
          </div>
          <div className="note"><span><strong>Kein Rätselraten.</strong> Dein Score wird aus deinen Antworten nach einer festen, veröffentlichten Methode berechnet – nicht von einer KI erfunden.</span><span><strong>Eine Perspektive.</strong> Er spiegelt, wie du die Dinge siehst. Dein:e Partner:in sieht sie vielleicht anders.</span></div>
        </div>
      </section>

      {/* ANGEBOT */}
      <section className="paper sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Kostenlos starten. <span className="it">Tiefer gehen,</span> wenn du willst.</h2>
          </div>
          <div className="offer">
            <div className="tier reveal">
              <span className="mono">Kostenloses Ergebnis</span>
              <p className="price">0 $</p>
              <ul>
                <li>{CHECK}<span>Dein Beziehungs-Score und dein Bereich</span></li>
                <li>{CHECK}<span>Dein Beziehungsmuster</span></li>
                <li>{CHECK}<span>Deine größte Stärke</span></li>
                <li>{CHECK}<span>Dein größtes Risiko</span></li>
              </ul>
              <Link className="btn btn-dark" href="/de/relationship-test">Kostenlosen Test starten</Link>
            </div>
            <div className="tier full reveal">
              <span className="mono">Vollständiger Bericht</span>
              <p className="price">4,99 $<small>einmalig</small></p>
              <ul>
                <li>{CHECK}<span>Alles aus dem kostenlosen Ergebnis</span></li>
                <li>{CHECK}<span>Alle acht Dimensionen, für dich erklärt</span></li>
                <li>{CHECK}<span>Warum dein größtes Risiko entsteht</span></li>
                <li>{CHECK}<span>Drei konkrete nächste Schritte für dein Muster</span></li>
                <li>{CHECK}<span>Ein privater Link zu deinem vollständigen Bericht</span></li>
              </ul>
              <Link className="btn btn-light" href="/de/relationship-test">Mit dem kostenlosen Test starten</Link>
            </div>
          </div>
        </div>
      </section>

      {/* GEMEINSAM */}
      <section className="ink sec">
        <div className="wrap together">
          <div className="venn reveal" aria-hidden="true">
            <span className="c c1"></span><span className="c c2"></span>
            <span className="tag t1">Du</span><span className="tag t2">Ihr</span><span className="tag t3">wir</span>
          </div>
          <div className="reveal">
            <span className="soon mono">Jetzt verfügbar</span>
            <h2 className="h2" style={{ marginTop: 24 }}>Getrennt machen. <span className="it grad">Privat</span> vergleichen.</h2>
            <p className="lede" style={{ marginTop: 24, maxWidth: 460 }}>Du und dein:e Partner:in antwortet jeweils für sich. CoupleIQ zeigt, wo ihr die Dinge gleich seht und wo nicht. Nur eure Scores werden geteilt, nie eure Antworten – und nur, wenn ihr beide zustimmt.</p>
            <Link href="/de/relationship-test" className="btn btn-light" style={{ marginTop: 32 }}>Test machen, dann Partner:in einladen</Link>
          </div>
        </div>
      </section>

      {/* EHRLICH + SICHERHEIT */}
      <section className="paper sec">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Was das ist – und <span className="it">was nicht.</span></h2>
          </div>
          <div className="honest">
            <div className="col reveal">
              <h3>Das ist es</h3>
              <ul>
                <li><strong>Eine strukturierte Selbstreflexion</strong>, die dir hilft, Muster zu sehen, die du vielleicht schon spürst.</li>
                <li><strong>Verankert in Forschungsthemen</strong> wie den vier Reitern, Versöhnungsversuchen und Bindung.</li>
                <li><strong>Ein Ausgangspunkt</strong> für ein Gespräch mit deiner Partnerin oder deinem Partner oder einer Fachperson.</li>
              </ul>
            </div>
            <div className="col isnt reveal">
              <h3>Das ist es nicht</h3>
              <ul>
                <li><strong>Keine Diagnose und keine Vorhersage.</strong> Kein Quiz kann dir sagen, ob ihr euch trennen werdet.</li>
                <li><strong>Keine Therapie.</strong> Es ersetzt keine qualifizierte Paartherapie.</li>
                <li><strong>Kein Urteil über deine:n Partner:in.</strong> Es ist eine Perspektive: deine.</li>
              </ul>
            </div>
          </div>
          <div className="safety reveal">
            <p>Wenn du Angst vor deiner Partnerin oder deinem Partner hast oder dich zu Hause nicht sicher fühlst, ist ein Quiz gerade nicht das, was du brauchst. Vertrauliche Hilfe ist verfügbar.</p>
            <Link href="/de/support-resources">Finde Hilfe in deiner Nähe →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="paper sec" style={{ paddingTop: 0 }}>
        <div className="wrap faq">
          <div className="reveal"><h2 className="h2">Fragen, <span className="it">beantwortet.</span></h2></div>
          <div>
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* FINALER CTA */}
      <section className="final">
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" aria-hidden="true">
          <path className="fa" d="M-20 60 C 300 60, 480 200, 720 210"></path>
          <path className="fb" d="M-20 360 C 300 360, 480 220, 720 210"></path>
          <path className="fc" d="M720 210 C 960 200, 1180 210, 1460 210"></path>
        </svg>
        <div className="wrap">
          <p className="mono" style={{ color: "var(--on-dark-2)", position: "relative" }}>Fünf Minuten · Kostenlos · Privat</p>
          <h2 style={{ marginTop: 24 }}>Die Frage hat<br />gewartet. <span className="it grad">Stell sie.</span></h2>
          <div className="ctas" style={{ marginTop: 44 }}><Link className="btn btn-light" href="/de/relationship-test">Kostenlosen Beziehungstest starten {ARROW}</Link></div>
        </div>
      </section>

      <SiteFooter locale="de" />
    </div>
  );
}
