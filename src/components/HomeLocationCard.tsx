import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { HomeLocationCardProps } from "../utils/types";

export default function HomeLocationCard({
  isAtLocation,
}: HomeLocationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <MaterialIcons
            name={isAtLocation ? "check" : "close"}
            size={24}
            color={isAtLocation ? "green" : "red"}
          />
        </View>
        <View style={styles.locationTextWrapper}>
          <Text style={styles.locationText}>
            {isAtLocation
              ? "At International Burch University"
              : "Outside\nInternational Burch University"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#CCE7FF",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
  },
  locationTextWrapper: {
    flex: 1,
  },
});
