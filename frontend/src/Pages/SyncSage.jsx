import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { Badge } from "../components/Badge";
import { Check, Download, Upload, X } from "lucide-react";
import { Button } from "../components/Button";
import { Separator } from "../components/Separator";
import { Progress } from "../components/Progress";

const SyncSage = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isPulling, setIsPulling] = useState(false);
  const [isPushing, setIsPushing] = useState(false);

  const handlePull = () => {
    setIsPulling(true);
    setTimeout(() => {
      setIsPulling(false);
      toast.success("Synchronisation Pull réussie", {
        description: "1,247 articles importés depuis Sage 100",
      });
    }, 3000);
  };
  const handlePush = () => {
    setIsPushing(true);
    setTimeout(() => {
      setIsPushing(false);
      toast.success("Synchronisation Push réussie", {
        description: "Résultats d'inventaire exportés vers Sage 100",
      });
    }, 3000);
  };

  const syncHistory = [
    {
      id: 1,
      type: "Pull",
      timestamp: "04/04/2026 14:35",
      records: 1247,
      status: "Réussi",
      duration: "45s",
    },
    {
      id: 2,
      type: "Push",
      timestamp: "04/04/2026 10:20",
      records: 293,
      status: "Réussi",
      duration: "28s",
    },
    {
      id: 3,
      type: "Pull",
      timestamp: "03/04/2026 16:15",
      records: 1238,
      status: "Réussi",
      duration: "42s",
    },
    {
      id: 4,
      type: "Push",
      timestamp: "03/04/2026 09:05",
      records: 450,
      status: "Réussi",
      duration: "35s",
    },
    {
      id: 5,
      type: "Pull",
      timestamp: "02/04/2026 14:00",
      records: 1189,
      status: "Échec",
      duration: "-",
    },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Synchronisation Sage 100
        </h1>
        <p className="text-slate-500">
          Gestion de la synchronisation bidirectionnelle avec votre ERP
        </p>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            État de Connexion
            {isConnected ? (
              <Badge className="bg-green-100 text-green-700 border-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                Connecté
              </Badge>
            ) : (
              <Badge variant="destructive">Déconnecté</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">Serveur Sage</p>
              <p className="font-semibold">sage-server.company.local</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Base de Données</p>
              <p className="font-semibold">PROD_INVENTORY_2026</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Dernière Activité</p>
              <p className="font-semibold">04/04/2026 14:35</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pull Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-500" />
              Pull - Importer depuis Sage
            </CardTitle>
            <CardDescription>
              Récupérer les articles et quantités théoriques depuis Sage 100
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                Données Importées
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Références articles</li>
                <li>• Désignations</li>
                <li>• Quantités théoriques en stock</li>
                <li>• Emplacements</li>
                <li>• Prix unitaires</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Dernière importation:</span>
                <span className="font-medium">1,247 articles</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Prochaine synchro auto:</span>
                <span className="font-medium">Dans 25 min</span>
              </div>
            </div>

            {isPulling && (
              <div className="space-y-2">
                <Progress value={66} />
                <p className="text-sm text-slate-500 text-center">
                  Importation en cours...
                </p>
              </div>
            )}

            <Button
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={handlePull}
              disabled={isPulling || !isConnected}
            >
              <Download className="w-4 h-4 mr-2" />
              {isPulling ? "Importation..." : "Lancer Pull Maintenant"}
            </Button>
          </CardContent>
        </Card>
        {/* Push Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-500" />
              Push - Exporter vers Sage
            </CardTitle>
            <CardDescription>
              Envoyer les résultats d'inventaire vers Sage 100
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-900 mb-2">
                Données Exportées
              </h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Quantités comptées réelles</li>
                <li>• Écarts calculés (différences)</li>
                <li>• Statuts de validation</li>
                <li>• Commentaires et photos</li>
                <li>• Horodatages des comptages</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Fiches en attente:</span>
                <span className="font-medium">3 fiches</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Articles à exporter:</span>
                <span className="font-medium">293 articles</span>
              </div>
            </div>

            {isPushing && (
              <div className="space-y-2">
                <Progress value={45} />
                <p className="text-sm text-slate-500 text-center">
                  Exportation en cours...
                </p>
              </div>
            )}

            <Button
              className="w-full bg-emerald-500 hover:bg-emerald-600"
              onClick={handlePush}
              disabled={isPushing || !isConnected}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isPushing ? "Exportation..." : "Lancer Push Maintenant"}
            </Button>
          </CardContent>
        </Card>
      </div>
      {/* Sync History */}
      <Card>
        <CardHeader>
          <CardTitle>Historique de Synchronisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {syncHistory.map((sync, index) => (
              <div key={sync.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        sync.type === "Pull" ? "bg-blue-100" : "bg-emerald-100"
                      }`}
                    >
                      {sync.type === "Pull" ? (
                        <Download className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Upload className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        Synchronisation {sync.type}
                      </p>
                      <p className="text-sm text-slate-500">
                        {sync.timestamp} • {sync.records} enregistrements
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Durée</p>
                      <p className="font-medium">{sync.duration}</p>
                    </div>
                    {sync.status === "Réussi" ? (
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        <Check className="w-3 h-3 mr-1" />
                        Réussi
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <X className="w-3 h-3 mr-1" />
                        Échec
                      </Badge>
                    )}
                  </div>
                </div>
                {index < syncHistory.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SyncSage;
