import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Mail,
  Briefcase,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react-native";

export default function MobileProfile() {
  const userProfile = {
    name: "Marie Dubois",
    email: "marie.dubois@company.fr",
    role: "Compteur",
    joinDate: "15/01/2026",
    tasksCompleted: 23,
    articlesScanned: 1456,
    accuracy: 97.5,
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MD</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.userName}>{userProfile.name}</Text>
              <Text style={styles.userEmail}>{userProfile.email}</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>{userProfile.role}</Text>
              </View>
            </View>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {userProfile.tasksCompleted}
              </Text>
              <Text style={styles.statLabel}>Tâches</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {userProfile.articlesScanned}
              </Text>
              <Text style={styles.statLabel}>Articles</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{userProfile.accuracy}%</Text>
              <Text style={styles.statLabel}>Précision</Text>
            </View>
          </View>
        </View>

        {/* Account Information Card */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Informations du Compte</Text>

          {/* Info Rows */}
          {[
            {
              icon: <User color="#2563eb" />,
              label: "Nom Complet",
              value: userProfile.name,
              bg: "#dbeafe",
            },
            {
              icon: <Mail color="#9333ea" />,
              label: "Email",
              value: userProfile.email,
              bg: "#f3e8ff",
            },
            {
              icon: <Briefcase color="#059669" />,
              label: "Rôle",
              value: userProfile.role,
              bg: "#d1fae5",
            },
            {
              icon: <Calendar color="#ea580c" />,
              label: "Membre Depuis",
              value: userProfile.joinDate,
              bg: "#ffedd5",
            },
          ].map((item, index) => (
            <View key={index} style={styles.infoRowContainer}>
              <View style={styles.infoRow}>
                <View
                  style={[styles.iconContainer, { backgroundColor: item.bg }]}
                >
                  {item.icon}
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              </View>
              {index < 3 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionCard}>
          <TouchableOpacity style={styles.actionButton}>
            <Settings size={20} color="#64748b" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Paramètres</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <HelpCircle size={20} color="#64748b" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Aide et Support</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#dc2626" style={styles.buttonIcon} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Optima Inventory Mobile v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f8fafc" },
  container: { padding: 16, gap: 16 },
  headerCard: {
    backgroundColor: "#10b981",
    borderRadius: 16,
    padding: 24,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "#047857",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "white", fontSize: 24, fontWeight: "bold" },
  headerInfo: { flex: 1 },
  userName: { color: "white", fontSize: 24, fontWeight: "bold" },
  userEmail: { color: "#ecfdf5", fontSize: 14 },
  roleBadge: {
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  roleText: { color: "white", fontSize: 12, fontWeight: "600" },
  statsGrid: { flexDirection: "row", gap: 12 },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: { color: "white", fontSize: 20, fontWeight: "bold" },
  statLabel: { color: "#ecfdf5", fontSize: 10 },
  infoCard: { backgroundColor: "white", borderRadius: 16, padding: 16 },
  sectionTitle: { fontWeight: "bold", color: "#0f172a", marginBottom: 12 },
  infoRowContainer: { width: "100%" },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: { flex: 1 },
  infoLabel: { fontSize: 12, color: "#64748b" },
  infoValue: { fontSize: 14, fontWeight: "500", color: "#0f172a" },
  separator: { height: 1, backgroundColor: "#f1f5f9" },
  actionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  buttonIcon: { marginRight: 12 },
  buttonText: { fontSize: 14, color: "#1e293b", fontWeight: "500" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fca5a5",
    backgroundColor: "transparent",
  },
  logoutText: { color: "#dc2626", fontWeight: "600" },
  versionText: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 12,
    marginVertical: 16,
  },
});
