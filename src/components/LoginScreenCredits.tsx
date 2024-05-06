import { StyleSheet, Text, View } from "react-native";

export default function LoginScreenCredits() {
  return (
    <View style={styles.container}>
      <Text style={styles.copyright}>
        2024 &copy; International Burch University. All Rights Reserved.
      </Text>
      <Text style={styles.credits}>Developer: Benjamin Peljto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  copyright: {
    color: "white",
    fontSize: 11,
    opacity: 0.7,
    marginBottom: 5,
  },
  credits: {
    color: "white",
    fontSize: 12,
    opacity: 0.7,
  },
});
