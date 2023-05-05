import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { TrashIcon } from "../assets/icons/icons";
import { container } from "../constants/styles";

const DetailScreen = () => {
  return (
    <SafeAreaView style={container}>
      <NavBar />
      <BottomBtn title="delete" icon={<TrashIcon />} onclick={() => {}} />
    </SafeAreaView>
  );
};

export default DetailScreen;
