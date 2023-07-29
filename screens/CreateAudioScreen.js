import { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { CreateIcon } from "../assets/icons/icons";
import { Divider } from "../components/global/Divider";
import { VoicePreview } from "../components/create/VoicePreview";
import { container, subtitle, text } from "../constants/styles";
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
        placeholderTextColor={colors.text}
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
          placeholder="your prompt here . . ."
          placeholderTextColor={colors.text}
          onKeyPress={contenterror}
          style={styles.contentinput}
          multiline
          numberOfLines={9}
        />

        <Divider style={styles.divider} />

        <View style={{ flexDirection: "row" }}>
          <Text
            style={[styles.charcount, { color: contenterror() ? red : text }]}
          >
            {audiocontent.length} of {CONTENT_THRESH}
          </Text>
          <Text style={styles.chars}>characters</Text>
        </View>
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
          <VoicePreview />
          <VoicePreview />
          <VoicePreview />
          <VoicePreview />
          <VoicePreview />
          <VoicePreview />
          <VoicePreview isactive />
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 8,
    textAlignVertical: "center",
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  contentctr: {
    marginTop: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 6,
    backgroundColor: colors.accent,
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
    fontFamily: "sc-bold",
    paddingHorizontal: 8,
    textAlign: "right",
  },
  chars: {
    ...text,
  },
  voicesctr: {
    marginTop: 12,
    marginHorizontal: 8,
  },
});

export default CreateAudioScreen;
