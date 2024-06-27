import { type ReactNode, useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AuthContext from "../context/AuthContext";
import { HomeHeaderProps } from "../utils/types";
const DefaultImage = require("../assets/images/default-profile-image.jpg");

export default function HomeHeader({ children }: HomeHeaderProps) {
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome");
  const { authState } = useContext(AuthContext);

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

  const getFirstName = (fullName: string | null) => {
    if (fullName) return fullName.split(" ")[0];
    return "";
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Image
          source={
            authState.profileImageUrl
              ? { uri: authState.profileImageUrl }
              : DefaultImage
          }
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcomeMessage}>{welcomeMessage}</Text>
          <Text style={styles.userName}>
            {getFirstName(authState.fullName)}.
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "rgba(1, 59, 109, 1)",
    paddingBottom: 120, // Space for the floating card overlap
    position: "relative",
    zIndex: 1,
  },
  header: {
    paddingStart: 30,
    paddingEnd: 30,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  welcomeMessage: {
    color: "#efeff1",
    fontSize: 25,
    fontWeight: "normal",
    textAlign: "right",
  },
  userName: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "right",
  },
});
