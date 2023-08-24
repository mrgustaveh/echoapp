import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGoogleAuth } from "../utils/socialauth";
import { usealert } from "../context/alertctx";
import { container, text } from "../constants/styles";
import { colors } from "../constants/colors";

const googleimg = require("../assets/img/google.png");

function Authentication() {
  const { signInWithGoogle } = useGoogleAuth();
  const { showloadingalert, showerralert, hidealert } = usealert();

  const onsetprevauth = () =>
    AsyncStorage.setItem("prevauth", JSON.stringify({ prevauth: true }));

  const ongooglesignin = () => {
    signInWithGoogle()
      .then((res) => {
        showloadingalert();

        if (res?.type === "success") {
          showloadingalert();
          onsetprevauth();
        }
      })
      .catch(() => {
        showerralert();
      })
      .finally(() => {
        setTimeout(() => {
          hidealert();
        }, 3500);
      });
  };

  return (
    <SafeAreaView style={[container, { justifyContent: "center" }]}>
      <Text style={[text, { textAlign: "center" }]}>
        Sign in to get started
      </Text>

      <TouchableOpacity
        onPress={ongooglesignin}
        style={[
          styles.pressable,
          { borderWidth: 0.5, borderColor: colors.lineclr },
        ]}
      >
        <Image source={googleimg} style={styles.providerimg} />
        <Text style={text}>Sign in with Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pressablectr: {},
  pressable: {
    marginVertical: 16,
    marginHorizontal: 16,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  providerimg: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
});

export default Authentication;
