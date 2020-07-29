import React, { useEffect, useState } from "react";
import { RECAPTCHA_SITE_KEY } from "./common/recaptchaConstants";
import { useRecaptchaHook } from "./common/useRecaptchaHook";

const App: React.FC = () => {
  const token = useRecaptchaHook(RECAPTCHA_SITE_KEY);
  const unprotectedInfo = useGetUnprotectedInfoHook();
  const protectedInfo = useGetProtectedInfoHook(token);

  return (
    <div>
      Hello World!
      <br />
      Unprotected Info: {JSON.stringify(unprotectedInfo)}
      <br />
      Protected Info: {JSON.stringify(protectedInfo)}
    </div>
  );
};

const isObjectEmpty = (obj: Object) => Object.keys(obj).length === 0;

const useGetUnprotectedInfoHook = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (!isObjectEmpty(info)) {
      return;
    }

    fetch("http://localhost:3005/unprotected").then(async (resp) => {
      const respJson = await resp.json();
      setInfo(respJson);
    });
  }, [info, setInfo]);

  return info;
};

const useGetProtectedInfoHook = (recaptchaToken: string) => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (!recaptchaToken) {
      return;
    }

    if (!isObjectEmpty(info)) {
      return;
    }

    const requestHeaders = { recaptcha_token: recaptchaToken };
    fetch("http://localhost:3005/protected", { headers: requestHeaders }).then(
      async (resp) => {
        const respJson = await resp.json();
        setInfo(respJson);
      }
    );
  }, [info, setInfo, recaptchaToken]);

  return info;
};

export default App;
