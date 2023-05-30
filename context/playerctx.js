import { createContext, useContext, useState } from "react";

const playercontext = createContext({
  plyrisvisible: false,
  setplyrisvisible: () => {},
  audtitle: "",
  setaudtitle: () => {},
  audURL: "",
  setaudURL: () => {},
});

export const PlayerProvider = ({ children }) => {
  const [plyrisvisible, setplyrisvisible] = useState(false);
  const [audtitle, setaudtitle] = useState("");
  const [audURL, setaudURL] = useState("");

  return (
    <playercontext.Provider
      value={{
        plyrisvisible,
        setplyrisvisible,
        audtitle,
        setaudtitle,
        audURL,
        setaudURL,
      }}
    >
      {children}
    </playercontext.Provider>
  );
};

export const useplayer = () => useContext(playercontext);
