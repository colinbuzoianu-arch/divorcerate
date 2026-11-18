import type { MiniQuiz } from "@/lib/quizzes/types";

/** Higher points = more aligned/compatible. */
export const relationshipCompatibilityQuiz: MiniQuiz = {
  slug: "relationship-compatibility",
  title: "How compatible are you?",
  intro: "Eight questions about where you align and where you differ. Best for newer couples getting to know the big stuff.",
  mode: "scale",
  questions: [
    {
      id: "values",
      question: "How aligned are your core values (honesty, family, how you treat people)?",
      options: [
        { label: "Very different", points: 0 },
        { label: "Some real gaps", points: 1 },
        { label: "Mostly aligned", points: 2 },
        { label: "Strongly aligned", points: 3 },
      ],
    },
    {
      id: "future",
      question: "Do you want similar things from the future (kids, marriage, where to live)?",
      options: [
        { label: "We want quite different things", points: 0 },
        { label: "We haven't really talked about it", points: 1 },
        { label: "Broadly similar", points: 2 },
        { label: "Clearly on the same page", points: 3 },
      ],
    },
    {
      id: "communication",
      question: "How well do you communicate when something's wrong?",
      options: [
        { label: "We avoid it or it blows up", points: 0 },
        { label: "It's hit or miss", points: 1 },
        { label: "Usually okay", points: 2 },
        { label: "We talk openly and repair well", points: 3 },
      ],
    },
    {
      id: "lifestyle",
      question: "How well do your day-to-day lifestyles fit (social energy, routines, money habits)?",
      options: [
        { label: "We clash a lot", points: 0 },
        { label: "We're adjusting", points: 1 },
        { label: "Mostly compatible", points: 2 },
        { label: "We fit easily", points: 3 },
      ],
    },
    {
      id: "fun",
      question: "Do you actually enjoy each other's company and laugh together?",
      options: [
        { label: "Not much lately", points: 0 },
        { label: "Sometimes", points: 1 },
        { label: "Often", points: 2 },
        { label: "Constantly — they're my favourite person to be around", points: 3 },
      ],
    },
    {
      id: "conflict",
      question: "When you disagree, how does it tend to go?",
      options: [
        { label: "Badly — it lingers", points: 0 },
        { label: "Tense but we move on", points: 1 },
        { label: "We work it out", points: 2 },
        { label: "We handle it calmly and come back closer", points: 3 },
      ],
    },
    {
      id: "intimacy",
      question: "How aligned are you on affection and intimacy?",
      options: [
        { label: "Quite mismatched", points: 0 },
        { label: "Some mismatch", points: 1 },
        { label: "Mostly in sync", points: 2 },
        { label: "Very in sync", points: 3 },
      ],
    },
    {
      id: "respect",
      question: "Do you respect each other's independence and friends?",
      options: [
        { label: "Not really", points: 0 },
        { label: "Sometimes a point of tension", points: 1 },
        { label: "Mostly yes", points: 2 },
        { label: "Completely", points: 3 },
      ],
    },
  ],
  bands: [
    { min: 0, title: "Real differences to talk through", blurb: "Your answers point to some meaningful gaps — in values, direction, or how you handle conflict. Differences aren't dealbreakers, especially early on, but these are the kinds of things best talked about openly and sooner rather than later, before assumptions harden." },
    { min: 41, title: "A promising match with gaps to explore", blurb: "There's a lot working in your favour, alongside a few areas worth exploring — often the future questions or how you handle conflict. Early compatibility is less about matching perfectly and more about being able to talk about the mismatches. That skill matters more than the gaps themselves." },
    { min: 71, title: "Strongly compatible", blurb: "You described strong alignment across values, lifestyle and connection, plus the ability to handle disagreement well — which is the real predictor, more than similarity. Keep investing in the friendship and keep talking about the big questions as they come." },
  ],
  ctaLede: "Compatibility is a snapshot. The full relationship test goes deeper on how you actually function together — communication, repair, trust and more — and names your pattern.",
};
