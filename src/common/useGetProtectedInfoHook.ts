import { useState, useEffect } from "react";
import { isObjectEmpty } from "./utils";

export const useGetProtectedInfoHook = (recaptchaToken: string) => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (!recaptchaToken) {
      return;
    }

    if (!isObjectEmpty(info)) {
      return;
    }

    const requestHeaders = { recaptcha_token: recaptchaToken };
    fetch("http://localhost:3005/getItem", { headers: requestHeaders })
      .then(async (resp) => {
        const respJson = await resp.json();
        setInfo(respJson);
      })
      .catch(() => {});
  }, [info, setInfo, recaptchaToken]);

  return info;
};
