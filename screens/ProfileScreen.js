import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { BottomBtn } from "../components/buttons/BottomBtn";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Subscriptions } from "../components/profile/Subscriptions";
import { auth } from "../firebase/config";
import { container, subtitle, text, title } from "../constants/styles";
import { colors } from "../constants/colors";

function ProfileScreen() {
  const navigation = useNavigation();

  const goback = () => navigation.goBack();

  const onsignout = async () => await auth.signOut();

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

      <Subscriptions currplan="basic" />

      <Pressable onPress={onsignout}>
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
