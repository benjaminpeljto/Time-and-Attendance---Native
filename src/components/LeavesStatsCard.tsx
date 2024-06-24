import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LeavesStatsCard() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Leaves Statistics</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, styles.appliedText]}>6</Text>
          <Text style={styles.statLabel}>Applied</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, styles.approvedText]}>5</Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, styles.pendingText]}>4</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, styles.rejectedText]}>2</Text>
          <Text style={styles.statLabel}>Rejected</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  header: {
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#2F3841",
    marginTop: 5,
  },
  appliedText: {
    color: "#007AFF",
  },
  approvedText: {
    color: "green",
  },
  pendingText: {
    color: "orange",
  },
  rejectedText: {
    color: "red",
  },
});
