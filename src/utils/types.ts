import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { type LocationObject } from "expo-location";
import { type ReactNode } from "react";

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

export type ManualAttendanceRequest = {
  timeIn: string;
  timeOut: string;
}

export type ManualAttendanceResponse = {
  message: string;
  timeIn: string;
  timeOut: string;
}

export type ClockingRequestContextType = {
  clockingType: ClockingType | null;
  qrData: string;
  location: LocationObject | null;
  controllerId: number | null;
  handleQrCode: (code: string) => void;
  fetchLocation: () => void;
  isLocationLoading: boolean; // New loading state
};

export type HomeLocationCardProps = {
  isAtLocation: boolean;
}

export type HomeScreenDataRequest = {
  longitude: number;
  latitude: number;
}

export type HomeScreenDataResponse = {
  clockInTime: string | null;
  clockOutTime: string | null;
  clockedDurationSeconds: number;
  insideLocation: boolean;
}

export type LocationCheckResponse = {
  insideLocation: boolean;
}

export type HomeHeaderProps = {
  children?: ReactNode;
};

export type FloatingCardProps = {
  clockedIn: boolean;
  clockedOut: boolean;
  durationSeconds: number;
  errorMessage: string | null;
};

export type HomeActivityCardProps = {
  clockInTime: string | null;
  clockOutTime: string | null;
  isLoading: boolean;
};

export type LeavesFilteringOption = "All" | "Pending" | "Upcoming" | "History";