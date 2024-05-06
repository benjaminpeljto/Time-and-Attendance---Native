import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { type ClockingStackParams } from "../../navigation/ClockingStackNavigator";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import ScanQRCodeButton from "../../components/ScanQRCodeButton";
import ClockingSelectionButtons from "../../components/ClockingSelectionButtons";
import { useClockingRequest } from "../../context/ClockingRequestContext";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

type ClockingSelectionScreenProps = NativeStackScreenProps<
  ClockingStackParams,
  "ClockingSelection"
>;

export default function ClockingSelectionScreen({
  navigation,
}: ClockingSelectionScreenProps) {
  const { setClockingType, setLocation } = useClockingRequest();

  const handleClockingDismiss = () => {
    setClockingType(null);
  };

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(location);
    })();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleClockingDismiss}>
      <View style={styles.container}>
        <Text style={styles.instructionMessageText}>
          Please select a clocking option:
        </Text>
        <ClockingSelectionButtons />
        <ScanQRCodeButton navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "rgba(243,242,248,255)",
  },
  instructionMessageText: {
    paddingTop: 40,
    fontSize: 25,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "center",
  },
});
