import type { Metadata } from "next";
import MiniQuizLanding from "@/components/MiniQuizLanding";
import { MINI_QUIZZES_DE } from "@/lib/quizzes/de";

export const metadata: Metadata = {
  title: "Ist meine Beziehung toxisch? Ein kostenloser Test | CoupleIQ",
  description:
    "Ein kostenloser, privater Test „Ist meine Beziehung toxisch?\". Acht ehrliche Fragen zu den echten Warnzeichen – Verachtung, Kontrolle, Schuldzuweisung, Erschöpfung – und wo du Hilfe findest.",
  alternates: {
    canonical: "https://splitornot.com/de/is-my-relationship-toxic-quiz",
    languages: { en: "https://splitornot.com/is-my-relationship-toxic-quiz", de: "https://splitornot.com/de/is-my-relationship-toxic-quiz", "x-default": "https://splitornot.com/is-my-relationship-toxic-quiz" },
  },
};

export default function IsMyRelationshipToxicQuizPageDe() {
  return (
    <MiniQuizLanding
      locale="de"
      config={MINI_QUIZZES_DE["is-my-relationship-toxic"]}
      safetyNote
      eyebrow="Kostenlos · Privat · 2 Minuten"
      title="Ist meine Beziehung toxisch?"
      lede={"„Toxisch“ wird für alles benutzt, von einer schlechten Woche bis zu echtem Missbrauch. Dieser kostenlose, private Test hilft dir, den Unterschied zu erkennen – ehrlich und mit einem klaren Hinweis, wo die Grenze zur Sicherheit verläuft."}
      sections={[
        {
          heading: "Was Menschen mit einer „toxischen\" Beziehung meinen",
          body: [
            "Die meisten greifen zum Wort „toxisch\", um eine Beziehung zu beschreiben, die sie durchgängig schlechter zurücklässt – kleiner, ängstlich, kritisiert oder wie auf Eierschalen gehend – statt unterstützt und mehr sie selbst. Es geht nicht um den gelegentlichen schlechten Streit; den hat jede Beziehung. Es geht um ein Muster: ein stetes Tröpfeln von Verachtung, Schuldzuweisung, Kontrolle oder Respektlosigkeit, das dein Selbstgefühl über die Zeit abschleift.",
            "Es lohnt sich, genau zu sein, denn das Wort deckt eine große Spanne ab. Manche „toxischen\" Dynamiken sind zwei Menschen, die in einem zersetzenden Muster feststecken, das sie mit Mühe oder Hilfe ändern könnten. Andere gehen in emotionalen Missbrauch, Kontrolle oder Angst über – und das sind keine Beziehungsprobleme zum „Daran-Arbeiten\", sondern Gründe, sich Unterstützung zu holen.",
          ],
        },
        {
          heading: "Die echten Warnzeichen",
          body: [
            "Die Signale, auf die man achten sollte, sind unter anderem: sich nach gemeinsamer Zeit ausgelaugt oder angespannt fühlen; häufige Kritik, Spott oder Verachtung; auf Eierschalen gehen, um eine Reaktion zu vermeiden; immer die:der Schuldige sein; Selbstvertrauen und Selbstgefühl verlieren; und ein:e Partner:in, die:der Stress hinzufügt, statt ihn zu lindern.",
            "Ein Zeichen wiegt besonders schwer: Angst. Wenn du jemals echte Angst vor deinem:r Partner:in hattest – vor dem Temperament, den Drohungen, dem, was sie:er tun könnte –, geht das über „toxisch\" hinaus und betrifft deine Sicherheit, und es verdient eine andere Antwort, als ein Quiz geben kann.",
          ],
        },
        {
          heading: "Ein toxisches Muster ist nicht immer das Ende",
          body: [
            "Wo es keine Angst und keine Kontrolle gibt, können sich manche zersetzenden Muster wirklich umkehren – besonders, wenn beide sie erkennen und bereit sind, sich zu verändern, oft mit einer Paartherapeutin oder einem Paartherapeuten. Der entscheidende Faktor ist meist, ob darunter noch Respekt und guter Wille bestehen und ob beide die Arbeit tun wollen.",
            "Aber du musst dir das Recht, dich sicher und respektiert zu fühlen, nicht verdienen, indem du beweist, dass eine Beziehung „schlimm genug\" ist. Wenn sie dich dein Wohlbefinden kostet, ist das Grund genug, sie ernst zu nehmen.",
          ],
        },
      ]}
      faqs={[
        { q: "Was ist der Unterschied zwischen toxisch und missbräuchlich?", a: "Eine nützliche Grenze sind Angst und Kontrolle. Eine toxische Dynamik lässt dich schlechter fühlen, aber du fühlst dich noch sicher; Missbrauch umfasst Angst, Kontrolle, Einschüchterung oder Gewalt. Wenn davon etwas da ist, behandle es bitte als Sicherheitsfrage, nicht als eine für Paartherapie – siehe die Angebote unten." },
        { q: "Kann eine toxische Beziehung repariert werden?", a: "Manchmal – wo es keinen Missbrauch gibt, beide das Muster erkennen und beide sich ändern wollen, oft mit professioneller Hilfe. Wo Angst oder Kontrolle da sind, haben Sicherheit und Unterstützung Vorrang, nicht das Reparieren der Beziehung." },
        { q: "Ist dieser Test eine Diagnose?", a: "Nein. Er spiegelt deine Sicht an einem Tag und ist ein Anstoß zur ehrlichen Reflexion, keine Diagnose. Wenn dich deine Antworten beunruhigen, ist ein Gespräch mit einer Fachperson – oder, wenn es um Sicherheit geht, eine Hotline – der echte nächste Schritt." },
      ]}
    />
  );
}
