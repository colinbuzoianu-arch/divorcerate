import type { Locale } from "@/lib/i18n/config";

/**
 * Dictionary for the shared UI chrome (Phase 7): header, footer, language
 * switcher and consent banner. Page/content copy lives with each section.
 * German is meaning-first and uses informal "du".
 */

export interface UIDict {
  nav: {
    brandAria: string;
    howItWorks: string;
    patterns: string;
    method: string;
    journal: string;
    takeTest: string;
  };
  footer: {
    tagline: string;
    testsHeading: string;
    learnHeading: string;
    companyHeading: string;
    links: {
      relationshipTest: string;
      shouldIBreakUp: string;
      fourHorsemen: string;
      attachmentStyle: string;
      toxic: string;
      compatibility: string;
      patterns: string;
      methodology: string;
      journal: string;
      support: string;
      privacy: string;
      contact: string;
    };
    rights: string; // "{year}" is replaced at render
    disclaimer: string;
  };
  consent: {
    message: string;
    privacyPolicy: string; // the linked words inside the message
    accept: string;
    decline: string;
  };
  switcher: {
    aria: string;
  };
}

export const ui: Record<Locale, UIDict> = {
  en: {
    nav: {
      brandAria: "CoupleIQ home",
      howItWorks: "How it works",
      patterns: "Patterns",
      method: "Method",
      journal: "Journal",
      takeTest: "Take the test",
    },
    footer: {
      tagline: "An honest, private look at your relationship, at splitornot.com.",
      testsHeading: "Tests",
      learnHeading: "Learn",
      companyHeading: "Company",
      links: {
        relationshipTest: "Relationship test",
        shouldIBreakUp: "Should I break up?",
        fourHorsemen: "Four Horsemen quiz",
        attachmentStyle: "Attachment style quiz",
        toxic: "Is my relationship toxic?",
        compatibility: "Compatibility test",
        patterns: "Relationship patterns",
        methodology: "Methodology",
        journal: "Journal",
        support: "Support resources",
        privacy: "Privacy & terms",
        contact: "Contact",
      },
      rights: "© {year} CoupleIQ · splitornot.com · Operated by Verumsell SRL",
      disclaimer: "For self-reflection only. Not a substitute for professional help.",
    },
    consent: {
      message:
        "We use analytics and advertising cookies to understand how the site is used. They stay off until you accept. See our {privacy}.",
      privacyPolicy: "privacy policy",
      accept: "Accept",
      decline: "Decline",
    },
    switcher: { aria: "Change language" },
  },
  de: {
    nav: {
      brandAria: "CoupleIQ Startseite",
      howItWorks: "So funktioniert's",
      patterns: "Muster",
      method: "Methode",
      journal: "Journal",
      takeTest: "Test starten",
    },
    footer: {
      tagline: "Ein ehrlicher, privater Blick auf deine Beziehung – auf splitornot.com.",
      testsHeading: "Tests",
      learnHeading: "Wissen",
      companyHeading: "Unternehmen",
      links: {
        relationshipTest: "Beziehungstest",
        shouldIBreakUp: "Soll ich mich trennen?",
        fourHorsemen: "Die vier Reiter – Test",
        attachmentStyle: "Bindungstyp-Test",
        toxic: "Ist meine Beziehung toxisch?",
        compatibility: "Kompatibilitätstest",
        patterns: "Beziehungsmuster",
        methodology: "Methodik",
        journal: "Journal",
        support: "Hilfe & Beratung",
        privacy: "Datenschutz & AGB",
        contact: "Kontakt",
      },
      rights: "© {year} CoupleIQ · splitornot.com · Betrieben von Verumsell SRL",
      disclaimer: "Nur zur Selbstreflexion. Kein Ersatz für professionelle Hilfe.",
    },
    consent: {
      message:
        "Wir verwenden Analyse- und Werbe-Cookies, um zu verstehen, wie die Seite genutzt wird. Sie bleiben aus, bis du zustimmst. Mehr in unserer {privacy}.",
      privacyPolicy: "Datenschutzerklärung",
      accept: "Akzeptieren",
      decline: "Ablehnen",
    },
    switcher: { aria: "Sprache wechseln" },
  },
};

export function getUI(locale: Locale): UIDict {
  return ui[locale];
}
