import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  Dimensions,
  Alert,
  RefreshControl, // Import RefreshControl
} from "react-native";
import AuthContext from "../../context/AuthContext";
import { ActivityCard, FloatingCard, LocationCard } from "../../components";
import HomeHeader from "../../components/HomeHeader";
import { ClockingService } from "../../services";
import ClockingRequestContext from "../../context/ClockingRequestContext";
import { HomeScreenDataResponse } from "../../utils/types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);
  const { location, isLocationLoading } = useContext(ClockingRequestContext);
  const [homeData, setHomeData] = useState<HomeScreenDataResponse>({
    clockInTime: null,
    clockOutTime: null,
    clockedDurationSeconds: 0,
    insideLocation: false,
  });
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state

  // Function to fetch home screen data
  const fetchHomeScreenData = async () => {
    if (location && !isLocationLoading) {
      const data = await ClockingService.requestHomeScreenData({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setHomeData(data);
    }
  };

  // Fetch data initially
  useEffect(() => {
    fetchHomeScreenData();
  }, [location, isLocationLoading]);

  // Function to handle refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHomeScreenData(); // Fetch the latest data
    setRefreshing(false); // End refreshing
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
      <HomeHeader>
        <FloatingCard
          clockedIn={homeData.clockInTime ? true : false}
          clockedOut={homeData.clockOutTime ? true : false}
          durationSeconds={homeData.clockedDurationSeconds}
        />
      </HomeHeader>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          decelerationRate='normal'
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.mainContent}>
            <ActivityCard
              clockInTime={homeData.clockInTime}
              clockOutTime={homeData.clockOutTime}
            />
            <LocationCard isAtLocation={homeData.insideLocation} />
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    flexGrow: 1,
    backgroundColor: "rgba(243,242,248,255)",
  },
  mainContent: {
    minHeight: SCREEN_HEIGHT - 450,
    paddingBottom: 20,
    backgroundColor: "rgba(243,242,248,255)",
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
    paddingTop: 90,
    backgroundColor: "rgba(243,242,248,255)",
  },
});
