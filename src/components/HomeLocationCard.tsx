import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
import { type HomeLocationCardProps } from "../utils/types";
import { ClockingService } from "../services";
import ClockingRequestContext from "../context/ClockingRequestContext";

export default function HomeLocationCard({
  isAtLocation,
}: HomeLocationCardProps) {
  const { location, isLocationLoading, fetchLocation } = useContext(
    ClockingRequestContext
  );
  const [isAtLocationInternal, setIsAtLocationInternal] = useState<
    boolean | null
  >(isAtLocation);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleLocationRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchLocation();
      if (location && !isLocationLoading) {
        const data = await ClockingService.requestLocationCheck({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setIsAtLocationInternal(data.insideLocation);
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage("Failed to refresh location. Please try again.");
      console.log(error);
    }
    setIsRefreshing(false);
  };

  return (
    <>
      <View style={styles.activityHeader}>
        <View style={styles.headerSub}>
          <Entypo name='location' size={20} color='#4A4A4A' />
          <Text style={styles.activityTitle}>Your location</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.headerSub,
            pressed && styles.pressedButton,
          ]}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleLocationRefresh}
        >
          <FontAwesome
            name='refresh'
            size={14}
            color={isPressed ? "#013B6D" : "#0268C0"}
          />
          <Text style={[styles.cardAction, isPressed && styles.pressedText]}>
            Refresh
          </Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            {isLocationLoading || isRefreshing ? (
              <ActivityIndicator size={24} color='rgba(1, 59, 109, 1)' />
            ) : (
              <MaterialIcons
                name={isAtLocationInternal ? "check" : "close"}
                size={24}
                color={isAtLocationInternal ? "green" : "red"}
              />
            )}
          </View>
          <View style={styles.locationTextWrapper}>
            <Text style={styles.locationText}>
              {isLocationLoading || isRefreshing
                ? null
                : errorMessage
                ? errorMessage
                : location
                ? isAtLocationInternal
                  ? "At International Burch University"
                  : "Outside\nInternational Burch University"
                : "Unable to fetch location"}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    backgroundColor: "#CCE7FF",
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
  },
  locationTextWrapper: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  headerSub: {
    flexDirection: "row",
    alignItems: "baseline",
    padding: 5, // Add some padding for better touch area
    borderRadius: 5, // Add border radius for better look
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
  pressedButton: {
    backgroundColor: "#CCE7FF",
  },
  pressedText: {
    color: "#013B6D",
  },
});
