import { StyleSheet, Text, View } from "react-native";

export default function ManualClockingScreen() {
  return (
    <View style={styles.container}>
      <Text>Manual Clocking Form</Text>
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
