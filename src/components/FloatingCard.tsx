import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FloatingCardProps } from "../utils/types";

export default function FloatingCard({
  clockedIn,
  clockedOut,
  durationSeconds,
}: FloatingCardProps) {
  const navigation = useNavigation<NavigationProp<any>>();
  const [formattedDate, setFormattedDate] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [iconName, setIconName] = useState<"login" | "logout">("login");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    // Format current date
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(now);
    setFormattedDate(formatted);

    // Calculate hours and minutes from durationSeconds
    const calculatedHours = Math.floor(durationSeconds / 3600);
    const calculatedMinutes = Math.floor((durationSeconds % 3600) / 60);
    setHours(calculatedHours);
    setMinutes(calculatedMinutes);

    // Update the icon and message based on clocking state
    if (clockedOut) {
      setIconName("login");
      setInfoMessage("You have clocked out!");
    } else if (clockedIn) {
      setIconName("logout");
      setInfoMessage("You are clocked in!");
    } else {
      setIconName("login");
      setInfoMessage("You haven’t clocked in today!");
    }
  }, [clockedIn, clockedOut, durationSeconds]);

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
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
      <View style={styles.timeBoxRow}>
        <View style={styles.timeBoxContainer}>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>
              {hours.toString().padStart(2, "0")}
            </Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>
              {minutes.toString().padStart(2, "0")}
            </Text>
          </View>
        </View>
        <Text style={styles.hoursText}>HRS</Text>
      </View>
      <Text style={styles.infoText}>{infoMessage}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleClockingNavigation}
      >
        <AntDesign name={iconName} size={18} color='white' />
        <Text style={styles.buttonText}>
          {clockedOut ? "Clock In" : "Clock Out"}
        </Text>
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
  timeBoxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the group horizontally
    marginBottom: 15,
  },
  timeBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    textAlign: "center",
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
