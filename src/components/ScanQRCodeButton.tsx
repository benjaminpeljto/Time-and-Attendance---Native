import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ScanQRCodeButtonProps } from "../utils/types";

export default function ScanQRCodeButton({
  navigation,
  selectedOption,
}: ScanQRCodeButtonProps) {
  return selectedOption ? (
    <View style={styles.continueButtonContainer}>
      <Pressable
        style={() => [
          styles.continueButton,
          selectedOption === "QR" ? styles.clockInStyle : styles.clockOutStyle,
        ]}
        onPress={() => {
          if (selectedOption === "QR") navigation.navigate("QRCodeScanning");
          else navigation.navigate("ManualClocking");
        }}
      >
        <AntDesign
          name={selectedOption === "QR" ? "qrcode" : "form"}
          size={24}
          color='white'
        />
        <Text style={styles.continueButtonText}>
          {selectedOption === "QR" ? "Scan QR Code" : "Enter Manually"}
        </Text>
      </Pressable>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  continueButtonContainer: {
    alignItems: "center",
  },
  continueButton: {
    width: 210,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    shadowColor: "#101010",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    flexDirection: "row",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    marginStart: 5,
  },
  clockInStyle: {
    backgroundColor: "rgb(67, 175, 17)",
  },
  clockOutStyle: {
    backgroundColor: "rgb(44,76,244)",
  },
});
