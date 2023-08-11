import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { FirebaseSignin } from "../utils/socialauth";

const authcontext = createContext({
  authenticated: false,
  idToken: "",
  userUid: "",
  setUserUid: () => {},
});

export const AuthProvider = ({ children }) => {
  const [prevToken, setprevToken] = useState(null);
  const [authenticated, setauthenticated] = useState(false);
  const [idToken, setidToken] = useState("");
  const [userUid, setUserUid] = useState("");

  const getprevauthtoken = async () => {
    const jsonValue = await AsyncStorage.getItem("prevauth");
    const prevToken =
      jsonValue != null ? JSON.parse(jsonValue)?.prevtoken : null;

    setprevToken(prevToken);
  };

  useEffect(() => {
    getprevauthtoken();

    if (prevToken !== null) {
      FirebaseSignin(prevToken);
    }
  }, [prevToken]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        const token = await user?.getIdToken(true);

        setauthenticated(true);
        setidToken(token);
      } else {
        setauthenticated(false);
        setidToken("");
      }
    });

    return () => {
      unsubscribe();
    };
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
