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
        type: "options",
        options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"],
      },
      {
        id: "repair",
        label: "After an argument, how quickly do you reconnect?",
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
        type: "options",
        options: ["Rarely or never", "Occasionally", "Regularly", "It's a major source of conflict"],
      },
      {
        id: "external_stress",
        label: "Are there significant external stressors currently? (e.g. job loss, illness, family issues)",
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
        type: "options",
        options: ["Very aligned", "Mostly aligned", "Somewhat aligned", "Often misaligned", "Very different visions"],
      },
      {
        id: "extra",
        label: "Is there anything specific you want the analysis to consider?",
        sub: "Optional — share any context that might matter (e.g. infidelity, therapy, major life changes)",
        type: "textarea",
      },
    ],
  },
];
