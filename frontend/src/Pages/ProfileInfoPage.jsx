import React from "react";
import { Card, CardContent } from "../components/Card";
import { Avatar, AvatarFallback } from "../components/Avatar";
import { Badge } from "../components/Badge";
import { Separator } from "../components/Separator";
import {
  Briefcase,
  Calendar,
  HelpCircle,
  LogOut,
  Mail,
  Settings,
  User,
} from "lucide-react";
import { Button } from "../components/Button";
import { useAuthStore } from "../store/authStore";

const ProfileInfoPage = () => {
  const { user } = useAuthStore();
  const userProfile = {
    name: user?.name || "Marie Dubois",
    email: user?.email || "marie.dubois@company.fr",
    role: user?.role || "Compteur",
    joinDate: user?.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "15/01/2026",
    tasksCompleted: 23,
    articlesScanned: 1456,
    accuracy: 97.5,
  };
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20 border-4 border-white/30">
              <AvatarFallback className="bg-emerald-700 text-white text-2xl">
                {getInitials(userProfile.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{userProfile.name}</h2>
              <p className="text-emerald-100 text-sm">{userProfile.email}</p>
              <Badge className="mt-2 bg-white/20 border-white/30 text-white">
                {userProfile.role}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{userProfile.tasksCompleted}</p>
              <p className="text-xs text-emerald-100">Tâches</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">
                {userProfile.articlesScanned}
              </p>
              <p className="text-xs text-emerald-100">Articles</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{userProfile.accuracy}%</p>
              <p className="text-xs text-emerald-100">Précision</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-slate-900 mb-3">
            Informations du Compte
          </h3>

          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500">Nom Complet</p>
              <p className="font-medium text-slate-900">{userProfile.name}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium text-slate-900">{userProfile.email}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500">Rôle</p>
              <p className="font-medium text-slate-900">{userProfile.role}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500">Membre Depuis</p>
              <p className="font-medium text-slate-900">
                {userProfile.joinDate}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Actions */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <Button variant="outline" className="w-full justify-start h-12">
            <Settings className="w-5 h-5 mr-3" />
            Paramètres
          </Button>
          <Button variant="outline" className="w-full justify-start h-12">
            <HelpCircle className="w-5 h-5 mr-3" />
            Aide et Support
          </Button>
        </CardContent>
      </Card>
      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full h-12 text-red-600 border-red-300 hover:bg-red-50"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Déconnexion
      </Button>

      {/* Version */}
      <p className="text-center text-xs text-slate-400 py-4">
        Optima Inventory Mobile v1.0.0
      </p>
    </div>
  );
};

export default ProfileInfoPage;
