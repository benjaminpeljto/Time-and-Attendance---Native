import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, LeavesScreen } from "../screens";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import ClockingStackNav from "./ClockingStackNavigator";
import { ClockingRequestProvider } from "../context/ClockingRequestContext";
import { StyleSheet } from "react-native";

const BottomTabBar = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <ClockingRequestProvider>
      <BottomTabBar.Navigator>
        <BottomTabBar.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarIcon: () => (
              <Entypo name='home' size={24} color='rgba(1, 59, 109, 1)' />
            ),
            tabBarLabelStyle: { color: "rgba(1, 59, 109, 1)" },
            headerStyle: style.headerStyle,
            headerTitleStyle: { color: "#fff" },
          }}
        />
        <BottomTabBar.Screen
          name='Clocking'
          component={ClockingStackNav}
          options={{
            tabBarIcon: () => (
              <Entypo name='clock' size={24} color='rgba(1, 59, 109, 1)' />
            ),
            tabBarLabelStyle: { color: "rgba(1, 59, 109, 1)" },
            headerShown: false,
          }}
        />
        <BottomTabBar.Screen
          name='Leaves'
          component={LeavesScreen}
          options={{
            tabBarIcon: () => (
              <Fontisto name='suitcase' size={24} color='rgba(1, 59, 109, 1)' />
            ),
            tabBarLabelStyle: { color: "rgba(1, 59, 109, 1)" },
            headerStyle: style.headerStyle,
            headerTitleStyle: { color: "#fff" },
          }}
        />
      </BottomTabBar.Navigator>
    </ClockingRequestProvider>
  );
};

const style = StyleSheet.create({
  headerStyle: {
    backgroundColor: "rgba(1, 59, 109, 1)",
  },
});

export default BottomTabNav;
