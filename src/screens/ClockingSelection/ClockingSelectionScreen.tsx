import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from "react-native";
import ScanQRCodeButton from "../../components/ScanQRCodeButton";
import ClockingSelectionButtons from "../../components/ClockingSelectionButtons";
import { useClockingRequest } from "../../context/ClockingRequestContext";
import { useState } from "react";
import {
  type ClockingOption,
  type ClockingSelectionScreenProps,
} from "../../utils/types";

export default function ClockingSelectionScreen({
  navigation,
}: ClockingSelectionScreenProps) {
  const { isLocationLoading } = useClockingRequest();
  const [clockingOption, setClockingOption] = useState<ClockingOption>(null);

  const handleClockingOptionChange = (option: ClockingOption) => {
    setClockingOption(option);
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleClockingOptionChange(null)}>
      <View style={styles.container}>
        {isLocationLoading ? (
          // Show spinner while location is loading
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='rgba(1, 59, 109, 1)' />
            <Text style={styles.loadingText}>Retrieving your location...</Text>
            <Text style={styles.loadingSubText}>
              This might take a few moments. Please wait.
            </Text>
          </View>
        ) : (
          // Show the clocking options and QR code button once location is loaded
          <>
            <Text style={styles.instructionMessageText}>
              Select a clocking option:
            </Text>
            <ClockingSelectionButtons
              optionSelected={clockingOption}
              handleClockingOptionChange={handleClockingOptionChange}
            />
            <ScanQRCodeButton
              selectedOption={clockingOption}
              navigation={navigation}
            />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(243,242,248,255)",
  },
  instructionMessageText: {
    paddingTop: 40,
    fontSize: 25,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  loadingSubText: {
    fontSize: 16,
    marginTop: 5,
    color: "gray",
    textAlign: "center",
  },
});
