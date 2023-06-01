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
const placeholderimage = require("../../assets/img/google.png");

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
          borderColor: isactive ? colors.accent : colors.accent,
          backgroundColor: isactive ? colors.primary : colors.accent,
        },
      ]}
    >
      <View style={styles.detailctr}>
        <Image source={placeholderimage} style={styles.image} />
        <Text style={text}>lorem ipsum</Text>
      </View>

      <TouchableOpacity>
        <PlayIcon />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: SCREEN_WIDTH / 2 - 12,
    padding: 7,
    borderWidth: 1,
    borderRadius: 8,
  },
  detailctr: {
    gap: 4,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 500,
  },
});
