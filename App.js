import "expo-dev-client";
import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as ExpoSplashScreen from "expo-splash-screen";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from "expo-av";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createaccount, getuser } from "./utils/api/auth";
import { AuthProvider, useAuth } from "./context/authctxt";
import { AlertProvider, usealert } from "./context/alertctx";
import {
  NotificationProvider,
  usenotification,
} from "./context/notificationctx";
import { PlayerProvider } from "./context/playerctx";
import { AppAlert } from "./components/global/AppAlerts";
import { Notification } from "./components/global/Notification";
import { Player } from "./components/Player";
import Authentication from "./screens/Authentication";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import CreateAudioScreen from "./screens/CreateAudioScreen";
import DetailScreen from "./screens/DetailScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();
ExpoSplashScreen.preventAutoHideAsync();

function App() {
  const { setisvible, isvisible, setisloading, setissuccess } = usealert();
  const { authenticated, idToken, setUserUid } = useAuth();
  const { shownotification } = usenotification();

  const [accountchecked, setaccountchecked] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      playThroughEarpieceAndroid: false,
    });
  }, []);

  const [fontsLoaded] = useFonts({
    "open-sans-regular": require("./assets/font/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/font/OpenSans-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
                <Stack.Screen
                  name="authentication"
                  component={Authentication}
                />
              </>
            )}
          </Stack.Navigator>
          <StatusBar
            style="light"
            animated={true}
            backgroundColor="transparent"
          />
          {isvisible && <AppAlert />}
          {shownotification && <Notification />}
          <Player />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default function AppProvider() {
  return (
    <AuthProvider>
      <AlertProvider>
        <NotificationProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </NotificationProvider>
      </AlertProvider>
    </AuthProvider>
  );
}
