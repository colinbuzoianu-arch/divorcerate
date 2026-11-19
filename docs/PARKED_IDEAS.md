# Parked ideas: not part of the current plan

> **For Claude Code:** do NOT build anything in this file unless Colin explicitly asks. It is a record of future direction, not a task list.

---

## 1. Peer connections: "people who are going through the same thing"

**Status:** parked until there is real traffic (see "When to start").
**Recorded:** 2026-11-19

### The idea (as Colin describes it)
- Visitors can create an account.
- After completing the test (or the compatibility/comparison flow), users can see **other users who have similar issues**, each with a short description.
- Users can write to each other in **private one-to-one messages**, chat, give advice and help each other, and switch between conversations with different people.
- **No real names.** Users choose a display name. Real photos or avatars are still undecided, with Colin leaning toward allowing either.
- **No group chats, no meeting rooms, no moderation team.**
- **Location is not a topic on the platform.** If two people choose to share it and meet in person, that is their business. The platform neither encourages nor bans it.
- **The mood the platform proposes:** people helping each other through troubled times.

### Minimum guardrails (needed even without a moderation team)
- **Report and block** on every profile and conversation. Profiles are hosted content, so EU rules (DSA notice-and-action) require a way to report them. This is buttons plus an inbox Colin checks, not a moderator.
- **18+ only**, with an age confirmation at sign-up and clear terms of use.
- **Easy account deletion and data export** (GDPR). Relationship problems can touch sensitive data, so ask for explicit consent before a profile becomes visible to others.
- **Safety resources** stay visible and free (link to `/support-resources`).
- **Scam awareness:** a short "never send money to someone you met here" note in the messaging UI.

### Design levers that keep the "help" mood (without banning anything)
- The profile is about the **situation**, not the person: "What I'm going through", "What has helped me", and "I'm here to: listen / get advice / both".
- People are grouped by **relationship pattern and dimension**, never by looks, age or location.
- **Avatars by default**, with real photos optional, if photos are allowed at all.
- No "looking for…" fields and no swiping or rating of people.
- Matching uses **dimension scores and pattern only**, never raw quiz answers (the same privacy rule as the couple comparison).

### Pricing thoughts (from the 2026-11-19 brainstorm)
- **The 15-question test and basic result stay free, always.** They are the traffic engine (search, shares, partner invites).
- Keep the **one-time purchases** (full report, couple comparison) for people who come once in a crisis moment.
- Later, a **"CoupleIQ Plus" subscription** to test at around $12.99/month or ~$69/year, ideally **covering both partners**. It would bundle all reports and comparisons, a monthly re-check with trends, and **peer messaging**. For reference, Paired premium starts at $14.99/month (per person), and other couples apps charge ~$12.99/month or ~$78/year per couple.
- Messaging being a paid feature would also filter out most spam and scammers.

### Technical prerequisites
- Accounts (email magic link) and a real database (Postgres, e.g. Neon or Supabase via Vercel). Today everything lives in temporary KV storage.
- Linking existing results and comparisons to an account ("claim your results").
- Stripe Billing subscriptions and a customer portal.
- Messaging can start as simple stored messages with email notifications. Realtime chat is not needed for v1.

### When to start
- Not before there is steady traffic. As a rough guide, several hundred to ~1,000 test completions a month, so users actually find people to talk to.
- Step 1 when the time comes: **accounts and a personal dashboard** (saved results, re-check history, linked comparisons) plus the Plus subscription. Step 2: peer profiles and messaging.

---

## 2. Visual stories: already designed

See `design/content/README.md`. Scheduled for Phase 4 (content) as `/stories/[slug]`.
