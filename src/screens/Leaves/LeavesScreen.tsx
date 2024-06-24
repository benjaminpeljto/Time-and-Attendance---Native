import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthContext from "../../context/AuthContext";

export default function LeavesScreen() {
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    console.log(authState.jwt);
  });
  return (
    <View style={styles.container}>
      <Text>Your leaves here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "rgba(243,242,248,255)",
  },
});
