
import { Card } from "@/types/card";

export const mockCards: Card[] = [
  {
    id: "1",
    type: "qcm",
    title: "Question sur le réchauffement climatique",
    description: "Testez vos connaissances sur le changement climatique",
    question: "Quel gaz est le principal responsable de l'effet de serre intensifié?",
    options: ["Le dioxyde de carbone (CO2)", "L'oxygène (O2)", "L'azote (N2)", "L'hélium (He)"],
    correctAnswer: 0
  },
  {
    id: "2",
    type: "media",
    title: "Vidéo explicative",
    description: "Regardez cette vidéo pour comprendre l'impact de nos actions sur la planète",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "3",
    type: "parent",
    title: "Énergies renouvelables",
    description: "Explorer les différents types d'énergies renouvelables",
    childrenIds: ["4", "5", "6"]
  },
  {
    id: "4",
    type: "media",
    title: "Énergie solaire",
    description: "Tout savoir sur l'énergie solaire",
    mediaType: "url",
    mediaUrl: "https://fr.wikipedia.org/wiki/%C3%89nergie_solaire"
  },
  {
    id: "5",
    type: "media",
    title: "Énergie éolienne",
    description: "Découvrez l'énergie éolienne",
    mediaType: "url",
    mediaUrl: "https://fr.wikipedia.org/wiki/%C3%89nergie_%C3%A9olienne"
  },
  {
    id: "6",
    type: "qcm",
    title: "Quiz sur les énergies renouvelables",
    description: "Un petit quiz pour tester vos connaissances",
    question: "Laquelle de ces énergies n'est pas renouvelable?",
    options: ["Géothermie", "Solaire", "Nucléaire", "Hydroélectrique"],
    correctAnswer: 2
  },
  {
    id: "7",
    type: "media",
    title: "Guide de l'écologie pratique",
    description: "Un guide complet au format PDF",
    mediaType: "pdf",
    mediaUrl: "https://example.com/ecologie.pdf"
  }
];
