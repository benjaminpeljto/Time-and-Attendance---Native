import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function HomeActivityCard() {
  return (
    <View style={styles.card}>
      {/* Clock In Section */}
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <AntDesign name='login' size={24} color='#013B6D' />
        </View>
        <View style={styles.info}>
          <Text style={styles.activityText}>Clock In</Text>
          <Text style={styles.dateText}>June 23, 2024</Text>
        </View>
        <Text style={styles.timeText}>09:32 AM</Text>
      </View>
      <View style={styles.separator} />
      {/* Clock Out Section */}
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <AntDesign name='logout' size={24} color='#013B6D' />
        </View>
        <View style={styles.info}>
          <Text style={styles.activityText}>Clock In</Text>
          <Text style={styles.dateText}>June 23, 2024</Text>
        </View>
        <Text style={styles.timeText}>--:--</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensure the time text is pushed to the end
    paddingVertical: 15, // Use padding to give even spacing within the row
  },
  iconWrapper: {
    backgroundColor: "#CCE7FF",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#013B6D",
  },
  dateText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#013B6D",
  },
  separator: {
    height: 1,
    backgroundColor: "#E6E6E6",
    marginVertical: 5, // Reduced margin to minimize space between rows
  },
});
