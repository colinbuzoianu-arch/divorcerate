# CoupleIQ

**CoupleIQ** (at **splitornot.com**) is an AI-assisted relationship self-assessment tool built with **Next.js** and the **Anthropic Claude API**. It draws on well-known relationship-research themes (the Gottman "Four Horsemen", repair, friendship, attachment) to help people reflect on where their relationship stands. It is a tool for reflection, not a validated clinical test.

## Features 

- 15-question evidence-based assessment (5 steps)
- Secure server-side API route — your Anthropic API key is never exposed to the browser
- AI-generated probability score, risk level, key factors, and personalized recommendations
- Fully responsive, clean UI on light grey background
- Edge runtime for fast responses on Vercel

---

## Local development

### 1. Clone the repo

```bash
git clone https://github.com/colinbuzoianu-arch/divorcerate.git
cd divorcerate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

```bash
cp .env.local.example .env.local
```

Open `.env.local` and replace `your_api_key_here` with your real key from [console.anthropic.com](https://console.anthropic.com/).

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked about environment variables, add `ANTHROPIC_API_KEY`.

### Option B — Vercel Dashboard (recommended for first deploy)

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. In the **Environment Variables** section, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key from [console.anthropic.com](https://console.anthropic.com/)
5. Click **Deploy**

Vercel auto-detects Next.js — no build configuration needed.

---

## Project structure

```
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts      ← Secure server-side API route
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              ← Main page / screen orchestration
├── components/
│   ├── StartScreen.tsx
│   ├── QuizStep.tsx
│   ├── LoadingScreen.tsx
│   └── ResultScreen.tsx
├── lib/
│   ├── questions.ts          ← All quiz content
│   ├── prompt.ts             ← Builds the Anthropic prompt
│   └── types.ts              ← Shared TypeScript types
├── .env.local.example        ← Copy to .env.local and add your key
├── .gitignore                ← .env.local is excluded from git
└── README.md
```

---

## Security notes

- `ANTHROPIC_API_KEY` lives only in `.env.local` (local) or Vercel's encrypted environment variables (production)
- The browser never sees the API key — all calls go through `/api/analyze`
- `.env.local` is in `.gitignore` and will never be committed
- Quiz answers are not stored; the generated result is stored in Upstash Redis under a random id with a 30-day TTL (see `/legal`)

---

## Customizing the questions

Edit `lib/questions.ts` to change, add, or remove questions. Each question supports three types:
- `"options"` — multiple choice buttons
- `"range"` — a 1–10 slider
- `"textarea"` — free text input

The prompt logic lives in `lib/prompt.ts` — update it if you add new question IDs.
