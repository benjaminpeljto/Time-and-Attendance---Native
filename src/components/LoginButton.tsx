import { Pressable, StyleSheet, Text } from "react-native";

type LoginButtonProps = {
  handleLogin: () => void;
};

export default function LoginButton({ handleLogin }: LoginButtonProps) {
  return (
    <Pressable style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Enter</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 15,
    width: "100%",
    backgroundColor: "#013b6d",
    padding: 10,
    borderRadius: 25,
    shadowColor: "#121212",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
  },
});
