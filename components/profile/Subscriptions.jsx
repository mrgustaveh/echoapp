import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Divider } from "../global/Divider";
import * as WebBrowser from "expo-web-browser";
import { useAuth } from "../../context/authctxt";
import { ClipboardIcon, CheckIcon } from "../../assets/icons/icons";
import { text } from "../../constants/styles";
import { colors } from "../../constants/colors";

export const Subscriptions = ({ currplan }) => {
  const { idToken } = useAuth();
  const BROWSER_URL = "https://mburuanthony.github.io";

  const ongotobasic = async () => {
    const BROWSER_PARAMS = { authToken: idToken, plan: "basic" };
    await WebBrowser.openBrowserAsync(BROWSER_URL, BROWSER_PARAMS);
  };

  const ongotostandard = async () => {
    const BROWSER_PARAMS = { authToken: idToken, plan: "standard" };
    await WebBrowser.openBrowserAsync(BROWSER_URL, BROWSER_PARAMS);
  };

  const ongotopremium = async () => {
    const BROWSER_PARAMS = { authToken: idToken, plan: "premium" };
    await WebBrowser.openBrowserAsync(BROWSER_URL, BROWSER_PARAMS);
  };

  return (
    <View style={styles.container}>
      <View style={styles.plan}>
        <View style={styles.miscctr}>
          <View style={styles.clipbrdctr}>
            <ClipboardIcon />
          </View>

          <View style={styles.plandescription}>
            <Text style={text}>Basic Plan</Text>
            <Text style={text}>$3 / 1,024 characters</Text>
          </View>

          {currplan === "basic" ? <CheckIcon /> : <View />}
        </View>

        <TouchableOpacity style={styles.pressable} onPress={ongotobasic}>
          <Text style={text}>
            {currplan === "basic" ? "Buy Again" : "Buy Plan"}
          </Text>
        </TouchableOpacity>
      </View>

      <Divider />

      <View style={styles.plan}>
        <View style={styles.miscctr}>
          <View style={styles.clipbrdctr}>
            <ClipboardIcon />
          </View>

          <View style={styles.plandescription}>
            <Text style={text}>Standard Plan</Text>
            <Text style={text}>$5 / 5,000 characters</Text>
          </View>

          {currplan === "standard" ? <CheckIcon /> : <View />}
        </View>

        <TouchableOpacity style={styles.pressable} onPress={ongotostandard}>
          <Text style={text}>
            {currplan === "standard" ? "Buy Again" : "Buy Plan"}
          </Text>
        </TouchableOpacity>
      </View>

      <Divider />

      <View style={styles.plan}>
        <View style={styles.miscctr}>
          <View style={styles.clipbrdctr}>
            <ClipboardIcon />
          </View>

          <View style={styles.plandescription}>
            <Text style={text}>Premium Plan</Text>
            <Text style={text}>$10 / 10,024 characters</Text>
          </View>

          {currplan === "premium" ? <CheckIcon /> : <View />}
        </View>

        <TouchableOpacity style={styles.pressable} onPress={ongotopremium}>
          <Text style={text}>
            {currplan === "premium" ? "Buy Again" : "Buy Plan"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: colors.lineclr,
    backgroundColor: colors.accent,
  },
  plan: {
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  miscctr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clipbrdctr: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 500,
    backgroundColor: colors.primary,
  },
  plandescription: {
    gap: 6,
  },
  pressable: {
    marginTop: 8,
    padding: 10,
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "rgba(31,31,31,1)",
  },
});
