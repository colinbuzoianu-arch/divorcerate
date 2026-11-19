import type { Metadata } from "next";
import MiniQuizLanding from "@/components/MiniQuizLanding";
import { MINI_QUIZZES_DE } from "@/lib/quizzes/de";

export const metadata: Metadata = {
  title: "Test zu den vier Reitern: Finde dein Gottman-Konfliktmuster | CoupleIQ",
  description:
    "Ein kostenloser Test auf Basis von Gottmans vier Reitern – Kritik, Verachtung, Abwehr und Mauern. Finde heraus, welcher in euren Streits am meisten auftaucht, und das Gegenmittel.",
  alternates: {
    canonical: "https://splitornot.com/de/four-horsemen-quiz",
    languages: { en: "https://splitornot.com/four-horsemen-quiz", de: "https://splitornot.com/de/four-horsemen-quiz", "x-default": "https://splitornot.com/four-horsemen-quiz" },
  },
};

export default function FourHorsemenQuizPageDe() {
  return (
    <MiniQuizLanding
      locale="de"
      config={MINI_QUIZZES_DE["four-horsemen"]}
      eyebrow="Kostenlos · Privat · 2 Minuten"
      title="Der Test zu den vier Reitern"
      lede="Der Beziehungsforscher John Gottman benannte vier Konfliktgewohnheiten als so schädlich, dass er sie die vier Reiter nannte. Dieser kostenlose Test zeigt dir, welcher bei dir am ehesten auftaucht – und das Gegenmittel, das ihm entgegenwirkt."
      sections={[
        {
          heading: "Was sind die vier Reiter?",
          body: [
            "Über Jahrzehnte, in denen er Paare in seinem Labor streiten sah, fand John Gottman heraus: Nicht ob Paare stritten, nicht einmal wie oft, sagte Probleme voraus – sondern wie sie stritten. Vier bestimmte Gewohnheiten tauchten in ringenden Beziehungen immer wieder auf, und er nannte sie die vier apokalyptischen Reiter: Kritik, Verachtung, Abwehr und Mauern.",
            "Die gute Nachricht: Jeder Reiter hat ein „Gegenmittel\" – eine konkrete, erlernbare Alternative. Zu erkennen, auf welchen du dich stützt, ist der erste Schritt, ihn gegen etwas zu tauschen, das wirklich funktioniert.",
          ],
        },
        {
          heading: "Die vier – und ihre Gegenmittel",
          body: [
            "Kritik greift den Charakter deiner:deines Partner:in an („du immer\", „du nie\"), statt ein konkretes Verhalten zu benennen. Das Gegenmittel ist ein sanfter Einstieg: Sag, was du fühlst und was du zur konkreten Sache brauchst.",
            "Verachtung – Sarkasmus, Spott, Augenrollen, Geringschätzung – ist der zersetzendste der vier und der stärkste Hinweis auf eine Trennung in Gottmans Forschung. Das Gegenmittel ist, Zuneigung und Respekt bewusst wiederaufzubauen und die eigenen Gefühle zu beschreiben, statt die der:des anderen anzugreifen.",
            "Abwehr heißt, eine Beschwerde durch Gegenangriff oder Ausreden abzuwehren. Das Gegenmittel ist, auch nur einen kleinen Teil des Problems zu übernehmen. Mauern ist Dichtmachen und Rückzug, meist weil du überflutet bist; das Gegenmittel ist, das zu sagen und eine echte Pause zu machen, bevor du zurückkommst.",
          ],
        },
        {
          heading: "Ein Reiter heißt nicht, dass ihr verloren seid",
          body: [
            "Fast jedes Paar zeigt ab und zu einen Reiter – besonders unter Stress. Entscheidend ist das Gleichgewicht: ob Wärme, Versöhnung und Respekt die zersetzenden Momente immer noch weit überwiegen, und ob ihr die Gewohnheit bemerken und umkehren könnt. Paare, die sich gut versöhnen, tragen den gelegentlichen Reiter ohne großen Schaden; Paare, bei denen Verachtung zum Wetter wird, sind die in echter Gefahr.",
            "Dieser Test spiegelt deine Tendenzen an einem Tag. Der vollständige Beziehungstest betrachtet das ganze Bild – darunter Verachtung und Versöhnung als zwei seiner acht Dimensionen – und benennt dein gesamtes Muster.",
          ],
        },
      ]}
      faqs={[
        { q: "Welcher Reiter ist der schlimmste?", a: "Verachtung. In Gottmans Forschung ist sie der stärkste einzelne Hinweis auf ein Scheitern der Beziehung, weil sie das Gefühl angreift, überhaupt wertgeschätzt zu sein. Wenn Verachtung dein Ergebnis ist, ist sie die, die man am ehesten ernst nehmen sollte." },
        { q: "Ist das der offizielle Gottman-Test?", a: "Nein. Dies ist ein unabhängiger, bildender Test, inspiriert vom Konzept der vier Reiter aus Gottmans veröffentlichter Arbeit. Es ist ein Werkzeug zur Reflexion, kein offizielles oder klinisches Instrument." },
        { q: "Kann man die vier Reiter beheben?", a: "Ja – jeder hat ein konkretes Gegenmittel, und viele Paare verringern sie mit Übung oder mit einer Paartherapeutin oder einem Paartherapeuten. Verachtung braucht meist die bewussteste Arbeit, weil sie bedeutet, Zuneigung und Respekt über die Zeit wiederaufzubauen." },
      ]}
    />
  );
}
