import { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  View,
  Text,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import Lottie from "lottie-react-native";
import { usenotification } from "../../context/notificationctx";
import { downloadmedia } from "../../utils/downloadutil";
import { PlayIcon, DownloadIcon, PauseIcon } from "../../assets/icons/icons";
import { text } from "../../constants/styles";
import { colors } from "../../constants/colors";

const devwidth = Dimensions.get("window").width;
const devheight = Dimensions.get("window").height;

export const PreviewCtr = ({ promptUid, description, audioUrl, title }) => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(false);
  const [Sound, setSound] = useState();
  const [isplaying, setisplaying] = useState(false);

  const {
    setshownotification,
    setnotifiIsloading,
    setissuccess,
    setnotificationtitle,
    setnotificationtext,
  } = usenotification();

  const gotodetail = () =>
    navigation.navigate("detail", { promptID: promptUid });

  const requestmediapermission = async () => {
    const res = await MediaLibrary.requestPermissionsAsync();

    if (res.status === "granted") setHasPermission(true);
  };

  const ondownload = () => {
    if (hasPermission)
      downloadmedia({ URL: audioUrl, title: title })
        .then((res) => {
          setshownotification(true);
          setnotifiIsloading(true);
          setnotificationtitle("downloading");
          setnotificationtext(
            `downloading file - ${String(title).substring(0, 5)}...mp3`
          );

          setTimeout(() => {
            if (res?.filesaved) {
              setshownotification(true);
              setnotifiIsloading(false);
              setissuccess(true);
              setnotificationtitle("download complete");
              setnotificationtext(
                `${String(title).substring(0, 5)}...mp3 downloaded successfully`
              );
            }
          }, 1500);
        })
        .catch(() => {
          setnotifiIsloading(false);
          setissuccess(false);
          setnotificationtitle("downloading");
          setnotificationtext(`unable to download file - ${title}.mp3`);
        })
        .finally(() => {
          setTimeout(() => {
            setshownotification(false);
            setnotifiIsloading(false);
            setissuccess(false);
            setnotificationtitle("");
            setnotificationtext("");
          }, 4500);
        });
    else {
      setshownotification(true);
      setissuccess(false);
      setnotificationtitle("permission needed");
      setnotificationtext("allow media access");

      requestmediapermission();
    }
  };

  const AudioPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isPlaying) {
      setisplaying(true);
    } else {
      setisplaying(false);
    }

    if (playbackStatus.didJustFinish) {
      setisplaying(false);
    }
  };

  const playaudio = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      { shouldPlay: true }
    );

    await sound.playAsync();
    setSound(sound);
    sound.setOnPlaybackStatusUpdate(AudioPlaybackStatusUpdate);
  };

  const pauseaudio = () => Sound.pauseAsync();

  useEffect(() => {
    return Sound
      ? () => {
          Sound.unloadAsync();
        }
      : undefined;
  }, [Sound]);

  return (
    <Pressable onPress={gotodetail} style={styles.container}>
      <Text
        style={[text, { textAlign: "justify", textTransform: "lowercase" }]}
      >
        {String(description).substring(0, 80)}...
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.playpause}
          onPress={isplaying ? pauseaudio : playaudio}
        >
          {isplaying ? <PauseIcon /> : <PlayIcon />}
        </TouchableOpacity>

        <TouchableOpacity onPress={ondownload}>
          <DownloadIcon />
        </TouchableOpacity>

        {isplaying && (
          <Lottie
            source={require("../../assets/animations/wave.json")}
            autoPlay
            loop
          />
        )}
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
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  playpause: {
    // marginRight: 16,
  },
});
