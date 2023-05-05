import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { container } from "../constants/styles";

const CreateAudioScreen = () => {
  return (
    <SafeAreaView style={container}>
      <NavBar />

      <BottomBtn
        title="create"
        icon={<AntDeisgnIcon name="plus" color={colors.text} size={22} />}
        onclick={() => navigation.navigate("detail")}
      />
    </SafeAreaView>
  );
};

export default CreateAudioScreen;
