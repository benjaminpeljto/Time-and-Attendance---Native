import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { type NavigationProp, useNavigation } from "@react-navigation/native";

export default function FloatingCard() {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleClockingNavigation = () => {
    navigation.navigate("Clocking");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name='calendar-today'
          size={20}
          color='#013B6D'
        />
        <Text style={styles.dateText}>23 June 2024</Text>
      </View>
      <View style={styles.timeBoxContainer}>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>00</Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>00</Text>
        </View>
        <View style={styles.timeBox}>
          <Text style={styles.timeText}>00</Text>
        </View>
        <Text style={styles.hoursText}>HRS</Text>
      </View>
      <Text style={styles.infoText}>You haven’t clocked in today!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleClockingNavigation}
      >
        <AntDesign name='login' size={18} color='white' />
        <Text style={styles.buttonText}>Clock In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    position: "absolute",
    top: 110,
    left: 20,
    right: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#2F3841",
    flex: 1,
  },
  timeBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  timeBox: {
    width: 40,
    height: 40,
    backgroundColor: "#CCE7FF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  timeText: {
    fontSize: 18,
    color: "#013B6D",
  },
  hoursText: {
    fontSize: 18,
    color: "#2F3841",
    marginLeft: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#2F3841",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#013B6D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
});
