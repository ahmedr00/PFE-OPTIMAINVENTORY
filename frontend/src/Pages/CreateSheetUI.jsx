import React, { useState, useCallback } from "react";
import { X, Loader2, FileText, Upload, FileCheck, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";
import Input from "../components/Input";
import { useSheetStore } from "../store/sheetStore";

const CreateSheetUI = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null); // State to store the Sage file
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createSheet } = useSheetStore();

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Veuillez uploader un fichier Sage");

    setLoading(true);
    try {
      // Use FormData to send both the name and the physical file to the backend
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sageFile", file);

      await createSheet(formData); // Ensure your store uses axios.post(url, formData)

      setName("");
      setFile(null);
      onCreate();
      onClose();
    } catch (error) {
      console.error("Error creating sheet: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-2xl border-slate-200 animate-in fade-in zoom-in duration-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
          <CardTitle className="text-xl font-bold text-slate-800">
            Nouvelle Fiche d'Inventaire
          </CardTitle>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nom de la Fiche
              </label>
              <Input
                icon={FileText}
                type="text"
                placeholder="Ex: Inventaire Mai 2026"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* 2. Drag & Drop Zone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Fichier Sage 100
              </label>

              {!file ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer
                    ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-400 hover:bg-slate-50"}`}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    accept=".csv, .xlsx, .xls"
                    onChange={handleFileChange}
                  />
                  <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-700">
                      Glissez votre fichier ici
                    </p>
                    <p className="text-xs text-slate-400">
                      ou cliquez pour parcourir (.csv, .xlsx)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-8 h-8 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-emerald-600">
                        Prêt pour import
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={loading || !file || !name}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Générer la fiche"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSheetUI;
