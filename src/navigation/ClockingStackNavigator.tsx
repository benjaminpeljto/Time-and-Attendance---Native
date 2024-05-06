import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClockingSelectionScreen, QRCodeScanningScreen } from "../screens";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type ClockingStackParams = {
  ClockingSelection: undefined;
  QRCodeScanning: undefined;
};

const ClockingStack = createNativeStackNavigator<ClockingStackParams>();

const ClockingStackNav = () => {
  return (
    <ClockingStack.Navigator>
      <ClockingStack.Screen
        name='ClockingSelection'
        component={ClockingSelectionScreen}
        options={{
          title: "Clocking Selection",
          headerStyle: style.headerStyle,
          headerTitleStyle: { color: "#fff" },
          headerRight: () => (
            <Pressable onPress={() => alert("In development!")}>
              <MaterialIcons name='history' size={24} color='white' />
            </Pressable>
          ),
        }}
      />
      <ClockingStack.Screen
        name='QRCodeScanning'
        component={QRCodeScanningScreen}
        options={{
          headerBackTitle: "Selection",
          title: "Scan QR Code",
          headerStyle: style.headerStyle,
          headerTitleStyle: { color: "#fff" },
        }}
      />
    </ClockingStack.Navigator>
  );
};

const style = StyleSheet.create({
  headerStyle: {
    backgroundColor: "rgba(1, 59, 109, 1)",
  },
});

export default ClockingStackNav;