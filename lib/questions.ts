export type QuestionType = "options" | "range" | "textarea";

export interface Question {
  id: string;
  label: string;
  sub?: string;
  type: QuestionType;
  options?: string[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  default?: number;
}

export interface Step {
  title: string;
  questions: Question[];
}

export const steps: Step[] = [
  {
    title: "About your relationship",
    questions: [
      {
        id: "duration",
        label: "How long have you been together?",
        type: "options",
        options: ["Less than 1 year", "1–3 years", "3–7 years", "7–15 years", "More than 15 years"],
      },
      {
        id: "married",
        label: "What is your current relationship status?",
        type: "options",
        options: ["Dating / living together", "Engaged", "Married (under 5 years)", "Married (5–15 years)", "Married (over 15 years)"],
      },
      {
        id: "children",
        label: "Do you have or plan to have children together?",
        type: "options",
        options: ["No children, no plans", "No children, planning to", "Have children together", "Blended family"],
      },
    ],
  },
  {
    title: "Communication & conflict",
    questions: [
      {
        id: "conflict_style",
        label: "When you disagree, how does it typically go?",
        sub: "Think of the last real disagreement you had, not your best-case scenario.",
        type: "options",
        options: [
          "We talk it through calmly and reach an understanding",
          "One of us goes quiet and avoids the topic",
          "It escalates into arguments, then we cool down",
          "We criticize or blame each other harshly",
          "We rarely disagree on anything significant",
        ],
      },
      {
        id: "contempt",
        label: "During arguments, do either of you use sarcasm, eye-rolling, or dismissive language?",
        sub: "This is one of the most predictive questions in relationship research. Answer honestly — it only helps the accuracy.",
        type: "options",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "repair",
        label: "After an argument, how quickly do you reconnect?",
        sub: "How you recover matters more than how often you fight.",
        type: "options",
        options: [
          "Within hours — we apologize and move on",
          "Within a day or two",
          "It takes a week or more",
          "We often never fully resolve it",
          "We don't really argue",
        ],
      },
    ],
  },
  {
    title: "Emotional connection",
    questions: [
      {
        id: "intimacy",
        label: "How satisfied are you with the emotional intimacy in your relationship?",
        sub: "Emotional intimacy means feeling truly known — not just coexisting.",
        type: "range",
        min: 1,
        max: 10,
        minLabel: "Very unsatisfied",
        maxLabel: "Very satisfied",
        default: 6,
      },
      {
        id: "respect",
        label: "How much do you feel genuinely respected by your partner?",
        sub: "Not tolerated — respected. There's a difference worth sitting with.",
        type: "range",
        min: 1,
        max: 10,
        minLabel: "Not at all",
        maxLabel: "Completely",
        default: 7,
      },
      {
        id: "friendship",
        label: "Would you describe your partner as your close friend?",
        sub: "Gottman research shows this is one of the strongest predictors of long-term relationship health.",
        type: "options",
        options: ["Yes, absolutely", "Mostly yes", "Somewhat", "Not really", "No"],
      },
    ],
  },
  {
    title: "External stressors",
    questions: [
      {
        id: "finances",
        label: "How often does money cause tension between you?",
        sub: "Financial conflict is the most commonly cited cause of relationship breakdown. No judgment here.",
        type: "options",
        options: ["Rarely or never", "Occasionally", "Regularly", "It's a major source of conflict"],
      },
      {
        id: "external_stress",
        label: "Are there significant external stressors in your lives right now?",
        sub: "Job pressure, health issues, family conflict — external stress often shows up as relationship strain.",
        type: "options",
        options: ["None significant", "Minor stress", "Moderate stress", "Major ongoing stress"],
      },
      {
        id: "support",
        label: "Do you feel your partner supports you through life's challenges?",
        type: "options",
        options: ["Always", "Usually", "Sometimes", "Rarely", "Never"],
      },
    ],
  },
  {
    title: "Trust & shared future",
    questions: [
      {
        id: "trust",
        label: "How much do you trust your partner?",
        sub: "Trust includes reliability, honesty, and feeling emotionally safe — not just fidelity.",
        type: "range",
        min: 1,
        max: 10,
        minLabel: "No trust",
        maxLabel: "Complete trust",
        default: 7,
      },
      {
        id: "alignment",
        label: "Do you share similar values, life goals, and visions for the future?",
        sub: "Couples who feel aligned today but haven't discussed the big questions often discover gaps later.",
        type: "options",
        options: ["Very aligned", "Mostly aligned", "Somewhat aligned", "Often misaligned", "Very different visions"],
      },
      {
        id: "extra",
        label: "Is there anything specific you want the analysis to consider?",
        sub: "Optional — if something important is happening (infidelity, therapy, a big life change), mention it here. It improves the accuracy of your result.",
        type: "textarea",
      },
    ],
  },
];
