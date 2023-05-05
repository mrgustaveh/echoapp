import { SafeAreaView } from "react-native-safe-area-context";
import AntDeisgnIcon from "react-native-vector-icons/AntDesign";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { container } from "../constants/styles";
import { colors } from "../constants/colors";

const CreateAudioScreen = () => {
  return (
    <SafeAreaView style={container}>
      <NavBar />

      <BottomBtn
        title="create"
        icon={<AntDeisgnIcon name="plus" color={colors.text} size={22} />}
        onclick={() => {}}
      />
    </SafeAreaView>
  );
};

export default CreateAudioScreen;
