import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSheetStore } from "./store/sheetStore";
// import {
//   AlertTriangle,
//   ArrowLeft,
//   Camera,
//   Check,
//   ChevronLeft,
//   MessageSquare,
// } from "lucide-react-native";

const { width } = Dimensions.get("window");

const count = () => {
  console.log("hi");

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const sheetId = Array.isArray(id) ? id[0] : id;
  const {
    sheets,
    currentSheet,
    fetchSheets,
    getSingleSheet,
    loading,
    updateArticleCount,
  } = useSheetStore();
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (!sheets.length) {
      fetchSheets();
    }
  }, [fetchSheets, sheets.length]);

  const sheetFromList = sheets.find((sheet: any) => sheet._id === sheetId);
  const selectedSheet =
    currentSheet?._id === sheetId ? currentSheet : sheetFromList;
  const needsArticleDetails =
    !!sheetId &&
    (!selectedSheet ||
      !Array.isArray(selectedSheet.articles) ||
      selectedSheet.articles.some(
        (article: any) => typeof article === "string",
      ));

  useEffect(() => {
    if (sheetId && needsArticleDetails) {
      getSingleSheet(sheetId);
    }
  }, [getSingleSheet, needsArticleDetails, sheetId]);

  useEffect(() => {
    setCurrentArticleIndex(0);
    setQuantity("");
  }, [sheetId]);

  const articles =
    selectedSheet?.articles
      ?.filter((article: any) => article && typeof article === "object")
      .map((article: any, index: number) => ({
        id: article._id || article.id || `${sheetId}-${index}`,
        reference: article.reference || "Sans référence",
        designation: article.designation || "Article sans désignation",
        location:
          article.location ||
          (article.stock !== undefined
            ? `Stock théorique: ${article.stock}`
            : ""),
        counted: article.counted ?? null,
      })) || [];

  const currentArticle = articles[currentArticleIndex];
  const totalArticles = articles.length;
  const countedArticles =
    selectedSheet?.countedArticles ??
    articles.filter((a: any) => a.counted !== null).length;
  const progress = totalArticles ? (countedArticles / totalArticles) * 100 : 0;

  const handleNumberClick = (num: string) => setQuantity((prev) => prev + num);
  const handleClear = () => setQuantity("");
  const handleBackspace = () => setQuantity((prev) => prev.slice(0, -1));

  // const handleValidate = () => {
  //   if (!quantity || !currentArticle) return;

  //   // Workflow Logic: Data submission
  //   console.log("WORKFLOW - Consolidation:", {
  //     sheetId,
  //     articleId: currentArticle.id,
  //     countedQuantity: parseInt(quantity),
  //     timestamp: new Date().toISOString(),
  //   });

  //   if (currentArticleIndex < totalArticles - 1) {
  //     setCurrentArticleIndex((prev) => prev + 1);
  //     setQuantity("");
  //   } else {
  //     router.push("/(tabs)/home");
  //   }
  // };
  const handleValidate = async () => {
    if (!quantity || !currentArticle) {
      Alert.alert("Attention", "Veuillez saisir une quantité.");
      return;
    }

    const success = await updateArticleCount(
      sheetId,
      currentArticle.id,
      quantity,
    );

    if (success) {
      if (currentArticleIndex < totalArticles - 1) {
        // Move to next article[cite: 5]
        setCurrentArticleIndex((prev) => prev + 1);
        setQuantity("");
      } else {
        // Inventory finished[cite: 5]
        Alert.alert("Succès", "Inventaire terminé !", [
          { text: "OK", onPress: () => router.push("/home") },
        ]);
      }
    } else {
      Alert.alert("Erreur", "Problème lors de la sauvegarde.");
    }
  };

  if (!selectedSheet || !currentArticle) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              {/* <ArrowLeft color="#0f172a" size={24} /> */}
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Comptage</Text>
              <Text style={styles.headerSubtitle}>
                {loading
                  ? "Chargement des articles..."
                  : "Aucun article trouvé"}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with Navigation */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            {/* <ArrowLeft color="#0f172a" size={24} /> */}
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>
              Comptage {selectedSheet.name}
            </Text>
            <Text style={styles.headerSubtitle}>
              Article {currentArticleIndex + 1} sur {totalArticles}
            </Text>
          </View>
          {/* <TouchableOpacity
            onPress={() => router.push("/home")}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {Math.round(progress)}% complété
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Article Information[cite: 5] */}
        <View style={styles.card}>
          <Text style={styles.designation}>{currentArticle.designation}</Text>
          <Text style={styles.reference}>Réf: {currentArticle.reference}</Text>
          {!!currentArticle.location && (
            <View style={styles.locationBadge}>
              <Text style={styles.locationText}>{currentArticle.location}</Text>
            </View>
          )}
        </View>

        {/* Quantity Display[cite: 5] */}
        <View style={styles.quantityDisplay}>
          <Text style={styles.quantityLabel}>Quantité Comptée</Text>
          <Text style={styles.quantityValue}>{quantity || "0"}</Text>
        </View>

        {/* Number Pad[cite: 5] */}
        <View style={styles.numPad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "C", 0, "←"].map((val, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.numButton,
                val === "C" && styles.clearButton,
                val === "←" && styles.backButtonPad,
              ]}
              onPress={() => {
                if (val === "C") handleClear();
                else if (val === "←") handleBackspace();
                else handleNumberClick(val.toString());
              }}
            >
              <Text
                style={[styles.numButtonText, val === "C" && styles.clearText]}
              >
                {val}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions[cite: 5] */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            {/* <Camera size={20} color="#64748b" /> */}
            <Text style={styles.actionText}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            {/* <MessageSquare size={20} color="#64748b" /> */}
            <Text style={styles.actionText}>Note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.reportButton]}>
            {/* <AlertTriangle size={20} color="#ea580c" /> */}
            <Text style={[styles.actionText, { color: "#ea580c" }]}>
              Signaler
            </Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Buttons[cite: 5] */}
        <View style={styles.navRow}>
          <TouchableOpacity
            style={[
              styles.navBtn,
              styles.prevBtn,
              currentArticleIndex === 0 && { opacity: 0.5 },
            ]}
            disabled={currentArticleIndex === 0}
            onPress={() => setCurrentArticleIndex((prev) => prev - 1)}
          >
            {/* <ChevronLeft size={20} color="#64748b" /> */}
            <Text style={styles.prevBtnText}>Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navBtn, styles.validateBtn]}
            onPress={handleValidate}
          >
            {/* <Check size={20} color="white" /> */}
            <Text style={styles.validateText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    backgroundColor: "white",
    padding: 12, // Reduced from 16
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTop: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  backButton: { marginRight: 12 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#0f172a" },
  headerSubtitle: { fontSize: 12, color: "#64748b" },
  progressTrack: {
    height: 6, // Slimmer progress bar
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#10b981" },
  progressText: {
    fontSize: 10,
    color: "#64748b",
    textAlign: "center",
    marginTop: 2,
  },

  // closeButton: {
  //   padding: 10,
  //   backgroundColor: "#f1f5f9", // Light gray circle effect
  //   borderRadius: 20,
  //   width: 40,
  //   height: 40,
  //   justifyContent: "flex-end",
  //   alignItems: "flex-end",
  // },
  // closeButtonText: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   color: "#64748b",
  // },
  container: { padding: 12 }, // Reduced padding
  card: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  designation: {
    fontSize: 16, // Slightly smaller
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 2,
  },
  reference: { fontSize: 13, color: "#64748b", marginBottom: 4 },
  locationBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  locationText: { fontSize: 11, color: "#475569", fontWeight: "600" },
  quantityDisplay: {
    backgroundColor: "#ecfdf5",
    padding: 12, // Significant reduction from 24
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#a7f3d0",
  },
  quantityLabel: { fontSize: 12, color: "#047857", marginBottom: 4 },
  quantityValue: { fontSize: 36, fontWeight: "bold", color: "#064e3b" }, // Smaller font
  numPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  numButton: {
    width: (width - 40) / 3, // Adjusted for container padding
    height: 45, // Reduced from 60
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  numButtonText: { fontSize: 20, fontWeight: "bold", color: "#0f172a" },
  clearButton: { backgroundColor: "#fff1f2" },
  clearText: { color: "#e11d48" },
  backButtonPad: { backgroundColor: "#fff7ed" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    height: 40, // Reduced from 60
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  actionText: { fontSize: 10, color: "#64748b", marginTop: 2 },
  reportButton: { borderColor: "#fdba74" },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20, // Bottom breathing room
  },
  navBtn: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  prevBtn: { backgroundColor: "white", borderWidth: 1, borderColor: "#e2e8f0" },
  prevBtnText: { color: "#64748b", fontWeight: "600" },
  validateBtn: { backgroundColor: "#10b981" },
  validateText: { color: "white", fontWeight: "600" },
});

export default count;
