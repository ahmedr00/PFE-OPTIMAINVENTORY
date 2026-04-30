import React, { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Edit, Mail, Shield, Trash2, UserPlus, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/Table";
import { Badge } from "../components/Badge";
import { Avatar, AvatarFallback } from "../components/Avatar";
import CreateUserUI from "./CreateUserUI";
import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";
import EditUserUI from "./EditUserUI";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Connect to the store
  const { users, fetchUsers, loading, deleteUser, updateUser, createUser } =
    useUserStore();
  const { signUp } = useAuthStore();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "Gestionnaire":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Compteur":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case "Admin":
        return "Accès complet système, gestion utilisateurs, configuration";
      case "Gestionnaire":
        return "Création fiches, affectation compteurs, validation résultats";
      case "Compteur":
        return "Application mobile uniquement, comptage terrain";
      default:
        return "";
    }
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Gestion des Utilisateurs
          </h1>
          <p className="text-slate-500">
            Gérez les utilisateurs et leurs rôles (Admin, Gestionnaire,
            Compteur)
          </p>
        </div>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          onClick={() => setIsModalOpen(true)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Role Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-purple-900">Admin</h3>
            </div>
            <p className="text-sm text-slate-600 text-balance">
              {getRoleDescription("Admin")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-blue-900">Gestionnaire</h3>
            </div>
            <p className="text-sm text-slate-600 text-balance">
              {getRoleDescription("Gestionnaire")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <h3 className="font-semibold text-emerald-900">Compteur</h3>
            </div>
            <p className="text-sm text-slate-600 text-balance">
              {getRoleDescription("Compteur")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {loading ? "Chargement..." : `${users.length} Utilisateurs`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Dernière Connexion</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback
                              className={`${
                                user.role === "Admin"
                                  ? "bg-purple-500"
                                  : user.role === "Gestionnaire"
                                    ? "bg-blue-500"
                                    : "bg-emerald-500"
                              } text-white`}
                            >
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-slate-900">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {user.role}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getRoleBadge(user.role)}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleString()
                          : "Jamais connecté"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:text-emerald-600"
                            onClick={() => {
                              handleEditUser(user);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => deleteUser(user._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-10 text-slate-400"
                    >
                      Aucun utilisateur trouvé.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CreateUserUI
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createUser}
      />
      {selectedUser && (
        <EditUserUI
          isOpen={isEditing}
          onClose={() => {
            setIsEditing(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onSave={updateUser}
        />
      )}
    </div>
  );
};

export default Users;
