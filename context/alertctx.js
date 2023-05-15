import { createContext, useContext, useState } from "react";

const alertctx = createContext({
  isvisible: false,
  setisvible: () => {},
  isloading: false,
  setisloading: () => {},
  issuccess: false,
  setissuccess: () => {},
});

export const AlertProvider = ({ children }) => {
  const [isvisible, setisvible] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [issuccess, setissuccess] = useState(false);

  return (
    <alertctx.Provider
      value={{
        isvisible,
        setisvible,
        isloading,
        setisloading,
        issuccess,
        setissuccess,
      }}
    >
      {children}
    </alertctx.Provider>
  );
};

export const usealert = () => useContext(alertctx);
