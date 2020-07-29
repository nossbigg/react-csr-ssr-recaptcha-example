import React, { useEffect, useState } from "react";
import { RECAPTCHA_SITE_KEY } from "./common/recaptchaEnvVars";
import { useRecaptchaHook } from "./common/useRecaptchaHook";
import { useGetProtectedInfoHook } from "./common/useGetProtectedInfoHook";
import { isObjectEmpty } from "./common/utils";

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
