import { StyleSheet, Text, View } from "react-native";

export default function LeavesScreen() {
  return (
    <View style={styles.container}>
      <Text>Your leaves here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "rgba(243,242,248,255)",
  },
});
