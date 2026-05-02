import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Link href="/MobileHome" style={{ marginTop: 20, color: "blue" }}>
        Go to Mobile Home
      </Link>
      <Link href="/MobileCount" style={{ marginTop: 20, color: "blue" }}>
        Go to Mobile Count
      </Link>
      <Link href="/MobileProfile" style={{ marginTop: 20, color: "blue" }}>
        Go to Mobile Profile
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
