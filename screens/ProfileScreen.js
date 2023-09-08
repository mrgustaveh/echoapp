import { useEffect, useState } from "react";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Subscriptions } from "../components/profile/Subscriptions";
import { Account } from "../components/profile/Account";
import { Purchase } from "../components/profile/Purchase";
import { auth } from "../firebase/config";
import { usealert } from "../context/alertctx";
import { useAuth } from "../context/authctxt";
import { getlastpurchase } from "../utils/api/purchase";
import { ChevronIcon, SignOutIcon } from "../assets/icons/icons";
import { container, subtitle, text } from "../constants/styles";
import { colors } from "../constants/colors";

function ProfileScreen() {
  const [showacc, setshowacc] = useState(false);
  const [showpurchase, setshowpurchase] = useState(false);
  const [plantype, setplantype] = useState("");
  const [currplan, setcurrplan] = useState("");
  const navigation = useNavigation();

  const { showloadingalert, showerralert, hidealert } = usealert();
  const { idToken } = useAuth();

  const goback = () => navigation.goBack();

  const ongetmycurrentplan = async () => {
    showloadingalert();

    const { isok, plan } = await getlastpurchase(idToken);

    if (isok) {
      setcurrplan(plan?.plantype);

      setTimeout(() => {
        hidealert();
      }, 2500);
    } else {
      showerralert();

      setTimeout(() => {
        hidealert();
      }, 2500);
    }
  };

  useEffect(() => {
    ongetmycurrentplan();
  }, []);

  return (
    <SafeAreaView style={container}>
      <View style={styles.me}>
        <Image
          source={{ uri: auth?.currentUser?.photoURL }}
          style={styles.image}
        />
        <Text style={text}>{auth?.currentUser?.displayName}</Text>
        <Text style={subtitle}>{auth?.currentUser?.email}</Text>
      </View>

      <Subscriptions
        currplan={currplan}
        setplantype={setplantype}
        setshowpurchase={setshowpurchase}
      />

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.container]} onPress={goback}>
          <ChevronIcon />
          <Text style={[text, styles.title]}>go back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setshowacc(true)}
          style={styles.signout}
        >
          <SignOutIcon />
          <Text style={text}>Delete My Account</Text>
        </TouchableOpacity>
      </View>

      {showacc && <Account setshowacc={setshowacc} />}
      {showpurchase && (
        <Purchase plantype={plantype} setshowpurchase={setshowpurchase} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  me: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    resizeMode: "cover",
  },
  signout: {
    width: "60%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: colors.accent,
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: colors.lineclr,
  },
  container: {
    width: "32%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    gap: 12,
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: colors.lineclr,
    backgroundColor: colors.accent,
  },
  title: {
    textTransform: "capitalize",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    position: "absolute",
    bottom: 8,
  },
});

export default ProfileScreen;
