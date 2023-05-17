import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import EVIcon from "react-native-vector-icons/EvilIcons";
import { usenotification } from "../../context/notificationctx";
import { text } from "../../constants/styles";
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
    <View style={styles.container}>
      <View>
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
          <Text
            style={[text, { fontWeight: "600", textTransform: "capitalize" }]}
          >
            {notificationtitle}
          </Text>
          <Text style={text}>{notificationtext}</Text>
        </View>
      </View>

      <Pressable onPress={onclosenotification}>
        <EVIcon name="close" size={16} color={colors.text} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: colors.accent,
  },
  txtctr: {
    marginLeft: 50,
    gap: 2,
  },
  animation: {
    alignSelf: "flex-start",
    alignContent: "flex-start",
    marginLeft: -90,
  },
});
