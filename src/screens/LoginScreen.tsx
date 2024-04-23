import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AccessCodeInput, BurchLogo, LoginButton } from "../components";
import useAccessLogin from "../hooks/useAccessLogin";

export default function LoginScreen() {
  const { accessCode, setAccessCode, handleAccessLogin } = useAccessLogin();

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View style={styles.container}>
          <BurchLogo />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome.</Text>
            <Text style={styles.subWelcomeText}>
              Proceed by entering your access code.
            </Text>
          </View>
          <AccessCodeInput
            accessCode={accessCode}
            setAccessCode={setAccessCode}
          />
          <LoginButton handleLogin={handleAccessLogin} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#5c97bd",
  },
  container: {
    alignItems: "center",
    padding: 30,
  },
  textContainer: {
    alignItems: "flex-start",
    marginBottom: 80,
  },
  welcomeText: {
    color: "white",
    fontSize: 23,
    paddingBottom: 5,
  },
  subWelcomeText: {
    fontSize: 15,
    color: "white",
    opacity: 0.8,
  },
});
