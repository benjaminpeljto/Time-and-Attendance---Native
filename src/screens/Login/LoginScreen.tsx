import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  AccessCodeInput,
  BurchLogo,
  LoginButton,
  LoginScreenCredits,
} from "../../components";
import useAccessLogin from "../../hooks/useAccessLogin";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/RootStackNavigator";
import { AuthService } from "../../services";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { AxiosError } from "axios";

type LoginScreenProps = NativeStackScreenProps<RootStackParams, "Login">;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { accessCode, handleAccessCodeChange, handleAccessLogin } =
    useAccessLogin();
  const { onLoginSuccess } = useContext(AuthContext);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleLogin = async () => {
    if (handleAccessLogin()) {
      const formattedAccessCode = accessCode.replace(/-/g, "");
      AuthService.loginNative({ token: formattedAccessCode })
        .then((data) => {
          onLoginSuccess(data.jwt, data.profileImageUrl, data.fullName);
          handleDismissKeyboard();
          handleAccessCodeChange("");
          navigation.navigate("BottomTabNav");
        })
        .catch((error: AxiosError) => {
          const message =
            (error.response?.data as { message: string })?.message ||
            "Request failed to send.";
          Alert.alert("Error while logging in", message);
        });
    }
  };

  return (
    <View style={styles.safeArea}>
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
            handleAccessCodeChange={handleAccessCodeChange}
          />
          <LoginButton
            handleLogin={handleLogin}
            enabled={accessCode.length >= 14}
          />
          <LoginScreenCredits />
        </View>
      </TouchableWithoutFeedback>
    </View>
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
