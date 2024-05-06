import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClockingSelectionScreen, LoginScreen, HomeScreen } from "../screens";
import BottomTabNav from "./BottomTabNavigator";

export type RootStackParams = {
  Login: undefined;
  BottomTabNav: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStackNav = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name='BottomTabNav'
        component={BottomTabNav}
        options={{ headerBackVisible: false, headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNav;
