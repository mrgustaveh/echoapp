import { createContext, useContext, useState } from "react";

const alertctx = createContext({
  isvisible: false,
  isloading: false,
  issuccess: false,
  showloadingalert: () => {},
  showsuccessalert: () => {},
  showerralert: () => {},
  hidealert: () => {},
});

export const AlertProvider = ({ children }) => {
  const [isvisible, setisvible] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [issuccess, setissuccess] = useState(false);

  const showloadingalert = () => {
    setisvible(true);
    setisloading(true);
  };

  const showsuccessalert = () => {
    setisvible(true);
    setisloading(false);
    setissuccess(true);
  };

  const showerralert = () => {
    setisvible(true);
    setisloading(false);
    setissuccess(false);
  };

  const hidealert = () => {
    setisvible(false);
    setisloading(false);
    setissuccess(false);
  };

  return (
    <alertctx.Provider
      value={{
        isvisible,
        isloading,
        issuccess,
        showloadingalert,
        showsuccessalert,
        showerralert,
        hidealert,
      }}
    >
      {children}
    </alertctx.Provider>
  );
};

export const usealert = () => useContext(alertctx);
