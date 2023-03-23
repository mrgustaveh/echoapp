import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../components/NavBar";
import { container, text } from "../constants/styles";

function Authentication() {
  return (
    <SafeAreaView style={container}>
      <NavBar />
      <Text style={text}>Authentication</Text>
    </SafeAreaView>
  );
}

export default Authentication;
