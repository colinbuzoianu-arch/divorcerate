/**
 * Funnel analytics — a typed `track(event, params)` wrapper around gtag (GA4).
 *
 * Phase 0, task 0.3 of docs/RESTRUCTURE_PLAN.md.
 *
 * Event names are deliberately route-agnostic so they keep making sense after:
 *   - Phase 2  (the new server-rendered homepage + the /relationship-test route), and
 *   - Phase 4  (a config-driven quiz engine with several quiz slugs).
 * That is why the quiz events carry an optional `quiz` slug instead of being named
 * after the current homepage flow. Today everything is the main assessment
 * (`MAIN_QUIZ`); mini-quizzes will pass their own slug.
 *
 * gtag itself is set up in app/layout.tsx. This module never loads it and never
 * throws: if gtag is not present the call is a no-op. Consent Mode v2 (Phase 1.5)
 * will gate whether gtag actually transmits; this wrapper does not need to change
 * for that.
 */

declare global {
  interface Window {
    // Defined by the inline gtag bootstrap in app/layout.tsx. Variadic so it
    // also covers gtag('consent', …) and gtag('config', …) calls elsewhere.
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** The slug for the main 15-question assessment. Phase 4 mini-quizzes pass their own. */
export const MAIN_QUIZ = "relationship-test";

/** Payload shape for each funnel event. Keep these in sync with the plan's event list. */
export interface AnalyticsEvents {
  /** User begins answering the quiz. */
  quiz_start: { quiz?: string };
  /** A quiz step was completed. `step_index` is 0-based. */
  quiz_step_complete: { step_index: number; step_id?: string; quiz?: string };
  /** All answers submitted (analysis requested). */
  quiz_complete: { quiz?: string };
  /** The result screen is shown. */
  result_view: { band?: string; pattern?: string; paid?: boolean };
  /** The paywall / locked full report is shown. */
  paywall_view: { band?: string };
  /** User clicked unlock and we are starting Stripe Checkout. */
  checkout_start: { value?: number; currency?: string };
  /** A payment was verified as successful. Fire once per completed purchase. */
  purchase: { transaction_id?: string; value?: number; currency?: string };
  /** User clicked a share control. */
  share_click: { method?: string; surface?: string };
  /** User submitted their email (result email / notify form). */
  email_submit: { source?: string };
  /** A call-to-action inside an article was clicked. `source` is the article slug. */
  article_cta_click: { source: string };
}

export type AnalyticsEvent = keyof AnalyticsEvents;

/**
 * Send a funnel event to GA4. Safe to call during SSR (no-op) and safe if gtag
 * has not loaded yet or the user has not consented (no-op, never throws).
 */
export function track<E extends AnalyticsEvent>(event: E, params: AnalyticsEvents[E]): void;
export function track(event: AnalyticsEvent, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params ?? {});
    }
  } catch {
    // Analytics must never break the product.
  }
}
