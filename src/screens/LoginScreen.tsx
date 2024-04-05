import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BurchLogo, LoginButton } from "../components";
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
          <View style={styles.inputWrapper}>
            <TextInput
              value={accessCode}
              onChangeText={setAccessCode}
              placeholder='Your Access Code'
              placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
              style={styles.input}
              keyboardType='number-pad'
              maxLength={12}
            />
          </View>
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
  inputWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },

  input: {
    width: 170,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    paddingBottom: 5,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
});
