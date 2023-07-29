import { useState, useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import Lottie from "lottie-react-native";
import { downloadmedia } from "../../utils/downloadutil";
import { usenotification } from "../../context/notificationctx";
import {
  PlayIcon,
  PauseIcon,
  DownloadIcon,
  MicIcon,
  FastForwardIcon,
  RewindIcon,
} from "../../assets/icons/icons";
import { text } from "../../constants/styles";
import { colors } from "../../constants/colors";

export const DetailPlayer = ({ audURL, audTitle }) => {
  const animationref = useRef();

  const [hasPermission, setHasPermission] = useState(false);
  const [Sound, setSound] = useState();
  const [currpos, setcurrpos] = useState(0);
  const [progress, setprogress] = useState(0);
  const [isplaying, setisplaying] = useState(false);
  const [hasLoaded, sethasLoaded] = useState(false);

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
            `downloading file - ${String(audTitle).substring(0, 5)}...mp3`
          );

          setTimeout(() => {
            if (res?.filesaved) {
              setshownotification(true);
              setnotifiIsloading(false);
              setissuccess(true);
              setnotificationtitle("download complete");
              setnotificationtext(
                `${String(audTitle).substring(
                  0,
                  5
                )}...mp3 downloaded successfully`
              );
            }
          }, 1500);
        })
        .catch(() => {
          setnotifiIsloading(false);
          setissuccess(false);
          setnotificationtitle("downloading");
          setnotificationtext(`unable to download file - ${audTitle}.mp3`);
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
      setcurrpos(playbackStatus.positionMillis);

      const progress =
        (playbackStatus?.positionMillis / playbackStatus?.durationMillis) * 100;

      setprogress(progress);
      animationref.current?.resume();
    } else {
      setisplaying(false);
      animationref.current?.pause();
    }

    if (playbackStatus.didJustFinish) {
      setisplaying(false);
      setcurrpos(0);
      animationref.current?.reset();
    }
  };

  const playaudio = async () => {
    if (currpos !== 0 && Sound._loaded) {
      Sound.playFromPositionAsync(currpos);
    } else {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audURL },
        { shouldPlay: true, isLooping: false },
        (status) => {
          sethasLoaded(status.isLoaded);
        }
      );

      if (sound._loaded) {
        await sound.playAsync();
        setSound(sound);
        sound.setOnPlaybackStatusUpdate(AudioPlaybackStatusUpdate);
      }
    }
  };

  const pauseaudio = () => Sound.pauseAsync();

  const rewind5 = () => {
    if (hasLoaded) Sound.setPositionAsync(currpos - 5 * 1000);
  };

  const forward5 = () => {
    if (hasLoaded) Sound.setPositionAsync(currpos + 5 * 1000);
  };

  useEffect(() => {
    return Sound
      ? () => {
          Sound.unloadAsync();
        }
      : undefined;
  }, [Sound]);

  return (
    <View style={styles.container}>
      <View style={styles.mic}>
        <MicIcon />
      </View>

      <Text style={[text, styles.audTitle]}>{audTitle}</Text>

      <View style={[styles.audProgress, { width: `${progress}%` }]} />

      <View style={styles.controls}>
        <Lottie
          source={require("../../assets/animations/wave.json")}
          autoPlay={false}
          loop={isplaying}
          ref={animationref}
          style={{ width: 30, height: 30 }}
        />

        <TouchableOpacity onPress={rewind5}>
          <RewindIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={isplaying ? pauseaudio : playaudio}
          style={[styles.mic, styles.playpause]}
        >
          {isplaying ? <PauseIcon /> : <PlayIcon />}
        </TouchableOpacity>

        <TouchableOpacity onPress={forward5}>
          <FastForwardIcon />
        </TouchableOpacity>

        <TouchableOpacity onPress={ondownload}>
          <DownloadIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 22,
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  mic: {
    width: 60,
    height: 60,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 500,
    backgroundColor: colors.accent,
  },
  audTitle: {
    marginTop: 32,
    marginBottom: 8,
  },
  audProgress: {
    height: 1,
    marginTop: 4,
    borderRadius: 8,
    backgroundColor: colors.lineclr,
  },
  controls: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  playpause: {
    width: 48,
    height: 48,
    marginTop: 0,
    alignSelf: "auto",
  },
});
