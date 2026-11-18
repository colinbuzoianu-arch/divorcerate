import type { Metadata } from "next";
import MiniQuizLanding from "@/components/MiniQuizLanding";
import { attachmentStyleQuiz } from "@/lib/quizzes/attachment-style";

export const metadata: Metadata = {
  title: "Attachment Style Quiz: Secure, Anxious, Avoidant or Fearful | CoupleIQ",
  description:
    "A free attachment style quiz. Seven questions to find out whether you lean secure, anxious, avoidant or fearful-avoidant in relationships — and what it means.",
  alternates: { canonical: "https://splitornot.com/attachment-style-quiz" },
};

export default function AttachmentStyleQuizPage() {
  return (
    <MiniQuizLanding
      config={attachmentStyleQuiz}
      eyebrow="Free · Private · 2 minutes"
      title="What's your attachment style?"
      lede="Attachment theory describes how we learned to do closeness — and it quietly shapes how we love as adults. This free quiz shows whether you lean secure, anxious, avoidant or fearful-avoidant, and what that means for your relationships."
      sections={[
        {
          heading: "What is attachment style?",
          body: [
            "Attachment theory began with the bond between infants and caregivers, and researchers later found that similar patterns show up in adult romantic relationships. Your attachment style is essentially your blueprint for closeness: how safe it feels to depend on someone, how you react when you sense distance, and what you expect from the people you love.",
            "There are four broad styles: secure, anxious (preoccupied), avoidant (dismissive) and fearful-avoidant (disorganised). Most people lean toward one, though it can shift with different partners and over time.",
          ],
        },
        {
          heading: "The four styles in brief",
          body: [
            "Secure: comfortable with both closeness and independence; can ask for needs and repair after conflict. Anxious: craves closeness, highly attuned to distance, prone to seeking reassurance when disconnected. Avoidant: prizes independence and self-reliance; closeness or pressure can feel like too much. Fearful-avoidant: wants closeness and fears it at once, producing a confusing push-pull.",
            "None of these is 'good' or 'bad.' They're strategies that once made sense, usually learned early. And crucially, attachment is not a life sentence — people move toward security through secure relationships and good therapy all the time.",
          ],
        },
        {
          heading: "Why it matters for your relationship",
          body: [
            "Attachment styles interact. The classic clash is an anxious partner and an avoidant one: the more the anxious partner pursues closeness, the more the avoidant partner needs space, and each reaction intensifies the other. Understanding your style — and your partner's — turns that painful loop from 'something's wrong with us' into 'here's the pattern, and here's how we interrupt it.'",
            "Your style is one lens. The full relationship test looks at trust, friendship, repair, respect and more, and names the overall pattern you and your partner fall into.",
          ],
        },
      ]}
      faqs={[
        { q: "Can your attachment style change?", a: "Yes. Attachment is a pattern, not a fixed trait. A steady, responsive relationship and good therapy can both move someone toward security over time — it's one of the more hopeful findings in the field." },
        { q: "Is one attachment style best?", a: "Secure attachment tends to make relationships easier, but plenty of people with anxious, avoidant or fearful styles have strong, happy relationships — especially once they understand their pattern and can talk about it with a partner." },
        { q: "What if my partner and I have clashing styles?", a: "Very common — especially anxious with avoidant. The clash isn't a sign you're incompatible; it's a loop. Naming it together, and learning each other's signals, is usually what shifts it. A couples therapist can help if it feels stuck." },
      ]}
    />
  );
}
