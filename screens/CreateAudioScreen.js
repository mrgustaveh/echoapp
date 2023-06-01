import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { container, subtitle, text } from "../constants/styles";
import { Divider } from "../components/global/Divider";
import { colors } from "../constants/colors";
import { CreateIcon } from "../assets/icons/icons";

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
          {audiocontent.length} of 1024 characters
        </Text>
      </View>

      <View style={styles.voicesctr}>
        <Text style={subtitle}>Select a voice to use</Text>
      </View>

      <BottomBtn title="create" icon={<CreateIcon />} onclick={() => {}} />
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
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 6,
    backgroundColor: colors.accentlight,
  },
  contentinput: {
    ...text,
    padding: 8,
    height: 150,
    textAlignVertical: "top",
  },
  divider: {
    marginVertical: 8,
    borderColor: colors.accent,
  },
  charcount: {
    ...text,
    paddingHorizontal: 8,
    textAlign: "right",
  },
  voicesctr: {
    marginTop: 12,
    marginHorizontal: 8,
  },
});

export default CreateAudioScreen;
