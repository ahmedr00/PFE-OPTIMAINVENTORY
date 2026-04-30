import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Progress } from "../../components/Progress";
import { Button } from "../../components/Button";
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  Check,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";

const MobileCount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [quantity, setQuantity] = useState("");

  // Mock articles for counting
  const articles = [
    {
      id: "ART-001",
      reference: "REF-12345",
      designation: "Ordinateur Portable HP",
      location: "Zone A-12",
      barcode: "1234567890123",
      counted: null,
    },
    {
      id: "ART-002",
      reference: "REF-12346",
      designation: "Souris Sans Fil Logitech",
      location: "Zone B-05",
      barcode: "1234567890124",
      counted: 125,
    },
    {
      id: "ART-003",
      reference: "REF-12347",
      designation: "Clavier Mécanique",
      location: "Zone A-08",
      barcode: "1234567890125",
      counted: 75,
    },
    {
      id: "ART-004",
      reference: "REF-12348",
      designation: "Écran 24 pouces Dell",
      location: "Zone C-03",
      barcode: "1234567890126",
      counted: null,
    },
  ];

  const currentArticle = articles[currentArticleIndex];
  const totalArticles = articles.length;
  const countedArticles = articles.filter((a) => a.counted !== null).length;
  const progress = Math.round((countedArticles / totalArticles) * 100);

  const handleNumberClick = (num) => {
    setQuantity((prev) => prev + num);
  };

  const handleClear = () => {
    setQuantity("");
  };

  const handleBackspace = () => {
    setQuantity((prev) => prev.slice(0, -1));
  };

  const handleValidate = () => {
    if (!quantity) {
      toast.error("Veuillez saisir une quantité");
      return;
    }

    // WORKFLOW LOGIC: Data submitted to server
    // Server calculates: Difference = Counted Quantity - Theoretical Quantity
    console.log("WORKFLOW - Consolidation:", {
      articleId: currentArticle.id,
      countedQuantity: parseInt(quantity),
      timestamp: new Date().toISOString(),
      note: "Server will calculate difference and update dashboard in real-time",
    });

    toast.success("Quantité validée", {
      description: `${quantity} unités pour ${currentArticle.designation}`,
    });

    // Move to next article
    if (currentArticleIndex < totalArticles - 1) {
      setCurrentArticleIndex((prev) => prev + 1);
      setQuantity("");
    } else {
      toast.success("Comptage terminé!", {
        description: "Toutes les quantités ont été enregistrées",
      });
      setTimeout(() => navigate("/mobile"), 1500);
    }
  };

  const handleTakePhoto = () => {
    toast.info("Appareil photo ouvert", {
      description: "Photo attachée à l'article",
    });
  };

  const handleAddComment = () => {
    toast.info("Commentaire ajouté", {
      description: "Note enregistrée pour cet article",
    });
  };

  const handleReport = () => {
    toast.warning("Article signalé", {
      description: "L'article a été marqué pour révision",
    });
  };
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header with Navigation */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/mobile")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2 className="font-bold text-slate-900">Comptage {id}</h2>
            <p className="text-xs text-slate-500">
              Article {currentArticleIndex + 1} sur {totalArticles}
            </p>
          </div>
        </div>

        <Progress value={progress} className="h-2" />
        <p className="text-xs text-slate-500 mt-2 text-center">
          {progress}% complété
        </p>
      </div>
      {/* Article Information */}
      <div className="p-4 space-y-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 mb-1">
                  {currentArticle.designation}
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  Réf: {currentArticle.reference}
                </p>
                <Badge variant="outline" className="text-xs">
                  {currentArticle.location}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantity Display */}
        <Card className="bg-emerald-50 border-emerald-200">
          <CardContent className="p-6">
            <p className="text-sm text-emerald-700 mb-2 text-center">
              Quantité Comptée
            </p>
            <div className="text-5xl font-bold text-emerald-900 text-center min-h-[60px] flex items-center justify-center">
              {quantity || "0"}
            </div>
          </CardContent>
        </Card>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              size="lg"
              variant="outline"
              className="h-16 text-2xl font-bold bg-white hover:bg-emerald-50"
              onClick={() => handleNumberClick(num.toString())}
            >
              {num}
            </Button>
          ))}
          <Button
            size="lg"
            variant="outline"
            className="h-16 text-lg bg-white hover:bg-red-50 text-red-600"
            onClick={handleClear}
          >
            C
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 text-2xl font-bold bg-white hover:bg-emerald-50"
            onClick={() => handleNumberClick("0")}
          >
            0
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-16 text-lg bg-white hover:bg-orange-50"
            onClick={handleBackspace}
          >
            ←
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="h-14 flex flex-col gap-1"
            onClick={handleTakePhoto}
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs">Photo</span>
          </Button>
          <Button
            variant="outline"
            className="h-14 flex flex-col gap-1"
            onClick={handleAddComment}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Note</span>
          </Button>
          <Button
            variant="outline"
            className="h-14 flex flex-col gap-1 text-orange-600 border-orange-300"
            onClick={handleReport}
          >
            <AlertTriangle className="w-5 h-5" />
            <span className="text-xs">Signaler</span>
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="outline"
            disabled={currentArticleIndex === 0}
            onClick={() => {
              setCurrentArticleIndex((prev) => prev - 1);
              setQuantity("");
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={handleValidate}
          >
            <Check className="w-4 h-4 mr-2" />
            Valider
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileCount;
