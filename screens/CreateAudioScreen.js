import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { CreateIcon } from "../assets/icons/icons";
import { Divider } from "../components/global/Divider";
import { VoicePreview } from "../components/create/VoicePreview";
import { useAuth } from "../context/authctxt";
import { usenotification } from "../context/notificationctx";
import { createprompt } from "../utils/api/prompts";
import { colors } from "../constants/colors";
import { container, subtitle, text } from "../constants/styles";

const CreateAudioScreen = () => {
  const [audiotitle, setaudiotitle] = useState("");
  const [audiocontent, setaudiocontent] = useState("");
  const [keybrdisvsble, setkeybrdisvsble] = useState(false);
  const [voiceId, setVoiceid] = useState("EXAVITQu4vr4xnSDxMaL");

  const navigation = useNavigation();
  const { idToken } = useAuth();
  const {
    setshownotification,
    setnotifiIsloading,
    setissuccess,
    setnotificationtitle,
    setnotificationtext,
  } = usenotification();

  const { red, text } = colors;

  const CONTENT_THRESH = 200;

  const emoji_regex =
    /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u;

  const audiosamples = [
    {
      voiceid: "ErXwobaYiN019PkySvjV",
      title: "Antoni",
      previmg: "",
      audioUrl: "",
    },
    {
      voiceid: "EXAVITQu4vr4xnSDxMaL",
      title: "Bella",
      previmg: "",
      audioUrl: "",
    },
    {
      voiceid: "XB0fDUnXU5powFXDhCwa",
      title: "Charlotte",
      previmg: "",
      audioUrl: "",
    },
    {
      voiceid: "ThT5KcBeYPX3keUQqHPh",
      title: "Dorothy",
      previmg: "",
      audioUrl: "",
    },
    {
      voiceid: "zcAOhNBS3c14rBihAFp1",
      title: "Giovanni",
      previmg: "",
      audioUrl: "",
    },
    {
      voiceid: "XrExE9yKIg1WjnnlVkGX",
      title: "Matilda",
      previmg: "",
      audioUrl: "",
    },
    {
      voiceid: "onwK4e9ZLuTAKqWW03F9",
      title: "Daniel",
      previmg: "",
      audioUrl: "",
    },
  ];

  const titleerror = () => {
    return audiotitle.length > 22 ||
      emoji_regex.test(audiotitle) ||
      audiotitle.includes(" ")
      ? true
      : false;
  };

  const contenterror = () => {
    return audiocontent.length > CONTENT_THRESH ||
      emoji_regex.test(audiocontent)
      ? true
      : false;
  };

  const oncreateprompt = async () => {
    setshownotification(true);
    setnotifiIsloading(true);
    setnotificationtitle("processing");
    setnotificationtext("processing your prompt...");

    const { isok, prompt } = await createprompt({
      idtoken: idToken,
      ptitle: audiotitle,
      ptext: audiocontent,
      pvid: voiceId,
    });

    if (isok) {
      setshownotification(true);
      setnotifiIsloading(false);
      setissuccess(true);
      setnotificationtitle("success");
      setnotificationtext("your prompt was processed successfully");

      navigation.navigate("detail", { promptID: prompt?.promptUid });
    } else {
      setshownotification(true);
      setnotifiIsloading(false);
      setissuccess(false);
      setnotificationtitle("error");
      setnotificationtext("we were unable to process your prompt");
    }
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setkeybrdisvsble(true);
    });

    Keyboard.addListener("keyboardDidHide", () => {
      setkeybrdisvsble(false);
    });
  }, [keybrdisvsble]);

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
      </View>

      {!keybrdisvsble && (
        <BottomBtn
          title="create"
          icon={<CreateIcon />}
          btnDisabled={titleerror() || contenterror()}
          onclick={oncreateprompt}
        />
      )}
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
