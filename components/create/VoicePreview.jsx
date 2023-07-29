import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import { PlayIcon } from "../../assets/icons/icons";
import { text } from "../../constants/styles";
import { colors } from "../../constants/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const placeholderimage = require("../../assets/img/placeholder.jpg");

export const VoicePreview = ({
  voiceid,
  description,
  audioUrl,
  onsetvoiceId,
  isactive,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: isactive ? colors.accent : colors.lineclr,
          backgroundColor: isactive ? colors.primary : colors.accent,
        },
      ]}
    >
      <Image source={placeholderimage} style={styles.image} />

      <TouchableOpacity>
        <PlayIcon />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH / 2 - 12,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 6,
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 500,
  },
});
