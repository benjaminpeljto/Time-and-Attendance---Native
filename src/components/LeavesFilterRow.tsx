import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LeavesFilteringOption } from "../utils/types";

type LeavesFilterRowProps = {
  filteringOptions: LeavesFilteringOption[];
  selectedButton: LeavesFilteringOption;
  setSelectedButton: (newlySelected: LeavesFilteringOption) => void;
};
export default function LeavesFilterRow({
  selectedButton,
  setSelectedButton,
  filteringOptions,
}: LeavesFilterRowProps) {
  return (
    <View style={styles.buttonRow}>
      {filteringOptions.map((button) => (
        <TouchableOpacity
          key={button}
          style={[
            styles.button,
            selectedButton === button && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton(button)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === button && styles.selectedButtonText,
            ]}
          >
            {button}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    alignContent: "center",
    justifyContent: "center",
    borderColor: "rgba(1, 59, 109, 1)",
    borderWidth: 1,
  },
  selectedButton: {
    borderColor: "rgba(1, 59, 109, 1)",
    borderWidth: 2,
    backgroundColor: "rgba(1, 59, 109, 0)",
  },
  buttonText: {
    color: "#4A4A4A",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedButtonText: {
    color: "rgba(1, 59, 109, 1)",
    fontWeight: "bold",
  },
});
