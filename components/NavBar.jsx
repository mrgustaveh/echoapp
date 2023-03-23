import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EvIcon from "react-native-vector-icons/EvilIcons";
import EntIcon from "react-native-vector-icons/Entypo";
import { colors } from "../constants/colors";

const icon = require("../assets/icon.png");

export const NavBar = ({ screen }) => {
  const navigation = useNavigation();
  const goback = () => navigation.goBack();
  const gotoprofile = () => navigation.navigate("profile");
  const showsamples = () => navigation.navigate("authentication");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={screen === "home" ? showsamples : goback}
      >
        {screen === "home" ? (
          <EntIcon name="list" size={22} color={colors.text} />
        ) : (
          <EvIcon name="chevron-left" size={32} color={colors.text} />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={gotoprofile}>
        <Image source={icon} resizeMode="contain" style={styles.avt} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingRight: 8,
    paddingLeft: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: 34,
    height: 34,
    borderRadius: 500,
  },
  avt: {
    width: 34,
    height: 34,
    borderRadius: 500,
  },
});
