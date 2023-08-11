import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import { usenotification } from "../../context/notificationctx";
import { CloseIcon } from "../../assets/icons/icons";
import { subtitle, text } from "../../constants/styles";
import { colors } from "../../constants/colors";

export const Notification = () => {
  const {
    setshownotification,
    shownotification,
    notificationtitle,
    notificationtext,
    notifiIsloading,
    issuccess,
  } = usenotification();

  useEffect(() => {
    setTimeout(() => {
      if (shownotification) {
        setshownotification(false);
      }
    }, 6500);
  }, []);

  const onclosenotification = () => setshownotification(false);

  return (
    <View style={[styles.container, styles.row]}>
      <View style={[styles.row, { gap: 8 }]}>
        {notifiIsloading && (
          <Lottie
            source={require("../../assets/animations/loading.json")}
            autoPlay
            loop={true}
            style={styles.animation}
          />
        )}

        {!notifiIsloading && issuccess && (
          <Lottie
            source={require("../../assets/animations/success.json")}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        )}

        {!notifiIsloading && !issuccess && (
          <Lottie
            source={require("../../assets/animations/error.json")}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        )}

        <View style={styles.txtctr}>
          <Text style={subtitle}>{notificationtitle}</Text>

          <Text style={text}>{notificationtext}</Text>
        </View>
      </View>

      <Pressable onPress={onclosenotification}>
        <CloseIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 32,
    width: "96%",
    padding: 8,
    justifyContent: "space-between",
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: colors.accent,
    zIndex: 2000,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtctr: {
    gap: 4,
  },
  animation: {
    width: 40,
    height: 40,
    alignSelf: "center",
    // alignContent: "",
  },
});
