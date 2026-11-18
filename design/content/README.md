# Visual content: "Everything else is just particles"

**Status: parked. Do NOT implement during Phases 0–3.** This is input for Phase 4 (content). It needs the Phase 2 design system and layout components to exist first.

## Files
- `story-particles.html` is a **visual essay** (scrolling story page): love as the rarest binding force in the known universe, and the research on what keeps it (the Four Horsemen and the 5:1 ratio). Open it in a browser.
- `social-particles.html` holds a **4-card social carousel** (1080×1350, Instagram/LinkedIn portrait) built from the same essay, for distribution.

## Where it goes in the plan (add as Phase 4.6 when Phase 4 starts)
**4.6 Visual stories: a new content type next to the blog.**
- Route: `/stories/[slug]`, starting with `/stories/everything-else-is-just-particles`. Stories are hand-built pages (React components per story), not markdown. They reuse the landing tokens and a small library of story blocks: `StoryHero` (with a canvas slot), `Chapter`, `StatRow`, `SplitVisual`, `ForceCards`, `HorsemenCards`, `RatioBlock`, `ActsList`, `StoryClose`, `Sources`.
- Port `cqCosmos()` into a `CosmosCanvas` client component (respect `prefers-reduced-motion`). The rest is CSS-only animation.
- SEO: `Article` JSON-LD with a real author, OG image generated from Social card 1, and `/stories` added to the sitemap and nav ("Stories"). Each story links to the main test plus 2 or more related articles, pattern pages or tools (for example the Four Horsemen chapter links `/four-horsemen-quiz` and `/blog/what-is-the-gottman-method`).
- Add a "Share this story" button (Web Share API with a copy-link fallback) and track `story_share` and `story_cta_click` in GA4.
- The social cards are exported as PNG by Colin from the design canvas. Optionally add `/api/og/story/[slug]` with `next/og` later.
- Stories are brand pieces, built for shares, backlinks and an emotional connection with the brand, not mainly for search volume. Plan roughly 1 story per 4–6 articles.

## Facts used (keep the sources section on the page)
Age of the universe ~13.8 bn years; CMB ~2.7 K (≈ −270 °C); elements heavier than H/He are formed in stars; Gottman's Four Horsemen (contempt the strongest predictor) and the ~5:1 positive-to-negative ratio during conflict. Have the expert reviewer (D3) check the relationship-research wording before publishing.
