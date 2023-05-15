import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const authcontext = createContext({
  authenticated: false,
  idToken: "",
  userUid: "",
  setUserUid: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authenticated, setauthenticated] = useState(false);
  const [idToken, setidToken] = useState("");
  const [userUid, setUserUid] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        setauthenticated(true);
        const token = await user?.getIdToken(true);
        setidToken(token);
      } else {
        setauthenticated(false);
      }
    });

    return unsubscribe;
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
