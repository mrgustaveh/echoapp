import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useplayer } from "../../context/playerctx";
import { colors } from "../../constants/colors";

export const VoicePreview = ({
  preVimage,
  voiceid,
  audioUrl,
  setVoiceid,
  isactive,
}) => {
  const { showplayer } = useplayer();

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
        showplayer("The Theory Of Everything", audioUrl);
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
