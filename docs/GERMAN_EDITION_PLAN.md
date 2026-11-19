# Phase 7 — German edition (de)

Goal: a full German version of the site, meaning-first (not word-for-word),
with a language switch on every page. Tone: **informal "du"** throughout.

## Architecture
- **English stays at `/`** (unchanged URLs). **German lives at `/de/…`** as real,
  separately-indexable pages.
- Routes are served from a single `app/[locale]/…` tree. A root `middleware.ts`
  keeps the default locale (en) **unprefixed**: requests without a `/de` prefix
  are internally rewritten to `/en/…` (URL stays clean), `/de/…` is served as-is.
- `[locale]/layout.tsx` sets `<html lang>` per locale (static per segment, so
  both locales still prerender).
- **Auto-detect + redirect:** a visitor with no `NEXT_LOCALE` cookie whose
  `Accept-Language` prefers German is redirected from an English URL to its
  `/de` counterpart. The manual switcher sets the cookie, which then wins — no
  more auto-redirects against an explicit choice. Redirect only targets paths
  that have a German version (no 404s).
- **hreflang:** every page emits `alternates.languages` (en + de + x-default)
  and both locales appear in the sitemap. Result/compare/success stay noindex.

## Translation surfaces (all keyed by locale)
1. **UI chrome** — header, footer, language switcher, consent banner. (dict: `lib/i18n/ui.ts`)
2. **Marketing pages** — home, methodology, support-resources, legal.
3. **The quiz engine** — 15 main questions + 5 mini-quizzes (questions, options,
   result copy) in `lib/questions.ts` / `lib/quizzes/*`.
4. **Scoring output** — bands, dimension labels, patterns (`lib/scoring.ts`,
   `lib/patterns.ts`) + the pattern explainer pages.
5. **AI analysis** — the free headline and paid narrative prompts
   (`lib/prompt.ts`) get a German persona + instruction set, so the model writes
   natively in German for `/de` results (not a translation of English output).
6. **Transactional** — the result email (`app/api/email-capture`), PDF
   (`lib/pdf`), Stripe success/cancel copy.
7. **Blog** — 9 posts in `content/posts/de/*.md` (immediate follow-up).

## Delivery order (each a shippable step on this branch)
1. **Foundation** — locale config, UI dict, language switcher, localized chrome,
   middleware, hreflang + sitemap/robots. *(done first; English unaffected)*
2. **`[locale]` restructure** + German **home**.
3. Main **relationship-test** flow: questions → analyze → result → paywall →
   success → email → PDF, incl. German AI prompts.
4. **Patterns** (7) + methodology.
5. **Mini-quizzes** (5).
6. **legal** + **support-resources** (safety copy reviewed especially carefully).
7. **Blog** (9 posts).
8. QA pass: hreflang, switcher on every page, redirect behaviour, build/lint/tests.

## Safety / rules carried over
- Safety resources are never gated, hidden or contradicted — German crisis
  contacts must be German-appropriate (EU/DE helplines), reviewed in step 6.
- No accuracy/clinical claims; honest tone preserved in translation.
- Everything lands on `phase-7-german` for preview review before `main`.
