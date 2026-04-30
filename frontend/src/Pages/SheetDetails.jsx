import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  Send,
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
import { useArticleStore } from "../store/articleStore";
const SheetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { articles, fetchArticles } = useArticleStore();
  useEffect(() => {
    fetchArticles(id);
  }, [id, fetchArticles]);

  // Logic to get data from Store
  const { sheets, fetchSheets, loading } = useSheetStore();
  const sheet = sheets.find((s) => s._id === id);

  // States for the selectors (kept as per your UI)
  const [compteur1, setCompteur1] = useState("");
  const [compteur2, setCompteur2] = useState("");

  useEffect(() => {
    if (!sheet) {
      fetchSheets();
    } else {
      // Initialize counters if they exist in the DB
      setCompteur1(sheet.compteur1 || "");
      setCompteur2(sheet.compteur2 || "");
    }
  }, [id, sheet, fetchSheets]);

  if (loading) return <div className="p-8 text-white">Chargement...</div>;
  if (!sheet) return <div className="p-8 text-white">Fiche introuvable.</div>;

  // Calculation for your progress bar
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

      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{sheet.name}</CardTitle>
              <div className="flex items-center text-sm text-slate-500">
                <span className="font-mono mr-4">ID: {sheet._id}</span>
                <span>
                  Créé le:{" "}
                  {new Date(sheet.createdAt).toLocaleDateString("en-US")}
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
                <span className="text-slate-600 font-medium">
                  Progression du comptage
                </span>
                <span className="font-bold">{progressValue}%</span>
              </div>
              <Progress value={progressValue} className="h-2" />
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-500 uppercase font-semibold">
                    Total
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    {sheet.totalArticles}
                  </p>
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

        {/* Counter Assignment Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assignation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Compteur 1
              </label>
              <Select value={compteur1} onValueChange={setCompteur1}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marie.dubois@company.fr">
                    Marie Dubois
                  </SelectItem>
                  <SelectItem value="jean.moreau@company.fr">
                    Jean Moreau
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Compteur 2 (Optionnel)
              </label>
              <Select value={compteur2} onValueChange={setCompteur2}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucun</SelectItem>
                  <SelectItem value="jean.moreau@company.fr">
                    Jean Moreau
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-100 rounded-md">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <p className="text-xs text-orange-700">
                  {sheet.ecarts > 0
                    ? "Écarts détectés : nécessite une validation."
                    : "Aucun écart majeur détecté."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
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
              {/* Note: Mapping over sheet.articles if they exist in your DB schema */}
              {articles?.length > 0 ? (
                articles.map((article, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {article.reference || "REF-" + index}
                    </TableCell>
                    <TableCell>
                      {article.designation || "Article Name"}
                    </TableCell>
                    <TableCell className="text-right">
                      {article.stock || 0}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {article.counted || 0}
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold ${getDifferenceColor(article.diff || 0)}`}
                    >
                      {(article.diff || 0) > 0 ? "+" : ""}
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
                    Aucun article trouvé dans cette fiche.
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
