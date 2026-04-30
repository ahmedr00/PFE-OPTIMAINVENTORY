import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Download, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import Input from "../components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";
import { Badge } from "../components/Badge";
import { useSheetStore } from "../store/sheetStore";
import CreateSheetUI from "./CreateSheetUI";

const InventorySheet = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Destructure fetchSheets and sheets from your store
  const { fetchSheets, sheets, loading } = useSheetStore();
  const { deleteSheet } = useSheetStore(); // Added deleteSheet from store
  const { createSheet } = useSheetStore(); // Added createSheet from store

  const handleDeleteSheet = async (e, id) => {
    e.stopPropagation(); // Prevent row click
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette fiche ?")) {
      await useSheetStore.getState().deleteSheet(id);
    }
  };

  // Trigger the fetch when the component mounts
  useEffect(() => {
    fetchSheets();
  }, [fetchSheets]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Complété":
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "En cours":
      case "in_progress": // Matches your backend default status
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Comptage 1":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "Comptage 2":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "Préparation":
        return "bg-slate-100 text-slate-700 border-slate-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Filter logic updated to handle empty states safely
  const filteredSheets = sheets.filter((sheet) => {
    const name = sheet.name || "";
    const id = sheet._id || "";

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || sheet.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Fiches d'Inventaire
          </h1>
          <p className="text-slate-500">
            Gérez et suivez toutes vos fiches d'inventaire
          </p>
        </div>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600"
          onClick={() => setIsModalOpen(true)} // Toggle Modal
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle Fiche
        </Button>
        <CreateSheetUI
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={createSheet}
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                icon={Search}
                type="text"
                placeholder="Rechercher par nom ou ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-64 h-12">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="completed">Complété</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {loading
              ? "Chargement..."
              : `${filteredSheets.length} Fiche${filteredSheets.length !== 1 ? "s" : ""}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom de la Fiche</TableHead>
                <TableHead>Date Création</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Compteur 1</TableHead>
                <TableHead className="text-right">Articles</TableHead>
                <TableHead className="text-right">Écarts</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading &&
                filteredSheets.map((sheet) => (
                  <TableRow
                    key={sheet._id} // Using MongoDB _id
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => navigate(`/app/sheets/${sheet._id}`)}
                  >
                    <TableCell className="font-medium text-xs truncate max-w-[100px]">
                      {sheet._id}
                    </TableCell>
                    <TableCell>{sheet.name}</TableCell>
                    <TableCell className="text-slate-500">
                      {sheet.createdAt
                        ? new Date(sheet.createdAt).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(sheet.status)}
                      >
                        {sheet.status === "in_progress"
                          ? "En cours"
                          : sheet.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {sheet.compteur1 || (
                        <span className="text-slate-400">Non assigné</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-medium">
                        {sheet.countedArticles || 0}
                      </span>
                      <span className="text-slate-400">
                        {" "}
                        / {sheet.totalArticles}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {sheet.ecarts > 0 ? (
                        <Badge variant="destructive">{sheet.ecarts}</Badge>
                      ) : (
                        <span className="text-slate-400">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={(e) => handleDeleteSheet(e, sheet._id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {!loading && filteredSheets.length === 0 && (
            <div className="text-center py-10 text-slate-500">
              Aucune fiche trouvée.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventorySheet;
