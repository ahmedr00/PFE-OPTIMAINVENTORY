import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   Camera,
//   CheckCircle,
//   QrCode,
//   Scan
// } from "lucide-react-native";

const scan = () => {
  const [scannedCode, setScannedCode] = useState("");
  const [articleInfo, setArticleInfo] = useState<any>(null);

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
  };

  const handleManualEntry = () => {
    if (!scannedCode) return;

    // Simulate manual article registration
    setArticleInfo({
      reference: "REF-" + scannedCode.slice(0, 5),
      designation: "Article scanné manuellement",
      location: "Zone inconnue",
      barcode: scannedCode,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Scanner Code-Barres</Text>
          <Text style={styles.subtitle}>
            Scannez ou saisissez un code-barres/QR code
          </Text>
        </View>

        {/* Scanner Simulation Card[cite: 6] */}
        <View style={styles.scannerCard}>
          <View style={styles.scannerFrame}>
            {/* Scanning Line Animation Simulation */}
            <View style={styles.scanLine} />

            <View style={styles.frameContent}>
              <Ionicons
                name="qr-code"
                size={80}
                color="rgba(255,255,255,0.8)"
              />

              <Text style={styles.frameText}>
                Positionnez le code-barres dans le cadre
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
            <Ionicons
              name="camera-outline"
              size={20}
              color="white"
              style={styles.buttonIcon}
            />

            <Text style={styles.scanButtonText}>Activer le Scanner</Text>
          </TouchableOpacity>
        </View>

        {/* Manual Entry Card[cite: 6] */}
        <View style={styles.manualCard}>
          <Text style={styles.manualTitle}>Saisie Manuelle</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="qr-code"
              size={20}
              color="#94a3b8"
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Saisissez le code-barres..."
              value={scannedCode}
              onChangeText={setScannedCode}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            style={styles.validateButton}
            onPress={handleManualEntry}
          >
            <Ionicons
              name="scan"
              size={18}
              color="#475569"
              style={styles.buttonIcon}
            />
            <Text style={styles.validateButtonText}>Valider le Code</Text>
          </TouchableOpacity>
        </View>

        {/* Scanned Article Info */}
        {articleInfo && (
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.checkCircle}>
                <AntDesign name="check-circle" size={24} color="white" />
              </View>
              <View style={styles.resultHeaderText}>
                <Text style={styles.resultTitle}>Article Identifié</Text>
                <Text style={styles.designationText}>
                  {articleInfo.designation}
                </Text>
              </View>
            </View>

            <View style={styles.detailsList}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Référence:</Text>
                <Text style={styles.detailValue}>{articleInfo.reference}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Emplacement:</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{articleInfo.location}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Code-barres:</Text>
                <Text style={styles.monoValue}>{articleInfo.barcode}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Scanner Stats[cite: 6] */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>47</Text>
            <Text style={styles.statLabel}>Codes Scannés</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: "#10b981" }]}>98%</Text>
            <Text style={styles.statLabel}>Taux de Réussite</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  container: { padding: 16 },
  header: { alignItems: "center", marginBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: "#64748b" },
  scannerCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  scannerFrame: {
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "#34d399",
    top: "50%",
    shadowColor: "#34d399",
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  frameContent: { alignItems: "center" },
  frameText: { color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 16 },
  scanButton: {
    backgroundColor: "#10b981",
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  scanButtonText: { color: "white", fontSize: 18, fontWeight: "600" },
  buttonIcon: { marginRight: 8 },
  manualCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  manualTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, height: 48, fontSize: 14 },
  validateButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  validateButtonText: { color: "#475569", fontWeight: "500" },
  resultCard: {
    backgroundColor: "#ecfdf5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#a7f3d0",
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },
  resultHeaderText: { marginLeft: 12 },
  resultTitle: { fontSize: 16, fontWeight: "bold", color: "#064e3b" },
  designationText: { fontSize: 14, color: "#065f46" },
  detailsList: { gap: 8 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: { fontSize: 12, color: "#047857" },
  detailValue: { fontSize: 12, fontWeight: "600", color: "#064e3b" },
  badge: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#a7f3d0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: { fontSize: 10, color: "#047857" },
  monoValue: { fontSize: 12, fontFamily: "monospace", color: "#064e3b" },
  statsRow: { flexDirection: "row", gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  statNumber: { fontSize: 24, fontWeight: "bold", color: "#0f172a" },
  statLabel: { fontSize: 12, color: "#64748b", marginTop: 4 },
});

export default scan;
