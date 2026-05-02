import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="MobileHome" />
      <Stack.Screen name="MobileCount" />
      <Stack.Screen name="MobileProfile" />
      <Stack.Screen name="scanner" />
      <Stack.Screen name="login" />
    </Stack>
  );
}
