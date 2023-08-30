import { BASE_URL, authurls } from "./config";

export const createaccount = async ({ idtoken }) => {
  const URL = BASE_URL + authurls.me;

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: idtoken,
      "Content-Type": "application/json",
    },
    body: null,
  });

  let createduser = await res.json();
  return { isok: res.ok, user: createduser };
};

export const getuser = async ({ idtoken }) => {
  const URL = BASE_URL + authurls.me;

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: idtoken,
      "Content-Type": "application/json",
    },
    body: null,
  });

  const user = await res.json();
  return { isok: res.ok, user: user };
};

export const deleteaccount = async ({ idtoken, useruid }) => {
  const URL = BASE_URL + authurls.destroy + `${useruid}/`;

  const res = await fetch(URL, {
    method: "DELETE",
    headers: {
      Authorization: idtoken,
      "Content-Type": "application/json",
    },
    body: null,
  });

  return { isok: res.ok };
};
