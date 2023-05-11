import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomBtn } from "../components/buttons/BottomBtn";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { container } from "../constants/styles";
import { colors } from "../constants/colors";

function ProfileScreen() {
  const navigation = useNavigation();

  const goback = () => navigation.goBack();

  return (
    <SafeAreaView style={container}>
      <BottomBtn
        title="go back"
        icon={<EntypoIcon name="chevron-left" size={22} color={colors.text} />}
        iconfirst
        onclick={goback}
      />
    </SafeAreaView>
  );
}

export default ProfileScreen;
