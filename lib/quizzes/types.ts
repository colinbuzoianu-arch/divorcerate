/**
 * Config-driven mini-quiz engine (Phase 4.1). Mini-quizzes are lightweight
 * acquisition tools: scored deterministically in the browser with NO AI call
 * and NO server storage, and they always end with a CTA to the full
 * assessment. Add a new mini-quiz by dropping a config file here and a thin
 * page that renders <MiniQuiz config={...}/>.
 *
 * Two modes:
 *  - "scale": each option carries points; the total maps to a band (0–100%).
 *  - "category": each option belongs to a category; the most-picked category
 *    is the result (e.g. attachment style, dominant "horseman").
 */

export interface MiniOption {
  label: string;
  points?: number; // scale mode
  category?: string; // category mode
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

export interface MiniCategory {
  key: string;
  title: string;
  blurb: string;
}

export interface MiniQuiz {
  slug: string;
  title: string;
  intro: string;
  questions: MiniQuestion[];
  mode: "scale" | "category";
  bands?: MiniBand[]; // scale mode
  categories?: MiniCategory[]; // category mode
  ctaLede: string;
  safety?: boolean;
}

export type MiniResult =
  | { mode: "scale"; percent: number; band: MiniBand }
  | { mode: "category"; category: MiniCategory };

/** Deterministic scoring. Answers hold points (scale) or category keys (category). */
export function scoreMiniQuiz(quiz: MiniQuiz, answers: Record<string, number | string>): MiniResult {
  if (quiz.mode === "category") {
    const tally: Record<string, number> = {};
    for (const q of quiz.questions) {
      const c = answers[q.id];
      if (typeof c === "string") tally[c] = (tally[c] ?? 0) + 1;
    }
    const cats = quiz.categories ?? [];
    // Highest tally; ties break by the category order in config (stable).
    let best = cats[0];
    let bestCount = -1;
    for (const cat of cats) {
      const count = tally[cat.key] ?? 0;
      if (count > bestCount) { best = cat; bestCount = count; }
    }
    return { mode: "category", category: best };
  }

  const max = quiz.questions.reduce((acc, q) => acc + Math.max(...q.options.map((o) => o.points ?? 0)), 0);
  const sum = quiz.questions.reduce((acc, q) => acc + (Number(answers[q.id]) || 0), 0);
  const percent = max > 0 ? Math.round((sum / max) * 100) : 0;
  const sorted = [...(quiz.bands ?? [])].sort((a, b) => a.min - b.min);
  let band = sorted[0];
  for (const b of sorted) if (percent >= b.min) band = b;
  return { mode: "scale", percent, band };
}
