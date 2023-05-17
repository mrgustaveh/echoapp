import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import Lottie from "lottie-react-native";
import { downloadmedia } from "../../utils/downloadutil";
import { usenotification } from "../../context/notificationctx";
import { PlayIcon, PauseIcon, DownloadIcon } from "../../assets/icons/icons";
import { colors } from "../../constants/colors";

export const Player = ({ audURL, audTitle }) => {
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

  const requestmediapermission = async () => {
    const res = await MediaLibrary.requestPermissionsAsync();

    if (res.status === "granted") setHasPermission(true);
  };

  const ondownload = () => {
    if (hasPermission)
      downloadmedia({ URL: audURL, title: audTitle })
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

  return (
    <View style={styles.container}>
      <View style={styles.audioactions}>
        {audioisplaying ? (
          <TouchableOpacity onPress={pauseaudio}>
            <PauseIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={playaudio}>
            <PlayIcon />
          </TouchableOpacity>
        )}

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

      <View style={[styles.progress, { width: "60%" }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 80,
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.accentlight,
  },
  audioactions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 4,
  },
  progress: {
    height: 6,
    marginTop: 16,
    borderRadius: 6,
    backgroundColor: colors.textlight,
  },
});
