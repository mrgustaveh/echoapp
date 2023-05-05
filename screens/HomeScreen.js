import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NavBar } from "../components/NavBar";
import { container, title } from "../constants/styles";
import { BottomBtn } from "../components/buttons/BottomBtn";
import AntDeisgnIcon from "react-native-vector-icons/AntDesign";
import { colors } from "../constants/colors";

const HomeScreen = () => {
  const navigation = useNavigation();

  const gotocreate = () => navigation.navigate("create");

  return (
    <SafeAreaView style={container}>
      <NavBar screen="home" />

      <BottomBtn
        title="create"
        icon={<AntDeisgnIcon name="plus" color={colors.text} size={22} />}
        onclick={gotocreate}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
