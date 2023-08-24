import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDistance, format } from "date-fns";
import { enGB } from "date-fns/locale";
import { useAuth } from "../context/authctxt";
import { usealert } from "../context/alertctx";
import { usenotification } from "../context/notificationctx";
import { getprompt, destroyprompt } from "../utils/api/prompts";
import { NavBar } from "../components/NavBar";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { DetailPlayer } from "../components/detail/DetailPlayer";
import {
  FullwidthSkeleton,
  TextSkeleton,
} from "../components/global/Skeletons";
import { TrashIcon, CalendarIcon } from "../assets/icons/icons";
import { container, subtitle, text } from "../constants/styles";

const DetailScreen = ({ route, navigation }) => {
  const { promptID } = route?.params;

  const [prompt, setprompt] = useState("");
  const [audiotitle, setaudiotitle] = useState("");
  const [audioUrl, setaudioUrl] = useState("");
  const [timediff, settimediff] = useState("");
  const [formatteddate, setformatteddate] = useState("");

  const { idToken } = useAuth();
  const { isvisible, showloadingalert, hidealert } = usealert();
  const {
    setshownotification,
    setnotifiIsloading,
    setissuccess,
    setnotificationtitle,
    setnotificationtext,
  } = usenotification();

  const getformateddate = (datestr) => {
    const prevDate = new Date(datestr);

    const formateddate = format(prevDate, "do MMM yyyy", { locale: enGB });
    setformatteddate(formateddate);
  };

  const gettimediff = (datestr) => {
    const currDate = new Date();
    const prevDate = new Date(datestr);

    const formatteddiff = formatDistance(prevDate, currDate, {
      addSuffix: true,
    });
    settimediff(formatteddiff);
  };

  const ongetpropmt = async () => {
    showloadingalert();

    const { isok, prompt } = await getprompt({
      idtoken: idToken,
      promptuid: promptID,
    });

    if (isok) {
      hidealert();

      setprompt(prompt?.prompt);
      setaudiotitle(prompt?.title);
      setaudioUrl(prompt?.audio[0]?.audio?.audio);

      gettimediff(prompt?.created);
      getformateddate(prompt?.created);
    }
  };

  const ondeleteprompt = async () => {
    showloadingalert();

    const { isok } = await destroyprompt({
      idtoken: idToken,
      promptuid: promptID,
    });

    if (isok) {
      hidealert();

      setshownotification(true);
      setnotifiIsloading(false);
      setissuccess(true);
      setnotificationtitle("success");
      setnotificationtext("your prompt was deleted successfully");

      navigation.navigate("home");
    } else {
      setshownotification(true);
      setnotifiIsloading(false);
      setissuccess(false);
      setnotificationtitle("error");
      setnotificationtext("we were unable to delete your prompt");
    }
  };

  useEffect(() => {
    ongetpropmt();
  }, [promptID]);

  return (
    <SafeAreaView style={container}>
      <NavBar />

      <View style={styles.detailctr}>
        {isvisible ? <TextSkeleton /> : <Text style={subtitle}>Prompt</Text>}

        {isvisible ? (
          <>
            <TextSkeleton />
            <TextSkeleton />
          </>
        ) : (
          <Text style={[text, { textAlign: "justify", marginVertical: 8 }]}>
            {prompt}
          </Text>
        )}

        {isvisible ? (
          <TextSkeleton />
        ) : (
          <>
            <Text style={[subtitle, { marginTop: 24 }]}>Created</Text>
            <View style={styles.date}>
              <CalendarIcon />
              <Text style={styles.datetxt}>{formatteddate}</Text>
              <Text style={styles.datetxt}>({timediff})</Text>
            </View>
          </>
        )}

        {isvisible ? (
          <FullwidthSkeleton />
        ) : (
          <DetailPlayer audURL={audioUrl} audTitle={audiotitle} />
        )}
      </View>

      <BottomBtn title="delete" icon={<TrashIcon />} onclick={ondeleteprompt} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailctr: { paddingHorizontal: 8 },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  date: {
    marginTop: 8,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  datetxt: {
    ...text,
    marginLeft: 12,
  },
});

export default DetailScreen;
