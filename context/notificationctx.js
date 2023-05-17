import { createContext, useContext, useState } from "react";

const notificationctx = createContext({
  shownotification: false,
  setshownotification: () => {},
  notificationtitle: "",
  setnotificationtitle: () => {},
  notificationtext: "",
  setnotificationtext: () => {},
  notifiIsloading: false,
  setnotifiIsloading: () => {},
  issuccess: false,
  setissuccess: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [shownotification, setshownotification] = useState(false);
  const [notificationtitle, setnotificationtitle] = useState("");
  const [notificationtext, setnotificationtext] = useState("");
  const [notifiIsloading, setnotifiIsloading] = useState(false);
  const [issuccess, setissuccess] = useState(false);

  return (
    <notificationctx.Provider
      value={{
        shownotification,
        setshownotification,
        notificationtitle,
        setnotificationtitle,
        notificationtext,
        setnotificationtext,
        notifiIsloading,
        setnotifiIsloading,
        issuccess,
        setissuccess,
      }}
    >
      {children}
    </notificationctx.Provider>
  );
};

export const usenotification = () => useContext(notificationctx);
