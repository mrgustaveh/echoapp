import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDeisgnIcon from "react-native-vector-icons/AntDesign";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { container, subtitle, text } from "../constants/styles";
import { colors } from "../constants/colors";
import { Divider } from "../components/global/Divider";

const CreateAudioScreen = () => {
  const [audiotitle, setaudiotitle] = useState("");
  const [audiocontent, setaudiocontent] = useState("");

  return (
    <SafeAreaView style={container}>
      <NavBar />

      <TextInput
        autoFocus
        autoCorrect={false}
        value={audiotitle}
        onChangeText={(text) => setaudiotitle(text)}
        placeholder="choose a title"
        placeholderTextColor={colors.textlight}
        style={styles.titleinput}
      />

      <View style={styles.contentctr}>
        <TextInput
          value={audiocontent}
          onChangeText={(text) => setaudiocontent(text)}
          placeholder="your text..."
          placeholderTextColor={colors.textlight}
          style={styles.contentinput}
          multiline
          numberOfLines={9}
        />

        <Divider style={styles.divider} />

        <Text style={styles.charcount}>
          {audiocontent.length} / 1024 characters
        </Text>
      </View>

      <View style={styles.voicesctr}>
        <Text style={subtitle}>Select a voice to use</Text>
      </View>

      <BottomBtn
        title="create"
        icon={<AntDeisgnIcon name="plus" color={colors.text} size={22} />}
        onclick={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleinput: {
    ...text,
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 6,
    backgroundColor: colors.accentlight,
  },
  contentctr: {
    marginTop: 16,
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 6,
    backgroundColor: colors.accentlight,
  },
  contentinput: {
    ...text,
    height: 150,
    textAlignVertical: "top",
  },
  divider: {
    marginVertical: 8,
    borderColor: colors.accent,
  },
  charcount: {
    ...text,
    textAlign: "right",
  },
  voicesctr: {
    marginTop: 12,
    marginHorizontal: 8,
  },
});

export default CreateAudioScreen;
