import { StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useplayer } from "../../context/playerctx";
import { PlayIcon } from "../../assets/icons/icons";
import { colors } from "../../constants/colors";
import { text } from "../../constants/styles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const PreviewCtr = ({ promptUid, description, audioUrl, title }) => {
  const navigation = useNavigation();

  const { setplyrisvisible, setaudtitle, setaudURL } = useplayer();

  const gotodetail = () =>
    navigation.navigate("detail", { promptID: promptUid });

  const playaudio = () => {
    setplyrisvisible(true);
    setaudtitle(title);
    setaudURL(audioUrl);
  };

  return (
    <TouchableOpacity onPress={gotodetail} style={styles.container}>
      <Text
        style={[text, { textAlign: "justify", textTransform: "lowercase" }]}
      >
        {String(description).substring(0, 59)} . . .
      </Text>

      <TouchableOpacity onPress={playaudio}>
        <PlayIcon />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 2 - 12,
    height: SCREEN_HEIGHT / 5 - 12,
    marginBottom: 8,
    marginHorizontal: 5,
    padding: 8,
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
});
