import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeActivityCardProps } from "../utils/types";

export default function HomeActivityCard({
  clockInTime,
  clockOutTime,
  isLoading,
}: HomeActivityCardProps) {
  const [currentDate, setCurrentDate] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }).format(now);
    setCurrentDate(formattedDate);
  }, []);

  const handleViewAllPress = () => {
    Alert.alert("View All", "Displaying all activities.");
  };

  return (
    <>
      <View style={styles.activityHeader}>
        <View style={styles.headerSub}>
          <MaterialCommunityIcons
            name='calendar-text-outline'
            size={20}
            color='#4A4A4A'
          />
          <Text style={styles.activityTitle}>Today's activity</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.headerSub,
            pressed && styles.pressedButton,
          ]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleViewAllPress}
        >
          <Text style={[styles.cardAction, isPressed && styles.pressedText]}>
            View All
          </Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        {/* Clock In Section */}
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            {isLoading ? (
              <ActivityIndicator size={24} color='rgba(1, 59, 109, 1)' />
            ) : (
              <AntDesign name='login' size={24} color='#013B6D' />
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.activityText}>Clock In</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
          <Text style={styles.timeText}>
            {clockInTime ? clockInTime.slice(0, 5) : "--:--"}
          </Text>
        </View>
        <View style={styles.separator} />
        {/* Clock Out Section */}
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            {isLoading ? (
              <ActivityIndicator size={24} color='rgba(1, 59, 109, 1)' />
            ) : (
              <AntDesign name='logout' size={24} color='#013B6D' />
            )}
          </View>

          <View style={styles.info}>
            <Text style={styles.activityText}>Clock Out</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
          <Text style={styles.timeText}>
            {clockOutTime ? clockOutTime.slice(0, 5) : "--:--"}
          </Text>
        </View>
      </View>
    </>
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
    marginBottom: 25,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#013B6D",
    marginEnd: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#E6E6E6",
    marginVertical: 5,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  headerSub: {
    flexDirection: "row",
    alignItems: "baseline",
    padding: 5,
    borderRadius: 5,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#4A4A4A",
  },
  cardAction: {
    fontSize: 14,
    color: "#0268C0",
    fontWeight: "bold",
    marginLeft: 5,
  },
  pressedButton: {
    backgroundColor: "#CCE7FF",
  },
  pressedText: {
    color: "#013B6D",
  },
});
