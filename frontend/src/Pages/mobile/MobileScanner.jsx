import React, { useState } from "react";
import { Card, CardContent } from "../../components/Card";
import { Badge, Camera, CheckCircle, QrCode, Scan } from "lucide-react";
import { Button } from "../../components/Button";
import Input from "../../components/Input";

const MobileScanner = () => {
  const [scannedCode, setScannedCode] = useState("");
  const [articleInfo, setArticleInfo] = useState(null);

  const handleScan = () => {
    // Simulate barcode scanning
    const mockBarcode = "1234567890123";
    setScannedCode(mockBarcode);

    // Simulate article lookup
    setArticleInfo({
      reference: "REF-12345",
      designation: "Ordinateur Portable HP",
      location: "Zone A-12",
      barcode: mockBarcode,
    });

    toast.success("Article trouvé!", {
      description: "Ordinateur Portable HP",
    });
  };

  const handleManualEntry = (e) => {
    e.preventDefault();
    if (!scannedCode) return;

    setArticleInfo({
      reference: "REF-" + scannedCode.slice(0, 5),
      designation: "Article scanné manuellement",
      location: "Zone inconnue",
      barcode: scannedCode,
    });

    toast.success("Code-barres enregistré");
  };
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Scanner Code-Barres
        </h2>
        <p className="text-slate-600">
          Scannez ou saisissez un code-barres/QR code
        </p>
      </div>
      {/* Scanner Simulation */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-700 text-white">
        <CardContent className="p-8">
          <div className="aspect-square rounded-2xl border-4 border-dashed border-white/30 flex items-center justify-center relative overflow-hidden">
            {/* Scanning Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
            </div>

            <div className="text-center z-10">
              <QrCode className="w-20 h-20 mx-auto mb-4 text-white/80" />
              <p className="text-white/80 text-sm">
                Positionnez le code-barres dans le cadre
              </p>
            </div>
          </div>

          <Button
            className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 h-14 text-lg"
            onClick={handleScan}
          >
            <Camera className="w-5 h-5 mr-2" />
            Activer le Scanner
          </Button>
        </CardContent>
      </Card>
      {/* Manual Entry */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Saisie Manuelle</h3>
          <form onSubmit={handleManualEntry} className="space-y-3">
            <Input
              icon={QrCode}
              type="password"
              placeholder="Saisissez le code-barres..."
              value={scannedCode}
              onChange={(e) => setScannedCode(e.target.value)}
            />
            <Button type="submit" className="w-full h-12" variant="outline">
              <Scan className="w-4 h-4 mr-2" />
              Valider le Code
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Scanned Article Info */}
      {articleInfo && (
        <Card className="bg-emerald-50 border-emerald-200 animate-in slide-in-from-bottom">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-emerald-900 mb-1">
                  Article Identifié
                </h4>
                <p className="text-sm text-emerald-800 mb-2">
                  {articleInfo.designation}
                </p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Référence:</span>
                    <span className="font-medium text-emerald-900">
                      {articleInfo.reference}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Emplacement:</span>
                    <Badge variant="outline" className="text-xs">
                      {articleInfo.location}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700">Code-barres:</span>
                    <span className="font-mono font-medium text-emerald-900">
                      {articleInfo.barcode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Scanner Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">47</p>
            <p className="text-xs text-slate-500">Codes Scannés</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">98%</p>
            <p className="text-xs text-slate-500">Taux de Réussite</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileScanner;
