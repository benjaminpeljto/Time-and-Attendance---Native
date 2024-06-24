import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import AuthContext from "../../context/AuthContext";
import { ActivityCard, FloatingCard, LocationCard } from "../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const DefaultImage = require("../../assets/images/default-profile-image.jpg");

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function HomeScreen() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const { authState, logout } = useContext(AuthContext);

  useEffect(() => {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
      setWelcomeMessage("Good morning");
    } else if (hours >= 12 && hours < 18) {
      setWelcomeMessage("Good afternoon");
    } else {
      setWelcomeMessage("Good afternoon");
    }
  }, []);

  const getFirstName = (fullName: string | null) => {
    if (fullName) return fullName.split(" ")[0];
    return "";
  };

  const confirmLogoutAlert = () => {
    Alert.alert(
      "Are you sure?",
      "You will need to request another access token in order to log in again.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Log out", onPress: handleLogout },
      ]
    );
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <FloatingCard />
      </View>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          decelerationRate='normal'
          scrollEventThrottle={16}
        >
          <View style={styles.mainContent}>
            <View style={styles.activityHeader}>
              <View style={styles.headerLeft}>
                <MaterialCommunityIcons
                  name='calendar-text-outline'
                  size={20}
                  color='#4A4A4A'
                />
                <Text style={styles.activityTitle}>Today's activity</Text>
              </View>
              <Text style={styles.cardAction}>View All</Text>
            </View>
            <ActivityCard />

            <View style={styles.activityHeader}>
              <View style={styles.headerLeft}>
                <Entypo name='location' size={20} color='#4A4A4A' />
                <Text style={styles.activityTitle}>Your location</Text>
              </View>
              <View style={styles.headerRight}>
                <FontAwesome name='refresh' size={14} color='#0268C0' />
                <Text style={styles.cardAction}>Refresh</Text>
              </View>
            </View>

            <LocationCard isAtLocation={false} />
          </View>
          <View style={styles.logoutButtonContainer}>
            <Button title='Logout' onPress={confirmLogoutAlert} color='red' />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgba(1, 59, 109, 1)",
    paddingTop: 20,
  },
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
  scrollContent: {
    paddingTop: 120,
    paddingHorizontal: 20,
    flexGrow: 1,
    backgroundColor: "rgba(243,242,248,255)",
  },
  mainContent: {
    minHeight: SCREEN_HEIGHT - 450,
    paddingBottom: 20,
    backgroundColor: "rgba(243,242,248,255)",
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#4A4A4A",
  },
  cardAction: {
    fontSize: 14,
    color: "#0268C0",
    fontWeight: "bold",
    marginLeft: 5,
  },
  logoutButtonContainer: {
    padding: 20,
    paddingBottom: 0,
    backgroundColor: "rgba(243,242,248,255)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(243,242,248,255)",
  },
});
