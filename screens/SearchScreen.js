import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { SearchInput } from "../components/search/SearchInput";
import { container } from "../constants/styles";
import { colors } from "../constants/colors";

const SearchScreen = () => {
  const navigation = useNavigation();

  const goback = () => navigation.goBack();

  return (
    <SafeAreaView style={container}>
      <SearchInput />

      <BottomBtn
        title="go back"
        icon={<EntypoIcon name="chevron-left" size={22} color={colors.text} />}
        iconfirst
        onclick={goback}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
