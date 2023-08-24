import { useEffect, useCallback, useState, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Lottie from "lottie-react-native";
import { downloadmedia } from "../utils/downloadutil";
import { useplayer } from "../context/playerctx";
import { usenotification } from "../context/notificationctx";
import {
  MicIcon,
  FastForwardIcon,
  RewindIcon,
  DownloadIcon,
  PlayIcon,
  PauseIcon,
} from "../assets/icons/icons";
import { text } from "../constants/styles";
import { colors } from "../constants/colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 12.75;

export const Player = () => {
  const context = useSharedValue({ y: 0 });
  const translateYSharedValue = useSharedValue(0);

  const animationref = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [Sound, setSound] = useState();
  const [currpos, setcurrpos] = useState(0);
  const [progress, setprogress] = useState(0);
  const [isplaying, setisplaying] = useState(false);
  const [hasLoaded, sethasLoaded] = useState(false);

  const { hideplayer, plyrisvisible, audtitle, audURL } = useplayer();
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
      downloadmedia({ URL: audURL, title: audtitle })
        .then((res) => {
          setshownotification(true);
          setnotifiIsloading(true);
          setnotificationtitle("downloading");
          setnotificationtext(
            `downloading file - ${String(audtitle).substring(0, 5)}...mp3`
          );

          setTimeout(() => {
            if (res?.filesaved) {
              setshownotification(true);
              setnotifiIsloading(false);
              setissuccess(true);
              setnotificationtitle("download complete");
              setnotificationtext(
                `${String(audtitle).substring(
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
          setnotificationtext(`unable to download file - ${audtitle}.mp3`);
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
      animationref.current?.reset();
      setisplaying(false);
      setcurrpos(0);
      scrollTo(SCREEN_HEIGHT / 1.5);
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

  const scrollTo = useCallback((DESTINATION) => {
    "worklet";
    translateYSharedValue.value = withSpring(DESTINATION, { damping: 50 });
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateYSharedValue.value };
    })
    .onUpdate((event) => {
      translateYSharedValue.value = event.translationY + context.value.y;
      translateYSharedValue.value = Math.max(
        translateYSharedValue.value,
        MAX_TRANSLATE_Y
      );
    })
    .onEnd(() => {
      if (translateYSharedValue.value > -SCREEN_HEIGHT / 14) {
        scrollTo(SCREEN_HEIGHT / 1.5);

        if (isplaying) {
          runOnJS(pauseaudio);
        }

        runOnJS(hideplayer)();
      } else if (translateYSharedValue.value <= -SCREEN_HEIGHT / 14) {
        scrollTo(0);
      }
    });

  const rBtmSheetStye = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYSharedValue.value }],
    };
  });

  useEffect(() => {
    return Sound
      ? () => {
          Sound.unloadAsync();
        }
      : undefined;
  }, [Sound, plyrisvisible]);

  useEffect(() => {
    if (plyrisvisible) {
      scrollTo(0);

      playaudio();
    } else {
      scrollTo(SCREEN_HEIGHT / 1.5);
    }
  }, [plyrisvisible, audURL]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.playerCtr, rBtmSheetStye]}>
        <View style={styles.line} />

        <View style={styles.mic}>
          <MicIcon />
        </View>

        <Text style={[text, styles.audTitle]}>{audtitle}</Text>

        <View style={[styles.audProgress, { width: `${progress}%` }]} />

        <View style={styles.controls}>
          <Lottie
            source={require("../assets/animations/wave.json")}
            autoPlay
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
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  playerCtr: {
    width: "100%",
    height: SCREEN_HEIGHT / 2,
    position: "absolute",
    top: SCREEN_HEIGHT / 1.5,
    bottom: 0,
    padding: 8,
    flex: 1,
    borderRadius: 8,
    backgroundColor: "rgba(50, 50, 50, 0.8)",
    zIndex: 10000,
  },
  line: {
    width: 50,
    height: 4,
    alignSelf: "center",
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  mic: {
    width: 60,
    height: 60,
    marginTop: 28,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 500,
    backgroundColor: colors.accent,
  },
  audTitle: {
    marginTop: 28,
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
