# CLAUDE.md — splitornot.com (CoupleIQ)

## What this is
A relationship self-assessment site. A visitor answers 15 questions, an AI writes a personalised analysis, and a full report is sold through Stripe. The site is being restructured to grow organic traffic, then revenue. The full plan is in `docs/RESTRUCTURE_PLAN.md`. Work through it **one phase at a time** and do not start a later phase unless asked.

## Stack
- Next.js 14 App Router, TypeScript, React 18; deployed on Vercel from GitHub
- AI: Anthropic Messages API, called from `app/api/analyze/route.ts` (model is currently `claude-haiku-4-5-20251001`)
- Payments: Stripe Checkout (`app/api/checkout`, `app/api/verify-payment`)
- Email: Resend (`app/api/email-capture`). Note: `resend` is not yet in package.json
- Blog: markdown in `content/posts/*.md`, read by `lib/posts.ts` (gray-matter + remark)
- Analytics: GA4 `G-K9FVMX9M15` and Google Ads tag `GT-5RFHKQ3W`, set in `app/layout.tsx`
- Styling (current): inline style objects, purple `#534ab7`, Plus Jakarta Sans. **This is being replaced.**
- Styling (target): the new CoupleIQ visual system is in `design/landing.html` and `design/README.md`. It uses ink/paper sections, violet `#8B7CFF` and ember `#FF9466` ("two partners, two threads"), Instrument Serif with Geist and Geist Mono, and CSS variables instead of inline styles. All new and rebuilt UI follows it. Treat `design/landing.html` as a visual reference, not code to paste in: port it into proper components.

## Commands
- `npm run dev` / `npm run build` / `npm run lint`
- Run `npm run build` before you call any task done. A phase is not done while the build fails.

## Env vars (never hard-code, never commit)
`ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET` (new), `NEXT_PUBLIC_APP_URL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_AUDIENCE_ID`, plus KV/Redis vars once added (Phase 1). Add each new variable to `.env.local.example`.

## Rules for this project
1. **Honesty over hype.** Make no accuracy claims, no invented statistics, no fake testimonials, and no "clinically validated" wording. A number shown to users must either be computed by our own code or come with a cited source.
2. **Safety first.** Safety resources (abuse and crisis) are never behind the paywall, are never hidden, and are never contradicted by "keep working on it" advice.
3. **Privacy.** Store as little as possible. Anything stored gets a TTL. Quiz answers are never logged in plain text. The legal page must match what the code actually does.
4. **SEO hygiene.** Every indexable page has a unique title, description and canonical, sits in the sitemap, and contains real content in the server-rendered HTML. Result pages and checkout pages are `noindex`.
5. **Small PRs.** Use one branch per phase (`phase-1-trust`, and so on) with commits per task, and give a short summary at the end listing what changed and what Colin needs to do manually (Stripe dashboard, Vercel env, Search Console).
6. Ask before you add a paid service, change pricing, touch live Stripe products or delete content.
