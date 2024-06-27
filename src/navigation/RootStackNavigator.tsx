import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { LoginScreen } from "../screens";
import BottomTabNav from "./BottomTabNavigator";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export type RootStackParams = {
  Login: undefined;
  BottomTabNav: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStackNav = () => {
  const { authState } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if (authState.authenticated) {
      navigation.navigate("BottomTabNav");
    } else {
      navigation.navigate("Login");
    }
  }, [authState.authenticated, navigation]);

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
