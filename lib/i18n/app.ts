import type { Locale } from "@/lib/i18n/config";

/**
 * UI strings for the interactive test → result → payment flow (Phase 7).
 * German is meaning-first, informal "du". Placeholders like {risk}, {score},
 * {band}, {n}, {i} are substituted at render time.
 */

export interface AppDict {
  testPage: { title: string; subtitle: string; home: string; compareBanner: string; compareScores: string; disclaimerPre: string; supportLink: string };
  start: { titleL1: string; titleL2: string; subtitle: string; tags: string[]; cta: string; note: string };
  step: { stepOf: string; back: string; continue: string; getResults: string; goBackTo: string; of10: string; textareaPlaceholder: string };
  loading: { messages: string[]; est1: string; est2: string; est3: string; reassurance: string };
  errorRetry: string;
  result: {
    healthEyebrow: string; outOf: string; eightDimensions: string; yourPattern: string; readMore: string;
    biggestStrength: string; focusArea: string; dimensionsExplained: string; whyFocus: string; whatToDoNext: string;
    preparingTitle: string; preparingBody: string; almostTitle: string; almostBody: string; refresh: string;
    pdf: string; bookmarkTitle: string; bookmarkBody: string; takeAgain: string;
    paywallBlurb: string; paywallBadge: string; paywallItems: string[]; paywallButton: string;
    checkoutOpening: string; checkoutError: string;
    shareIdle: string; shareGenerating: string; shareCopied: string; shareShared: string;
    shareCardLabel: string; shareCardScore: string; shareText: string;
  };
  email: {
    eyebrow: string; title: string; blurb: string; placeholder: string; reminder: string; button: string; sending: string;
    privacy: string; successTitle: string; successBody: string; successReminder: string; invalid: string; failed: string;
  };
  feedback: { question: string; yes: string; no: string; thanks: string; optional: string; commentPlaceholder: string; consent: string; send: string; done: string };
  safety: {
    title: string; body: string; findHelpline: string; findHelplineLink: string; region: string;
    more: string; immediate: string;
  };
  success: { verifyingTitle: string; verifyingBody: string; confirmedTitle: string; confirmedBody: string; questions: string; stillTitle: string; stillBodyWithId: string; stillBodyNoId: string; openReport: string; backHome: string };
}

export const app: Record<Locale, AppDict> = {
  en: {
    testPage: {
      title: "The relationship test",
      subtitle: "Fifteen questions about how you talk, fight, repair and trust. Private, no account, about 5 minutes. Answer honestly — the more candid you are, the more useful your result.",
      home: "← Home",
      compareBanner: "Your partner invited you to compare. Taking this shares only your eight dimension {scores} with them — never your answers or anything you type.",
      compareScores: "scores",
      disclaimerPre: "For self-reflection only — not a diagnosis or a substitute for professional help. If you feel unsafe, see ",
      supportLink: "support resources",
    },
    start: {
      titleL1: "The honest assessment",
      titleL2: "couples avoid",
      subtitle: "15 questions. AI analysis built on 40 years of relationship science. Most people are surprised by what they find out.",
      tags: ["Gottman method", "Attachment theory", "Communication patterns", "Conflict resolution", "~5 minutes"],
      cta: "Find out where we stand",
      note: "Private · takes 5 minutes · no account needed",
    },
    step: { stepOf: "Step {i} of {n}", back: "Back", continue: "Continue", getResults: "Get my results", goBackTo: "Go back to step {i}", of10: "/ 10", textareaPlaceholder: "Optional — leave blank if nothing specific" },
    loading: {
      messages: ["Analyzing your communication patterns…", "Weighing risk and protective factors…", "Applying relationship science models…", "Generating your personalized insights…"],
      est1: "Usually takes 15–20 seconds…", est2: "Almost there…", est3: "Taking a little longer than usual, hang tight…",
      reassurance: "We're applying 40 years of relationship research to your specific answers.",
    },
    errorRetry: "Try again",
    result: {
      healthEyebrow: "Relationship health", outOf: "/ 100 health score", eightDimensions: "Eight dimensions", yourPattern: "Your relationship pattern", readMore: "Read more about your pattern →",
      biggestStrength: "Biggest strength", focusArea: "Focus area", dimensionsExplained: "Your dimensions, explained", whyFocus: "Why {risk} is your focus area", whatToDoNext: "What to do next",
      preparingTitle: "Preparing your full report…", preparingBody: "Writing up your eight dimensions and next steps. This takes a few seconds — please don't close the page.",
      almostTitle: "Almost there", almostBody: "We couldn't finish generating your report just now. Refresh to try again — your payment is safe and your result is saved.", refresh: "Refresh",
      pdf: "Download your report (PDF)", bookmarkTitle: "Save your result", bookmarkBody: "Bookmark this page to return to your result. It stays at this private link for 30 days, then is automatically deleted.", takeAgain: "Take the test again",
      paywallBlurb: "Your {risk} score points to a pattern that tends to compound quietly over time. The full report explains exactly what is driving it and the specific steps that help most for your pattern…",
      paywallBadge: "🔒 Full report",
      paywallItems: ["All eight dimensions, explained for you", "Why {risk} is your focus area", "Three specific next steps for your pattern", "A private link to your full report"],
      paywallButton: "Unlock the full report — $4.99",
      checkoutOpening: "Opening checkout…", checkoutError: "Could not start checkout. Please try again.",
      shareIdle: "Share my result", shareGenerating: "Generating card…", shareCopied: "Image saved · Link copied!", shareShared: "Shared!",
      shareCardLabel: "MY RELATIONSHIP HEALTH", shareCardScore: "/ 100 health score", shareText: "I got '{band}' on CoupleIQ — a free, private relationship test.",
    },
    email: {
      eyebrow: "Keep your result", title: "Email me my results", blurb: "Get a copy of your result in your inbox so you can come back to it.",
      placeholder: "your@email.com", reminder: "Also remind me to re-check my relationship in 4 weeks (optional — unsubscribe anytime).", button: "Email me my results", sending: "Sending…",
      privacy: "We store only your email and your choice. No spam.", successTitle: "Sent — check your inbox", successBody: "Your result is on its way.", successReminder: " We'll also nudge you to re-check in about four weeks — unsubscribe anytime.",
      invalid: "Please enter a valid email.", failed: "Something went wrong.",
    },
    feedback: { question: "Was this useful?", yes: "👍 Yes", no: "👎 Not really", thanks: "Thanks. Anything you'd add?", optional: "(optional)", commentPlaceholder: "What was helpful, or what was missing?", consent: "You can share my comment anonymously as a testimonial.", send: "Send feedback", done: "Thanks — your feedback helps us make this better." },
    safety: {
      title: "Your safety comes first",
      body: "Some of your answers suggest you may not feel safe or respected right now. If you ever feel afraid of your partner, controlled, or unsafe at home, a quiz is not what you need — talking to someone trained to help is. Support is free and confidential.",
      findHelpline: "Find a helpline in your country:", findHelplineLink: "findahelpline.com",
      region: "US: Domestic Violence Hotline 1-800-799-7233 (or text START to 88788) · Call or text 988 for crisis support. UK: Refuge 0808 2000 247 · EU: call 112 in an emergency.",
      more: "See more support resources →", immediate: "If you are in immediate danger, contact your local emergency number now.",
    },
    success: { verifyingTitle: "Confirming your payment…", verifyingBody: "This usually takes a few seconds.", confirmedTitle: "Payment confirmed!", confirmedBody: "Taking you to your full report…", questions: "Questions?", stillTitle: "Still processing", stillBodyWithId: "Your payment may still be confirming. Open your report below — if it's still locked, give it a minute and refresh.", stillBodyNoId: "We couldn't find your result reference. If you were charged, email us at ", openReport: "Open my report", backHome: "Back to home" },
  },
  de: {
    testPage: {
      title: "Der Beziehungstest",
      subtitle: "Fünfzehn Fragen dazu, wie ihr redet, streitet, euch versöhnt und vertraut. Privat, kein Konto, etwa 5 Minuten. Antworte ehrlich – je offener du bist, desto nützlicher ist dein Ergebnis.",
      home: "← Startseite",
      compareBanner: "Dein:e Partner:in hat dich zum Vergleich eingeladen. Wenn du teilnimmst, werden nur deine acht Dimensions-{scores} geteilt – nie deine Antworten oder etwas, das du schreibst.",
      compareScores: "Scores",
      disclaimerPre: "Nur zur Selbstreflexion – keine Diagnose und kein Ersatz für professionelle Hilfe. Wenn du dich nicht sicher fühlst, siehe ",
      supportLink: "Hilfsangebote",
    },
    start: {
      titleL1: "Die ehrliche Einschätzung,",
      titleL2: "der Paare ausweichen",
      subtitle: "15 Fragen. KI-Analyse auf Basis von 40 Jahren Beziehungsforschung. Die meisten überrascht, was dabei herauskommt.",
      tags: ["Gottman-Methode", "Bindungstheorie", "Kommunikationsmuster", "Konfliktlösung", "~5 Minuten"],
      cta: "Herausfinden, wo wir stehen",
      note: "Privat · dauert 5 Minuten · kein Konto nötig",
    },
    step: { stepOf: "Schritt {i} von {n}", back: "Zurück", continue: "Weiter", getResults: "Ergebnis anzeigen", goBackTo: "Zurück zu Schritt {i}", of10: "/ 10", textareaPlaceholder: "Optional – leer lassen, wenn nichts Bestimmtes" },
    loading: {
      messages: ["Wir analysieren eure Kommunikationsmuster…", "Wir wägen Risiko- und Schutzfaktoren ab…", "Wir wenden Modelle der Beziehungsforschung an…", "Wir erstellen deine persönlichen Erkenntnisse…"],
      est1: "Dauert meist 15–20 Sekunden…", est2: "Fast geschafft…", est3: "Dauert etwas länger als sonst, einen Moment noch…",
      reassurance: "Wir wenden 40 Jahre Beziehungsforschung auf deine konkreten Antworten an.",
    },
    errorRetry: "Erneut versuchen",
    result: {
      healthEyebrow: "Beziehungsgesundheit", outOf: "/ 100 Beziehungs-Score", eightDimensions: "Acht Dimensionen", yourPattern: "Dein Beziehungsmuster", readMore: "Mehr über dein Muster lesen →",
      biggestStrength: "Größte Stärke", focusArea: "Fokusbereich", dimensionsExplained: "Deine Dimensionen, erklärt", whyFocus: "Warum {risk} dein Fokusbereich ist", whatToDoNext: "Was als Nächstes zu tun ist",
      preparingTitle: "Dein vollständiger Bericht wird vorbereitet…", preparingBody: "Wir schreiben deine acht Dimensionen und nächsten Schritte aus. Das dauert ein paar Sekunden – bitte schließe die Seite nicht.",
      almostTitle: "Fast fertig", almostBody: "Wir konnten deinen Bericht gerade nicht fertigstellen. Lade neu, um es erneut zu versuchen – deine Zahlung ist sicher und dein Ergebnis gespeichert.", refresh: "Neu laden",
      pdf: "Bericht herunterladen (PDF)", bookmarkTitle: "Sichere dein Ergebnis", bookmarkBody: "Setze ein Lesezeichen auf diese Seite, um zu deinem Ergebnis zurückzukehren. Es bleibt 30 Tage unter diesem privaten Link und wird dann automatisch gelöscht.", takeAgain: "Test erneut machen",
      paywallBlurb: "Dein Wert bei {risk} deutet auf ein Muster hin, das sich mit der Zeit leise aufschaukelt. Der vollständige Bericht erklärt genau, was dahintersteckt, und die konkreten Schritte, die für dein Muster am meisten helfen…",
      paywallBadge: "🔒 Vollständiger Bericht",
      paywallItems: ["Alle acht Dimensionen, für dich erklärt", "Warum {risk} dein Fokusbereich ist", "Drei konkrete nächste Schritte für dein Muster", "Ein privater Link zu deinem vollständigen Bericht"],
      paywallButton: "Vollständigen Bericht freischalten – 4,99 $",
      checkoutOpening: "Kasse wird geöffnet…", checkoutError: "Die Kasse konnte nicht gestartet werden. Bitte versuch es erneut.",
      shareIdle: "Mein Ergebnis teilen", shareGenerating: "Karte wird erstellt…", shareCopied: "Bild gespeichert · Link kopiert!", shareShared: "Geteilt!",
      shareCardLabel: "MEINE BEZIEHUNGSGESUNDHEIT", shareCardScore: "/ 100 Beziehungs-Score", shareText: "Mein CoupleIQ-Ergebnis: '{band}' – ein kostenloser, privater Beziehungstest.",
    },
    email: {
      eyebrow: "Ergebnis sichern", title: "Ergebnis per E-Mail schicken", blurb: "Erhalte eine Kopie deines Ergebnisses in deinem Postfach, damit du später darauf zurückkommen kannst.",
      placeholder: "deine@email.de", reminder: "Erinnere mich in 4 Wochen daran, meine Beziehung erneut zu prüfen (optional – jederzeit abbestellbar).", button: "Ergebnis per E-Mail schicken", sending: "Wird gesendet…",
      privacy: "Wir speichern nur deine E-Mail und deine Wahl. Kein Spam.", successTitle: "Gesendet – schau in dein Postfach", successBody: "Dein Ergebnis ist unterwegs.", successReminder: " Wir erinnern dich außerdem in etwa vier Wochen – jederzeit abbestellbar.",
      invalid: "Bitte gib eine gültige E-Mail-Adresse ein.", failed: "Etwas ist schiefgelaufen.",
    },
    feedback: { question: "War das hilfreich?", yes: "👍 Ja", no: "👎 Nicht wirklich", thanks: "Danke. Möchtest du etwas ergänzen?", optional: "(optional)", commentPlaceholder: "Was war hilfreich, oder was hat gefehlt?", consent: "Ihr dürft meinen Kommentar anonym als Erfahrungsbericht verwenden.", send: "Feedback senden", done: "Danke – dein Feedback hilft uns, das besser zu machen." },
    safety: {
      title: "Deine Sicherheit geht vor",
      body: "Einige deiner Antworten deuten darauf hin, dass du dich gerade vielleicht nicht sicher oder respektiert fühlst. Wenn du jemals Angst vor deinem:r Partner:in hast, dich kontrolliert oder zu Hause nicht sicher fühlst, ist ein Quiz nicht das, was du brauchst – ein Gespräch mit jemandem, der helfen kann, schon. Unterstützung ist kostenlos und vertraulich.",
      findHelpline: "Finde eine Hotline in deinem Land:", findHelplineLink: "findahelpline.com",
      region: "Deutschland: Hilfetelefon „Gewalt gegen Frauen\" 116 016 (rund um die Uhr, kostenlos) · Telefonseelsorge 0800 111 0 111. Österreich: Frauenhelpline 0800 222 555. Schweiz: 143 (Die Dargebotene Hand). In der EU: im Notfall 112.",
      more: "Mehr Hilfsangebote ansehen →", immediate: "Wenn du in unmittelbarer Gefahr bist, wähle jetzt deinen örtlichen Notruf.",
    },
    success: { verifyingTitle: "Zahlung wird bestätigt…", verifyingBody: "Das dauert meist nur ein paar Sekunden.", confirmedTitle: "Zahlung bestätigt!", confirmedBody: "Wir bringen dich zu deinem vollständigen Bericht…", questions: "Fragen?", stillTitle: "Wird noch verarbeitet", stillBodyWithId: "Deine Zahlung wird vielleicht noch bestätigt. Öffne unten deinen Bericht – falls er noch gesperrt ist, warte eine Minute und lade neu.", stillBodyNoId: "Wir konnten deine Ergebnis-Referenz nicht finden. Falls dir etwas berechnet wurde, schreib uns an ", openReport: "Meinen Bericht öffnen", backHome: "Zur Startseite" },
  },
};

export function getApp(locale: Locale): AppDict {
  return app[locale];
}
