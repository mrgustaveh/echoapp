import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Subscriptions } from "../components/profile/Subscriptions";
import { auth } from "../firebase/config";
import { ChevronIcon, SignOutIcon } from "../assets/icons/icons";
import { container, subtitle, text } from "../constants/styles";
import { colors } from "../constants/colors";

function ProfileScreen() {
  const navigation = useNavigation();

  const goback = () => navigation.goBack();

  const onsignout = async () => {
    await AsyncStorage.removeItem("prevauth");
    await auth.signOut();
  };

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

      <Subscriptions currplan="premium" />

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.container]} onPress={goback}>
          <ChevronIcon />
          <Text style={[text, styles.title]}>go back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onsignout} style={styles.signout}>
          <SignOutIcon />
          <Text style={text}>Sign Out</Text>
        </TouchableOpacity>
      </View>
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
    width: "32%",
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
    width: "60%",
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
