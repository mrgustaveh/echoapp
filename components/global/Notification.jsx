import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import { usenotification } from "../../context/notificationctx";
// import { CloseIcon } from "../../assets/icons/icons";
import { subtitle, text } from "../../constants/styles";
import { colors } from "../../constants/colors";

export const Notification = () => {
  const {
    shownotification,
    notificationtitle,
    notificationtent,
    notifiIsloading,
    issuccess,
    hidenotification,
  } = usenotification();

  useEffect(() => {
    setTimeout(() => {
      if (shownotification) {
        hidenotification();
      }
    }, 6500);
  }, []);

  return (
    <View style={[styles.container, styles.row]}>
      <View style={[styles.row, { gap: 8 }]}>
        <View style={styles.animationctr}>
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
              style={[styles.animation, { width: 46, height: 46, padding: 4 }]}
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
        </View>

        <View style={styles.txtctr}>
          <Text style={subtitle}>{notificationtitle}</Text>

          <Text style={text}>{notificationtent}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 32,
    width: "96%",
    justifyContent: "space-between",
    alignSelf: "center",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.lineclr,
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
  animationctr: {
    width: 48,
    height: "100%",
    marginHorizontal: 12,
    padding: 4,
    borderRightWidth: 0.5,
    borderRightColor: colors.lineclr,
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 55,
    height: 55,
    alignSelf: "flex-end",
    justifyContent: "center",
  },
});
