import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ClockingStackParams } from "../navigation/ClockingStackNavigator";
import { useClockingRequest } from "../context/ClockingRequestContext";
import { AntDesign } from "@expo/vector-icons";

type ScanQRCodeButtonProps = {
  navigation: NativeStackNavigationProp<
    ClockingStackParams,
    "ClockingSelection",
    undefined
  >;
};
export default function ScanQRCodeButton({
  navigation,
}: ScanQRCodeButtonProps) {
  const { clockingType } = useClockingRequest();

  return clockingType ? (
    <View style={styles.continueButtonContainer}>
      <Pressable
        style={() => [
          styles.continueButton,
          clockingType === "ClockIn"
            ? styles.clockInStyle
            : styles.clockOutStyle,
        ]}
        onPress={() => {
          navigation.navigate("QRCodeScanning");
        }}
      >
        <AntDesign name='qrcode' size={24} color='white' />
        <Text style={styles.continueButtonText}>Scan QR Code</Text>
      </Pressable>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  continueButtonContainer: {
    alignItems: "center",
  },
  continueButton: {
    width: 200,
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
    marginStart: 4,
  },
  clockInStyle: {
    backgroundColor: "rgb(67, 175, 17)",
  },
  clockOutStyle: {
    backgroundColor: "rgb(244,76,44)",
  },
});
