import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaHourglass } from "react-icons/fa"; // Importer les icônes

// Définir le type pour les événements
type Event = {
  title: string;
  description: string;
  date: string;
  status: "completed" | "cancelled" | "pending";
};

// Tableau d'événements
const sprintEvents: Event[] = [
  // Sprint 0
  {
    title: "Reconnaissance vocale avec Google Speech-to-Text",
    description: "Tâche annulée.",
    date: "2024-10-18",
    status: "cancelled",
  },
  {
    title: "Interface graphique avec Tkinter",
    description: "Tâche annulée.",
    date: "2024-10-18",
    status: "cancelled",
  },
  {
    title: "Banque de couleurs en dictionnaire",
    description: "Tâche annulée.",
    date: "2024-10-18",
    status: "cancelled",
  },
  {
    title: "Filtre anti-bruit",
    description: "Tâche annulée -> Développement d'une API.",
    date: "2024-10-18",
    status: "cancelled",
  },
  {
    title: "Rapport",
    description: "Rapport final terminé.",
    date: "2024-10-18",
    status: "completed",
  },
  // Sprint 1
  {
    title: "Reconnaissance vocale avec Speech Recognition",
    description: "Tâche terminée avec succès.",
    date: "2024-11-15",
    status: "completed",
  },
  {
    title: "Variations linguistiques (verre/vert)",
    description: "Fonctionnalité terminée.",
    date: "2024-11-15",
    status: "completed",
  },
  {
    title: "Interface graphique",
    description: "Tâche en cours.",
    date: "2024-11-15",
    status: "pending",
  },
  {
    title: "Tests fonctionnels",
    description: "Tâche en cours.",
    date: "2024-11-15",
    status: "pending",
  },
  // Sprint 2
  {
    title: "Onglet Sprint",
    description: "Fonctionnalité terminée.",
    date: "2024-12-13",
    status: "completed",
  },
  {
    title: "Onglet RoadMap",
    description: "Fonctionnalité terminée.",
    date: "2024-12-13",
    status: "completed",
  },
  {
    title: "Main",
    description: "Développement en cours.",
    date: "2024-12-13",
    status: "pending",
  },
  {
    title: "API - Couleurs",
    description: "Développement en cours.",
    date: "2024-12-13",
    status: "pending",
  },
];

const Timeline: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const intervals = sprintEvents.map((_, index) =>
      setTimeout(() => {
        setVisibleSteps((prevSteps) => [...prevSteps, index]);
      }, index * 350) // Further reduced the timing for faster appearance
    );

    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full px-4">
      <style>
        {`
          @keyframes fadeInSlideDown {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .fadeInSlideDown {
            animation: fadeInSlideDown 2s ease-in forwards;
          }
        `}
      </style>
      <div className="grid grid-cols-3 w-full">
        <div className="border-none"></div>

        {/* Colonne centrale avec la timeline */}
        <ol className="relative border-l border-gray-200 col-span-1 mx-auto">
          {sprintEvents.map((event, index) => {
            if (!visibleSteps.includes(index)) return null;
            // Déterminer la couleur en fonction de l'état de l'événement
            const statusColor =
                event.status === "completed"
                    ? "bg-green-500 bg-opacity-30"
                    : event.status === "cancelled"
                        ? "bg-blue-500 bg-opacity-30"
                        : "bg-yellow-400 bg-opacity-30";

            // Choisir l'icône en fonction de l'état de l'événement
            const statusIcon =
                event.status === "completed"
                    ? <FaCheckCircle className="text-green-500" />
                    : event.status === "cancelled"
                        ? <FaTimesCircle className="text-blue-500" />
                        : <FaHourglass className="text-yellow-400" />;

            return (
                <li key={index} className="mb-10 ml-6 fadeInSlideDown" >
                  {/* Cercle pour indiquer l'état */}
                  <span
                      className={`absolute flex items-center justify-center w-8 h-8 -left-4 rounded-full ${statusColor}`}
                  >
                {statusIcon} {/* Affichage de l'icône */}
              </span>

                  {/* Titre de l'événement */}
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-white ">
                    {event.title}
                  </h3>

                  {/* Date de l'événement */}
                  <time className="block mb-2 text-sm font-normal text-gray-300">
                    {event.date}
                  </time>

                  {/* Description de l'événement dans un encadré transparent */}
                  <div className={`p-4 rounded-md border ${statusColor}`}>
                    <p className="text-base font-normal text-white">
                      {event.description}
                    </p>
                  </div>
                </li>
            );
          })}
        </ol>

        <div className="border-none"></div>
      </div>
    </div>
  );
};

export default Timeline;
