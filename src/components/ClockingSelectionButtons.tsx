import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ClockingSelectionButtonsProps } from "../utils/types";

export default function ClockingSelectionButtons({
  handleClockingOptionChange,
  optionSelected,
}: ClockingSelectionButtonsProps) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={() => handleClockingOptionChange("QR")}
        style={() => [
          styles.button,
          optionSelected === "QR" ? styles.selectedButton : {},
        ]}
      >
        <Ionicons name='qr-code-outline' size={50} color='green' />
        <Text style={styles.buttonText}>QR Code</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          handleClockingOptionChange("MANUAL");
        }}
        style={() => [
          styles.button,
          optionSelected === "MANUAL" ? styles.selectedButton : {},
        ]}
      >
        <Ionicons name='hand-right-outline' size={50} color='blue' />

        <Text style={styles.buttonText}>Manual</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 50,
    marginBottom: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 80,
    shadowColor: "#121212",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: "column",
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    marginTop: 5,
  },
  selectedButton: {
    backgroundColor: "rgb(237,237,237)",
    transform: [{ scale: 0.93 }],
  },
});
