import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getmyprompts } from "../utils/api/prompts";
import { useAuth } from "../context/authctxt";
import { usealert } from "../context/alertctx";
import { NavBar } from "../components/NavBar";
import { container } from "../constants/styles";
import { BottomBtn } from "../components/buttons/BottomBtn";
import { PreviewCtr } from "../components/home/PreviewCtr";
import { SquareSkeleton } from "../components/global/Skeletons";
import { colors } from "../constants/colors";
import { CreateIcon } from "../assets/icons/icons";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [myprompts, setmyprompts] = useState([]);
  const [isrfreshing, setisrefreshing] = useState(false);

  const { idToken } = useAuth();
  const { setisvible, isvisible, setisloading } = usealert();

  const onfetchprompts = async () => {
    const { isok, prompts } = await getmyprompts({ idtoken: idToken });
    setisvible(true);
    setisloading(true);

    if (isok) {
      setmyprompts(prompts);

      setTimeout(() => {
        setisvible(false);
      }, 3500);
    }
  };

  const onRefresh = useCallback(() => {
    setisrefreshing(true);

    onfetchprompts();

    setisrefreshing(false);
  }, []);

  useEffect(() => {
    onfetchprompts();
  }, []);

  const gotocreate = () => navigation.navigate("create");

  return (
    <SafeAreaView style={container}>
      <NavBar screen="home" />

      {isvisible ? (
        <FlatList
          style={{ alignSelf: "stretch", paddingHorizontal: 7 }}
          data={[1, 2, 3]}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => <SquareSkeleton />}
        />
      ) : (
        <FlatList
          style={{ alignSelf: "stretch", paddingHorizontal: 2 }}
          data={myprompts}
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
          refreshControl={
            myprompts.length !== 0 && (
              <RefreshControl
                refreshing={isrfreshing}
                onRefresh={onRefresh}
                colors={[colors.accent, colors.accent]}
                progressBackgroundColor={colors.primary}
              />
            )
          }
        />
      )}

      <BottomBtn title="create" icon={<CreateIcon />} onclick={gotocreate} />
    </SafeAreaView>
  );
};

export default HomeScreen;
