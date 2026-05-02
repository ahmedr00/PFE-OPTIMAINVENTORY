import { toast } from "sonner";
import bcryptjs from "bcryptjs";
import {
  Bell,
  Camera,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { cn } from "../components/utils";
import { Separator } from "../components/Separator";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { Label } from "../components/Label";
import { Switch } from "../components/Switch";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const tabs = [
  { key: "general", label: "Général", icon: User },
  { key: "security", label: "Sécurité", icon: Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
];
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { user } = useAuthStore();
  const { updateUser } = useUserStore();

  // General State
  const [name, setName] = useState(user?.name || "Marie Dubois");
  const [email] = useState(user?.email || "admin@optima.io");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileRef = useRef(null);

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  // Notifications State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [syncNotifs, setSyncNotifs] = useState(true);
  const [countNotifs, setCountNotifs] = useState(false);

  const [saving, setSaving] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGeneral = async () => {
    await updateUser({ _id: user._id, name });
    await setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success("Profil mis à jour avec succès");
  };

  const handleResetPassword = async () => {
    console.log("ffnfnn", user);

    const isPasswordValid = await bcryptjs.compare(
      currentPassword,
      user.password,
    );
    console.log("Password validation result:", isPasswordValid);
    if (!isPasswordValid) {
      toast.error("Mot de passe actuel incorrect");
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Mot de passe modifié avec succès");
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Préférences de notifications mises à jour");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Paramètres
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Gérez votre profil, sécurité et préférences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <Card className="md:w-56 shrink-0">
          <CardContent className="p-2">
            <nav className="flex flex-row md:flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full text-left",
                    activeTab === tab.key
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>
        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {/* GENERAL TAB */}
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Informations générales
                </CardTitle>
                <CardDescription>
                  Mettez à jour votre nom et votre photo de profil.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-5">
                  <div className="relative group">
                    <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden border-2 border-accent/30">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-9 w-9 text-accent" />
                      )}
                    </div>
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="absolute inset-0 rounded-full bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Camera className="h-5 w-5 text-white" />
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Photo de profil
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG. Max 2 Mo.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      type="text"
                      icon={User}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      icon={Mail}
                      value={email}
                      disabled
                      className="opacity-60"
                    />
                    <p className="text-xs text-muted-foreground">
                      L'adresse e-mail ne peut pas être modifiée.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSaveGeneral}
                  disabled={saving}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Enregistrer
                </Button>
              </CardContent>
            </Card>
          )}
          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sécurité</CardTitle>
                <CardDescription>
                  Modifiez votre mot de passe pour sécuriser votre compte.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="current-pw">Mot de passe actuel</Label>
                    <div className="relative">
                      <Input
                        id="current-pw"
                        icon={Lock}
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showCurrent ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="new-pw">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="new-pw"
                        icon={Lock}
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 8 caractères"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNew ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-pw">
                      Confirmer le nouveau mot de passe
                    </Label>
                    <Input
                      id="confirm-pw"
                      icon={Lock}
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Répétez le mot de passe"
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-xs text-destructive">
                        Les mots de passe ne correspondent pas.
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleResetPassword}
                  disabled={saving}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Lock className="h-4 w-4 mr-2" />
                  )}
                  Modifier le mot de passe
                </Button>
              </CardContent>
            </Card>
          )}
          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>
                  Configurez vos préférences de notification.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-w-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Notifications par e-mail
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Recevoir un résumé quotidien par e-mail.
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifs}
                      onCheckedChange={(val) => setEmailNotifs(val)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Alertes de synchronisation
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Être notifié en cas d'erreur Sage 100.
                      </p>
                    </div>
                    <Switch
                      checked={syncNotifs}
                      onCheckedChange={(val) => setSyncNotifs(val)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Fin de comptage
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Notification quand un compteur termine sa fiche.
                      </p>
                    </div>
                    <Switch
                      checked={countNotifs}
                      onCheckedChange={(val) => setCountNotifs(val)}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveNotifications}
                  disabled={saving}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Enregistrer
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
