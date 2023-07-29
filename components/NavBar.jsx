import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchIcon, UserIcon, ChevronIcon } from "../assets/icons/icons";

export const NavBar = ({ screen }) => {
  const navigation = useNavigation();
  const goback = () => navigation.goBack();
  const gotoprofile = () => navigation.navigate("profile");
  const showsamples = () => navigation.navigate("search");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={screen === "home" ? showsamples : goback}
      >
        {screen === "home" ? <SearchIcon /> : <ChevronIcon />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={gotoprofile}>
        <UserIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    paddingRight: 0,
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
