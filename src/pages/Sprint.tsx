// src/pages/Sprint.tsx
import BackgroundSVG from '../components/SVGPackage';

const Sprint = () => {
  const sprintData = {
    sprintNumber: 3,
    duration: "2 weeks",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    completedTasks: [
      {
        title: "User Authentication",
        status: "completed",
        points: 8,
        owner: "Alex"
      },
      {
        title: "Dashboard Design",
        status: "completed",
        points: 5,
        owner: "Sarah"
      },
      {
        title: "API Integration",
        status: "in-progress",
        points: 13,
        owner: "Mike"
      },
      {
        title: "Testing Suite",
        status: "in-review",
        points: 8,
        owner: "Emma"
      }
    ],
    metrics: {
      totalPoints: 34,
      completedPoints: 21,
      burndownEfficiency: 85
    }
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundSVG />
      <div className="relative z-10 pt-24 px-4 container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Sprint {sprintData.sprintNumber}</h1>
          <p className="text-slate-300">
            {sprintData.startDate} to {sprintData.endDate} ({sprintData.duration})
          </p>
        </div>

        {/* Sprint Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-slate-300 mb-2">Total Points</h3>
            <p className="text-3xl font-bold text-white">{sprintData.metrics.totalPoints}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-slate-300 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-white">{sprintData.metrics.completedPoints}</p>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-slate-300 mb-2">Efficiency</h3>
            <p className="text-3xl font-bold text-white">{sprintData.metrics.burndownEfficiency}%</p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">Sprint Tasks</h2>
          <div className="space-y-4">
            {sprintData.completedTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-700 pb-4">
                <div>
                  <h3 className="text-white font-medium">{task.title}</h3>
                  <p className="text-slate-400">Assigned to {task.owner}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                    {task.points} pts
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    task.status === 'completed' ? 'bg-green-500 text-green-100' :
                    task.status === 'in-progress' ? 'bg-blue-500 text-blue-100' :
                    'bg-yellow-500 text-yellow-100'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sprint;