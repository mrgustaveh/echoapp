import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container, title } from "../constants/styles";

function SplashScreen() {
  return (
    <SafeAreaView style={container}>
      <Text style={title}>Splash</Text>
    </SafeAreaView>
  );
}

export default SplashScreen;
