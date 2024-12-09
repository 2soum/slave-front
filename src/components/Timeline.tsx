import React from "react";

// Définir le type pour les événements
type Event = {
  title: string;
  description: string;
  date: string;
  status: "completed" | "cancelled" | "pending";
};

// Tableau d'événements
const events: Event[] = [
  {
    title: "Lancement de l'application",
    description: "Déploiement de la version initiale.",
    date: "2024-01-15",
    status: "completed",
  },
  {
    title: "Ajout de nouvelles fonctionnalités",
    description: "Mise à jour avec de nouvelles fonctionnalités.",
    date: "2024-03-01",
    status: "pending",
  },
  {
    title: "Événement annulé",
    description: "Cet événement a été annulé.",
    date: "2024-05-10",
    status: "cancelled",
  },
];

const Timeline: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Timeline</h2>
      <ol className="relative border-l border-gray-200">
        {events.map((event, index) => {
          // Déterminer la couleur en fonction de l'état de l'événement
          const statusColor =
            event.status === "completed"
              ? "bg-green-500"
              : event.status === "cancelled"
              ? "bg-red-500"
              : "bg-gray-400";

          return (
            <li key={index} className="mb-10 ml-6">
              {/* Cercle pour indiquer l'état */}
              <span
                className={`absolute flex items-center justify-center w-8 h-8 -left-4 rounded-full ${statusColor}`}
              ></span>

              {/* Titre de l'événement */}
              <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">
                {event.title}
              </h3>

              {/* Date de l'événement */}
              <time className="block mb-2 text-sm font-normal text-gray-400">
                {event.date}
              </time>

              {/* Description de l'événement */}
              <p className="text-base font-normal text-gray-500">
                {event.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Timeline;