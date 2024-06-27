import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, LeavesScreen } from "../screens";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import ClockingStackNav from "./ClockingStackNavigator";
import { ClockingRequestProvider } from "../context/ClockingRequestContext";
import { Alert, Pressable, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const BottomTabBar = createBottomTabNavigator();

const BottomTabNav = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

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
            headerShown: false,
            tabBarLabelStyle: { color: "rgba(1, 59, 109, 1)" },
            headerStyle: style.headerStyle,
            headerTitleStyle: { color: "#fff" },
            headerRight: () => (
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "Are you sure?",
                    "You will need to request another access token in order to sign in again.",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      { text: "Log out", onPress: handleLogout },
                    ]
                  );
                }}
                style={{ marginRight: 20 }}
              >
                <SimpleLineIcons name='logout' size={20} color='white' />
              </Pressable>
            ),
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
