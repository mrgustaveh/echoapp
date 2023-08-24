import { createContext, useContext, useState } from "react";

const notificationctx = createContext({
  shownotification: false,
  notificationtitle: "",
  notificationtent: "",
  notifiIsloading: false,
  issuccess: false,
  showloadingnotification: (tittle, content) => {},
  showsuccessnotification: (tittle, content) => {},
  showerrnotification: (tittle, content) => {},
  hidenotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [shownotification, setshownotification] = useState(false);
  const [notificationtitle, setnotificationtitle] = useState("");
  const [notificationtent, setnotificationtent] = useState("");
  const [notifiIsloading, setnotifiIsloading] = useState(false);
  const [issuccess, setissuccess] = useState(false);

  const showloadingnotification = (tittle, content) => {
    setshownotification(true);
    setnotificationtitle(tittle);
    setnotificationtent(content);
    setnotifiIsloading(true);
    setissuccess(false);
  };

  const showsuccessnotification = (tittle, content) => {
    setshownotification(true);
    setnotificationtitle(tittle);
    setnotificationtent(content);
    setnotifiIsloading(false);
    setissuccess(true);
  };

  const showerrnotification = (tittle, content) => {
    setshownotification(true);
    setnotificationtitle(tittle);
    setnotificationtent(content);
    setnotifiIsloading(false);
    setissuccess(false);
  };

  const hidenotification = () => {
    setshownotification(false);
    setnotificationtitle("");
    setnotificationtent("");
    setnotifiIsloading(false);
    setissuccess(true);
  };

  return (
    <notificationctx.Provider
      value={{
        shownotification,
        notificationtitle,
        notificationtent,
        notifiIsloading,
        issuccess,
        showloadingnotification,
        showsuccessnotification,
        showerrnotification,
        hidenotification,
      }}
    >
      {children}
    </notificationctx.Provider>
  );
};

export const usenotification = () => useContext(notificationctx);
