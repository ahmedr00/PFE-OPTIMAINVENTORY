import React, { useState } from "react";
import { X, Loader2, Mail, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const CreateUserUI = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const { createUser } = useUserStore();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(name, email, role);
      setName("");
      setEmail("");
      setRole("");
      onCreate();
    } catch (error) {
      console.error("Error creating user: ", error);
    } finally {
      setLoading(false);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-2xl border-slate-200 animate-in fade-in zoom-in duration-200 bg-gradient-to-r from-green-400 to-emerald-500  ">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
          <CardTitle className="text-xl font-bold text-slate-800">
            Nouvel Utilisateur
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
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nom de l'Utilisateur
              </label>
              <Input
                icon={User}
                type="text"
                placeholder="Ex: Jean Dupont"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Adresse Email
              </label>
              <Input
                icon={Mail}
                type="email"
                placeholder="Ex: jean.dupont@company.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Rôle
              </label>
            </div>
            <div>
              <select
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Sélectionnez un rôle</option>
                <option value="Gestionnaire">Gestionnaire</option>
                <option value="Compteur">Compteur</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
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
                disabled={loading}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Créer la fiche"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUserUI;
