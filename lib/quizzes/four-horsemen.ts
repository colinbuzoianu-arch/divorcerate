import type { MiniQuiz } from "@/lib/quizzes/types";

/** Gottman's Four Horsemen — categorical: which one shows up most for you. */
export const fourHorsemenQuiz: MiniQuiz = {
  slug: "four-horsemen",
  title: "The Four Horsemen quiz",
  intro: "Six situations. Pick the response that's most like you. We'll show you which of Gottman's Four Horsemen tends to show up — and the antidote.",
  mode: "category",
  questions: [
    {
      id: "complaint",
      question: "When something your partner does bothers you, you tend to…",
      options: [
        { label: "Say what you need about the specific thing ('I felt hurt when…')", category: "secure" },
        { label: "Make it about who they are ('you always…', 'you never…')", category: "criticism" },
        { label: "Add a dig, an eye-roll or a sarcastic edge", category: "contempt" },
        { label: "Explain why it's actually not your fault", category: "defensiveness" },
        { label: "Go quiet and say nothing", category: "stonewalling" },
      ],
    },
    {
      id: "heated",
      question: "In the heat of an argument, you're most likely to…",
      options: [
        { label: "Take a breath and try to stay on the issue", category: "secure" },
        { label: "List everything else they've done wrong", category: "criticism" },
        { label: "Mock them or talk down to them", category: "contempt" },
        { label: "Counter-attack or make excuses", category: "defensiveness" },
        { label: "Shut down and stop responding", category: "stonewalling" },
      ],
    },
    {
      id: "feedback",
      question: "When your partner raises a complaint about you, you usually…",
      options: [
        { label: "Try to hear the kernel of truth in it", category: "secure" },
        { label: "Point out their flaws in return", category: "criticism" },
        { label: "Dismiss it with sarcasm or a scoff", category: "contempt" },
        { label: "Defend yourself and explain why they're wrong", category: "defensiveness" },
        { label: "Withdraw and refuse to engage", category: "stonewalling" },
      ],
    },
    {
      id: "respect",
      question: "When you're frustrated with your partner, how do you tend to see them?",
      options: [
        { label: "Still fundamentally on my side", category: "secure" },
        { label: "As someone who keeps getting it wrong", category: "criticism" },
        { label: "As beneath me or not worth my respect in that moment", category: "contempt" },
        { label: "As attacking me unfairly", category: "defensiveness" },
        { label: "As someone I need to get away from", category: "stonewalling" },
      ],
    },
    {
      id: "overwhelm",
      question: "When a conversation gets too intense, you…",
      options: [
        { label: "Ask for a short break and come back to it", category: "secure" },
        { label: "Keep pressing every grievance", category: "criticism" },
        { label: "Get cutting or contemptuous", category: "contempt" },
        { label: "Keep defending my position", category: "defensiveness" },
        { label: "Freeze, go blank, or physically leave", category: "stonewalling" },
      ],
    },
    {
      id: "repair",
      question: "Afterwards, you most often…",
      options: [
        { label: "Reach out, soften, and repair", category: "secure" },
        { label: "Keep a mental list of their faults", category: "criticism" },
        { label: "Feel justified in my disdain", category: "contempt" },
        { label: "Still feel it was mostly their fault", category: "defensiveness" },
        { label: "Stay shut down for a long time", category: "stonewalling" },
      ],
    },
  ],
  categories: [
    { key: "secure", title: "You lean on the antidotes", blurb: "Your most common response is the healthy one — a gentle start-up, taking responsibility, self-soothing and repair. That's exactly what protects relationships over time. Keep it up, and watch for the horsemen that still slip in under stress." },
    { key: "criticism", title: "Criticism shows up most", blurb: "Criticism frames a complaint as a flaw in your partner's character ('you always', 'you never'). The antidote is a gentle start-up: name the specific behaviour and what you need, without the global attack. Small wording changes here make a big difference." },
    { key: "contempt", title: "Contempt is the one to watch", blurb: "Contempt — sarcasm, mockery, eye-rolling, talking down — is the single most corrosive of the four, and the strongest predictor of relationship breakdown in the research. The antidote is deliberately rebuilding fondness and respect, and describing your own feelings instead of attacking theirs. This one is worth taking seriously." },
    { key: "defensiveness", title: "Defensiveness is your pattern", blurb: "Defensiveness — counter-attacking or explaining why it's not your fault — usually reads to a partner as 'I won't take any responsibility.' The antidote is accepting even a small part of the complaint. 'You're right, I did do that' defuses far more than a perfect defence." },
    { key: "stonewalling", title: "Stonewalling is your pattern", blurb: "Stonewalling — shutting down, going silent, checking out — is often a sign of being flooded, not of not caring. The antidote is to say 'I'm overwhelmed, I need 20 minutes,' genuinely self-soothe, and then come back. Vanishing reads as abandonment; signalling changes everything." },
  ],
  ctaLede: "The Four Horsemen are one lens. The full relationship test scores eight dimensions — including contempt and repair — and names your overall pattern.",
};
