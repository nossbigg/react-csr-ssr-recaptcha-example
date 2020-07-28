import React, { useEffect, useState } from "react";
import { RECAPTCHA_SITE_KEY } from "./common/recaptchaConstants";

const App: React.FC = () => {
  const token = useRecaptchaHook();
  const unprotectedInfo = useGetUnprotectedInfoHook();

  return (
    <div>
      Hello World!
      <br />
      Unprotected Info: {JSON.stringify(unprotectedInfo)}
    </div>
  );
};

const useRecaptchaHook = () => {
  const [recaptchaToken, setRecaptchaToken] = useState("");

  useEffect(() => {
    if (recaptchaToken) {
      return;
    }

    const { grecaptcha } = window as any;
    grecaptcha.ready(async () => {
      const recaptchaAction = { action: "submit" };
      const token = await grecaptcha.execute(
        RECAPTCHA_SITE_KEY,
        recaptchaAction
      );
      setRecaptchaToken(token);
    });
  }, [recaptchaToken, setRecaptchaToken]);

  return recaptchaToken;
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

export default App;
