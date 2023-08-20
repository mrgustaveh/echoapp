import { BASE_URL, samplesurls } from "./config";

export const getaudiosamples = async ({ idtoken }) => {
  const URL = BASE_URL + samplesurls.samples;

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      AUthorization: idtoken,
      "Content-Type": "application/json",
    },
    body: null,
  });

  const audsamples = await res.json();
  return { isok: res.ok, samples: audsamples };
};
