import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type LeaveListItemProps = {
  startDate: string;
  endDate: string;
  leaveType: string;
  appliedDays: number;
  approvedBy: string;
  status: "Pending" | "Approved" | "Rejected";
};

export default function LeaveListItem({
  startDate,
  endDate,
  leaveType,
  appliedDays,
  approvedBy,
  status,
}: LeaveListItemProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "Pending":
        return <AntDesign name='clockcircleo' size={24} color='orange' />;
      case "Approved":
        return <AntDesign name='checkcircleo' size={24} color='green' />;
      case "Rejected":
        return <AntDesign name='closecircleo' size={24} color='red' />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.labelText}>Date</Text>
        <View style={styles.statusWrapper}>
          {getStatusIcon()}
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <Text style={styles.dateText}>{`${startDate} - ${endDate}`}</Text>
      <View style={styles.separator} />
      <View style={styles.detailsRow}>
        <View style={styles.detailBox}>
          <Text style={styles.labelText}>Leave Type</Text>
          <Text style={styles.detailText}>{leaveType}</Text>
        </View>
        <View style={styles.detailBox}>
          <Text style={styles.labelText}>Applied Days</Text>
          <Text style={styles.detailText}>{appliedDays} Days</Text>
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
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  labelText: {
    fontSize: 14,
    color: "#8E8E93",
  },
  statusWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#2F3841",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2F3841",
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#E6E6E6",
    marginVertical: 10,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  detailBox: {
    alignItems: "flex-start",
  },
  detailText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2F3841",
  },
});
