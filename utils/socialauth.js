import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase/config";

WebBrowser.maybeCompleteAuthSession();

const setprevgltoken = (idToken) =>
  AsyncStorage.setItem(
    "prevauth",
    JSON.stringify({ prevauth: true, prevtoken: idToken })
  );

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "1064311130616-qst1kaotovmlrv5a0mae5d98o2a9bip1.apps.googleusercontent.com",
    androidClientId:
      "1064311130616-qst1kaotovmlrv5a0mae5d98o2a9bip1.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response?.params;

      if (!id_token) {
        alert("sign in error, please try again");
      }

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      setprevgltoken(id_token);
    }
  }, [response]);

  return { request, response, signInWithGoogle: promptAsync };
};

export const FirebaseSignin = (idToken) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    signInWithCredential(auth, credential);
  } catch (err) {
    alert("Google sign in error, try again");
  }
};
