import { BASE_URL, prompturls } from "./config";

export const createprompt = async ({ idtoken, ptitle, ptext, pvid }) => {
  const URL = BASE_URL + prompturls.prompts;

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      AUthorization: idtoken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: ptitle, prompt: ptext, vid: pvid }),
  });

  const createdprompt = await res.json();
  return { isok: res.ok, prompt: createdprompt };
};

export const getmyprompts = async ({ idtoken }) => {
  const URL = BASE_URL + prompturls.prompts;

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      AUthorization: idtoken,
      "Content-Type": "application/json",
    },
    body: null,
  });

  const myprompts = await res.json();
  return { isok: res.ok, prompts: myprompts };
};

export const getprompt = async ({ idtoken, promptuid }) => {
  const URL = BASE_URL + prompturls.prompts + `${promptuid}/`;

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      AUthorization: idtoken,
      "Content-Type": "application/json",
    },
    body: null,
  });

  const prompt = await res.json();
  return { isok: res.ok, prompt };
};

export const searchprompts = async ({ idtoken, searchval }) => {
  const URL = BASE_URL + `app/prompts?search=${searchval}`;

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: idtoken,
      "Content-Type": "application/json",
    },
    body: null,
  });

  const prompts = await res.json();
  return { isok: res.ok, prompts };
};

export const destroyprompt = async ({ idtoken, promptuid }) => {
  const URL = BASE_URL + prompturls.prompts + `${promptuid}/`;

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
