import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";
// import {
//   User,
//   Lock,
//   Bell,
//   Camera,
//   Check,
//   Eye,
//   EyeOff,
// } from "@expo/vector-icons";
import { useUserStore } from "../store/userStore";
// import { useUserStore } from "../store/userStore";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { user } = useUserStore();
  // const { updateUser } = useUserStore();

  // General State
  const [name, setName] = useState(user?.name || "Marie Dubois");
  const [saving, setSaving] = useState(false);

  // Security State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);

  // Notifications State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [syncNotifs, setSyncNotifs] = useState(true);

  // const handleSaveGeneral = async () => {
  //   setSaving(true);
  //   try {
  //     await updateUser({ _id: user._id, name });
  //     Alert.alert("Succès", "Profil mis à jour avec succès");
  //   } catch (err) {
  //     Alert.alert("Erreur", "Échec de la mise à jour");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Paramètres</Text>
        <Text style={styles.subtitle}>
          Gérez votre profil et vos préférences.
        </Text>
      </View>

      {/* Mobile Tab Navigation */}
      <View style={styles.tabBar}>
        {[
          { key: "general", icon: "user", label: "Général" },
          { key: "security", icon: "lock", label: "Sécurité" },
          { key: "notifications", icon: "bell", label: "Notifications" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tabItem,
              activeTab === tab.key && styles.activeTabItem,
            ]}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.key && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* GENERAL TAB */}
      {activeTab === "general" && (
        <View style={styles.card}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <Feather name="user" size={40} color="#10B981" />
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text /*style={styles.sectionTitle}*/>Photo de profil</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            // onPress={handleSaveGeneral}
            // disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* SECURITY TAB (Simplified for Mobile) */}
      {activeTab === "security" && (
        <View style={styles.card}>
          <Text style={styles.label}>Mot de passe actuel</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
              {showCurrent ? (
                <Ionicons name="eye-off-outline" size={20} color="#9CA3AF" />
              ) : (
                <Ionicons name="eye" size={20} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Modifier le mot de passe</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* NOTIFICATIONS TAB */}
      {activeTab === "notifications" && (
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.label}>E-mail</Text>
              <Text style={styles.subLabel}>Résumé quotidien</Text>
            </View>
            <Switch
              value={emailNotifs}
              onValueChange={setEmailNotifs}
              trackColor={{ false: "#374151", true: "#10B981" }}
            />
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.label}>Alertes Sage 100</Text>
              <Text style={styles.subLabel}>Erreurs de sync</Text>
            </View>
            <Switch
              value={syncNotifs}
              onValueChange={setSyncNotifs}
              trackColor={{ false: "#374151", true: "#10B981" }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827", padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#F9FAFB" },
  subtitle: { color: "#9CA3AF", fontSize: 14, marginTop: 4 },
  tabBar: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#1F2937",
    borderRadius: 10,
    padding: 4,
  },
  tabItem: { flex: 1, paddingVertical: 10, alignItems: "center" },
  activeTabItem: { backgroundColor: "#374151", borderRadius: 8 },
  tabLabel: { color: "#9CA3AF", fontWeight: "600" },
  activeTabLabel: { color: "#10B981" },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  avatarSection: { alignItems: "center", marginBottom: 20 },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#10B981",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#10B981",
    borderRadius: 12,
    padding: 4,
  },
  inputGroup: { marginBottom: 16 },
  label: { color: "#F9FAFB", fontSize: 14, fontWeight: "500", marginBottom: 8 },
  subLabel: { color: "#9CA3AF", fontSize: 12 },
  input: {
    flex: 1,
    backgroundColor: "#374151",
    borderRadius: 8,
    padding: 12,
    color: "#FFF",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    borderRadius: 8,
    paddingRight: 12,
  },
  saveButton: {
    backgroundColor: "#10B981",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#FFF", fontWeight: "bold" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
});

export default SettingsPage;
