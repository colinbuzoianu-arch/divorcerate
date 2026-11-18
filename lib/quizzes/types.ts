/**
 * Config-driven mini-quiz engine (Phase 4.1). Mini-quizzes are lightweight
 * acquisition tools: scored deterministically in the browser with NO AI call
 * and NO server storage, and they always end with a CTA to the full
 * assessment. Add a new mini-quiz by dropping a config file here and a thin
 * page that renders <MiniQuiz config={...}/>.
 */

export interface MiniOption {
  label: string;
  points: number;
}

export interface MiniQuestion {
  id: string;
  question: string;
  options: MiniOption[];
}

export interface MiniBand {
  /** Inclusive lower bound as a percentage of max score (0–100). */
  min: number;
  title: string;
  blurb: string;
}

export interface MiniQuiz {
  slug: string;
  title: string;
  /** Short line under the title inside the quiz card. */
  intro: string;
  questions: MiniQuestion[];
  /** Bands sorted ascending by `min`; the result uses the highest band whose min ≤ score%. */
  bands: MiniBand[];
  /** Shown above the "take the full test" CTA on the result. */
  ctaLede: string;
  /** If true, the result shows a safety note (abuse/crisis topics). */
  safety?: boolean;
}

export interface MiniResult {
  percent: number; // 0–100
  band: MiniBand;
}

/** Deterministic scoring: sum points, normalise to 0–100, pick the band. */
export function scoreMiniQuiz(quiz: MiniQuiz, answers: Record<string, number>): MiniResult {
  const max = quiz.questions.reduce((acc, q) => acc + Math.max(...q.options.map((o) => o.points)), 0);
  const sum = quiz.questions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
  const percent = max > 0 ? Math.round((sum / max) * 100) : 0;
  const sorted = [...quiz.bands].sort((a, b) => a.min - b.min);
  let band = sorted[0];
  for (const b of sorted) if (percent >= b.min) band = b;
  return { percent, band };
}
