# splitornot.com: Restructure Plan (for Claude Code)

**Goal, in order of priority:** (1) organic traffic, (2) returning and sharing users, (3) revenue.
**Audience:** global English speakers first, with German as a later expansion (Phase 7).
**Positioning:** a private, transparent relationship self-assessment platform. The analyzer is the core product, surrounded by tools and content that feed it.

Each phase is its own branch and PR. Every task has acceptance criteria, and a task is done only when all of them pass and `npm run build` is green.

---

## Decisions

| # | Decision | Default (use unless Colin overrides) |
|---|----------|--------------------------------------|
| D1 | Brand name. The site currently mixes "CoupleIQ" (nav, title), "splitornot" (email, share text, footer), "relationship-health-analyzer" (package) and "divorcerate" (repo). | **CoupleIQ** is the product name everywhere, with "splitornot.com" used only as the domain. Before locking this, check Search Console for which brand term actually gets queries. |
| D2 | Server-side storage (needed for the paywall fix, result links and couple comparison) | **Upstash Redis via the Vercel Marketplace**, with a TTL on every key. Add Postgres only once accounts exist, which is not part of this plan. |
| D3 | Expert reviewer for questions, scoring and articles | Colin finds a licensed psychologist or couples therapist for a paid review. Until that happens, no page may say "reviewed by". |
| D4 | Paid report price | Keep $4.99 until funnel data exists, then test $6.99 in Phase 6. |

---

## Phase 0: Baseline (no user-visible changes)

**0.1 Make the build reproducible.**
- `app/api/email-capture/route.ts` imports `resend`, but `resend` is missing from `package.json`. Add it, commit a lockfile, and make sure `npm run build` and `npm run lint` pass.
- Add `.env.local.example`, which the README mentions but which does not exist.
- ✅ A clean clone followed by `npm ci && npm run build` succeeds.

**0.2 Confirm the homepage SSR problem.**
- `app/page.tsx` is a client component that calls `useSearchParams()` inside `<Suspense>` with no fallback. On a statically rendered route, Next 14 then renders everything up to that boundary **on the client only**, which likely means the landing copy is missing from the initial HTML.
- Check it with `curl -s https://splitornot.com | grep -c "relationship really stands"` (or the same against the output of `next build && next start`). Record the result in the PR.
- ✅ The finding is documented. The fix itself happens in Phase 2.

**0.3 Add funnel analytics.**
- Create `lib/analytics.ts` containing a typed `track(event, params)` wrapper around `gtag`.
- Fire these events: `quiz_start`, `quiz_step_complete` (with step index), `quiz_complete`, `result_view`, `paywall_view`, `checkout_start`, `purchase` (on verified success), `share_click`, `email_submit`, `article_cta_click` (with source slug).
- ✅ All events show up in GA4 DebugView. Colin marks `quiz_complete` and `purchase` as key events in GA4.

**0.4 Manual task for Colin (not Claude Code).** Export from Search Console the last 3 months of queries and pages, and from GA4 the landing pages and traffic channels. Save them as CSV files in `docs/data/`. Phase 4 page targets get adjusted against this data.

---

## Phase 1: Trust, integrity and security (blockers; ship before any growth work)

**1.1 Remove claims we cannot back up.**
- FAQ: delete the "93% accuracy predicting relationship outcomes" claim. Explain instead that the questions draw on well-known research themes (Gottman's Four Horsemen, repair attempts, friendship, attachment) and that the result is a structured self-reflection, not a validated prediction.
- Testimonials: remove the three named ones (Sarah M., James K., Priya & Dan) unless Colin confirms they are real and consented. Replace the section with "How people use it" (use cases, no fake people). Real testimonials can be collected later through a post-result feedback prompt (Phase 5).
- Remove the five-star rating graphics.
- Stats bar: either replace "1 in 3 people feel more lonely…" with a cited statistic or drop it.
- Footer: "No data stored" becomes accurate wording once Phase 1.2 ships, for example "Answers auto-deleted after 30 days".
- ✅ `grep -ri "93%\|accuracy" app components` shows no unsupported claims.

**1.2 Enforce the paywall on the server.**
Current problem: `/api/analyze` returns the **full** report to the browser. The paid sections are only blurred with CSS, so the content is visible in the DOM and devtools. On top of that, "paid" is just `localStorage.paid_<token>`, and `/success` sets it for whatever `token` appears in the URL, without checking it against the Stripe session metadata.
- `/api/analyze` generates the analysis, stores the **full result** in KV under a random `resultId` (crypto UUID, 30-day TTL), and returns **only the free fields** plus the `resultId`.
- Add a `/api/stripe/webhook` that handles `checkout.session.completed`, verifies the signature, and marks `paid:<resultId>` in KV.
- Add `GET /api/result/[id]`, which returns free fields only, or the full report when it is marked paid.
- Remove all `localStorage` paid logic. Rebuild `/success` so it polls `/api/result/[id]` until the payment is marked paid, then redirects to the result page.
- ✅ An unpaid result exposes no paid text anywhere in the network responses or the DOM. A paid result survives a refresh and opens on another device via its link.

**1.3 Protect `/api/analyze` (every call costs money).**
- Rate-limit by IP with `@upstash/ratelimit`, for example 5 per hour and 20 per day.
- Validate input with `zod` against `lib/questions.ts`: option answers must exactly match an allowed option, ranges must be integers from 1 to 10, and `extra` is capped at 1,000 characters with control characters stripped.
- Add a basic bot check, such as a honeypot field plus a minimum time spent on the quiz. If abuse continues, add Cloudflare Turnstile later.
- ✅ Invalid payloads return 400 and the 6th request in an hour returns 429.

**1.4 Add a safety layer (sensitive topic, YMYL).**
- Deterministic triggers: `respect` ≤ 2, `trust` ≤ 2, or keywords in `extra` (hit, afraid, scared of, threatens, controls my money, forced, kill myself, and similar).
- When a trigger fires, the result shows a **free, non-blurred** "Your safety comes first" block above everything else, with international resources (a link to a helpline directory, plus examples of national domestic-violence and crisis lines). The prompt also receives a `safetyFlag`, and the model must not recommend staying or "working on it" and must point to professional support.
- Also add a static `/support-resources` page and link to it from the footer.
- ✅ Unit tests cover the trigger logic, and a manual test with a sample "afraid of my partner" answer shows the block.

**1.5 Consent and legal accuracy (the operator is EU-based, so GDPR applies).**
- Add a cookie consent banner with **Google Consent Mode v2**. Analytics and Ads stay denied until the visitor accepts.
- Update `/legal` to match reality. The Ads tag is present, although the page currently says there are no advertising cookies. Also cover Resend email and contacts, KV storage with its TTL, Anthropic as a processor, and the operator legal entity and contact.
- ✅ Before consent, no GA or Ads requests appear in the network tab.

**1.6 Make the brand consistent (per D1).** Use one name across the nav, metadata, email template, share text, footer, package.json and README.

---

## Phase 2: Architecture split and technical SEO

**2.1 Split the homepage from the app.**
```
app/
  (marketing)/page.tsx            ← server component homepage, all copy in HTML
  relationship-test/page.tsx      ← server shell + <Analyzer/> client island
  r/[id]/page.tsx                 ← result page (noindex), fetches /api/result/[id]
  success/page.tsx
components/
  layout/SiteHeader.tsx, SiteFooter.tsx   ← shared across every page, incl. blog
  analyzer/Analyzer.tsx, QuizStep.tsx, LoadingScreen.tsx, ResultView.tsx, PaywallGate.tsx
  marketing/Faq.tsx (uses <details>, no JS), HowItWorks.tsx, Cta.tsx
lib/seo.ts                        ← buildMetadata({title, description, path}) + JSON-LD helpers
```
- The homepage's call to action links to `/relationship-test`. The quiz no longer lives inside the homepage state machine.
- Quiz progress is saved in `sessionStorage` so a refresh mid-quiz does not lose answers.
- ✅ `curl` of `/` and `/relationship-test` shows the full copy in the HTML. Lighthouse mobile Performance and SEO scores are 90 or higher on `/`.

**2.2 New homepage: implement the approved design.**
- Source of truth: `design/landing.html` (visual) and `design/README.md` (tokens, component split, copy dependencies). Rebuild it as a server-rendered page. Pixel fidelity matters, so open the reference in a browser and compare section by section.
- Set up the design system first: `next/font/google` for Instrument Serif, Geist and Geist Mono; `app/styles/tokens.css` with the `:root` variables; then shared `SiteHeader` / `SiteFooter` in the new style.
- Sections, each its own component under `components/landing/`: Hero (with the `HeroThreads` client canvas), Marquee, HowItWorks, Dimensions (radar), PatternsRail, ScoreSpectrum, Offer, Together (coming soon), WhatItIs plus Safety, Faq (`<details>`), Journal (pulls the 3 latest posts from `lib/posts.ts`), FinalCta.
- Title: `Relationship Test: Free, Private Relationship Health Check | CoupleIQ`. Use the meta description from `landing.html`.
- **Copy gating:** follow the "Copy that depends on other phases" list in `design/README.md`. Until Phase 3 ships, the hero card, spectrum and offer must not promise the 0–100 Health Score or "same answers, same score". Use neutral wording, or hide those lines behind a `SHOW_PHASE3_COPY` constant.
- **No dead links:** the pattern cards, `/methodology`, `/support-resources`, `/about` and the mini-quiz links point to pages that don't exist yet. Link them only once they exist. Until then, a pattern card is a non-link `<article>`, and the footer lists only live pages.
- ✅ Lighthouse mobile scores of 90+ for Performance, Accessibility and SEO; no layout shift from fonts; the canvas stops under `prefers-reduced-motion`; the page looks right at 390 px and 1440 px.

**2.2b Restyle the app screens to match.** Rebuild the quiz, loading, result and paywall screens and the blog index/article templates with the new tokens: an ink background for the quiz, paper for articles, serif headings, and the pill buttons. Restyle only; don't change logic beyond what Phase 2.1 requires.

**2.3 Structured data.** Add `Organization` and `WebSite` site-wide, `BlogPosting` plus `BreadcrumbList` on articles (real author, `datePublished`, `dateModified`, image), and `FAQPage` markup where a page has a FAQ. FAQ rich results are now limited to authoritative sites, so do not expect the snippet. The markup is still harmless.
- ✅ The Rich Results Test passes on the home page and on one article.

**2.4 Sitemap, robots and OG images.**
- Generate the sitemap from a single page registry (`lib/pages.ts`) plus posts, using real `lastModified` dates instead of `new Date()` on every build.
- `noindex` applies to `/r/*`, `/success` and `/api/*`.
- Add per-page OG images with `next/og`.

---

## Phase 3: Scoring engine (credibility, consistency and cost)

Current problem: the AI makes up the "divorce probability %" and the "national average" on every run, so the same answers can produce different scores. It also writes as a "senior couples therapist with 20+ years of clinical experience", which is a persona the product cannot back up.

**3.1 Deterministic scoring in `lib/scoring.ts`.**
- Map each answer to points, then compute 8 dimension scores (0–100): Communication, Conflict & repair, Contempt (inverted), Friendship & intimacy, Respect, Trust, Support & stress buffer, and Shared vision.
- The overall **Relationship Health Score** (0–100) is a weighted mean. Contempt, repair and friendship carry the most weight, and the weights live in one documented config object.
- The band comes from the score, using the existing tier names (Solid Ground, Stable Foundation, Amber Zone, Fault Line, Critical Point).
- The pattern (Pursuer-Withdrawer, and so on) is chosen by rules in code, with the AI explaining it rather than picking it.
- ✅ Jest/Vitest unit tests show that identical answers always produce an identical score, and that 5 fixture profiles land in the expected bands.

**3.2 The AI writes the narrative only.**
- Rewrite `lib/prompt.ts`. The persona becomes "a careful relationship-education writer". The prompt receives the computed scores, pattern, safety flag and answers. It must not output probabilities or statistics, and it must not claim clinical authority.
- Use tool use or a JSON schema for structured output instead of parsing raw text with a regex to strip code fences. Read the model name from the `ANTHROPIC_MODEL` env var.
- **Cost control:** the free result (score, band, pattern, strength, risk title) is computed with no AI call, plus at most one short AI headline. The long narrative is generated **only after payment**, or once per result and then cached in KV.
- ✅ Average AI cost per free result goes down, which you check by logging token usage.

**3.3 Reframe the result screen.** "Estimated divorce risk %" becomes the "Relationship Health Score" plus band plus dimension bars. Remove "vs national average", or show it only as a clearly labelled, cited static fact on the methodology page. Share text becomes "I got 'Amber Zone' on CoupleIQ…".

**3.4 `/methodology` page.** Explain what is measured, how it is weighted, the research themes it draws on (with real references), what the tool cannot tell you, and who reviewed it, once D3 is in place. This is the page that matters most for E-E-A-T.

---

## Phase 4: Acquisition, led by tools rather than articles

**Strategy:** generic article queries like "signs of a toxic relationship" are increasingly answered directly by AI Overviews and dominated by large health publishers. **Interactive tools** are where a small site can still win clicks, because the click is the point. So build tools first, then content that links into them.

**4.1 Generic quiz engine.** Turn the quiz flow into a config-driven engine (`lib/quizzes/<slug>.ts`: questions, scoring function, result bands, CTA). Mini-quizzes are scored deterministically with **no AI cost** and always end with a CTA to the full assessment.

**4.2 Landing pages.** Each one needs real, unique copy of 800 words or more around the tool. Avoid near-duplicates, because cannibalisation is a real risk with the existing `/blog/should-i-break-up` article.

| URL | Intent | Type | Priority |
|-----|--------|------|----------|
| `/relationship-test` | relationship test / health check | main assessment | P0 |
| `/should-i-break-up-quiz` | should I break up quiz / stay or leave | main engine, decision framing | P0 |
| `/four-horsemen-quiz` | Gottman four horsemen test | mini-quiz (8–10 Qs) | P1 |
| `/attachment-style-quiz` | attachment style quiz | mini-quiz | P1 |
| `/is-my-relationship-toxic-quiz` | toxic relationship quiz | mini-quiz + safety block | P1 |
| `/relationship-compatibility-test` | compatibility test (newer couples) | mini-quiz | P2 |

- Do not use the trademarked "5 Love Languages" name.
- Keep the existing `/blog/should-i-break-up` article and point it at the quiz page, then watch Search Console for cannibalisation.
- Check the final list against the Phase 0.4 Search Console data before building P1 and P2.

**4.3 Pattern pages, our unique asset.** `/patterns/[slug]` for the 7 named patterns (Pursuer-Withdrawer, Conflict Avoiders, Volatile Couple, Validated Couple, Hostile-Detached, Drifting Couple, Crisis-Bonded). Each page runs 1,000–1,500 words and covers what the pattern is, how it feels, why it happens, what helps, and when to get help. The result screen links "Read more about your pattern", which turns every result into internal links and dwell time.

**4.4 Content cluster** (6–8 articles to start; quality over volume). Candidates: emotional disconnection, contempt in relationships, repair attempts, stonewalling, rebuilding trust after betrayal, pursuer-withdrawer (as a hub linking the pattern page), fighting about money, signs a relationship is worth saving.
- Each article contains at least 2 contextual links to a tool, at least 2 links to related articles, real references, an author, and a "last reviewed" date.
- Refresh the 3 existing posts with updated dates, references, internal links and an in-article quiz CTA.
- Upgrade the blog to categories (Assessments, Communication, Conflict, Trust, Attachment, Deciding), related posts, and breadcrumbs.

**4.5 About and author pages.** Add `/about` (who runs it and why, with the Verumsell SRL operator details) and `/authors/[slug]`. Use real people only.

---

## Phase 5: Retention and viral loops

**5.1 Email capture** (the `EmailCapture` component exists but is **never rendered**). Wire it into the result page as "Email me my results", with an **explicit** opt-in checkbox for an optional 4-week "re-check your relationship" reminder. Store only the email, consent flag and timestamp in the Resend audience, plus an unsubscribe link.

**5.2 Partner invite (free).** The result page offers "Invite your partner to take it", which creates a share link with `?ref=partner`. This is the cheapest growth loop and lays the groundwork for 6.2.

**5.3 Share card.** Keep the canvas card, change it to show the band name instead of a divorce percentage, and link to the quiz with UTM parameters.

**5.4 Feedback prompt.** One question after the result ("Was this useful?" with an optional comment and consent to quote). This becomes the source of real testimonials.

---

## Phase 6: Monetisation (once funnel data exists)

**6.1 Price test** between $4.99 and $6.99, controlled by a simple env flag or a 50/50 split. Compare paywall_view → purchase. Colin creates the Stripe prices.

**6.2 Couple comparison ($9.99–$12.99, to be tested).** Partner A creates a comparison and gets an invite code. Partner B takes the quiz separately. **Both** must consent before anything is shared. The output covers dimension-by-dimension agreement and gaps plus 3 shared conversation prompts. Neither partner ever sees the other's raw answers or `extra` text. Everything auto-deletes after 30 days. This is the strongest paid product, and it brings its own traffic.

**6.3 PDF download** of the paid report (server-rendered).

**6.4 Affiliates.** Books on paid-report and article pages, and possibly online couples-therapy referral programmes, with Colin checking current terms and ethics. Always disclose them, never show them inside the safety block, and never let them push "stay together".

**6.5 Display ads (AdSense or similar):** articles only, only after meaningful traffic, and never on quiz or result pages.

---

## Phase 7 (optional): German edition

Colin is a native German speaker, and "Beziehungstest" and "Soll ich mich trennen" are likely less contested than their English equivalents (verify with keyword data first). Use `next-intl` with a `/de` subpath and `hreflang`, translate the assessment, pattern pages and the top 5 articles, and localise the safety resources (DE/AT/CH). Start this only after the English site shows organic traction.

---

## KPIs to review monthly

Search Console clicks and impressions (non-brand), quiz start rate, quiz completion rate, paywall → purchase rate, revenue per 1,000 visitors, AI cost per completion, email opt-in rate, and partner-invite click rate.
