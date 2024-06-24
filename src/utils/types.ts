import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { type LocationObject } from "expo-location";

export type ClockingStackParams = {
    ClockingSelection: undefined;
    QRCodeScanning: undefined;
    ManualClocking: undefined;
};

export type ClockingSelectionScreenProps = NativeStackScreenProps<
  ClockingStackParams,
  "ClockingSelection"
>;

export type ClockingOption = "MANUAL" | "QR" | null;
export type ClockingType = "ClockIn" | "ClockOut";

export type ClockingSelectionButtonsProps = {
    optionSelected: ClockingOption;
    handleClockingOptionChange: (option: ClockingOption) => void;
}

export type ScanQRCodeButtonProps = {
    navigation: NativeStackNavigationProp<
      ClockingStackParams,
      "ClockingSelection",
      undefined
    >;
    selectedOption: ClockingOption; 
};

export type QRCodeData = {
  code: string;
  type: string;
  controllerId: number
}

export type NativeLoginRequest = {
  token: string;
}

export type NativeLoginResponse = {
  jwt: string;
  profileImageUrl: string;
  fullName: string;
}

export type QRCodeAttendanceRequest = {
  code: string;
  clockingType: ClockingType;
  longitude: number;
  latitude: number;
  controllerId: number;
}

export type QRCodeAttendanceResponse = {
  message: string;
  timeOfAttendance: string;
  clockingType: string;
}

export type ClockingRequestContextType = {
  clockingType: ClockingType | null;
  qrData: string;
  location: LocationObject | null;
  controllerId: number | null;
  handleQrCode: (code: string) => void;
  setLocation: (location: LocationObject) => void;
  isLocationLoading: boolean; // New loading state
};

export type HomeLocationCardProps = {
  isAtLocation: boolean;
}