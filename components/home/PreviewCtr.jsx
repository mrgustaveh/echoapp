import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlayIcon, DownloadIcon } from "../../assets/icons/icons";
import { text } from "../../constants/styles";
import { colors } from "../../constants/colors";

const devwidth = Dimensions.get("window").width;
const devheight = Dimensions.get("window").height;

export const PreviewCtr = () => {
  const navigation = useNavigation();

  const gotodetail = () => navigation.navigate("detail");

  const playaudio = () => alert("playing audio");

  const ondownload = () => alert("download started");

  return (
    <Pressable onPress={gotodetail} style={styles.container}>
      <Text style={[text, { textTransform: "lowercase" }]}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero,
        repellendus...
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.playpause} onPress={playaudio}>
          <PlayIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={ondownload}>
          <DownloadIcon />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: devwidth / 2 - 12,
    height: devheight / 5 - 12,
    marginBottom: 8,
    marginHorizontal: 3,
    padding: 8,
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: colors.accentlight,
  },
  actions: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  playpause: {
    marginRight: 16,
  },
});
