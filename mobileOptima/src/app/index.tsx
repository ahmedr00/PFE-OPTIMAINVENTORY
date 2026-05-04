import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import { useAuthStore } from "../../../frontend/src/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";
import { useSheetStore } from "./store/sheetStore";

export default function Index() {
  const { user, login, logout, checkAuth } = useUserStore();
  const { sheets, fetchSheets } = useSheetStore();

  const handlePress = async () => {
    await login("romdhaniahmedrabiaa@gmail.com", "123456789");
  };
  const handlelogout = async () => {
    await logout();
  };
  console.log("he user ise", user);
  useEffect(() => {
    checkAuth();
    fetchSheets();
  }, []);
  console.log(sheets);
  // console.log("sheets are", sheets);
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#10B981",
          borderRadius: 8,
          padding: 16,
          alignItems: "center",
        }}
        onPress={handlePress}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#10B981",
          borderRadius: 8,
          padding: 16,
          alignItems: "center",
        }}
        onPress={handlelogout}
      />
      <Ionicons name="flash" />
      <Link href="/home" style={{ marginTop: 20, fontSize: 18 }}>
        Go to home
      </Link>
      <Link href="/(auth)/login" style={{ marginTop: 20, fontSize: 18 }}>
        Go to login
      </Link>
      <Link href="/profile" style={{ marginTop: 20, fontSize: 18 }}>
        Go to profile
      </Link>
      <Link href="/settings" style={{ marginTop: 20, fontSize: 18 }}>
        Go to settings
      </Link>
      <Link href="/count" style={{ marginTop: 20, fontSize: 18 }}>
        Go to count
      </Link>
      <Link href="/scan" style={{ marginTop: 20, fontSize: 18 }}>
        Go to scan
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
