import React, { useEffect, useState } from "react";
import { RECAPTCHA_SITE_KEY } from "./common/recaptchaConstants";

const App: React.FC = () => {
  const token = useRecaptchaHook();

  return <div>Hello World!</div>;
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

export default App;
