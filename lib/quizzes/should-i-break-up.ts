import type { MiniQuiz } from "@/lib/quizzes/types";

export const shouldIBreakUpQuiz: MiniQuiz = {
  slug: "should-i-break-up",
  title: "Should I break up? A quick gut-check",
  intro: "Eight honest questions. This is a reflection, not a verdict — there are no right answers.",
  mode: "scale",
  questions: [
    {
      id: "future",
      question: "When you picture your life in five years, is your partner in it?",
      options: [
        { label: "Clearly yes — I want to build a future together", points: 0 },
        { label: "I think so, but I'm less sure than I used to be", points: 1 },
        { label: "I genuinely don't know anymore", points: 2 },
        { label: "When I'm honest, I picture it without them", points: 3 },
      ],
    },
    {
      id: "respect",
      question: "Do you feel respected by your partner day to day?",
      options: [
        { label: "Yes — I feel valued and taken seriously", points: 0 },
        { label: "Mostly, with some rough patches", points: 1 },
        { label: "Often not — I feel dismissed or belittled", points: 2 },
        { label: "Rarely or never", points: 3 },
      ],
    },
    {
      id: "contempt",
      question: "How do your arguments usually feel?",
      options: [
        { label: "We disagree but stay respectful and repair quickly", points: 0 },
        { label: "Heated, but we make up", points: 1 },
        { label: "There's a lot of sarcasm, blame or shutting down", points: 2 },
        { label: "There's contempt — eye-rolling, mockery, disdain", points: 3 },
      ],
    },
    {
      id: "effort",
      question: "Does it feel like you're both still trying?",
      options: [
        { label: "Yes, we both put in effort", points: 0 },
        { label: "Mostly me, but they respond", points: 1 },
        { label: "I feel like I'm the only one trying", points: 2 },
        { label: "Neither of us is really trying anymore", points: 3 },
      ],
    },
    {
      id: "self",
      question: "Do you like who you are in this relationship?",
      options: [
        { label: "Yes — I feel more myself with them", points: 0 },
        { label: "Mostly", points: 1 },
        { label: "Not really — I've shrunk or changed in ways I don't like", points: 2 },
        { label: "No — I barely recognise myself", points: 3 },
      ],
    },
    {
      id: "trust",
      question: "Do you trust your partner?",
      options: [
        { label: "Completely", points: 0 },
        { label: "Mostly, with some doubts", points: 1 },
        { label: "Trust has been damaged and not fully rebuilt", points: 2 },
        { label: "No — I don't feel I can trust them", points: 3 },
      ],
    },
    {
      id: "staying",
      question: "What's keeping you in the relationship right now?",
      options: [
        { label: "Love, connection and a shared future", points: 0 },
        { label: "A mix of love and habit", points: 1 },
        { label: "Mostly logistics — money, kids, fear of being alone", points: 2 },
        { label: "I'm not sure anything is, beyond it being hard to leave", points: 3 },
      ],
    },
    {
      id: "advice",
      question: "If a close friend described your relationship to you, what would you tell them?",
      options: [
        { label: "That it sounds healthy and worth it", points: 0 },
        { label: "That every relationship has hard seasons", points: 1 },
        { label: "That they deserve better than this", points: 2 },
        { label: "That I'd be worried about them", points: 3 },
      ],
    },
  ],
  bands: [
    { min: 0, title: "More of a rough patch", blurb: "Your answers point to real strengths. The strain you're feeling looks more like a hard season than a fundamental breakdown — the kind of thing couples work through, often without professional help. Worth tending to, not panicking about." },
    { min: 34, title: "Worth a serious conversation", blurb: "There are real strengths here and real concerns. This is the zone where small changes — and honest conversations you may have been avoiding — matter most. It's a good moment to get clear on what's actually wrong before deciding anything." },
    { min: 67, title: "Signals worth taking seriously", blurb: "Your answers point to patterns that tend to compound over time — low respect, eroding trust, or feeling alone in the effort. That doesn't mean it's over, but it does mean this deserves honest attention, and probably more support than a quiz can give." },
  ],
  ctaLede: "A quick gut-check can only tell you so much. The full relationship test scores eight dimensions, names your pattern, and shows you exactly where to focus.",
  safety: true,
};
