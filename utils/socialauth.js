import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { ResponseType } from "expo-auth-session";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { auth } from "../firebase/config";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "1064311130616-qst1kaotovmlrv5a0mae5d98o2a9bip1.apps.googleusercontent.com",
    androidClientId:
      "1064311130616-qst1kaotovmlrv5a0mae5d98o2a9bip1.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response?.params;

      if (!id_token) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "sign in error",
          textBody: "an unexepected error occurred, please try again",
        });
      }

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return { request, response, signInWithGoogle: promptAsync };
};

export const useFbAuth = () => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "1292320017980176",
    responseType: ResponseType.Token,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response?.params;

      if (!access_token) {
        ToastAndroid.show(
          "An unexpected error ocurred, try again",
          ToastAndroid.LONG
        );
      }

      const provider = new FacebookAuthProvider();
      const credential = provider.credential(access_token);

      signInWithCredential(auth, credential);
    }
  }, [response]);

  return { request, response, signInWithFb: promptAsync };
};
