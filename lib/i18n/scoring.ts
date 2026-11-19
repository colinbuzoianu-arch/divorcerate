import type { Locale } from "@/lib/i18n/config";
import type { Band, Pattern, DimensionKey } from "@/lib/scoring";
import type { ScoreView } from "@/lib/prompt";

/**
 * Localized display of the deterministic scoring output (Phase 7). The engine
 * computes and stores English canonical values (band, pattern, dimension
 * labels); these maps translate them for display. Scores, keys and slugs are
 * language-independent and never change.
 */

export const dimensionLabel: Record<Locale, Record<DimensionKey, string>> = {
  en: {
    communication: "Communication",
    conflictRepair: "Conflict & repair",
    contempt: "Contempt",
    friendship: "Friendship & intimacy",
    respect: "Respect",
    trust: "Trust",
    support: "Support & stress",
    vision: "Shared vision",
  },
  de: {
    communication: "Kommunikation",
    conflictRepair: "Konflikt & Versöhnung",
    contempt: "Verachtung",
    friendship: "Freundschaft & Nähe",
    respect: "Respekt",
    trust: "Vertrauen",
    support: "Unterstützung & Stress",
    vision: "Gemeinsame Vision",
  },
};

export const bandLabel: Record<Locale, Record<Band, string>> = {
  en: {
    "Critical Point": "Critical Point",
    "Fault Line": "Fault Line",
    "Amber Zone": "Amber Zone",
    "Stable Foundation": "Stable Foundation",
    "Solid Ground": "Solid Ground",
  },
  de: {
    "Critical Point": "Kritischer Punkt",
    "Fault Line": "Bruchlinie",
    "Amber Zone": "Gelbe Zone",
    "Stable Foundation": "Stabiles Fundament",
    "Solid Ground": "Fester Boden",
  },
};

export const bandBlurb: Record<Locale, Record<Band, string>> = {
  en: {
    "Critical Point": "Serious strain across several areas. This is where support tends to help most.",
    "Fault Line": "A few significant patterns worth addressing soon, before they compound.",
    "Amber Zone": "Real strengths and real risks. Small, deliberate changes matter most here.",
    "Stable Foundation": "Fundamentally sound, with a few things worth keeping an eye on.",
    "Solid Ground": "Strong protective factors. Keep investing in what's working.",
  },
  de: {
    "Critical Point": "Ernste Belastung in mehreren Bereichen. Hier hilft Unterstützung meist am meisten.",
    "Fault Line": "Ein paar deutliche Muster, die man bald angehen sollte, bevor sie sich aufschaukeln.",
    "Amber Zone": "Echte Stärken und echte Risiken. Kleine, bewusste Veränderungen zählen hier am meisten.",
    "Stable Foundation": "Im Kern gesund, mit ein paar Dingen, die man im Blick behalten sollte.",
    "Solid Ground": "Starke Schutzfaktoren. Investiere weiter in das, was funktioniert.",
  },
};

export const patternLabel: Record<Locale, Record<Pattern, string>> = {
  en: {
    "Validated Couple": "Validated Couple",
    "Volatile Couple": "Volatile Couple",
    "Conflict Avoiders": "Conflict Avoiders",
    "Pursuer–Withdrawer": "Pursuer–Withdrawer",
    "Drifting Couple": "Drifting Couple",
    "Crisis-Bonded": "Crisis-Bonded",
    "Hostile–Detached": "Hostile–Detached",
  },
  de: {
    "Validated Couple": "Validierendes Paar",
    "Volatile Couple": "Erregbares Paar",
    "Conflict Avoiders": "Konfliktvermeider",
    "Pursuer–Withdrawer": "Verfolger–Rückzieher",
    "Drifting Couple": "Driftendes Paar",
    "Crisis-Bonded": "Krisenverbunden",
    "Hostile–Detached": "Feindselig–distanziert",
  },
};

/** Translate a ScoreView's visible labels for the AI prompt / display. */
export function localizeScoreView(view: ScoreView, locale: Locale): ScoreView {
  const dl = dimensionLabel[locale];
  const tr = (key: string, fallback: string) => (key in dl ? dl[key as DimensionKey] : fallback);
  return {
    band: bandLabel[locale][view.band as Band] ?? view.band,
    pattern: patternLabel[locale][view.pattern as Pattern] ?? view.pattern,
    strength: { label: tr((view.strength as { key?: string }).key ?? "", view.strength.label) },
    risk: { label: tr((view.risk as { key?: string }).key ?? "", view.risk.label) },
    dimensions: view.dimensions.map((d) => ({ ...d, label: tr(d.key, d.label) })),
  };
}
