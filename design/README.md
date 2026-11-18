# CoupleIQ landing page: design handoff

`landing.html` is the approved visual direction for the new homepage. It is one self-contained file. Open it in a browser to see the design. It is a **reference** and is not meant to be shipped as-is.

## Design system (carry these into the Next.js build)
- **Concept:** two people, two threads. Violet is one partner and ember is the other. Where they overlap, they blend to blush. Every visual (hero particles, pattern art, radar, Venn, final CTA) follows this idea.
- **Colours:** ink `#0C0A14` / `#14101E`, paper `#F3EEE6`, violet `#8B7CFF` (deep `#4B3FB0` for text on paper), ember `#FF9466` (deep `#B4461C`), blush `#F6C1CF`. All colours are CSS variables in `:root`.
- **Type:** Instrument Serif for display (the italic is used for emphasis), Geist for body text, and Geist Mono for uppercase labels. Load them with `next/font/google`.
- **Rhythm:** dark (ink) and light (paper) sections alternate. The radius scale is 24, 28 and 32 px plus pill buttons, with a grain overlay on top.

## How to implement (Phase 2 of docs/RESTRUCTURE_PLAN.md)
1. Port the CSS to `app/styles/landing.css` or CSS modules, keeping the variable names. Drop the old inline-style landing code.
2. The homepage `app/page.tsx` is a **server component** with every section in server-rendered HTML. The only client islands are:
   - `components/landing/HeroThreads.tsx`, the `<canvas>` particle animation (port `cqThreads()` from `landing.html` into a `useEffect`, keep the cleanup, and respect `prefers-reduced-motion`);
   - `components/landing/NotifyForm.tsx`, the "coming soon" email form, wired to `/api/email-capture` with an explicit consent checkbox (Phase 5).
3. The FAQ uses native `<details>` and needs no JS. Scroll reveals use CSS `animation-timeline: view()` and degrade to static where unsupported.
4. Every call to action links to `/relationship-test`. The quiz no longer lives on the homepage.
5. Links to pages that don't exist yet (`/patterns/*`, `/methodology`, `/support-resources`, `/about`, the mini-quizzes) must either be built in the same phase or temporarily removed. **Don't ship dead links.**

## Copy that depends on other phases (do not ship ahead of them)
- "Your score is computed … by a fixed, published method" and "Same answers, same score" require **Phase 3** (deterministic scoring plus the /methodology page).
- The 0–100 **Health Score** and its bands require **Phase 3** (the current app shows a divorce-risk % instead).
- "A private link and a downloadable PDF" in the full report requires **Phase 1.2** (server-side results) and **Phase 6.3** (PDF).
- The "Compare privately" section stays marked *Coming soon* until **Phase 6.2**.
- "Find support near you" requires the `/support-resources` page from **Phase 1.4**.

## Accessibility checks to keep
Real `<a>` and `<button>` elements, 44 px or larger touch targets, decorative SVG marked `aria-hidden`, the radar with `role="img"` and a label, text contrast of 4.5:1 or better on both ink and paper, and all motion turned off under `prefers-reduced-motion`.
