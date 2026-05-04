import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../store/userStore";
import { useSheetStore } from "../store/sheetStore";
import { Feather, Ionicons } from "@expo/vector-icons";

// Mock Components - Replace these with your actual Mobile UI components
const ProgressBar = ({ value }: { value: number }) => (
  <View style={styles.progressTrack}>
    <View style={[styles.progressFill, { width: `${value}%` }]} />
  </View>
);

const Badge = ({ children, style }: any) => (
  <View style={[styles.badge, style]}>
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

const home = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { sheets, fetchSheets } = useSheetStore();
  useEffect(() => {
    fetchSheets();
  }, []);

  // sheets.map((sheet) => {
  //   if (sheet.assignedCompteurs.includes("ahmed")) {
  //     console.log("ahahah", sheet);
  //   }
  // });
  const tasks = sheets.filter((task) =>
    task.assignedCompteurs?.includes("ahmed"),
  );
  console.log(tasks);

  // const tasks = [
  //   {
  //     id: "INV-2026-001",
  //     name: "Inventaire Entrepôt A",
  //     totalArticles: 450,
  //     countedArticles: 293,
  //     assignedDate: "01/04/2026",
  //     status: "En cours",
  //     priority: "Haute",
  //   },
  //   {
  //     id: "INV-2026-002",
  //     name: "Inventaire Magasin Principal",
  //     totalArticles: 320,
  //     countedArticles: 96,
  //     assignedDate: "02/04/2026",
  //     status: "En cours",
  //     priority: "Normale",
  //   },
  //   {
  //     id: "INV-2026-003",
  //     name: "Contrôle Stock Mensuel",
  //     totalArticles: 180,
  //     countedArticles: 180,
  //     assignedDate: "28/03/2026",
  //     status: "Complété",
  //     priority: "Basse",
  //   },
  // ];

  const getProgress = (task: any) =>
    Math.round((task.countedArticles / task.totalArticles) * 100);

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "Haute":
        return { backgroundColor: "#fee2e2", color: "#b91c1c" };
      case "Normale":
        return { backgroundColor: "#dbeafe", color: "#1d4ed8" };
      default:
        return { backgroundColor: "#f1f5f9", color: "#334155" };
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Welcome Section */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Bienvenue,{user?.name}</Text>
          <Text style={styles.headerSubtitle}>
            Vous avez {tasks.filter((t) => t.status !== "Complété").length}{" "}
            tâches en cours
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Articles Comptés</Text>
              <Text style={styles.statValue}>569</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Taux de Complétion</Text>
              <Text style={styles.statValue}>76%</Text>
            </View>
          </View>
        </View>

        {/* Tasks Section */}
        <Text style={styles.sectionTitle}>Mes Tâches Assignées</Text>

        {tasks.map((task) => {
          const progress = getProgress(task);
          const isCompleted = task.status === "Complété";
          const priorityStyles = getPriorityStyle(task.priority);

          return (
            <TouchableOpacity
              key={task._id}
              style={styles.taskCard}
              //   onPress={() => !isCompleted && router.push(`/mobile/count/${task.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.taskName}>{task.name}</Text>
                    {/* {isCompleted && <CheckCircle size={16} color="#22c55e" />} */}
                  </View>
                  <Text style={styles.taskId}>ID: {task._id}</Text>
                </View>
                {/* {!isCompleted && <ChevronRight size={20} color="#94a3b8" />} */}
              </View>

              <View style={styles.badgeRow}>
                <Badge
                  style={{ backgroundColor: priorityStyles.backgroundColor }}
                >
                  <Text style={{ color: priorityStyles.color, fontSize: 12 }}>
                    {task.priority}
                  </Text>
                </Badge>
                <Badge
                  style={{
                    backgroundColor: isCompleted ? "#dcfce7" : "#dbeafe",
                  }}
                >
                  <Text
                    style={{
                      color: isCompleted ? "#15803d" : "#1d4ed8",
                      fontSize: 12,
                    }}
                  >
                    {task.status}
                  </Text>
                </Badge>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Feather name="package" size={14} color="#64748b" />
                    <Text style={styles.progressText}>
                      {task.countedArticles} / {task.articles.length} articles
                    </Text>
                  </View>
                  <Text style={styles.progressPercent}>{progress}%</Text>
                </View>
                <ProgressBar value={progress} />
              </View>

              <View style={styles.footer}>
                {/* <Clock size={12} color="#94a3b8" /> */}
                <Text style={styles.footerText}>
                  Assigné le {task.assignedDate}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  headerCard: {
    backgroundColor: "#10b981",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: { color: "#ecfdf5", fontSize: 16, marginBottom: 16 },
  statsGrid: { flexDirection: "row", gap: 12 },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 12,
  },
  statLabel: { color: "#ecfdf5", fontSize: 10, marginBottom: 4 },
  statValue: { color: "white", fontSize: 20, fontWeight: "bold" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginTop: 24,
    marginBottom: 12,
  },
  taskCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  taskName: { fontSize: 16, fontWeight: "bold", color: "#1e293b" },
  taskId: { fontSize: 12, color: "#64748b", marginTop: 2 },
  badgeRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 12, fontWeight: "600" },
  progressContainer: { marginTop: 8 },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: { fontSize: 13, color: "#64748b" },
  progressPercent: { fontSize: 13, fontWeight: "bold", color: "#1e293b" },
  progressTrack: {
    height: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#10b981" },
  footer: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 },
  footerText: { fontSize: 11, color: "#94a3b8" },
});

export default home;
