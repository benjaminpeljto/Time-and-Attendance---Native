import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Button,
  Dimensions,
  Alert,
  RefreshControl,
  Text,
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
  const { location, isLocationLoading, fetchLocation } = useContext(
    ClockingRequestContext
  );
  const [homeData, setHomeData] = useState<HomeScreenDataResponse>({
    clockInTime: null,
    clockOutTime: null,
    clockedDurationSeconds: 0,
    insideLocation: false,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isActivityLoading, setIsActivityLoading] = useState<boolean>(false);
  const [shouldFetchHomeData, setShouldFetchHomeData] = useState<boolean>(true);

  // Function to fetch home screen data
  const fetchHomeScreenData = async () => {
    setIsActivityLoading(true);
    try {
      if (location && !isLocationLoading) {
        const data = await ClockingService.requestHomeScreenData({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setHomeData(data);
        setErrorMessage(null); // Clear any previous error message
      }
    } catch (error) {
      setErrorMessage(
        "Failed to fetch home screen data. \n Swipe up to refresh."
      );
      console.log(error);
    } finally {
      setIsActivityLoading(false);
    }
  };

  // Fetch data initially if location is available, otherwise wait for location
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsActivityLoading(true);
      if (!location) {
        await fetchLocation();
      }
      setShouldFetchHomeData(true);
    };
    fetchInitialData();
  }, []);

  // Fetch home screen data when location is available and should fetch flag is true
  useEffect(() => {
    if (location && !isLocationLoading && shouldFetchHomeData) {
      fetchHomeScreenData();
      setShouldFetchHomeData(false); // Reset the flag after fetching data
    }
  }, [location, isLocationLoading, shouldFetchHomeData]);

  // Function to handle refresh
  const onRefresh = async () => {
    setRefreshing(true);
    setIsActivityLoading(true);
    await fetchLocation();
    await fetchHomeScreenData();
    setRefreshing(false);
  };

  const getContentStyle = () => {
    return {
      ...styles.content,
      paddingTop: refreshing ? 110 : 90,
    };
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
          errorMessage={errorMessage}
        />
      </HomeHeader>
      <View style={getContentStyle()}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          decelerationRate='normal'
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {errorMessage ? null : (
            <>
              <View style={styles.mainContent}>
                <ActivityCard
                  clockInTime={homeData.clockInTime}
                  clockOutTime={homeData.clockOutTime}
                  isLoading={isActivityLoading}
                />
                <LocationCard isAtLocation={homeData.insideLocation} />
              </View>
              <View style={styles.logoutButtonContainer}>
                <Button
                  title='Logout'
                  onPress={confirmLogoutAlert}
                  color='red'
                />
              </View>
            </>
          )}
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
