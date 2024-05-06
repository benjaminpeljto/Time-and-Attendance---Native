import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  ClockingType,
  useClockingRequest,
} from "../context/ClockingRequestContext";

export default function ClockingSelectionButtons() {
  const { clockingType, setClockingType } = useClockingRequest();

  const handleClockingButtonPress = (type: ClockingType) => {
    setClockingType(type);
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={() => handleClockingButtonPress("ClockIn")}
        style={() => [
          styles.button,
          clockingType === "ClockIn" ? styles.selectedButton : {},
        ]}
      >
        <Ionicons
          style={{ marginLeft: -10 }}
          name='enter-outline'
          size={50}
          color='green'
        />
        <Text style={styles.buttonText}>Clock in</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          handleClockingButtonPress("ClockOut");
        }}
        style={() => [
          styles.button,
          clockingType === "ClockOut" ? styles.selectedButton : {},
        ]}
      >
        <Ionicons
          style={{ marginRight: -10 }}
          name='exit-outline'
          size={50}
          color='red'
        />

        <Text style={styles.buttonText}>Clock out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 100,
    marginBottom: 30,
    flexDirection: "row",
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
    borderRadius: 10,
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
