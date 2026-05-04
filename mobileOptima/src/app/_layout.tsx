import { Stack } from "expo-router";
import { useEffect } from "react";
import { useUserStore } from "./store/userStore";

export default function RootLayout() {
  const { checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="home" /> */}
      <Stack.Screen name="login" />
      {/* <Stack.Screen name="profile" /> */}
      {/* <Stack.Screen name="settings" /> */}
      <Stack.Screen name="count" />
      {/* <Stack.Screen name="scan" /> */}
    </Stack>
  );
}
