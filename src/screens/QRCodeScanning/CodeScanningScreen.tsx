import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { CameraView } from "expo-camera/next";
import { useClockingRequest } from "../../context/ClockingRequestContext";

type BarCodeEvent = {
  type: string;
  data: string;
};

export default function CodeScanningScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { clockingType, qrData, location, setQrData } = useClockingRequest();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeEvent) => {
    setScanned(true);
    setQrData(data);
    alert(
      "QR CODE SCANNED \n Location: " +
        JSON.stringify(location) +
        "\n Clocking type: " +
        clockingType +
        "\n QR code data: " +
        data
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "rgba(243,242,248,255)",
  },
});
