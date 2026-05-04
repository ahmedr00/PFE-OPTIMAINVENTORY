import React from "react";
import { Redirect, Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
// import { ClipboardList, Home, QrCode, User } from "lucide-react-native";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useUserStore } from "../store/userStore";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#10b981", // Emerald-500
        tabBarInactiveTintColor: "#94a3b8", // Slate-400
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerIconContainer}>
              <FontAwesome5 name="box-open" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.headerMainTitle}>Optima Inventory</Text>
              <Text style={styles.headerSubTitle}>Application Terrain</Text>
            </View>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <Ionicons name="qr-code" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  header: {
    backgroundColor: "white",
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#10b981",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerMainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
  },
  headerSubTitle: {
    fontSize: 12,
    color: "#64748b",
  },
});
