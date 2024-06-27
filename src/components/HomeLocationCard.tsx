import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { type HomeLocationCardProps } from "../utils/types";

export default function HomeLocationCard({
  isAtLocation,
}: HomeLocationCardProps) {
  return (
    <>
      <View style={styles.activityHeader}>
        <View style={styles.headerSub}>
          <Entypo name='location' size={20} color='#4A4A4A' />
          <Text style={styles.activityTitle}>Your location</Text>
        </View>
        <View style={styles.headerSub}>
          <FontAwesome name='refresh' size={14} color='#0268C0' />
          <Text style={styles.cardAction}>Refresh</Text>
        </View>
      </View>
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
    </>
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
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  headerSub: {
    flexDirection: "row",
    alignItems: "baseline",
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
});
