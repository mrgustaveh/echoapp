import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/authctxt";
import { usealert } from "../context/alertctx";
import { getprompt } from "../utils/api/prompts";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { Player } from "../components/detail/Player";
import { TrashIcon, CalendarIcon } from "../assets/icons/icons";
import { container, subtitle, text } from "../constants/styles";

const DetailScreen = ({ route, navigation }) => {
  const [prompt, setprompt] = useState({});

  const { promptID } = route?.params;

  const { idToken } = useAuth();
  const { setisvible, setisloading } = usealert();

  const ongetpropmt = async () => {
    setisvible(true);
    setisloading(true);

    const { isok, prompt } = await getprompt({
      idtoken: idToken,
      promptuid: promptID,
    });

    if (isok) {
      setprompt(prompt);
      setisvible(false);
    }
  };

  useEffect(() => {
    ongetpropmt();
  }, [promptID]);

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
            {prompt?.title}
          </Text>

          <View style={styles.date}>
            <CalendarIcon />
            <Text style={[subtitle, { marginLeft: 8, fontWeight: "500" }]}>
              {new Date(prompt?.created).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <Text style={[text, { textAlign: "justify", marginBottom: 64 }]}>
          {prompt?.prompt}
        </Text>

        <Player audURL={prompt?.audio[0]?.audio?.audio} title={prompt?.title} />
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
