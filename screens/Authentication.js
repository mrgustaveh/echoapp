import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGoogleAuth, useFbAuth } from "../utils/socialauth";
import { usealert } from "../context/alertctx";
import { container, text } from "../constants/styles";
import { colors } from "../constants/colors";

const googleimg = require("../assets/img/google.png");
const fbimg = require("../assets/img/fb.png");

function Authentication() {
  const { signInWithGoogle } = useGoogleAuth();
  const { signInWithFb } = useFbAuth();
  const { setisvible, setisloading, setissuccess } = usealert();

  const setprevauth = () =>
    AsyncStorage.setItem("prevauth", JSON.stringify({ prevauth: true }));

  const ongooglesignin = () => {
    signInWithGoogle()
      .then((res) => {
        setisvible(true);
        setisloading(true);

        if (res?.type === "success") {
          setisloading(false);
          setissuccess(true);
        }

        setprevauth();
      })
      .catch(() => {
        setisvible(true);
        setisloading(false);
        setissuccess(false);
      })
      .finally(() => {
        setTimeout(() => {
          setisvible(false);
        }, 3500);
      });
  };

  const onfbsignin = async () => {
    signInWithFb()
      .then(() => {
        setisvible(true);
        setisloading(true);

        if (res?.type === "success") {
          setisloading(false);
          setissuccess(true);
        }

        setprevauth();
      })
      .catch(() => {
        setisvible(true);
        setisloading(false);
        setissuccess(false);
      })
      .finally(() => {
        setTimeout(() => {
          setisvible(false);
        }, 3500);
      });

    setisvible(false);
  };

  return (
    <SafeAreaView style={[container, { justifyContent: "center" }]}>
      <Text style={[text, { textAlign: "center" }]}>
        Sign in to get started
      </Text>

      <TouchableOpacity onPress={ongooglesignin} style={styles.pressable}>
        <Image source={googleimg} style={styles.providerimg} />
        <Text style={text}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onfbsignin}
        style={[styles.pressable, { backgroundColor: colors.fbblue }]}
      >
        <Image source={fbimg} style={styles.providerimg} />
        <Text style={text}>Sign in with Facebook</Text>
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
    backgroundColor: colors.accentlight,
  },
  providerimg: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
});

export default Authentication;
