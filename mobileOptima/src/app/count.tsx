import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
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
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [quantity, setQuantity] = useState("");

  // Mock articles derived from the original inventory source
  const articles = [
    {
      id: "ART-001",
      reference: "REF-12345",
      designation: "Ordinateur Portable HP",
      location: "Zone A-12",
      counted: null,
    },
    {
      id: "ART-002",
      reference: "REF-12346",
      designation: "Souris Sans Fil Logitech",
      location: "Zone B-05",
      counted: 125,
    },
    {
      id: "ART-003",
      reference: "REF-12347",
      designation: "Clavier Mécanique",
      location: "Zone A-08",
      counted: 75,
    },
    {
      id: "ART-004",
      reference: "REF-12348",
      designation: "Écran 24 pouces Dell",
      location: "Zone C-03",
      counted: null,
    },
  ];

  const currentArticle = articles[currentArticleIndex];
  const totalArticles = articles.length;
  const countedArticles = articles.filter((a) => a.counted !== null).length;
  const progress = (countedArticles / totalArticles) * 100;

  const handleNumberClick = (num: string) => setQuantity((prev) => prev + num);
  const handleClear = () => setQuantity("");
  const handleBackspace = () => setQuantity((prev) => prev.slice(0, -1));

  const handleValidate = () => {
    if (!quantity) return;

    // Workflow Logic: Data submission
    console.log("WORKFLOW - Consolidation:", {
      articleId: currentArticle.id,
      countedQuantity: parseInt(quantity),
      timestamp: new Date().toISOString(),
    });

    if (currentArticleIndex < totalArticles - 1) {
      setCurrentArticleIndex((prev) => prev + 1);
      setQuantity("");
    } else {
      //   router.push("/mobile");
    }
  };

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
            <Text style={styles.headerTitle}>Comptage {id}</Text>
            <Text style={styles.headerSubtitle}>
              Article {currentArticleIndex + 1} sur {totalArticles}
            </Text>
          </View>
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
          <View style={styles.locationBadge}>
            <Text style={styles.locationText}>{currentArticle.location}</Text>
          </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTop: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backButton: { marginRight: 12 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#0f172a" },
  headerSubtitle: { fontSize: 12, color: "#64748b" },
  progressTrack: {
    height: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#10b981" },
  progressText: {
    fontSize: 10,
    color: "#64748b",
    textAlign: "center",
    marginTop: 4,
  },
  container: { padding: 16 },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1,
  },
  designation: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  reference: { fontSize: 14, color: "#64748b", marginBottom: 8 },
  locationBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  locationText: { fontSize: 12, color: "#475569", fontWeight: "600" },
  quantityDisplay: {
    backgroundColor: "#ecfdf5",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#a7f3d0",
  },
  quantityLabel: { fontSize: 14, color: "#047857", marginBottom: 8 },
  quantityValue: { fontSize: 48, fontWeight: "bold", color: "#064e3b" },
  numPad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  numButton: {
    width: (width - 56) / 3,
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  numButtonText: { fontSize: 24, fontWeight: "bold", color: "#0f172a" },
  clearButton: { backgroundColor: "#fff1f2" },
  clearText: { color: "#e11d48" },
  backButtonPad: { backgroundColor: "#fff7ed" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  actionText: { fontSize: 11, color: "#64748b", marginTop: 4 },
  reportButton: { borderColor: "#fdba74" },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  navBtn: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  prevBtn: { backgroundColor: "white", borderWidth: 1, borderColor: "#e2e8f0" },
  prevBtnText: { color: "#64748b", marginLeft: 8, fontWeight: "600" },
  validateBtn: { backgroundColor: "#10b981" },
  validateText: { color: "white", marginLeft: 8, fontWeight: "600" },
});

export default count;
