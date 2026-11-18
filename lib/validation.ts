import { z } from "zod";
import { steps } from "@/lib/questions";
import type { Answers } from "@/lib/types";

/**
 * Input validation for /api/analyze (Phase 1.3).
 * - option answers must exactly match an allowed option,
 * - range answers must be integers within the question's min/max,
 * - the free-text `extra` is capped at 1000 chars with control characters stripped,
 * - unknown keys are rejected,
 * plus a basic bot check (honeypot + minimum time on the quiz).
 */

/** Minimum plausible time to answer 15 questions honestly. */
export const MIN_QUIZ_MS = 8000;

const EXTRA_MAX = 1000;

/** Strip C0/C1 control characters but keep tab, newline and carriage return. */
function stripControls(s: string): string {
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "");
}

function buildAnswersSchema() {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const step of steps) {
    for (const q of step.questions) {
      if (q.type === "options") {
        const opts = (q.options ?? []) as [string, ...string[]];
        shape[q.id] = z.enum(opts);
      } else if (q.type === "range") {
        const min = q.min ?? 1;
        const max = q.max ?? 10;
        shape[q.id] = z.coerce.number().int().min(min).max(max);
      } else {
        // textarea (e.g. `extra`) — optional free text.
        shape[q.id] = z
          .string()
          .max(EXTRA_MAX)
          .transform(stripControls)
          .optional();
      }
    }
  }
  return z.object(shape).strict();
}

export const answersSchema = buildAnswersSchema();

export const analyzeRequestSchema = z.object({
  answers: answersSchema,
  /** Honeypot: a hidden field real users never fill. */
  hp: z.string().optional(),
  /** Milliseconds spent on the quiz, measured client-side. */
  elapsedMs: z.number().nonnegative().optional(),
});

export type AnalyzeValidation =
  | { ok: true; answers: Answers }
  | { ok: false; status: 400 | 429; error: string };

/**
 * Validate the analyze request body. Returns typed answers on success, or a
 * status + message on failure. Never echoes the answers back (privacy rule 3).
 */
export function validateAnalyzeRequest(body: unknown): AnalyzeValidation {
  const parsed = analyzeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return { ok: false, status: 400, error: "Some answers were missing or invalid. Please retake the quiz." };
  }

  const { answers, hp, elapsedMs } = parsed.data;

  // Honeypot: if the hidden field was filled, it's a bot.
  if (hp && hp.trim().length > 0) {
    return { ok: false, status: 400, error: "Invalid submission." };
  }

  // Timing: an honest run can't be this fast. Only enforced when measured.
  if (typeof elapsedMs === "number" && elapsedMs < MIN_QUIZ_MS) {
    return { ok: false, status: 400, error: "That was too fast — please take the quiz and try again." };
  }

  return { ok: true, answers: answers as Answers };
}
