/**
 * The list of mini-quizzes, used to cross-link them from the homepage and from
 * each quiz landing page (discoverability + internal linking for SEO).
 */
export interface QuizLink {
  href: string;
  title: string;
  blurb: string;
}

export const MINI_QUIZZES: QuizLink[] = [
  { href: "/should-i-break-up-quiz", title: "Should I break up?", blurb: "A gut-check for when you're not sure whether to stay." },
  { href: "/four-horsemen-quiz", title: "The Four Horsemen quiz", blurb: "Which of Gottman's conflict habits shows up most for you." },
  { href: "/attachment-style-quiz", title: "Attachment style quiz", blurb: "Secure, anxious, avoidant or fearful-avoidant?" },
  { href: "/is-my-relationship-toxic-quiz", title: "Is my relationship toxic?", blurb: "The real warning signs, honestly — with a safety note." },
  { href: "/relationship-compatibility-test", title: "Compatibility test", blurb: "For newer couples: where you align and where you differ." },
];

// German cross-links for the /de quiz landing pages (Phase 7).
import type { Locale } from "@/lib/i18n/config";

export const MINI_QUIZ_LINKS_DE: QuizLink[] = [
  { href: "/de/should-i-break-up-quiz", title: "Soll ich mich trennen?", blurb: "Ein Bauchgefühl-Check, wenn du unsicher bist, ob du bleiben sollst." },
  { href: "/de/four-horsemen-quiz", title: "Der Test zu den vier Reitern", blurb: "Welche von Gottmans Konfliktgewohnheiten bei dir am meisten auftaucht." },
  { href: "/de/attachment-style-quiz", title: "Bindungstyp-Test", blurb: "Sicher, ängstlich, vermeidend oder ängstlich-vermeidend?" },
  { href: "/de/is-my-relationship-toxic-quiz", title: "Ist meine Beziehung toxisch?", blurb: "Die echten Warnzeichen, ehrlich – mit einem Sicherheitshinweis." },
  { href: "/de/relationship-compatibility-test", title: "Kompatibilitätstest", blurb: "Für neuere Paare: wo ihr übereinstimmt und wo nicht." },
];

export function getMiniQuizLinks(locale: Locale): QuizLink[] {
  return locale === "de" ? MINI_QUIZ_LINKS_DE : MINI_QUIZZES;
}
