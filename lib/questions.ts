import type { Locale } from "@/lib/i18n/config";

export type QuestionType = "options" | "range" | "textarea";

/** An answer option. `value` is the canonical (English) token the scoring
 *  engine matches on and is stored; `label` is what the user sees. For English
 *  they are identical; German keeps `value` and translates `label`. */
export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  label: string;
  sub?: string;
  type: QuestionType;
  options?: Option[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  default?: number;
}

export interface Step {
  title: string;
  questions: Question[];
}

const opt = (values: string[]): Option[] => values.map((v) => ({ value: v, label: v }));

/** English (canonical) steps. Option `value`s here are what scoring matches. */
const EN_STEPS: Step[] = [
  {
    title: "About your relationship",
    questions: [
      { id: "duration", label: "How long have you been together?", type: "options", options: opt(["Less than 1 year", "1–3 years", "3–7 years", "7–15 years", "More than 15 years"]) },
      { id: "married", label: "What is your current relationship status?", type: "options", options: opt(["Dating / living together", "Engaged", "Married (under 5 years)", "Married (5–15 years)", "Married (over 15 years)"]) },
      { id: "children", label: "Do you have or plan to have children together?", type: "options", options: opt(["No children, no plans", "No children, planning to", "Have children together", "Blended family"]) },
    ],
  },
  {
    title: "Communication & conflict",
    questions: [
      { id: "conflict_style", label: "When you disagree, how does it typically go?", sub: "Think of the last real disagreement you had, not your best-case scenario.", type: "options", options: opt(["We talk it through calmly and reach an understanding", "One of us goes quiet and avoids the topic", "It escalates into arguments, then we cool down", "We criticize or blame each other harshly", "We rarely disagree on anything significant"]) },
      { id: "contempt", label: "During arguments, do either of you use sarcasm, eye-rolling, or dismissive language?", sub: "Contempt is one of the most-studied warning signs in relationship research. Answer honestly — the more candid you are, the more useful your result.", type: "options", options: opt(["Never", "Rarely", "Sometimes", "Often", "Almost always"]) },
      { id: "repair", label: "After an argument, how quickly do you reconnect?", sub: "How you recover matters more than how often you fight.", type: "options", options: opt(["Within hours — we apologize and move on", "Within a day or two", "It takes a week or more", "We often never fully resolve it", "We don't really argue"]) },
    ],
  },
  {
    title: "Emotional connection",
    questions: [
      { id: "intimacy", label: "How satisfied are you with the emotional intimacy in your relationship?", sub: "Emotional intimacy means feeling truly known — not just coexisting.", type: "range", min: 1, max: 10, minLabel: "Very unsatisfied", maxLabel: "Very satisfied", default: 6 },
      { id: "respect", label: "How much do you feel genuinely respected by your partner?", sub: "Not tolerated — respected. There's a difference worth sitting with.", type: "range", min: 1, max: 10, minLabel: "Not at all", maxLabel: "Completely", default: 7 },
      { id: "friendship", label: "Would you describe your partner as your close friend?", sub: "Gottman research shows this is one of the strongest predictors of long-term relationship health.", type: "options", options: opt(["Yes, absolutely", "Mostly yes", "Somewhat", "Not really", "No"]) },
    ],
  },
  {
    title: "External stressors",
    questions: [
      { id: "finances", label: "How often does money cause tension between you?", sub: "Financial conflict is the most commonly cited cause of relationship breakdown. No judgment here.", type: "options", options: opt(["Rarely or never", "Occasionally", "Regularly", "It's a major source of conflict"]) },
      { id: "external_stress", label: "Are there significant external stressors in your lives right now?", sub: "Job pressure, health issues, family conflict — external stress often shows up as relationship strain.", type: "options", options: opt(["None significant", "Minor stress", "Moderate stress", "Major ongoing stress"]) },
      { id: "support", label: "Do you feel your partner supports you through life's challenges?", type: "options", options: opt(["Always", "Usually", "Sometimes", "Rarely", "Never"]) },
    ],
  },
  {
    title: "Trust & shared future",
    questions: [
      { id: "trust", label: "How much do you trust your partner?", sub: "Trust includes reliability, honesty, and feeling emotionally safe — not just fidelity.", type: "range", min: 1, max: 10, minLabel: "No trust", maxLabel: "Complete trust", default: 7 },
      { id: "alignment", label: "Do you share similar values, life goals, and visions for the future?", sub: "Couples who feel aligned today but haven't discussed the big questions often discover gaps later.", type: "options", options: opt(["Very aligned", "Mostly aligned", "Somewhat aligned", "Often misaligned", "Very different visions"]) },
      { id: "extra", label: "Is there anything specific you want the analysis to consider?", sub: "Optional — if something important is happening (infidelity, therapy, a big life change), mention it here so your result can take it into account.", type: "textarea" },
    ],
  },
];

/** Back-compat export: the English steps (used by existing English pages). */
export const steps: Step[] = EN_STEPS;

/* ─── German translation ────────────────────────────────────────────────
 * Keyed by question id. `options` maps each canonical English VALUE to its
 * German label; values are never translated (scoring depends on them).        */

const DE_STEP_TITLES: Record<number, string> = {
  0: "Über eure Beziehung",
  1: "Kommunikation & Konflikt",
  2: "Emotionale Verbindung",
  3: "Äußere Belastungen",
  4: "Vertrauen & gemeinsame Zukunft",
};

interface DeQuestion { label: string; sub?: string; options?: Record<string, string>; minLabel?: string; maxLabel?: string }

const DE: Record<string, DeQuestion> = {
  duration: { label: "Wie lange seid ihr schon zusammen?", options: { "Less than 1 year": "Weniger als 1 Jahr", "1–3 years": "1–3 Jahre", "3–7 years": "3–7 Jahre", "7–15 years": "7–15 Jahre", "More than 15 years": "Mehr als 15 Jahre" } },
  married: { label: "Was ist euer aktueller Beziehungsstatus?", options: { "Dating / living together": "Zusammen / zusammenlebend", "Engaged": "Verlobt", "Married (under 5 years)": "Verheiratet (unter 5 Jahre)", "Married (5–15 years)": "Verheiratet (5–15 Jahre)", "Married (over 15 years)": "Verheiratet (über 15 Jahre)" } },
  children: { label: "Habt ihr gemeinsame Kinder oder plant ihr welche?", options: { "No children, no plans": "Keine Kinder, nicht geplant", "No children, planning to": "Keine Kinder, aber geplant", "Have children together": "Gemeinsame Kinder", "Blended family": "Patchworkfamilie" } },
  conflict_style: {
    label: "Wenn ihr uneinig seid – wie läuft das meistens ab?",
    sub: "Denk an euren letzten echten Streit, nicht an den Idealfall.",
    options: { "We talk it through calmly and reach an understanding": "Wir reden ruhig darüber und finden eine Lösung", "One of us goes quiet and avoids the topic": "Eine:r wird still und meidet das Thema", "It escalates into arguments, then we cool down": "Es eskaliert zu Streit, dann beruhigen wir uns wieder", "We criticize or blame each other harshly": "Wir kritisieren oder beschuldigen uns heftig", "We rarely disagree on anything significant": "Wir sind uns bei Wichtigem selten uneinig" },
  },
  contempt: {
    label: "Benutzt ihr in Streit Sarkasmus, Augenrollen oder abwertende Sprache?",
    sub: "Verachtung ist eines der am besten untersuchten Warnzeichen in der Beziehungsforschung. Antworte ehrlich – je offener du bist, desto nützlicher ist dein Ergebnis.",
    options: { "Never": "Nie", "Rarely": "Selten", "Sometimes": "Manchmal", "Often": "Oft", "Almost always": "Fast immer" },
  },
  repair: {
    label: "Wie schnell versöhnt ihr euch nach einem Streit?",
    sub: "Wie ihr euch erholt, zählt mehr als wie oft ihr streitet.",
    options: { "Within hours — we apologize and move on": "Innerhalb von Stunden – wir entschuldigen uns und machen weiter", "Within a day or two": "Innerhalb von ein, zwei Tagen", "It takes a week or more": "Es dauert eine Woche oder länger", "We often never fully resolve it": "Oft klären wir es nie ganz", "We don't really argue": "Wir streiten eigentlich nicht" },
  },
  intimacy: { label: "Wie zufrieden bist du mit der emotionalen Nähe in eurer Beziehung?", sub: "Emotionale Nähe heißt, sich wirklich gekannt zu fühlen – nicht nur nebeneinanderher zu leben.", minLabel: "Sehr unzufrieden", maxLabel: "Sehr zufrieden" },
  respect: { label: "Wie sehr fühlst du dich von deinem:r Partner:in wirklich respektiert?", sub: "Nicht geduldet – respektiert. Der Unterschied lohnt einen Moment Nachdenken.", minLabel: "Überhaupt nicht", maxLabel: "Vollkommen" },
  friendship: { label: "Würdest du deine:n Partner:in als enge:n Freund:in bezeichnen?", sub: "Die Gottman-Forschung zeigt: Das ist einer der stärksten Prädiktoren für langfristige Beziehungsgesundheit.", options: { "Yes, absolutely": "Ja, absolut", "Mostly yes": "Größtenteils ja", "Somewhat": "Teilweise", "Not really": "Eher nicht", "No": "Nein" } },
  finances: { label: "Wie oft sorgt Geld für Spannungen zwischen euch?", sub: "Finanzielle Konflikte sind der am häufigsten genannte Grund für Beziehungskrisen. Kein Urteil hier.", options: { "Rarely or never": "Selten oder nie", "Occasionally": "Gelegentlich", "Regularly": "Regelmäßig", "It's a major source of conflict": "Es ist eine große Konfliktquelle" } },
  external_stress: { label: "Gibt es gerade bedeutende äußere Belastungen in eurem Leben?", sub: "Jobdruck, Gesundheit, Familienkonflikte – äußerer Stress zeigt sich oft als Belastung der Beziehung.", options: { "None significant": "Keine nennenswerten", "Minor stress": "Geringer Stress", "Moderate stress": "Mäßiger Stress", "Major ongoing stress": "Starker anhaltender Stress" } },
  support: { label: "Fühlst du dich von deinem:r Partner:in bei den Herausforderungen des Lebens unterstützt?", options: { "Always": "Immer", "Usually": "Meistens", "Sometimes": "Manchmal", "Rarely": "Selten", "Never": "Nie" } },
  trust: { label: "Wie sehr vertraust du deinem:r Partner:in?", sub: "Vertrauen umfasst Verlässlichkeit, Ehrlichkeit und emotionale Sicherheit – nicht nur Treue.", minLabel: "Kein Vertrauen", maxLabel: "Volles Vertrauen" },
  alignment: { label: "Teilt ihr ähnliche Werte, Lebensziele und Zukunftsvorstellungen?", sub: "Paare, die sich heute einig fühlen, aber die großen Fragen nie besprochen haben, entdecken später oft Lücken.", options: { "Very aligned": "Sehr einig", "Mostly aligned": "Größtenteils einig", "Somewhat aligned": "Teilweise einig", "Often misaligned": "Oft uneinig", "Very different visions": "Sehr unterschiedliche Vorstellungen" } },
  extra: { label: "Gibt es etwas Bestimmtes, das die Analyse berücksichtigen soll?", sub: "Optional – wenn etwas Wichtiges passiert (Untreue, Therapie, eine große Veränderung), erwähne es hier, damit dein Ergebnis es einbeziehen kann." },
};

/** Localized quiz steps. English option VALUES are preserved so scoring is
 *  identical regardless of locale; only displayed text changes. */
export function getSteps(locale: Locale): Step[] {
  if (locale === "en") return EN_STEPS;
  return EN_STEPS.map((step, i) => ({
    title: DE_STEP_TITLES[i] ?? step.title,
    questions: step.questions.map((q) => {
      const t = DE[q.id];
      if (!t) return q;
      return {
        ...q,
        label: t.label ?? q.label,
        sub: t.sub ?? q.sub,
        minLabel: t.minLabel ?? q.minLabel,
        maxLabel: t.maxLabel ?? q.maxLabel,
        options: q.options ? q.options.map((o) => ({ value: o.value, label: t.options?.[o.value] ?? o.label })) : undefined,
      };
    }),
  }));
}
