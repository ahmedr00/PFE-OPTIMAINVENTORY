import React, { useEffect } from "react";
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
import { Feather } from "@expo/vector-icons";

type SheetTask = {
  _id: string;
  name?: string;
  status?: string;
  priority?: string;
  articles?: unknown[];
  assignedCompteurs?: string[];
  countedArticles?: number;
  totalArticles?: number;
  assignedDate?: string;
  createdAt?: string;
};

const ProgressBar = ({ value }: { value: number }) => (
  <View style={styles.progressTrack}>
    <View style={[styles.progressFill, { width: `${value}%` }]} />
  </View>
);

const Badge = ({ label, backgroundColor, color }: any) => (
  <View style={[styles.badge, { backgroundColor }]}>
    <Text style={[styles.badgeText, { color }]}>{label}</Text>
  </View>
);

const getTotalArticles = (task: SheetTask) =>
  task.totalArticles || task.articles?.length || 0;

const getProgress = (task: SheetTask) => {
  const totalArticles = getTotalArticles(task);
  if (!totalArticles) return 0;

  return Math.round(((task.countedArticles || 0) / totalArticles) * 100);
};

const getStatusLabel = (status?: string) => {
  switch (status) {
    case "completed":
    case "complete":
    case "Complété":
      return "Complété";
    case "pending":
      return "En attente";
    case "in_progress":
    case "En cours":
    default:
      return "En cours";
  }
};

const isTaskCompleted = (task: SheetTask) =>
  getStatusLabel(task.status) === "Complété" || getProgress(task) >= 100;

const getAssignedDate = (task: SheetTask) => {
  if (task.assignedDate) return task.assignedDate;
  if (!task.createdAt) return "date inconnue";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(task.createdAt));
};

const getPriorityStyle = (priority?: string) => {
  switch (priority) {
    case "Haute":
      return { backgroundColor: "#fee2e2", color: "#b91c1c", label: "Haute" };
    case "Basse":
      return { backgroundColor: "#f1f5f9", color: "#334155", label: "Basse" };
    case "Normale":
    default:
      return { backgroundColor: "#dbeafe", color: "#1d4ed8", label: "Normale" };
  }
};

const home = () => {
  const router = useRouter();
  const { user, isLoading: isAuthLoading, hasCheckedAuth } = useUserStore();
  const { sheets, fetchSheets, loading, error } = useSheetStore();

  useEffect(() => {
    fetchSheets();
  }, [fetchSheets]);

  const compteurName = user?.name || "ahmed";
  const tasks: SheetTask[] = sheets.filter((task: SheetTask) =>
    task.assignedCompteurs?.includes(compteurName),
  );
  const activeTasks = tasks.filter((task) => !isTaskCompleted(task));
  const totalCountedArticles = tasks.reduce(
    (total, task) => total + (task.countedArticles || 0),
    0,
  );
  const totalArticles = tasks.reduce(
    (total, task) => total + getTotalArticles(task),
    0,
  );
  const completionRate = totalArticles
    ? Math.round((totalCountedArticles / totalArticles) * 100)
    : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Bienvenue, {user?.name || "compteur"}</Text>
          <Text style={styles.headerSubtitle}>
            Vous avez {activeTasks.length} tâches en cours
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Articles Comptés</Text>
              <Text style={styles.statValue}>{totalCountedArticles}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Taux de Complétion</Text>
              <Text style={styles.statValue}>{completionRate}%</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Mes Tâches Assignées</Text>

        {(loading || (isAuthLoading && !hasCheckedAuth)) && (
          <Text style={styles.stateText}>Chargement des tâches...</Text>
        )}
        {!!error && !loading && <Text style={styles.errorText}>{error}</Text>}
        {!loading &&
          !error &&
          hasCheckedAuth &&
          tasks.length === 0 && (
          <Text style={styles.stateText}>Aucune tâche assignée pour le moment.</Text>
        )}

        {tasks.map((task) => {
          const progress = getProgress(task);
          const isCompleted = isTaskCompleted(task);
          const priorityStyles = getPriorityStyle(task.priority);
          const statusLabel = isCompleted ? "Complété" : getStatusLabel(task.status);
          const totalTaskArticles = getTotalArticles(task);

          return (
            <TouchableOpacity
              key={task._id}
              style={styles.taskCard}
              onPress={() =>
                !isCompleted &&
                router.push({
                  pathname: "/count",
                  params: { id: task._id },
                })
              }
              activeOpacity={0.7}
              disabled={isCompleted}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <View style={styles.taskNameRow}>
                    <Text style={styles.taskName}>
                      {task.name || "Inventaire sans nom"}
                    </Text>
                    {isCompleted && (
                      <Feather name="check-circle" size={16} color="#22c55e" />
                    )}
                  </View>
                  <Text style={styles.taskId}>ID: {task._id}</Text>
                </View>
                {!isCompleted && (
                  <Feather name="chevron-right" size={20} color="#94a3b8" />
                )}
              </View>

              <View style={styles.badgeRow}>
                <Badge
                  label={priorityStyles.label}
                  backgroundColor={priorityStyles.backgroundColor}
                  color={priorityStyles.color}
                />
                <Badge
                  label={statusLabel}
                  backgroundColor={isCompleted ? "#dcfce7" : "#dbeafe"}
                  color={isCompleted ? "#15803d" : "#1d4ed8"}
                />
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressInfo}>
                  <View style={styles.progressLabel}>
                    <Feather name="package" size={14} color="#64748b" />
                    <Text style={styles.progressText}>
                      {task.countedArticles || 0} / {totalTaskArticles} articles
                    </Text>
                  </View>
                  <Text style={styles.progressPercent}>{progress}%</Text>
                </View>
                <ProgressBar value={progress} />
              </View>

              <View style={styles.footer}>
                <Feather name="clock" size={12} color="#94a3b8" />
                <Text style={styles.footerText}>
                  Assigné le {getAssignedDate(task)}
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
  stateText: {
    color: "#64748b",
    fontSize: 14,
    paddingVertical: 12,
    textAlign: "center",
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 14,
    paddingVertical: 12,
    textAlign: "center",
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
  taskNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  taskName: { flex: 1, fontSize: 16, fontWeight: "bold", color: "#1e293b" },
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
  progressLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
