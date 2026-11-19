import type { Metadata } from "next";
import Link from "next/link";
import SetHtmlLang from "@/components/SetHtmlLang";

export const metadata: Metadata = {
  title: "Hilfsangebote: Gewalt, Krise und häusliche Gewalt | CoupleIQ",
  description:
    "Kostenlose, vertrauliche Hotlines und Krisenangebote für alle, die sich in ihrer Beziehung unsicher, bedroht oder in einer Krise fühlen. Angebote für Deutschland, Österreich und die Schweiz plus internationale Verzeichnisse.",
  alternates: {
    canonical: "https://splitornot.com/de/support-resources",
    languages: { en: "https://splitornot.com/support-resources", de: "https://splitornot.com/de/support-resources", "x-default": "https://splitornot.com/support-resources" },
  },
};

const sectionStyle = { background: "#fff", borderRadius: 16, border: "1px solid #efefed", padding: "1.5rem" } as const;
const h2Style = { fontSize: 18, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: 10 } as const;
const liStyle = { fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 8 } as const;
const linkStyle = { color: "#4B3FB0", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 } as const;

export default function SupportResourcesPageDe() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <SetHtmlLang lang="de" />
      <div style={{ width: "100%", maxWidth: 680 }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <Link href="/de" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src="/logo.png" alt="CoupleIQ" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
              Couple<span style={{ color: "#4B3FB0" }}>IQ</span>
            </span>
          </Link>
          <Link href="/de" style={{ fontSize: 13, color: "#999", textDecoration: "none" }}>← Startseite</Link>
        </div>

        <div style={{ ...sectionStyle, background: "#fff6f2", border: "1px solid #f0c9b8", marginBottom: "1rem" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#8a2b12", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 10 }}>
            Deine Sicherheit geht vor
          </h1>
          <p style={{ fontSize: 15, color: "#6b4433", lineHeight: 1.7, margin: 0 }}>
            Wenn du Angst vor deinem:r Partner:in hast, dich kontrolliert oder zu Hause nicht sicher fühlst, ist ein
            Quiz gerade nicht das, was du brauchst. Die Angebote unten sind kostenlos und vertraulich und existieren
            genau dafür. <strong>Wenn du in unmittelbarer Gefahr bist, wähle jetzt den Notruf 112.</strong>
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <section style={sectionStyle}>
            <h2 style={h2Style}>Häusliche Gewalt</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={liStyle}><strong>Deutschland:</strong> Hilfetelefon „Gewalt gegen Frauen\" – <strong>116 016</strong>, rund um die Uhr, kostenlos und in vielen Sprachen (<a href="https://www.hilfetelefon.de" target="_blank" rel="noopener noreferrer" style={linkStyle}>hilfetelefon.de</a>). Für Männer: Hilfetelefon „Gewalt an Männern\" – 0800 123 9900.</li>
              <li style={liStyle}><strong>Österreich:</strong> Frauenhelpline gegen Gewalt – <strong>0800 222 555</strong>, rund um die Uhr (<a href="https://www.frauenhelpline.at" target="_blank" rel="noopener noreferrer" style={linkStyle}>frauenhelpline.at</a>).</li>
              <li style={{ ...liStyle, marginBottom: 0 }}><strong>Schweiz:</strong> Opferhilfe – rufe <strong>143</strong> (Die Dargebotene Hand) oder finde eine Beratungsstelle über <a href="https://www.opferhilfe-schweiz.ch" target="_blank" rel="noopener noreferrer" style={linkStyle}>opferhilfe-schweiz.ch</a>.</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>Krise und seelische Not</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={liStyle}><strong>Deutschland:</strong> Telefonseelsorge – <strong>0800 111 0 111</strong> oder <strong>0800 111 0 222</strong>, rund um die Uhr, kostenlos und anonym (<a href="https://www.telefonseelsorge.de" target="_blank" rel="noopener noreferrer" style={linkStyle}>telefonseelsorge.de</a>).</li>
              <li style={liStyle}><strong>Österreich:</strong> Telefonseelsorge – <strong>142</strong>, rund um die Uhr.</li>
              <li style={liStyle}><strong>Schweiz:</strong> Die Dargebotene Hand – <strong>143</strong>, rund um die Uhr.</li>
              <li style={{ ...liStyle, marginBottom: 0 }}><strong>Europaweit:</strong> Notruf <strong>112</strong>; in vielen Ländern auch 116 123.</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>Hilfe in deinem Land finden</h2>
            <p style={liStyle}>
              <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>findahelpline.com</a>{" "}
              listet kostenlose, vertrauliche Hotlines für die meisten Länder – für Gewalt, Krise und psychische Gesundheit.
            </p>
            <p style={{ ...liStyle, marginBottom: 0 }}>
              <a href="https://www.befrienders.org" target="_blank" rel="noopener noreferrer" style={linkStyle}>befrienders.org</a>{" "}
              listet emotionale Unterstützung und Krisenzentren weltweit.
            </p>
          </section>

          <p style={{ fontSize: 12, color: "#999", lineHeight: 1.7, textAlign: "center", marginTop: "0.5rem" }}>
            CoupleIQ ist ein Werkzeug zur Selbstreflexion, kein Krisen- oder Beratungsdienst. Wir überwachen keine
            Eingaben und können nicht auf Notfälle reagieren. Rufnummern können sich ändern – bitte bestätige die
            Angaben auf der Website der jeweiligen Organisation.
          </p>
        </div>
      </div>
    </main>
  );
}
