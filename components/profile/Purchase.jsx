import { useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Divider } from "../global/Divider";
import { useAuth } from "../../context/authctxt";
import { text, subtitle } from "../../constants/styles";
import { colors } from "../../constants/colors";

export const Purchase = ({ plantype, setshowpurchase }) => {
  const { idToken } = useAuth();

  const ongotoplanpage = async () => {
    setshowpurchase(false);
    const BROWSER_URL = "http://192.168.82.210:3000";
    const URL = BROWSER_URL + `?authToken=${idToken}&plan=${plantype}`;

    await WebBrowser.openBrowserAsync(URL);
  };

  const onPressBack = () => {
    setshowpurchase(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressBack);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressBack);
    };
  }, []);

  return (
    <View style={styles.accctr}>
      <View style={styles.actionsctr}>
        <Text
          style={[
            subtitle,
            {
              paddingHorizontal: 8,
              marginVertical: 18,
            },
          ]}
        >
          Plan Purchase
        </Text>

        <Text
          style={[
            text,
            {
              paddingHorizontal: 8,
              marginTop: 12,
              marginBottom: 48,
            },
          ]}
        >
          By pressing Ok, you will be redirected to echo's checkout page, to get
          the " {plantype} " plan ?
        </Text>

        <Divider />
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.pressable, { width: "35%" }]}
            onPress={() => setshowpurchase(false)}
          >
            <Text style={text}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pressable, { width: "60%" }]}
            onPress={ongotoplanpage}
          >
            <Text style={text}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accctr: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    backgroundColor: colors.alertclr,
  },
  actionsctr: {
    width: "96%",
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 4,
    alignSelf: "center",
    backgroundColor: colors.accent,
  },
  actions: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressable: {
    padding: 8,
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
