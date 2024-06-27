import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

interface ManualTimePickerProps {
  label: string;
  icon: "login" | "logout";
  value: Date;
  onChange: (event: DateTimePickerEvent, date?: Date) => void;
}

export default function ManualTimePicker({
  label,
  icon,
  value,
  onChange,
}: ManualTimePickerProps) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelContainer}>
        <Entypo name='clock' size={20} color='#4A4A4A' />
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <View style={styles.iconWrapper}>
          <AntDesign name={icon} size={30} color='#013B6D' />
        </View>
        <DateTimePicker
          value={value}
          mode='time'
          display='spinner'
          onChange={(event, date) => {
            onChange(event, date);
          }}
          style={styles.picker}
          timeZoneName='GMT+02:00'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#4A4A4A",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconWrapper: {
    backgroundColor: "#CCE7FF",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 170, // Adjust the height as needed
  },
});
