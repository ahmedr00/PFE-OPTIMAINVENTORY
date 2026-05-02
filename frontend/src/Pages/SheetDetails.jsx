import React, { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Plus,
  Send,
  UserPlus,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Badge } from "../components/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Select";
import { Progress } from "../components/Progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";
import { useSheetStore } from "../store/sheetStore";
import { useUserStore } from "../store/userStore";

const SheetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Store Logic
  const {
    currentSheet: sheet,
    getSingleSheet,
    loading,
    assignCompteur,
  } = useSheetStore();
  const { fetchCounters, counters } = useUserStore();

  // 2. Local States
  const [selectedCompteur, setSelectedCompteur] = useState("");

  const [showAddAction, setShowAddAction] = useState(false);

  // 3. Fetch Data on Mount
  useEffect(() => {
    if (id) {
      getSingleSheet(id);
    }
    fetchCounters();
  }, [id, getSingleSheet, fetchCounters]);

  if (loading) return <div className="p-8 text-white">Chargement...</div>;
  if (!sheet) return <div className="p-8 text-white">Fiche introuvable.</div>;

  const progressValue =
    Math.round((sheet.countedArticles / sheet.totalArticles) * 100) || 0;

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  const getDifferenceColor = (diff) => {
    if (diff === 0) return "text-slate-600";
    return diff > 0 ? "text-green-600" : "text-red-600";
  };
  const handleAddCounter = async () => {
    console.log("Selected Compteur:", selectedCompteur);
    if (!selectedCompteur) return;

    // We pass the ID and the name; the backend will push this to the assignedCompteurs array[cite: 8]
    await assignCompteur(id, selectedCompteur);
    await getSingleSheet(id);

    // Reset selection and hide the dropdown after success
    setSelectedCompteur("");
    setShowAddAction(false);
  };

  const steps = [
    {
      n: 1,
      label: "Comptage 1",
      status: sheet.status === "in_progress" ? "active" : "completed",
      compteur: sheet.compteur1 || "Non assigné",
      date: "—",
    },
    {
      n: 2,
      label: "Comptage 2",
      status: "pending",
      compteur: sheet.compteur2 || "—",
      date: "—",
    },
    { n: 3, label: "Validation", status: "pending", compteur: "—", date: "—" },
  ];
  console.log("Current Sheet Data:", sheet.assignedCompteurs);

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/app/sheets")}
          className="text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux fiches
        </Button>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Send className="w-4 h-4 mr-2" />
            Valider l'étape
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{sheet.name}</CardTitle>
              <div className="flex items-center text-sm text-slate-500">
                <span className="font-mono mr-4">ID: {sheet._id}</span>
                <span>
                  Créé le: {new Date(sheet.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Badge className={getStatusColor(sheet.status)}>
              {sheet.status === "in_progress" ? "En cours" : sheet.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 font-medium">Progression</span>
                <span className="font-bold">{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500 uppercase font-semibold">
                    Total
                  </p>
                  <p className="text-xl font-bold">{sheet.totalArticles}</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-500 uppercase font-semibold">
                    Comptés
                  </p>
                  <p className="text-xl font-bold text-blue-700">
                    {sheet.countedArticles}
                  </p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-xs text-red-500 uppercase font-semibold">
                    Écarts
                  </p>
                  <p className="text-xl font-bold text-red-700">
                    {sheet.ecarts}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps/Etapes Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Équipe de comptage
            </CardTitle>
            <UserPlus className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 1. List existing counters from the assignedCompteurs array[cite: 8, 10] */}
            <div className="space-y-2">
              {sheet.assignedCompteurs?.length > 0 ? (
                sheet.assignedCompteurs.map((name, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded-md border border-slate-100"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {name}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] uppercase bg-white"
                    >
                      Actif
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Aucun compteur assigné à cette fiche.
                </p>
              )}
            </div>

            {/* 2. CHANGE: Conditional UI for adding a new counter[cite: 9, 10] */}
            {showAddAction ? (
              <div className="mt-4 p-3 border-2 border-dashed border-emerald-100 rounded-lg bg-emerald-50/30 space-y-3">
                <Select
                  value={selectedCompteur}
                  onValueChange={setSelectedCompteur}
                >
                  <SelectTrigger className="h-9 bg-white">
                    <SelectValue placeholder="Choisir un compteur" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Only show users with the role 'compteur'[cite: 7] */}
                    {counters?.map((user) => (
                      <SelectItem key={user._id} value={user.name}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddCounter}
                    className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
                    disabled={!selectedCompteur}
                  >
                    Confirmer
                  </Button>
                  <Button
                    onClick={() => setShowAddAction(false)}
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowAddAction(true)}
                className="w-full border-dashed border-2 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 py-6"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un intervenant
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Articles à inventorier</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Désignation</TableHead>
                <TableHead className="text-right">Stock Sage</TableHead>
                <TableHead className="text-right">Compté</TableHead>
                <TableHead className="text-right">Écart</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sheet.articles?.length > 0 ? (
                sheet.articles.map((article) => (
                  <TableRow key={article._id}>
                    <TableCell className="font-medium">
                      {article.reference}
                    </TableCell>
                    <TableCell>{article.designation}</TableCell>
                    <TableCell className="text-right">
                      {article.stock}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {article.counted || 0}
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${getDifferenceColor(article.diff || 0)}`}
                    >
                      {article.diff > 0 ? "+" : ""}
                      {article.diff || 0}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={article.diff === 0 ? "outline" : "destructive"}
                      >
                        {article.diff === 0 ? "Conforme" : "Écart"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-slate-400"
                  >
                    Aucun article lié.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SheetDetails;
