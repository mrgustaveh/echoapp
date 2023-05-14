import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomBtn } from "../components/buttons/BottomBtn";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Subscriptions } from "../components/profile/Subscriptions";
import { container, subtitle, text, title } from "../constants/styles";
import { colors } from "../constants/colors";

const image = require("../assets/splash.png");

function ProfileScreen() {
  const navigation = useNavigation();

  const goback = () => navigation.goBack();

  return (
    <SafeAreaView style={container}>
      <View style={styles.me}>
        <Image source={image} style={styles.image} />
        <Text style={text}>Antony Mburu ( a_sterisk* )</Text>
        <Text style={subtitle}>antonymburu563@gmail.com</Text>
      </View>

      <Subscriptions currplan="basic" />

      <Pressable>
        <Text style={[title, styles.logout]}>Log Out</Text>
      </Pressable>

      <BottomBtn
        title="go back"
        icon={<EntypoIcon name="chevron-left" size={22} color={colors.text} />}
        iconfirst
        onclick={goback}
      />
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
  logout: {
    marginVertical: 16,
    marginHorizontal: 16,
    color: colors.red,
  },
});

export default ProfileScreen;
