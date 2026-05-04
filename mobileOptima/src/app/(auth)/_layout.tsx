import { Redirect, Stack } from "expo-router";
import { useUserStore } from "../store/userStore.js";

export default function AuthRoutesLayout() {
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
