import type { MiniQuiz } from "@/lib/quizzes/types";

export const isMyRelationshipToxicQuiz: MiniQuiz = {
  slug: "is-my-relationship-toxic",
  title: "Is my relationship toxic?",
  intro: "Eight honest questions. This is a reflection, not a diagnosis — and if anything here feels close to home, please read the safety note at the end.",
  mode: "scale",
  safety: true,
  questions: [
    {
      id: "aftermath",
      question: "How do you usually feel after spending time with your partner?",
      options: [
        { label: "Mostly good — connected and myself", points: 0 },
        { label: "A mixed bag", points: 1 },
        { label: "Often drained or on edge", points: 2 },
        { label: "Anxious, small, or relieved when it's over", points: 3 },
      ],
    },
    {
      id: "criticism",
      question: "How often do you feel criticised, mocked or put down?",
      options: [
        { label: "Rarely or never", points: 0 },
        { label: "Occasionally", points: 1 },
        { label: "Regularly", points: 2 },
        { label: "Constantly — it's a running theme", points: 3 },
      ],
    },
    {
      id: "walking",
      question: "Do you find yourself walking on eggshells to avoid a reaction?",
      options: [
        { label: "No", points: 0 },
        { label: "Sometimes", points: 1 },
        { label: "Often", points: 2 },
        { label: "Most of the time", points: 3 },
      ],
    },
    {
      id: "control",
      question: "Does your partner try to control where you go, who you see, or what you spend?",
      options: [
        { label: "No — I have my freedom", points: 0 },
        { label: "A little, and we can talk about it", points: 1 },
        { label: "Yes, and it causes conflict", points: 2 },
        { label: "Yes — I feel monitored or restricted", points: 3 },
      ],
    },
    {
      id: "blame",
      question: "When something goes wrong between you, who ends up taking the blame?",
      options: [
        { label: "We both own our parts", points: 0 },
        { label: "Usually a fair split", points: 1 },
        { label: "Mostly me, even when it isn't", points: 2 },
        { label: "Always me — nothing is ever their fault", points: 3 },
      ],
    },
    {
      id: "support",
      question: "When you're struggling, your partner is…",
      options: [
        { label: "In my corner", points: 0 },
        { label: "Sometimes supportive", points: 1 },
        { label: "Often dismissive", points: 2 },
        { label: "A source of more stress, not less", points: 3 },
      ],
    },
    {
      id: "selfworth",
      question: "Since being in this relationship, your confidence and sense of self have…",
      options: [
        { label: "Grown", points: 0 },
        { label: "Stayed about the same", points: 1 },
        { label: "Shrunk somewhat", points: 2 },
        { label: "Taken a real hit", points: 3 },
      ],
    },
    {
      id: "fear",
      question: "Have you ever felt afraid of your partner — their temper, threats, or what they might do?",
      options: [
        { label: "Never", points: 0 },
        { label: "Once or twice, mildly", points: 1 },
        { label: "More than once", points: 2 },
        { label: "Yes — I have felt genuinely afraid", points: 3 },
      ],
    },
  ],
  bands: [
    { min: 0, title: "Low on the toxic signals", blurb: "Your answers don't point to a toxic dynamic. Like any relationship it may have rough spots worth tending, but the corrosive signs — contempt, control, fear, chronic blame — aren't dominating the picture you described." },
    { min: 34, title: "Some real warning signs", blurb: "Several of your answers point to patterns worth taking seriously — feeling drained, criticised, or blamed more than is fair. That doesn't automatically mean 'toxic,' but it does mean something here is costing you, and it's worth understanding clearly and addressing." },
    { min: 67, title: "Strong signals worth acting on", blurb: "Your answers describe several of the dynamics people mean by a toxic relationship — and if fear or control is part of it, that goes beyond 'toxic' into your safety. Please read the note below. You deserve to feel safe and respected, and support is available." },
  ],
  ctaLede: "A quiz can only reflect your perspective on one day. The full relationship test maps eight dimensions in detail and names your pattern — but if safety is the issue, the resources below matter more.",
};
