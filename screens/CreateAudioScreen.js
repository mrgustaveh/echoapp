import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { CreateIcon } from "../assets/icons/icons";
import { container, subtitle, text } from "../constants/styles";
import { Divider } from "../components/global/Divider";
import { VoicePreview } from "../components/create/VoicePreview";
import { colors } from "../constants/colors";

const CreateAudioScreen = () => {
  const [audiotitle, setaudiotitle] = useState("");
  const [audiocontent, setaudiocontent] = useState("");

  const { red, text } = colors;
  const CONTENT_THRESH = 32;

  const titleerror = () => {
    return audiotitle.length > 22 || audiotitle.includes(" ") ? true : false;
  };

  const contenterror = () => {
    const emoji_regex =
      /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u;

    return audiocontent.length > CONTENT_THRESH ||
      emoji_regex.test(audiocontent)
      ? true
      : false;
  };

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
        onChange={titleerror}
        style={[
          styles.titleinput,
          {
            color: titleerror() ? red : text,
          },
        ]}
      />

      <View style={styles.contentctr}>
        <TextInput
          value={audiocontent}
          onChangeText={(text) => setaudiocontent(text)}
          placeholder="your text..."
          placeholderTextColor={colors.textlight}
          onKeyPress={contenterror}
          style={styles.contentinput}
          multiline
          numberOfLines={9}
        />

        <Divider style={styles.divider} />

        <Text
          style={[styles.charcount, { color: contenterror() ? red : text }]}
        >
          {audiocontent.length} of {CONTENT_THRESH} characters
        </Text>
      </View>

      <View style={styles.voicesctr}>
        <Text style={subtitle}>Select a voice to use</Text>

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            flexWrap: "wrap",
            marginTop: 8,
          }}
        >
          <VoicePreview />
          <VoicePreview />
          <VoicePreview />
          <VoicePreview isactive />
          <VoicePreview />
        </View>
        {/* <FlatList
          style={{ alignSelf: "stretch", paddingHorizontal: 7 }}
          data={myprompts}
          keyExtractor={(item) => item?.promptUid}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <VoicePreview
              voiceid={item?.promptUid}
              description={item?.prompt}
              audioUrl={item?.audio[0]?.audio?.audio}
              isactive={{selectedidx === thisidx ? true : false}}
            />
          )}
        />  */}
      </View>

      <BottomBtn
        title="create"
        icon={<CreateIcon />}
        btnDisabled={titleerror() || contenterror()}
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
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 6,
    backgroundColor: colors.accentlight,
  },
  contentinput: {
    ...text,
    paddingHorizontal: 8,
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
