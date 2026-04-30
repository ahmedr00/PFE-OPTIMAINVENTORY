import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/Card";
import { CheckCircle, ChevronRight, Clock, Package } from "lucide-react";
import { Badge } from "../../components/Badge";
import { Progress } from "../../components/Progress";

const MobileHome = () => {
  const navigate = useNavigate();

  const tasks = [
    {
      id: "INV-2026-001",
      name: "Inventaire Entrepôt A",
      totalArticles: 450,
      countedArticles: 293,
      assignedDate: "01/04/2026",
      status: "En cours",
      priority: "Haute",
    },
    {
      id: "INV-2026-002",
      name: "Inventaire Magasin Principal",
      totalArticles: 320,
      countedArticles: 96,
      assignedDate: "02/04/2026",
      status: "En cours",
      priority: "Normale",
    },
    {
      id: "INV-2026-003",
      name: "Contrôle Stock Mensuel",
      totalArticles: 180,
      countedArticles: 180,
      assignedDate: "28/03/2026",
      status: "Complété",
      priority: "Basse",
    },
  ];

  const getProgress = (task) => {
    return Math.round((task.countedArticles / task.totalArticles) * 100);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Haute":
        return "bg-red-100 text-red-700 border-red-300";
      case "Normale":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Basse":
        return "bg-slate-100 text-slate-700 border-slate-300";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Bienvenue, Marie</h2>
        <p className="text-emerald-50 mb-4">
          Vous avez {tasks.filter((t) => t.status !== "Complété").length} tâches
          en cours
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-emerald-100 text-xs mb-1">Articles Comptés</p>
            <p className="text-2xl font-bold">569</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-emerald-100 text-xs mb-1">Taux de Complétion</p>
            <p className="text-2xl font-bold">76%</p>
          </div>
        </div>
      </div>
      {/* Tasks Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-3 px-1">
          Mes Tâches Assignées
        </h3>

        <div className="space-y-3">
          {tasks.map((task) => {
            const progress = getProgress(task);
            const isCompleted = task.status === "Complété";

            return (
              <Card
                key={task.id}
                className="shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() =>
                  !isCompleted && navigate(`/mobile/count/${task.id}`)
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900">
                          {task.name}
                        </h4>
                        {isCompleted && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500">ID: {task.id}</p>
                    </div>
                    {!isCompleted && (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  <div className="flex gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className={getPriorityColor(task.priority)}
                    >
                      {task.priority}
                    </Badge>
                    {isCompleted ? (
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        Complété
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                        En cours
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Package className="w-4 h-4" />
                        <span>
                          {task.countedArticles} / {task.totalArticles} articles
                        </span>
                      </div>
                      <span className="font-bold text-slate-900">
                        {progress}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>Assigné le {task.assignedDate}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
