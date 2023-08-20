import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import {
  setprevAuthObj,
  ReauthenticateWithFirebase,
} from "../utils/socialauth";

const authcontext = createContext({
  authenticated: false,
  idToken: "",
  userUid: "",
  setUserUid: () => {},
});

export const AuthProvider = ({ children }) => {
  const [prevToken, setprevToken] = useState(null);
  const [prevauth, setprevauth] = useState(null);
  const [authenticated, setauthenticated] = useState(false);
  const [idToken, setidToken] = useState("");
  const [userUid, setUserUid] = useState("");

  const getprevauthtoken = async () => {
    const jsonValue = await AsyncStorage.getItem("prevauthtkn");
    const prevautTkn = jsonValue != null ? JSON.parse(jsonValue) : null;

    setprevToken(prevautTkn?.prevtoken);
  };

  const getprevauthauthObj = async () => {
    const jsonValue = await AsyncStorage.getItem("prevauthObj");
    const prevauthObj = jsonValue !== null ? JSON.parse(jsonValue) : null;

    setprevauth(prevauthObj?.prevauth);
  };

  useEffect(() => {
    getprevauthtoken();
    getprevauthauthObj();

    if (prevToken !== null) {
      ReauthenticateWithFirebase(prevauth, prevToken);
    }
  }, [prevToken]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        setprevAuthObj({ authObj: JSON.stringify(user) });

        const token = await user?.getIdToken(true);

        setauthenticated(true);
        setidToken(token);
      } else {
        setauthenticated(false);
        setidToken("");

        if (prevToken !== null) {
          alert("Please sign in again");
        }
      }
    });

    return unsubscribe();
  }, []);

  return (
    <authcontext.Provider
      value={{ authenticated, idToken, userUid, setUserUid }}
    >
      {children}
    </authcontext.Provider>
  );
};

export const useAuth = () => useContext(authcontext);
