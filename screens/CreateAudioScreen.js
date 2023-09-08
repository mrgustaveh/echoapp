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
import { getmychars } from "../utils/api/purchase";
import { colors } from "../constants/colors";
import { container, subtitle, text } from "../constants/styles";
import { getaudiosamples } from "../utils/api/samples";
import { usealert } from "../context/alertctx";

const CreateAudioScreen = () => {
  const [audiocontent, setaudiocontent] = useState("");
  const [usablechars, setusablechars] = useState(0);
  const [keybrdisvsble, setkeybrdisvsble] = useState(false);
  const [voiceId, setVoiceid] = useState("");
  const [audiosamples, setaudiosamples] = useState([]);

  const navigation = useNavigation();
  const { idToken } = useAuth();
  const { showsuccessnotification, showerrnotification } = usenotification();
  const { showloadingalert, hidealert } = usealert();

  const CONTENT_THRESH = 1024;

  const emoji_regex =
    /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u;

  const contenterror = () => {
    return audiocontent.length > CONTENT_THRESH ||
      emoji_regex.test(audiocontent)
      ? true
      : false;
  };

  const oncreateprompt = async () => {
    showloadingalert();

    const { isok, prompt } = await createprompt({
      idtoken: idToken,
      ptext: audiocontent,
      pvid: voiceId,
    });

    if (isok) {
      hidealert();

      showsuccessnotification(
        "success",
        "your prompt was processed successfully"
      );

      navigation.navigate("detail", { promptID: prompt?.promptUid });
    } else {
      hidealert();

      showerrnotification("error", "we were unable to process your prompt");
    }
  };

  const ongetaudiosamples = async () => {
    showloadingalert();

    const { isok, samples } = await getaudiosamples({ idtoken: idToken });
    const { isok: charsok, chars } = await getmychars({ idtoken: idToken });

    if (isok && charsok) {
      setaudiosamples(samples);
      setusablechars(chars);

      setTimeout(() => {
        hidealert();
      }, 3000);
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

  useEffect(() => {
    ongetaudiosamples();
  }, []);

  return (
    <SafeAreaView style={container}>
      <NavBar />

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
            style={[
              styles.charcount,
              {
                color:
                  contenterror() || audiocontent.length > usablechars
                    ? colors.red
                    : colors.text,
              },
            ]}
          >
            {audiocontent.length} of {CONTENT_THRESH}
          </Text>
          <Text style={styles.chars}>characters</Text>
        </View>
      </View>

      <Text
        style={[
          text,
          {
            textAlign: "left",
            paddingHorizontal: 8,
            marginTop: 10,
          },
        ]}
      >
        ({usablechars}) Usable characters
      </Text>

      <View style={styles.voicesctr}>
        <Text style={[subtitle, { marginTop: 8 }]}>Select a voice to use</Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 12,
          }}
        >
          {audiosamples?.map((audio) => (
            <VoicePreview
              key={audio?.voiceUId}
              audioUrl={audio?.voiceUrl}
              isactive={voiceId == audio?.description ? true : false}
              voiceid={audio?.description}
              preVimage={audio?.previewUrl}
              setVoiceid={setVoiceid}
            />
          ))}
        </View>
      </View>

      {!keybrdisvsble && (
        <BottomBtn
          title="create"
          icon={<CreateIcon />}
          btnDisabled={contenterror() || audiocontent.length > usablechars}
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
    marginBottom: 12,
    textAlignVertical: "center",
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  contentctr: {
    paddingVertical: 8,
    marginHorizontal: 8,
    borderWidth: 0.5,
    borderColor: colors.lineclr,
    borderRadius: 4,
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
    marginTop: 10,
    marginHorizontal: 8,
  },
});

export default CreateAudioScreen;
