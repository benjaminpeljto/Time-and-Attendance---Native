import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import decryptQRData from "../utils/crypter";
import {
  QRCodeAttendanceResponse,
  type ClockingRequestContextType,
  type ClockingType,
  type QRCodeData,
} from "../utils/types";
import { Alert } from "react-native";
import { ClockingService } from "../services";
import Toast from "react-native-toast-message";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const initialState: ClockingRequestContextType = {
  clockingType: null,
  qrData: "",
  location: null,
  controllerId: null,
  setLocation: () => {},
  handleQrCode: () => {},
  isLocationLoading: true,
};

const ClockingRequestContext = createContext(initialState);

export const ClockingRequestProvider = ({ children }: PropsWithChildren) => {
  const [clockingType, setClockingType] = useState<ClockingType | null>(null);
  const [qrData, setQrData] = useState<string>("");
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [controllerId, setControllerId] = useState<number | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    // Fetch location as soon as the component mounts
    const fetchLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        const currentPosition = await getCurrentPositionAsync({});
        setLocation(currentPosition);
        setIsLocationLoading(false); // Set loading to false once location is fetched
      } else {
        Alert.alert(
          "Location Permission",
          "Permission to access location was denied."
        );
        setIsLocationLoading(false); // Set loading to false even if permission is denied
      }
    };

    fetchLocation();
  }, []);

  const handleQrCode = (code: string) => {
    try {
      // Attempt to decrypt and parse the QR data
      const decryptedData = decryptQRData(code);

      // Parsing the decrypted data
      const decrypted: QRCodeData = JSON.parse(decryptedData as string);

      // Update state with the new values
      const newClockingType = decrypted.type as ClockingType;
      const newQrData = decrypted.code;
      const newControllerId = decrypted.controllerId;

      setClockingType(newClockingType);
      setQrData(newQrData);
      setControllerId(newControllerId);

      // Proceed with the attendance request using the latest values
      handleAttendanceRequest(
        newClockingType,
        newQrData,
        newControllerId,
        location
      );
    } catch (error) {
      Alert.alert(
        "Invalid QR Code",
        `Error occurred while parsing QR data.\nPlease try again.`
      );
    }
  };

  const showToastSuccessClocking = (response: QRCodeAttendanceResponse) => {
    const clockingFormatted =
      response.clockingType === "ClockIn" ? "clocked in" : "clocked out";
    Toast.show({
      type: "success",
      text1: response.message,
      text2:
        "You successfully " +
        clockingFormatted +
        " at " +
        response.timeOfAttendance.slice(0, 8) +
        ".",
      topOffset: 100,
      position: "top",
    });
  };

  const showToastErrorClocking = (message: string) => {
    Toast.show({
      type: "error",
      text1: "Error occured:",
      text2: message,
      bottomOffset: 100,
      position: "bottom",
    });
  };

  const handleAttendanceRequest = async (
    type: ClockingType,
    code: string,
    controllerId: number,
    location: LocationObject | null
  ) => {
    // Check that all necessary data is available
    if (
      location?.coords.longitude !== undefined &&
      location?.coords.latitude !== undefined
    ) {
      try {
        const response = await ClockingService.requestQrAttendance({
          code: code,
          clockingType: type,
          controllerId: controllerId,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
        showToastSuccessClocking(response);

        navigation.navigate("Home");
      } catch (error) {
        showToastErrorClocking(error.response.data.message);
      }
    } else {
      Alert.alert(
        "Error while sending request",
        "Insufficient data, please reload the app."
      );
    }
  };

  return (
    <ClockingRequestContext.Provider
      value={{
        clockingType,
        qrData,
        location,
        controllerId,
        setLocation,
        handleQrCode,
        isLocationLoading,
      }}
    >
      {children}
    </ClockingRequestContext.Provider>
  );
};

export const useClockingRequest = (): ClockingRequestContextType => {
  const context = useContext(ClockingRequestContext);
  if (context === undefined) {
    throw new Error(
      "useClockingRequest must be used within a ClockingRequestProvider"
    );
  }
  return context;
};

export default ClockingRequestContext;
