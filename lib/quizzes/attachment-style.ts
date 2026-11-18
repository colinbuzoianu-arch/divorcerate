import type { MiniQuiz } from "@/lib/quizzes/types";

/** Attachment style — categorical: secure / anxious / avoidant / fearful-avoidant. */
export const attachmentStyleQuiz: MiniQuiz = {
  slug: "attachment-style",
  title: "What's your attachment style?",
  intro: "Seven questions about how you experience closeness. Pick what's most true for you most of the time.",
  mode: "category",
  questions: [
    {
      id: "closeness",
      question: "How do you feel about emotional closeness?",
      options: [
        { label: "Comfortable — I can be close and also independent", category: "secure" },
        { label: "I crave it and worry I want it more than my partner does", category: "anxious" },
        { label: "I value my independence and closeness can feel like a lot", category: "avoidant" },
        { label: "I want it badly but it also scares me", category: "fearful" },
      ],
    },
    {
      id: "partner_distance",
      question: "When your partner seems a bit distant, you…",
      options: [
        { label: "Assume they're busy and check in later", category: "secure" },
        { label: "Get anxious and need reassurance quickly", category: "anxious" },
        { label: "Feel relieved to have some space", category: "avoidant" },
        { label: "Panic and want to pull away at the same time", category: "fearful" },
      ],
    },
    {
      id: "needs",
      question: "Asking for what you need in a relationship feels…",
      options: [
        { label: "Natural — I can usually say it directly", category: "secure" },
        { label: "Risky — I worry I'm too much or will be rejected", category: "anxious" },
        { label: "Unnecessary — I'd rather handle things myself", category: "avoidant" },
        { label: "Confusing — I need things but struggle to trust the response", category: "fearful" },
      ],
    },
    {
      id: "conflict",
      question: "During conflict, your instinct is to…",
      options: [
        { label: "Stay engaged and work toward repair", category: "secure" },
        { label: "Pursue, protest, and seek reconnection urgently", category: "anxious" },
        { label: "Withdraw, go cool, or need to be alone", category: "avoidant" },
        { label: "Swing between reaching out and shutting down", category: "fearful" },
      ],
    },
    {
      id: "trust",
      question: "Trusting a partner comes…",
      options: [
        { label: "Fairly easily, unless given a real reason not to", category: "secure" },
        { label: "With effort — I often look for signs something's wrong", category: "anxious" },
        { label: "Slowly — I keep part of myself held back", category: "avoidant" },
        { label: "Hard — I expect to be let down even when things are good", category: "fearful" },
      ],
    },
    {
      id: "past",
      question: "Looking back at past relationships, you most relate to…",
      options: [
        { label: "Mostly steady, with normal ups and downs", category: "secure" },
        { label: "Often feeling I cared more, or feared being left", category: "anxious" },
        { label: "Often feeling crowded, or keeping people at arm's length", category: "avoidant" },
        { label: "Intense highs and lows, wanting and fearing closeness", category: "fearful" },
      ],
    },
    {
      id: "selfview",
      question: "Which feels most true?",
      options: [
        { label: "I'm worthy of love and others are mostly trustworthy", category: "secure" },
        { label: "I'm okay, but I'm not always sure others will stay", category: "anxious" },
        { label: "I'm fine on my own; depending on others is risky", category: "avoidant" },
        { label: "I'm not sure I'm lovable, and others feel unsafe", category: "fearful" },
      ],
    },
  ],
  categories: [
    { key: "secure", title: "Mostly secure attachment", blurb: "You're generally comfortable with both closeness and independence, can ask for what you need, and tend to assume good intent. Secure attachment isn't about never feeling anxious or wanting space — it's about being able to stay connected and repair. It's also something the other styles can grow toward, often through a secure relationship or good therapy." },
    { key: "anxious", title: "Leaning anxious (preoccupied)", blurb: "You value closeness deeply and can be quick to sense distance, which sometimes tips into reassurance-seeking or protest when you feel disconnected. Underneath is a real, legitimate need to know you matter. Naming that need directly — rather than through pursuit — tends to help, and a steady partner can help your system settle over time." },
    { key: "avoidant", title: "Leaning avoidant (dismissive)", blurb: "You prize independence and self-reliance, and closeness or pressure can feel like a lot. That's a protective strategy, usually learned early, not a lack of care. Growth here often looks like letting a partner in a little more than feels natural, and signalling ('I need some space, and I'll come back') instead of simply withdrawing." },
    { key: "fearful", title: "Leaning fearful-avoidant (disorganised)", blurb: "You want closeness and fear it at the same time, which can produce a push-pull that's confusing for you and a partner. This style often traces to experiences where the people meant to be safe were also a source of hurt. It's very workable — this is an area where a good therapist can help a lot — and a safe, consistent relationship can be genuinely healing." },
  ],
  ctaLede: "Attachment is one piece of the picture. The full relationship test looks at trust, friendship, repair and five more dimensions, and names your overall pattern.",
};
