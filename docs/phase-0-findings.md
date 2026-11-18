# Phase 0 findings

## 0.2 — Homepage SSR problem (CONFIRMED)

**Date:** 2026-11-18
**Status:** Confirmed, not fixed. The fix belongs to Phase 2 (`app/page.tsx` is being
split into a server-rendered marketing homepage + a client analyzer island).

### Root cause
`app/page.tsx` starts with `"use client"`, so the whole page is a client component.
`Home` renders:

```tsx
export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  );
}
```

`HomeInner` calls `useSearchParams()` (app/page.tsx:45). On a statically rendered
route, Next 14 bails out of server rendering for everything inside that `<Suspense>`
boundary (and the boundary has **no fallback**). The result: the landing copy is
rendered on the client only and is absent from the initial HTML. The route builds as
`○ (Static)`.

### Measurement
Search phrase: `relationship really stands`.

Note: this phrase also appears in the `<meta name="description">` set in
`app/layout.tsx`, which *is* server-rendered. So a raw `grep -c` returns 1 even though
the visible body copy is missing. We therefore measured three things separately.

| Target | Total `grep -c` | In `<meta description>` | Visible hero `>…<` | `How it works` | `Answer 15 questions` | HTML bytes |
|--------|:---------------:|:-----------------------:|:------------------:|:--------------:|:---------------------:|:----------:|
| `http://localhost:3000` (`next build && next start`) | 1 | 1 | 0 | 0 | 0 | 8,979 |
| `https://splitornot.com` (live) | 1 | 1 | 0 | 0 | 0 | 8,979 |

### Conclusion
The only server-rendered occurrence of the phrase is the `<meta>` description. The
actual landing content — hero `<span>relationship really stands</span>`, "How it
works", testimonials, etc. — is **not** in the server HTML on either localhost or
production. The initial document is a ~9 KB client shell. This is bad for SEO and
confirms the Phase 2 plan to render the homepage server-side.

Reproduce:
```bash
npm run build && npm run start   # then, in another shell:
curl -s http://localhost:3000 | grep -c '>relationship really stands<'   # -> 0
curl -sL https://splitornot.com  | grep -c '>relationship really stands<' # -> 0
```
