import type { Metadata } from "next";
import MiniQuizLanding from "@/components/MiniQuizLanding";
import { MINI_QUIZZES_DE } from "@/lib/quizzes/de";

export const metadata: Metadata = {
  title: "Kompatibilitätstest für Paare (kostenlos) | CoupleIQ",
  description:
    "Ein kostenloser Kompatibilitätstest für neuere Paare. Acht Fragen zu Werten, Lebensstil, Konflikt und Zukunft – sieh, wo ihr übereinstimmt und worüber ihr reden solltet.",
  alternates: {
    canonical: "https://splitornot.com/de/relationship-compatibility-test",
    languages: { en: "https://splitornot.com/relationship-compatibility-test", de: "https://splitornot.com/de/relationship-compatibility-test", "x-default": "https://splitornot.com/relationship-compatibility-test" },
  },
};

export default function RelationshipCompatibilityTestPageDe() {
  return (
    <MiniQuizLanding
      locale="de"
      config={MINI_QUIZZES_DE["relationship-compatibility"]}
      eyebrow="Kostenlos · Privat · 2 Minuten"
      title="Wie gut passt ihr zusammen?"
      lede="Kompatibilität heißt nicht, bei allem übereinzustimmen – es geht darum, wo ihr euch bei den wichtigen Dingen einig seid und ob ihr über die reden könnt, bei denen ihr es nicht seid. Dieser kostenlose Test gibt neueren Paaren eine ehrliche Einschätzung."
      sections={[
        {
          heading: "Was Kompatibilität wirklich bedeutet",
          body: [
            "Es ist verlockend, Kompatibilität als Checkliste zu sehen – gleiche Hobbys, gleicher Geschmack, alles gleich. Aber die Forschung zu dauerhaften Paaren zeigt anderswohin. Der stärkste Hinweis ist nicht, wie ähnlich zwei Menschen sind; sondern wie gut sie mit ihren Unterschieden umgehen. Viele sehr unterschiedliche Menschen bauen wunderbare Beziehungen, und viele fast identische halten nicht.",
            "Dennoch leisten ein paar Bereiche der Übereinstimmung früh viel: gemeinsame Grundwerte, eine ähnliche Zukunftsvorstellung und zueinander passende Alltage. Große Lücken dort sind es wert, bemerkt und lieber früher als später besprochen zu werden.",
          ],
        },
        {
          heading: "Was man früh klären sollte",
          body: [
            "Werte: Ehrlichkeit, Familie, Umgang mit Menschen und Geld. Richtung: ob ihr Ähnliches von der Zukunft wollt – Kinder, Heirat, Wohnort. Lebensstil: soziale Energie, Routinen, Umgang mit Geld. Verbindung: ob ihr einander wirklich genießt und euch nach einer Meinungsverschiedenheit versöhnen könnt.",
            "Du brauchst bei keinem davon ein perfektes Ergebnis. Was du brauchst, ist die Fähigkeit, einen Unterschied zu benennen und darüber zu reden, ohne dass es zum Streit wird. Auf diese Fähigkeit – nicht auf Gleichheit – zielt dieser Test wirklich.",
          ],
        },
        {
          heading: "Eine Momentaufnahme, kein Urteil",
          body: [
            "Frühe Kompatibilität kann nur so viel sagen, denn vieles, was eine Beziehung trägt, zeigt sich erst über die Zeit – unter Stress, nach der Verliebtheitsphase, wenn das Leben kompliziert wird. Ein niedriges Ergebnis ist kein Grund zu gehen, und ein hohes keine Garantie. Beide sind Einladungen, weiterzureden.",
            "Wenn du bereit bist, dir anzuschauen, wie ihr tatsächlich zusammen funktioniert – nicht nur wie gut ihr passt –, geht der vollständige Beziehungstest über acht Dimensionen tiefer und benennt euer Muster.",
          ],
        },
      ]}
      faqs={[
        { q: "Ist Kompatibilität oder Einsatz wichtiger?", a: "Einsatz und der Umgang mit Unterschieden zählen tendenziell mehr als bloße Ähnlichkeit. Paare, die einen Unterschied ruhig durchsprechen können, schneiden meist besser ab als „perfekt passende\" Paare, die das nicht können." },
        { q: "Wir haben niedrig abgeschnitten – sollten wir uns trennen?", a: "Nicht unbedingt. Ein niedriges Ergebnis markiert echte Unterschiede, über die man reden sollte, kein Urteil. Viele starke Paare starteten mit bedeutenden Lücken und bauten etwas Gutes, indem sie früh offen darüber redeten." },
        { q: "Ist das auch für langjährige Paare gut?", a: "Es ist für neuere Paare gedacht. Wenn ihr schon länger zusammen seid, gibt euch der vollständige Beziehungstest ein viel reicheres Bild davon, wie ihr zusammen funktioniert." },
      ]}
    />
  );
}
