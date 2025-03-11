
import { Card } from "@/types/card";

export const mockCards: Card[] = [
  {
    id: "1",
    type: "qcm",
    title: "Question sur le réchauffement climatique",
    description: "Testez vos connaissances sur le changement climatique",
    question: "Quel gaz est le principal responsable de l'effet de serre intensifié?",
    options: [
      { id: "opt1", text: "Le dioxyde de carbone (CO2)", isCorrect: true },
      { id: "opt2", text: "L'oxygène (O2)", isCorrect: false },
      { id: "opt3", text: "L'azote (N2)", isCorrect: false },
      { id: "opt4", text: "L'hélium (He)", isCorrect: false }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "media",
    title: "Vidéo explicative",
    description: "Regardez cette vidéo pour comprendre l'impact de nos actions sur la planète",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "parent",
    title: "Énergies renouvelables",
    description: "Explorer les différents types d'énergies renouvelables",
    childCards: ["4", "5", "6"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
