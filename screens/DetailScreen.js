import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { Player } from "../components/detail/Player";
import { TrashIcon, CalendarIcon } from "../assets/icons/icons";
import { container, subtitle, text } from "../constants/styles";

const DetailScreen = () => {
  return (
    <SafeAreaView style={container}>
      <NavBar />

      <View style={styles.detailctr}>
        <View style={styles.title}>
          <Text
            style={[
              subtitle,
              { textTransform: "capitalize", fontWeight: "500" },
            ]}
          >
            ATITLE
          </Text>

          <View style={styles.date}>
            <CalendarIcon />
            <Text style={[subtitle, { marginLeft: 8, fontWeight: "500" }]}>
              2 days ago
            </Text>
          </View>
        </View>

        <Text style={[text, { textAlign: "justify", marginBottom: 64 }]}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          repudiandae, fugit vitae ad incidunt nihil nisi. Eos molestiae ea fuga
          deleniti. Quibusdam a unde explicabo quia dolores possimus culpa? Nam
          facilis quasi impedit animi rem harum itaque blanditiis, pariatur,
          repudiandae dolores sit eos explicabo autem fugiat deserunt veritatis
          adipisci accusamus.
        </Text>

        <Player />
      </View>

      <BottomBtn title="delete" icon={<TrashIcon />} onclick={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailctr: { paddingHorizontal: 8 },
});

export default DetailScreen;
