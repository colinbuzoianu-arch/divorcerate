import type { Metadata } from "next";
import Link from "next/link";
import SetHtmlLang from "@/components/SetHtmlLang";

export const metadata: Metadata = {
  title: "Datenschutzerklärung & AGB | CoupleIQ",
  description: "Datenschutzerklärung und Nutzungsbedingungen für CoupleIQ – den Beziehungs-Gesundheits-Analysator auf splitornot.com.",
  alternates: {
    canonical: "https://splitornot.com/de/legal",
    languages: { en: "https://splitornot.com/legal", de: "https://splitornot.com/de/legal", "x-default": "https://splitornot.com/legal" },
  },
};

const LAST_UPDATED = "18. November 2026";
const CONTACT = "support.coupleiq@gmail.com";
const PRIVACY_CONTACT = "contact@verumsell.com";
const OPERATOR = "Verumsell SRL";
const SITE = "splitornot.com";

export default function LegalPageDe() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <SetHtmlLang lang="de" />
      <div style={{ width: "100%", maxWidth: 680 }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <Link href="/de" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src="/logo.png" alt="CoupleIQ" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
              Couple<span style={{ color: "#4B3FB0" }}>IQ</span>
            </span>
          </Link>
          <Link href="/de" style={{ fontSize: 13, color: "#999", textDecoration: "none" }}>← Zurück zur Startseite</Link>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #efefed", padding: "2.5rem 2rem" }}>

          <p style={{ fontSize: 12, color: "#bbb", marginBottom: 8, fontWeight: 500 }}>Zuletzt aktualisiert: {LAST_UPDATED}</p>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
            Datenschutzerklärung & Nutzungsbedingungen
          </h1>
          <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #f5f5f3" }}>
            Dieses Dokument umfasst sowohl unsere Datenschutzerklärung als auch unsere Nutzungsbedingungen für <strong>CoupleIQ</strong>, erreichbar unter <strong>{SITE}</strong>. CoupleIQ wird von <strong>{OPERATOR}</strong> betrieben, dem Verantwortlichen im Sinne der DSGVO. Für Datenschutz- oder Auskunftsanfragen wende dich an <strong>{PRIVACY_CONTACT}</strong>. Mit der Nutzung von CoupleIQ stimmst du beiden Teilen unten zu.
          </p>

          <Section title="Datenschutzerklärung">
            <SubSection title="1. Welche Informationen wir erheben">
              <p>CoupleIQ ist darauf ausgelegt, so wenige Informationen wie möglich zu erheben.</p>
              <ul>
                <li><strong>Testantworten:</strong> Deine Antworten auf die 15 Fragen werden an unseren KI-Analysedienst (Anthropic) gesendet, um dein Ergebnis zu erstellen. Die Antworten selbst werden <strong>nicht</strong> auf unseren Servern gespeichert.</li>
                <li><strong>Dein erstelltes Ergebnis:</strong> Die erstellte Analyse wird bei unserem Speicheranbieter (Upstash Redis) unter einer zufälligen, nicht erratbaren ID gespeichert, damit sie die Weiterleitung nach der Zahlung übersteht und über ihren Link erneut geöffnet werden kann. Sie wird <strong>nach 30 Tagen automatisch gelöscht</strong> und ohne Namen oder Konto gespeichert.</li>
                <li><strong>Zahlungsinformationen:</strong> Wenn du den vollständigen Bericht kaufst, wird deine Zahlung von Stripe verarbeitet. Wir sehen oder speichern deine Kartendaten nie. Stripe kann Zahlungsdaten gemäß seiner eigenen Datenschutzerklärung speichern. Wir speichern einen kleinen Vermerk, der ein Ergebnis als bezahlt markiert (ebenfalls nach 30 Tagen gelöscht).</li>
                <li><strong>E-Mail-Adresse:</strong> Wenn du uns unter {CONTACT} schreibst, speichern wir deine E-Mail, um zu antworten. Wenn du dir dein Ergebnis per E-Mail schicken lässt (optional), wird deine E-Mail von unserem E-Mail-Anbieter (Resend) verarbeitet, um diese Nachricht zu senden und – nur wenn du ausdrücklich zustimmst – um Folge-E-Mails zu erhalten, die du jederzeit abbestellen kannst. Wir nehmen dich ohne deine ausdrückliche Einwilligung in keinen Verteiler auf.</li>
                <li><strong>Analyse &amp; Werbung:</strong> Mit deiner Einwilligung nutzen wir Google Analytics und das Google-Ads-Tag, um zu verstehen, wie die Seite genutzt wird, und um Werbung zu messen. Sie bleiben ausgeschaltet, bis du im Cookie-Banner zustimmst (siehe Cookies unten).</li>
                <li><strong>Optionales Feedback:</strong> Wenn du die Frage „War das hilfreich?\" beantwortest, speichern wir deine Antwort und einen optionalen Kommentar (sowie ob du einer anonymen Zitierung zugestimmt hast), um das Produkt zu verbessern. Es wird ohne deinen Namen gespeichert und nach 180 Tagen automatisch gelöscht.</li>
              </ul>
            </SubSection>

            <SubSection title="2. Wie wir deine Informationen verwenden">
              <ul>
                <li>Um deine Beziehungs-Gesundheitsanalyse zu erstellen</li>
                <li>Um Zahlungen für den vollständigen Bericht abzuwickeln</li>
                <li>Um auf Support-Anfragen zu antworten</li>
                <li>Um zu verstehen und zu verbessern, wie das Produkt genutzt wird (über anonymisierte Analyse)</li>
              </ul>
              <p>Wir verkaufen deine Daten nicht. Wir geben deine Daten nicht an Dritte weiter, außer an die zur Erbringung des Dienstes notwendigen Auftragsverarbeiter (Anthropic für die KI-Analyse, Upstash für die Ergebnisspeicherung, Stripe für Zahlungen, Resend für E-Mail und – mit deiner Einwilligung – Google für Analyse und Werbemessung).</p>
            </SubSection>

            <SubSection title="3. Cookies &amp; Einwilligung">
              <p>Wir verwenden Google Consent Mode v2. Bei deinem ersten Besuch sind Analyse- und Werbespeicherung standardmäßig auf <strong>abgelehnt</strong> gesetzt, und wir laden die Google-Analytics-/Google-Ads-Bibliothek gar nicht – es wird also keine Analyse- oder Werbeanfrage gestellt und kein solches Cookie gesetzt, bis du im Cookie-Banner „Akzeptieren\" wählst.</p>
              <p>Wenn du zustimmst, nutzen wir Google Analytics (um die Nutzung zu verstehen) und das Google-Ads-Tag (um Werbung zu messen), die Cookies setzen können. Wenn du ablehnst, bleiben sie aus. Du kannst deine Meinung ändern, indem du die Daten dieser Website in deinem Browser löschst, wodurch das Banner erneut erscheint. Die wesentlichen Funktionen arbeiten ohne diese Cookies.</p>
            </SubSection>

            <SubSection title="4. Deine Rechte (DSGVO & UK GDPR)">
              <p>Wenn du in der Europäischen Union oder im Vereinigten Königreich bist, hast du das Recht:</p>
              <ul>
                <li>Auf Auskunft über die zu dir gespeicherten personenbezogenen Daten</li>
                <li>Auf Berichtigung oder Löschung deiner Daten</li>
                <li>Der Verarbeitung deiner Daten zu widersprechen oder sie einzuschränken</li>
                <li>Auf Datenübertragbarkeit</li>
              </ul>
              <p>Da wir sehr wenige personenbezogene Daten speichern und nichts mit deiner Identität verknüpft ist, sind die meisten Anfragen unkompliziert zu erfüllen. Wende dich an unseren Verantwortlichen, {OPERATOR}, unter <strong>{PRIVACY_CONTACT}</strong>, und wir antworten innerhalb von 30 Tagen.</p>
            </SubSection>

            <SubSection title="5. Speicherdauer">
              <p>Testantworten werden nach der Erstellung deines Ergebnisses nicht aufbewahrt. Dein erstelltes Ergebnis und sein Bezahlt-Vermerk werden <strong>bis zu 30 Tage</strong> gespeichert und dann automatisch gelöscht. Zahlungsunterlagen werden von Stripe gemäß dessen Aufbewahrungsrichtlinie gespeichert. E-Mails, die du uns sendest, und E-Mails, die du abonnierst, werden aufbewahrt, bis du um Löschung bittest oder dich abmeldest. Analysedaten (nur mit deiner Einwilligung) werden gemäß den Einstellungen von Google Analytics aufbewahrt.</p>
            </SubSection>

            <SubSection title="6. Drittanbieter-Dienste">
              <ul>
                <li><strong>Anthropic</strong> – KI-Analyse. <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">Datenschutz von Anthropic</a></li>
                <li><strong>Upstash</strong> – temporäre Ergebnisspeicherung (Redis). <a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noopener noreferrer">Datenschutz von Upstash</a></li>
                <li><strong>Stripe</strong> – Zahlungsabwicklung. <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutz von Stripe</a></li>
                <li><strong>Resend</strong> – transaktionale und optionale E-Mail. <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutz von Resend</a></li>
                <li><strong>Google Analytics &amp; Google Ads</strong> – Nutzungsanalyse und Werbemessung, nur mit deiner Einwilligung geladen. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutz von Google</a></li>
                <li><strong>Vercel</strong> – Website-Hosting. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutz von Vercel</a></li>
              </ul>
            </SubSection>
          </Section>

          <Section title="Nutzungsbedingungen">
            <SubSection title="1. Annahme der Bedingungen">
              <p>Mit dem Zugriff auf oder der Nutzung von CoupleIQ unter {SITE} stimmst du diesen Bedingungen zu. Wenn du nicht zustimmst, nutze den Dienst bitte nicht.</p>
            </SubSection>

            <SubSection title="2. Was CoupleIQ ist – und was nicht">
              <p>CoupleIQ ist ein <strong>informatives Werkzeug</strong>, das Menschen hilft, über ihre Beziehungsmuster anhand forschungsbasierter Rahmen nachzudenken. Es ist <strong>nicht</strong>:</p>
              <ul>
                <li>Ein Ersatz für professionelle Paartherapie oder Beratung</li>
                <li>Eine klinische Diagnose oder medizinische Beratung</li>
                <li>Eine definitive Vorhersage von Beziehungsverläufen</li>
              </ul>
              <p>Ergebnisse beruhen auf selbst berichteten Antworten aus einer Perspektive und sollten als Ausgangspunkt zur Reflexion verstanden werden, nicht als Urteil.</p>
            </SubSection>

            <SubSection title="3. Zahlungen und Rückerstattungen">
              <p>Der vollständige Bericht ist für eine einmalige Zahlung von 4,99 $ erhältlich, sicher abgewickelt durch Stripe. Aufgrund der digitalen Natur des Produkts bieten wir keine Rückerstattung an, sobald der vollständige Bericht ausgeliefert wurde. Wenn ein technisches Problem auftrat und du deinen Bericht nicht erhalten hast, kontaktiere uns innerhalb von 7 Tagen unter <strong>{CONTACT}</strong>, und wir lösen es umgehend.</p>
            </SubSection>

            <SubSection title="4. Zulässige Nutzung">
              <p>Du stimmst zu, CoupleIQ nicht zu nutzen, um:</p>
              <ul>
                <li>Den Dienst zurückzuentwickeln, auszulesen (Scraping) oder zu kopieren</li>
                <li>Falsche oder irreführende Angaben zu machen, um Ergebnisse zu manipulieren</li>
                <li>Den Dienst für rechtswidrige Zwecke zu nutzen</li>
              </ul>
            </SubSection>

            <SubSection title="5. Geistiges Eigentum">
              <p>Alle Inhalte, das Design und der Code von CoupleIQ gehören uns oder sind an uns lizenziert. Du darfst sie ohne unsere schriftliche Erlaubnis nicht vervielfältigen, verbreiten oder abgeleitete Werke erstellen.</p>
            </SubSection>

            <SubSection title="6. Haftungsbeschränkung">
              <p>CoupleIQ wird „wie besehen\" ohne jegliche Gewährleistung bereitgestellt. Wir haften nicht für Entscheidungen, die auf Grundlage von CoupleIQ-Ergebnissen getroffen werden, oder für indirekte, zufällige oder Folgeschäden aus der Nutzung des Dienstes. Unsere Gesamthaftung für einen Anspruch übersteigt nicht den Betrag, den du für den Dienst gezahlt hast.</p>
            </SubSection>

            <SubSection title="7. Änderungen dieser Bedingungen">
              <p>Wir können dieses Dokument von Zeit zu Zeit aktualisieren. Das Datum oben auf dieser Seite gibt die jüngste Überarbeitung wieder. Die fortgesetzte Nutzung von CoupleIQ nach Änderungen gilt als Annahme der aktualisierten Bedingungen.</p>
            </SubSection>

            <SubSection title="8. Kontakt">
              <p>Bei Fragen zu diesem Dokument kontaktiere uns unter <strong>{CONTACT}</strong>. Wir bemühen uns, innerhalb von 48 Stunden zu antworten.</p>
            </SubSection>
          </Section>

        </div>

        <p style={{ marginTop: "1.5rem", fontSize: 12, color: "#ccc", textAlign: "center" }}>
          CoupleIQ · splitornot.com · {LAST_UPDATED}
        </p>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: "1.25rem", paddingTop: "1.5rem", borderTop: "1px solid #f5f5f3" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: "0.5rem" }}>{title}</h3>
      <div style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}
