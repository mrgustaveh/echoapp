import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useplayer } from "../../context/playerctx";
import { colors } from "../../constants/colors";

const placeholderimage = require("../../assets/img/placeholder.jpg");

export const VoicePreview = ({
  preVimage,
  voiceid,
  audioUrl,
  setVoiceid,
  isactive,
}) => {
  const { setplyrisvisible, setaudURL, setaudtitle } = useplayer();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: isactive ? colors.lineclr : colors.primary,
        },
      ]}
      onPress={() => {
        setVoiceid(voiceid);
        setplyrisvisible(true);
        setaudURL(audioUrl);
        setaudtitle("The Theory Of Everything");
      }}
    >
      <Image source={{ uri: preVimage }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    borderWidth: 0.5,
    borderRadius: 500,
  },

  image: {
    width: 48,
    height: 48,
    borderRadius: 500,
    resizeMode: "cover",
  },
});
