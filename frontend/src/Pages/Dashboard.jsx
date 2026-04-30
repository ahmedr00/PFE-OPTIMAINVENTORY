import {
  AlertCircle,
  Package,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { act } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import { Progress } from "../components/Progress";
import { Badge } from "../components/Badge";
import { useSheetStore } from "../store/sheetStore";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { sheets, fetchSheets } = useSheetStore();
  const { users, fetchUsers } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSheets();
    fetchUsers();
  }, []);

  const userCount = users.length;

  const activeSheetsCount = sheets.filter(
    (sheet) => sheet.status !== "Terminé",
  ).length;
  const totalSheetsCount = sheets.length;
  const completionRate = totalSheetsCount
    ? Math.round((activeSheetsCount / totalSheetsCount) * 100)
    : 0;
  const sheetEcarts = sheets
    .flatMap((s) => s.ecarts)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const kpis = [
    {
      title: "Fiches Actives",
      value: activeSheetsCount,
      change: `${activeSheetsCount - totalSheetsCount} par rapport au mois dernier`,
      icon: <Package className="w-8 h-8 text-emerald-500" />,
      trend: "up",
    },
    {
      title: "Taux de Complétion",
      value: completionRate,
      change: "En hausse de 5% par rapport au mois dernier",
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      trend: "up",
    },
    {
      title: "Compteurs Actifs",
      value: userCount,
      change: `${userCount} en ligne`,
      icon: <Users className="w-8 h-8 text-purple-500" />,
      trend: "stable",
    },
    {
      title: "Écarts Détectés",
      value: sheetEcarts,
      change: "Nécessite attention",
      icon: <AlertCircle className="w-8 h-8 text-orange-500" />,
      trend: "warning",
    },
  ];

  const recentSheets = sheets.slice(0, 5).map((sheet) => ({
    id: sheet._id,
    name: sheet.name,
    status: sheet.status,
    compteur: sheet.compteur,
    progress: sheet.progress,
  }));
  /*console.log(
  new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit' }).format(new Date(sheets[0]?.createdAt)))*/

  const syncStatus = {
    lastSync: "04/04/2026 14:35",
    status: "Connecté",
    nextSync: "Dans 25 minutes",
    recordsSynced: 1247,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Complété":
        return "bg-green-100 text-green-700 border-green-300";
      case "En cours":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Comptage 1":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "Préparation":
        return "bg-slate-100 text-slate-700 border-slate-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const chartData = [
    { month: "Jan", comptages: 12 },
    { month: "Fév", comptages: 18 },
    { month: "Mar", comptages: 15 },
    { month: "Avr", comptages: 24 },
    { month: "Mai", comptages: 20 },
    { month: "Jun", comptages: 28 },
  ];
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">{kpi.title}</p>
                  <h3 className="text-3xl font-bold text-slate-900">
                    {kpi.value}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2">{kpi.change}</p>
                </div>
                <div>{kpi.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Activité de comptage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(160,84%,39%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(160,84%,39%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(214,32%,91%)"
                />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "hsl(215,16%,47%)" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "hsl(215,16%,47%)" }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="comptages"
                  stroke="hsl(160,84%,39%)"
                  fill="url(#emeraldGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Sage Sync Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              État Sage 100
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-green-700">
                {syncStatus.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Dernière synchro:</span>
                <span className="font-medium">{syncStatus.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Prochaine synchro:</span>
                <span className="font-medium">{syncStatus.nextSync}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Enregistrements:</span>
                <span className="font-medium">{syncStatus.recordsSynced}</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-slate-500 mb-2">
                Synchronisation automatique active
              </p>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fiches Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSheets.map((sheet) => (
              <div
                key={sheet.id}
                className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div
                  className="flex-1"
                  onClick={() => navigate(`/app/sheets/${sheet.id}`)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-slate-900">
                      {sheet.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className={getStatusColor(sheet.status)}
                    >
                      {sheet.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    ID: {sheet.id} • Compteur: {sheet.compteur}
                  </p>
                </div>
                <div className="w-48">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">Progression</span>
                    <span className="font-medium">{sheet.progress}%</span>
                  </div>
                  <Progress value={sheet.progress} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
