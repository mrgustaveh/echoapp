import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useplayer } from "../../context/playerctx";
import { PlayIcon } from "../../assets/icons/icons";
import { colors } from "../../constants/colors";
import { text } from "../../constants/styles";

export const PreviewCtr = ({ promptUid, description, audioUrl, title }) => {
  const navigation = useNavigation();

  const { setplyrisvisible, setaudtitle, setaudURL } = useplayer();

  const gotodetail = () =>
    navigation.navigate("detail", { promptID: promptUid });

  const playaudio = () => {
    setaudtitle(title);
    setaudURL(audioUrl);
    setplyrisvisible(true);
  };

  return (
    <TouchableOpacity onPress={gotodetail} style={styles.container}>
      <Text
        style={[
          text,
          {
            textAlignVertical: "center",
            marginLeft: 8,
          },
        ]}
      >
        {String(description).substring(0, 48)}. . .
      </Text>

      <View style={styles.playctr}>
        <TouchableOpacity style={styles.playaudio} onPress={playaudio}>
          <PlayIcon />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "98%",
    height: 58,
    marginBottom: 8,
    marginHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  playctr: {
    height: "100%",
    justifyContent: "center",
    borderLeftWidth: 0.5,
    borderColor: colors.lineclr,
  },
  playaudio: {
    margin: 16,
  },
});
