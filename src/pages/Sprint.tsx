// src/pages/Sprint.tsx
import BackgroundSVG from '../components/SVGPackage';

const sprintsData = [
  {
    sprintNumber: 0,
    duration: "1 semaine",
    startDate: "11-10-2024",
    endDate: "18-10-2024",
    completedTasks: [
      {
        title: "Reconnaissance vocale",
        status: "terminé",
        points: 8,
        owner: "Ali"
      },
      {
        title: "Interface graphique",
        status: "terminé",
        points: 5,
        owner: "Sahkana"
      },
      {
        title: "Banque de couleurs",
        status: "terminé",
        points: 6,
        owner: "Ahmed"
      },
      {
        title: "Filtre anti bruit",
        status: "terminé",
        points: 8,
        owner: "Dayssam"
      },
      {
        title: "Rapport",
        status: "terminé",
        points: 7,
        owner: "Nam et Luka"
      }
    ],
    metrics: {
      totalPoints: 34,
      completedPoints: 34,
      burndownEfficiency: 100
    },
    pdfLink: "../reports/Sprint0.pdf"
  },
  {
    sprintNumber: 1,
    duration: "1 mois",
    startDate: "18-10-2024",
    endDate: "18-11-2024",
    completedTasks: [
      {
        title: "Reconnaissance vocale",
        status: "terminé",
        points: 10,
        owner: "Ali et Ahmed"
      },
      {
        title: "Variations linguistiques",
        status: "terminé",
        points: 8,
        owner: "Nam"
      },
      {
        title: "Interface graphique",
        status: "en cours",
        points: 7,
        owner: "Sahkana et Dayssam"
      },
      {
        title: "Tests fonctionnels",
        status: "en cours",
        points: 5,
        owner: "Luka"
      }
    ],
    metrics: {
      totalPoints: 30,
      completedPoints: 30,
      burndownEfficiency: 100
    },
    pdfLink: "../reports/Sprint1.pdf"
  },
  {
    sprintNumber: 2,
    duration: "1 mois environ",
    startDate: "18-11-2024",
    endDate: "13-12-2024",
    completedTasks: [
      {
        title: "Onglet Sprint",
        status: "terminé",
        points: 3,
        owner: "Sahkana"
      },
      {
        title: "Onglet RoadMap",
        status: "terminé",
        points: 5,
        owner: "Ahmed"
      },
      {
        title: "Main",
        status: "en cours",
        points: 7,
        owner: "Dayssam, Luka et Ali"
      },
      {
        title: "API - Couleurs",
        status: "en cours",
        points: 5,
        owner: "Nam, Luka et Ali"
      }
    ],
    metrics: {
      totalPoints: 20,
      completedPoints: 20,
      burndownEfficiency: 100
    },
    pdfLink: "../reports/Rapport.pdf"
  }
];

const Sprint = () => {
  return (
      <div className="min-h-screen relative">
        <BackgroundSVG />
        <div className="relative z-10 pt-24 px-4 container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Sprints</h1>
            <p className="text-slate-300">Suivez tous les sprints de notre projet</p>
          </div>

          {/* Affichage des sprints */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-screen-2xl">
            {sprintsData.map((sprint, sprintIndex) => (
                <div key={sprintIndex} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold text-white mb-2">Sprint {sprint.sprintNumber}</h2>
                    <p className="text-slate-300">
                      Du {sprint.startDate} au {sprint.endDate} ({sprint.duration})
                    </p>
                  </div>

                  {/* Sprint Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12">
                    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
                      <h3 className="text-slate-300 mb-2">Points totaux</h3>
                      <p className="text-3xl font-bold text-white">{sprint.metrics.totalPoints}</p>
                    </div>
                    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
                      <h3 className="text-slate-300 mb-2">Terminé</h3>
                      <p className="text-3xl font-bold text-white">{sprint.metrics.completedPoints}</p>
                    </div>
                    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
                      <h3 className="text-slate-300 mb-2">Efficacité</h3>
                      <p className="text-3xl font-bold text-white">{sprint.metrics.burndownEfficiency}%</p>
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 py-10 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-white mb-6">Tâches du sprint</h3>
                    <div className="space-y-4">
                      {sprint.completedTasks.map((task, taskIndex) => (
                          <div key={taskIndex}
                               className="flex items-center justify-between border-b border-gray-700 pb-4">
                            <div>
                              <h3 className="text-white font-medium">{task.title}</h3>
                              <p className="text-slate-400">Assigné à {task.owner}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                                {task.points} pts
                              </span>

                              <span className={`px-3 py-1 rounded-full text-sm ${
                                  task.status === 'terminé' ? 'bg-green-500 text-green-100' :
                                      task.status === 'en cours' ? 'bg-blue-500 text-blue-100' :
                                          'bg-yellow-500 text-yellow-100'
                              }`}> {task.status}
                              </span>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Lien vers le fichier PDF du sprint */}
                  {sprint.pdfLink && (
                      <div className="text-center mt-6">
                        <a
                            href={sprint.pdfLink}
                            className="text-blue-500 hover:text-blue-700 font-bold"
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                          Télécharger le sprint {sprint.sprintNumber} (PDF)
                        </a>
                      </div>
                  )}
                </div>
            ))}
          </div>

        </div>
      </div>
  );
};

export default Sprint;
