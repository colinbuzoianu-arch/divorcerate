import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support resources: abuse, crisis and domestic violence help | CoupleIQ",
  description:
    "Free, confidential helplines and crisis resources for anyone who feels unsafe, afraid or in crisis in their relationship. International directory plus examples by country.",
  alternates: { canonical: "https://splitornot.com/support-resources" },
};

const sectionStyle = { background: "#fff", borderRadius: 16, border: "1px solid #efefed", padding: "1.5rem" } as const;
const h2Style = { fontSize: 18, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: 10 } as const;
const liStyle = { fontSize: 14, color: "#444", lineHeight: 1.7, marginBottom: 8 } as const;
const linkStyle = { color: "#4B3FB0", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 } as const;

export default function SupportResourcesPage() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <div style={{ width: "100%", maxWidth: 680 }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src="/logo.png" alt="CoupleIQ" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
              Couple<span style={{ color: "#4B3FB0" }}>IQ</span>
            </span>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: "#999", textDecoration: "none" }}>← Home</Link>
        </div>

        <div style={{ ...sectionStyle, background: "#fff6f2", border: "1px solid #f0c9b8", marginBottom: "1rem" }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#8a2b12", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 10 }}>
            Your safety comes first
          </h1>
          <p style={{ fontSize: 15, color: "#6b4433", lineHeight: 1.7, margin: 0 }}>
            If you feel afraid of your partner, controlled, or unsafe at home, a quiz is not what you
            need right now. The services below are free and confidential, and they exist for exactly
            this. <strong>If you are in immediate danger, contact your local emergency number now.</strong>
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <section style={sectionStyle}>
            <h2 style={h2Style}>Find help in your country</h2>
            <p style={liStyle}>
              <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>findahelpline.com</a>{" "}
              lists free, confidential helplines for most countries, for abuse, crisis and mental health.
            </p>
            <p style={{ ...liStyle, marginBottom: 0 }}>
              <a href="https://www.befrienders.org" target="_blank" rel="noopener noreferrer" style={linkStyle}>befrienders.org</a>{" "}
              lists emotional-support and crisis centres worldwide.
            </p>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>Domestic abuse</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={liStyle}><strong>United States:</strong> National Domestic Violence Hotline — call 1-800-799-7233, or text START to 88788 (<a href="https://www.thehotline.org" target="_blank" rel="noopener noreferrer" style={linkStyle}>thehotline.org</a>).</li>
              <li style={liStyle}><strong>United Kingdom:</strong> Refuge National Domestic Abuse Helpline — 0808 2000 247 (<a href="https://www.nationaldahelpline.org.uk" target="_blank" rel="noopener noreferrer" style={linkStyle}>nationaldahelpline.org.uk</a>).</li>
              <li style={liStyle}><strong>Canada:</strong> find a local service via <a href="https://www.sheltersafe.ca" target="_blank" rel="noopener noreferrer" style={linkStyle}>sheltersafe.ca</a>.</li>
              <li style={liStyle}><strong>Australia:</strong> 1800RESPECT — 1800 737 732 (<a href="https://www.1800respect.org.au" target="_blank" rel="noopener noreferrer" style={linkStyle}>1800respect.org.au</a>).</li>
              <li style={{ ...liStyle, marginBottom: 0 }}><strong>Ireland:</strong> Women&apos;s Aid — 1800 341 900 (<a href="https://www.womensaid.ie" target="_blank" rel="noopener noreferrer" style={linkStyle}>womensaid.ie</a>).</li>
            </ul>
          </section>

          <section style={sectionStyle}>
            <h2 style={h2Style}>Crisis and suicide support</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={liStyle}><strong>United States:</strong> call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline).</li>
              <li style={liStyle}><strong>United Kingdom &amp; Ireland:</strong> Samaritans — 116 123.</li>
              <li style={liStyle}><strong>Canada:</strong> call or text <strong>988</strong>.</li>
              <li style={liStyle}><strong>Europe:</strong> emergency number <strong>112</strong>; many countries also have 116 123.</li>
              <li style={{ ...liStyle, marginBottom: 0 }}>Elsewhere: see <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>findahelpline.com</a>.</li>
            </ul>
          </section>

          <p style={{ fontSize: 12, color: "#999", lineHeight: 1.7, textAlign: "center", marginTop: "0.5rem" }}>
            CoupleIQ is a self-reflection tool, not a crisis or counselling service. We don&apos;t monitor
            submissions and can&apos;t respond to emergencies. Phone numbers can change — please confirm
            details with the organisation&apos;s own website.
          </p>
        </div>
      </div>
    </main>
  );
}
