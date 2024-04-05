import { Image, StyleSheet } from "react-native";

const BurchLogoImage = require("../assets/images/burch_logo.png");

export default function BurchLogo() {
  return <Image source={BurchLogoImage} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 58,
    resizeMode: "cover",
    marginTop: 170,
    marginBottom: 50,
  },
});
