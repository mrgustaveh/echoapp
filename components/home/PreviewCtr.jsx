import { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import { usealert } from "../../context/alertctx";
import { downloadmedia } from "../../utils/downloadutil";
import { PlayIcon, DownloadIcon } from "../../assets/icons/icons";
import { text } from "../../constants/styles";
import { colors } from "../../constants/colors";

const devwidth = Dimensions.get("window").width;
const devheight = Dimensions.get("window").height;

export const PreviewCtr = ({ promptUid, description, audioUrl, title }) => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(false);

  const { setisvible, setisloading, setissuccess } = usealert();

  const gotodetail = () => navigation.navigate("detail", { id: promptUid });

  const playaudio = () => alert("playing audio at" + audioUrl);

  const requestmediapermission = async () => {
    const res = await MediaLibrary.requestPermissionsAsync();

    if (res.status === "granted") setHasPermission(true);
  };

  const ondownload = () => {
    if (hasPermission)
      downloadmedia({ URL: audioUrl, title: title })
        .then(() => {
          setisvible(true);
          setisloading(true);
        })
        .catch(() => {
          setisloading(false);
          setissuccess(false);
        })
        .finally(() => {
          setTimeout(() => {
            setisvible(false);
            setisloading(false);
            setissuccess(false);
          }, 3500);
        });
    else requestmediapermission();
  };

  return (
    <Pressable onPress={gotodetail} style={styles.container}>
      <Text
        style={[text, { textAlign: "justify", textTransform: "lowercase" }]}
      >
        {String(description).substring(0, 80)}...
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
