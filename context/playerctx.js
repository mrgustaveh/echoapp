import { createContext, useContext, useState } from "react";

const playercontext = createContext({
  plyrisvisible: false,
  audtitle: "",
  audURL: "",
  showplayer: (title, Url) => {},
  hideplayer: () => {},
});

export const PlayerProvider = ({ children }) => {
  const [plyrisvisible, setplyrisvisible] = useState(false);
  const [audtitle, setaudtitle] = useState("");
  const [audURL, setaudURL] = useState("");

  const showplayer = (title, Url) => {
    setplyrisvisible(true);
    setaudtitle(title);
    setaudURL(Url);
  };

  const hideplayer = () => {
    setplyrisvisible(false);
    setaudtitle("");
    setaudURL("");
  };

  return (
    <playercontext.Provider
      value={{
        plyrisvisible,
        audtitle,
        audURL,
        showplayer,
        hideplayer,
      }}
    >
      {children}
    </playercontext.Provider>
  );
};

export const useplayer = () => useContext(playercontext);
