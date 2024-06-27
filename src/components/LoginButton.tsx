import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type LoginButtonProps = {
  handleLogin: () => void;
  enabled: boolean;
};

export default function LoginButton({
  handleLogin,
  enabled,
}: LoginButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        enabled ? styles.enabledButton : styles.disabledButton,
      ]}
      onPress={handleLogin}
    >
      <Text style={styles.buttonText}>Enter</Text>
      <Ionicons
        name='enter-outline'
        size={24}
        color='rgba(255, 255, 255, 0.7)'
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    width: "100%",
    padding: 10,
    borderRadius: 25,
    shadowColor: "#121212",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginBottom: 70,
    flexDirection: "row",
    justifyContent: "center",
  },
  enabledButton: {
    backgroundColor: "rgba(1, 59, 109, 1)",
  },
  disabledButton: {
    backgroundColor: "rgba(1, 59, 109, 0.5)",
  },
  buttonText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    lineHeight: 24,
    paddingRight: 5,
  },
});
