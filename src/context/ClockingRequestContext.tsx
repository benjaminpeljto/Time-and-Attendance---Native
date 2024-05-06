import { LocationObject } from "expo-location";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export type ClockingType = "ClockIn" | "ClockOut" | null;

type ClockingRequestContextType = {
  clockingType: ClockingType;
  qrData: string;
  location: LocationObject | null;
  setClockingType: (type: ClockingType) => void;
  setQrData: (data: string) => void;
  setLocation: (location: LocationObject) => void;
};

const initialState: ClockingRequestContextType = {
  clockingType: null,
  qrData: "",
  location: null,
  setClockingType: () => {},
  setQrData: () => {},
  setLocation: () => {},
};

const ClockingRequestContext = createContext(initialState);

export const ClockingRequestProvider = ({ children }: PropsWithChildren) => {
  const [clockingType, setClockingType] = useState<ClockingType>(null);
  const [qrData, setQrData] = useState<string>("");
  const [location, setLocation] = useState<LocationObject | null>(null);
  return (
    <ClockingRequestContext.Provider
      value={{
        clockingType,
        qrData,
        location,
        setLocation,
        setClockingType,
        setQrData,
      }}
    >
      {children}
    </ClockingRequestContext.Provider>
  );
};

export const useClockingRequest = (): ClockingRequestContextType => {
  const context = useContext(ClockingRequestContext);
  if (context === undefined) {
    throw new Error("Error");
  }
  return context;
};

export default ClockingRequestContext;
