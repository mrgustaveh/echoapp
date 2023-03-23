import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../components/NavBar";
import { container, title } from "../constants/styles";

function SplashScreen() {
  return (
    <SafeAreaView style={container}>
      <NavBar screen="home" />
      <Text style={title}>Splash</Text>
    </SafeAreaView>
  );
}

export default SplashScreen;
