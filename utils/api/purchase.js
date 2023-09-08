import { BASE_URL, purchaseurls } from "./config";

export const getlastpurchase = async (idtoken) => {
  const URL = BASE_URL + purchaseurls.get;

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: idtoken,
      "Content-Type": "application/json",
    },
  });

  const myplan = await res.json();

  return { isok: res.ok, plan: myplan[0] };
};

export const createOchars = async ({ idtoken }) => {
  const URL = BASE_URL + purchaseurls.current;

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: idtoken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ charsCount: 0 }),
  });

  return { isok: res.ok };
};

export const getmychars = async ({ idtoken }) => {
  const URL = BASE_URL + purchaseurls.current;

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: idtoken,
      "Content-Type": "application/json",
    },
  });

  const mychars = await res.json();
  return { isok: res.ok, chars: mychars[0]?.charsCount };
};
