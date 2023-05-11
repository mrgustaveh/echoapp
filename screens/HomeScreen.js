import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AntDeisgnIcon from "react-native-vector-icons/AntDesign";
import { NavBar } from "../components/NavBar";
import { container, title } from "../constants/styles";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { PreviewCtr } from "../components/home/PreviewCtr";
import { colors } from "../constants/colors";

const HomeScreen = () => {
  const navigation = useNavigation();

  const gotocreate = () => navigation.navigate("create");

  const data = [1, 2, 3, 4, 5];

  return (
    <SafeAreaView style={container}>
      <NavBar screen="home" />

      <FlatList
        style={{ alignSelf: "stretch", paddingHorizontal: 7 }}
        data={data}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => <PreviewCtr />}
      />

      <BottomBtn
        title="create"
        icon={<AntDeisgnIcon name="plus" color={colors.text} size={22} />}
        onclick={gotocreate}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
