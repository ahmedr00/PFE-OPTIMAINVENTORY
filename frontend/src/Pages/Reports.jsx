import {
  BarChart3,
  Download,
  FileText,
  PieChart,
  TrendingUp,
} from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Rapport d'Inventaire Complet",
      description: "Toutes les fiches avec articles, quantités et écarts",
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      format: "PDF, Excel",
      lastGenerated: "04/04/2026 14:30",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Analyse des Écarts",
      description: "Détails des différences positives et négatives",
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
      format: "PDF, Excel",
      lastGenerated: "04/04/2026 10:15",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "Synthèse par Emplacement",
      description: "Regroupement des résultats par zone/emplacement",
      icon: <PieChart className="w-8 h-8 text-purple-500" />,
      format: "PDF, Excel",
      lastGenerated: "03/04/2026 16:45",
      size: "1.2 MB",
    },
    {
      id: 4,
      title: "Performance des Compteurs",
      description: "Statistiques d'activité et de précision par compteur",
      icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
      format: "PDF, Excel",
      lastGenerated: "03/04/2026 09:20",
      size: "0.9 MB",
    },
  ];

  const handleDownload = (report, format) => {
    toast.success(`Téléchargement démarré`, {
      description: `${report.title} (${format})`,
    });
    console.log(`Downloading report: ${report.title} as ${format}`);
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Rapports et Analyses
        </h1>
        <p className="text-slate-500">
          Téléchargez des rapports détaillés sur vos inventaires et écarts
        </p>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500 mb-1">Rapports Disponibles</p>
            <h3 className="text-3xl font-bold text-slate-900">4</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500 mb-1">Dernier Rapport</p>
            <h3 className="text-lg font-bold text-slate-900">Aujourd'hui</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500 mb-1">Taille Totale</p>
            <h3 className="text-2xl font-bold text-slate-900">6.3 MB</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500 mb-1">Formats</p>
            <div className="flex gap-2 mt-2">
              <Badge>PDF</Badge>
              <Badge>Excel</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{report.icon}</div>
                  <div>
                    <CardTitle className="text-xl mb-2">
                      {report.title}
                    </CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Formats disponibles</p>
                  <p className="font-medium">{report.format}</p>
                </div>
                <div>
                  <p className="text-slate-500">Taille du fichier</p>
                  <p className="font-medium">{report.size}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-slate-500">Dernière génération</p>
                <p className="font-medium">{report.lastGenerated}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  onClick={() => handleDownload(report, "PDF")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger PDF
                </Button>
                <Button
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => handleDownload(report, "Excel")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
