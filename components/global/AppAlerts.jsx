import { useEffect } from "react";
import { BackHandler } from "react-native";
import { StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";
import { usealert } from "../../context/alertctx";
import { usenotification } from "../../context/notificationctx";

export const AppAlert = () => {
  const { isloading, issuccess } = usealert();
  const { showloadingnotification } = usenotification();

  const onPressBack = () => {
    showloadingnotification(
      "processing",
      "please wait for the process to end..."
    );
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressBack);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressBack);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.animations}>
        {isloading && (
          <Lottie
            source={require("../../assets/animations/loading.json")}
            autoPlay
            loop
          />
        )}

        {!isloading && issuccess && (
          <Lottie
            source={require("../../assets/animations/success.json")}
            autoPlay
            loop={false}
          />
        )}

        {!isloading && !issuccess && (
          <Lottie
            source={require("../../assets/animations/error.json")}
            autoPlay
            loop={false}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(50, 50, 50, 0.8)",
  },
  animations: {
    width: "94%",
    height: "30%",
    borderRadius: 12,
  },
});
