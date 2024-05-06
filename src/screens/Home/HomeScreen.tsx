import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
const MeImage = require("../../assets/images/me.jpeg");

export default function HomeScreen() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
      setWelcomeMessage("Good morning");
    } else if (hours >= 12 && hours < 18) {
      setWelcomeMessage("Good afternoon");
    } else {
      setWelcomeMessage("Good evening");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image source={MeImage} style={styles.avatar} />
      <Text style={styles.welcomeMessage}>{`${welcomeMessage} Benjamin!`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "rgba(243,242,248,255)",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeMessage: {
    paddingTop: 20,
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
  },
  avatar: {
    resizeMode: "cover",
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
  },
});
