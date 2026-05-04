import { Stack } from "expo-router";

export default function RootLayout() {
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
