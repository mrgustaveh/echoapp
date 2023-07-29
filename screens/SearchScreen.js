import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authctxt";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { SearchInput } from "../components/search/SearchInput";
import { PreviewCtr } from "../components/home/PreviewCtr";
import { ChevronIcon } from "../assets/icons/icons";
import { container } from "../constants/styles";
import { searchprompts } from "../utils/api/prompts";
import { usenotification } from "../context/notificationctx";

const SearchScreen = () => {
  const [searchtxt, setsrchtxt] = useState("");
  const [promptsfromsrch, setpromptsfromsrch] = useState([]);

  const navigation = useNavigation();

  const { idToken } = useAuth();
  const {
    setshownotification,
    setnotificationtitle,
    setnotificationtext,
    setissuccess,
  } = usenotification();

  const goback = () => navigation.goBack();

  const onsearchfunc = async () => {
    const { isok, prompts } = await searchprompts({
      idtoken: idToken,
      searchval: searchtxt,
    });

    if (isok) setpromptsfromsrch(prompts);
    else {
      setshownotification(true);
      setnotificationtitle("error");
      setnotificationtext("An error occurred at search");
      setissuccess(false);
    }
  };

  return (
    <SafeAreaView style={container}>
      <SearchInput
        searchtxt={searchtxt}
        setsearchtxt={setsrchtxt}
        onsearch={onsearchfunc}
      />

      <FlatList
        style={{ alignSelf: "stretch", paddingHorizontal: 2, marginTop: 16 }}
        data={promptsfromsrch}
        keyExtractor={(item) => item?.promptUid}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (
          <PreviewCtr
            promptUid={item?.promptUid}
            description={item?.prompt}
            audioUrl={item?.audio[0]?.audio?.audio}
            title={item?.title}
          />
        )}
      />
      <BottomBtn
        title="go back"
        icon={<ChevronIcon />}
        iconfirst
        onclick={goback}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
