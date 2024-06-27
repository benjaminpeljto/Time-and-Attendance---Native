import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  LeaveListItem,
  LeavesFilterRow,
  LeavesStatsCard,
} from "../../components";
import { LeavesFilteringOption } from "../../utils/types";

export default function LeavesScreen() {
  const [selectedButton, setSelectedButton] =
    useState<LeavesFilteringOption>("All");
  const leavesFilteringOptions: LeavesFilteringOption[] = [
    "All",
    "Pending",
    "Upcoming",
    "History",
  ];

  const handleButtonPress = () => {
    console.log("Floating button pressed");
  };

  return (
    <View style={styles.container}>
      <LeavesStatsCard />
      <LeavesFilterRow
        filteringOptions={leavesFilteringOptions}
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />

      <ScrollView contentContainerStyle={styles.containerScrollable}>
        <LeaveListItem
          startDate='Sep 12, 2023'
          endDate='Sep 13, 2023'
          leaveType='Sick Leave'
          appliedDays={1}
          approvedBy='Employee Name'
          status='Pending'
        />
        <LeaveListItem
          startDate='Sep 12, 2023'
          endDate='Sep 13, 2023'
          leaveType='Sick Leave'
          appliedDays={1}
          approvedBy='Employee Name'
          status='Approved'
        />
        <LeaveListItem
          startDate='Sep 12, 2023'
          endDate='Sep 13, 2023'
          leaveType='Sick Leave'
          appliedDays={1}
          approvedBy='Employee Name'
          status='Rejected'
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleButtonPress}
      >
        <AntDesign name='plus' size={30} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "rgba(243,242,248,255)",
  },
  containerScrollable: {
    flex: 1,
    backgroundColor: "rgba(243,242,248,255)",
  },
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
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(1, 59, 109, 1)",
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    right: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
