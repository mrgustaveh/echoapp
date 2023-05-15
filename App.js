import "expo-dev-client";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createaccount, getuser } from "./utils/api/auth";
import { AuthProvider, useAuth } from "./context/authctxt";
import { AlertProvider, usealert } from "./context/alertctx";
import { AppAlert } from "./components/global/AppAlerts";
import Authentication from "./screens/Authentication";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import CreateAudioScreen from "./screens/CreateAudioScreen";
import DetailScreen from "./screens/DetailScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

function App() {
  const { setisvible, isvisible, setisloading, setissuccess } = usealert();
  const { authenticated, idToken, setUserUid } = useAuth();
  const [accountchecked, setaccountchecked] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("prevauth").then((res) => {
      const data = JSON.parse(res);

      if (data?.prevauth) {
        setisvible(true);
        setisloading(true);
      } else {
        setisvible(false);
      }
    });
    // console.log(idToken);
    if (authenticated && idToken !== "") {
      getuser({ idtoken: idToken })
        .then(async (res) => {
          if (res.user?.length === 0) {
            const { user } = await createaccount({ idtoken: idToken });
            setUserUid(user[0]?.user_uid);
          } else {
            setUserUid(res[0]?.user_uid);
          }

          setaccountchecked(true);
          setisvible(false);
        })
        .catch(() => {
          setisloading(false);
          setissuccess(false);

          setTimeout(() => {
            setisvible(false);
          }, 3500);
        });
    }
  }, [authenticated, idToken]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
            animationTypeForReplace: "push",
          }}
        >
          {authenticated && idToken !== "" && accountchecked ? (
            <>
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="search" component={SearchScreen} />
              <Stack.Screen name="create" component={CreateAudioScreen} />
              <Stack.Screen name="detail" component={DetailScreen} />
              <Stack.Screen name="profile" component={ProfileScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="authentication" component={Authentication} />
            </>
          )}
        </Stack.Navigator>
        <StatusBar
          style="light"
          animated={true}
          backgroundColor="transparent"
        />
        {isvisible && <AppAlert />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function AppProvider() {
  return (
    <AuthProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </AuthProvider>
  );
}
