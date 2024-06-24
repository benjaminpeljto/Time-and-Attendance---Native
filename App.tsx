import { NavigationContainer } from "@react-navigation/native";
import App from "./src";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";

export default function AppContainer() {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <App />
      <Toast />
    </NavigationContainer>
  );
}
