import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import ManualTimePicker from "../../components/ManualTimePicker";
import { format, toZonedTime } from "date-fns-tz";
import AuthContext from "../../context/AuthContext";
import { ClockingService } from "../../services";

export default function ManualClockingScreen() {
  const [timeIn, setTimeIn] = useState<Date>(new Date());
  const initialTimeOut = new Date();
  initialTimeOut.setHours(initialTimeOut.getHours() + 8);
  const [timeOut, setTimeOut] = useState<Date>(initialTimeOut);
  const timeZone = "Europe/Sarajevo";

  const onTimeInChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const zonedDate = toZonedTime(selectedDate, timeZone);
      setTimeIn(zonedDate);
    }
  };

  const onTimeOutChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const zonedDate = toZonedTime(selectedDate, timeZone);
      setTimeOut(zonedDate);
    }
  };

  const handleSubmit = () => {
    const formattedTimeIn = format(timeIn, "HH:mm", { timeZone });
    const formattedTimeOut = format(timeOut, "HH:mm", { timeZone });
    ClockingService.requestManualAttendance({
      timeIn: formattedTimeIn,
      timeOut: formattedTimeOut,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickersWrapper}>
        <ManualTimePicker
          label='Select Clock In Time'
          icon='login'
          value={timeIn}
          onChange={onTimeInChange}
        />
        <ManualTimePicker
          label='Select Clock Out Time'
          icon='logout'
          value={timeOut}
          onChange={onTimeOutChange}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Request Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#F5F5F5",
  },
  pickersWrapper: {
    flexGrow: 1,
    justifyContent: "space-evenly",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 5,
  },
  button: {
    backgroundColor: "#013B6D",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
