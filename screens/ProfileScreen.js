import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../components/NavBar";
import { container, text } from "../constants/styles";

function ProfileScreen() {
  return (
    <SafeAreaView style={container}>
      <NavBar />
      <Text style={text}>Profile</Text>
    </SafeAreaView>
  );
}

export default ProfileScreen;
