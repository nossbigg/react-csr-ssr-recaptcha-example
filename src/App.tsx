import React, { useEffect } from "react";
import { RECAPTCHA_SITE_KEY } from "./common/recaptchaConstants";

const App: React.FC = () => {
  useEffect(() => {
    const { grecaptcha } = window as any;
    grecaptcha.ready(async () => {
      const recaptchaAction = { action: "submit" };
      const recaptchaToken = await grecaptcha.execute(
        RECAPTCHA_SITE_KEY,
        recaptchaAction
      );
      console.log(recaptchaToken);
    });
  }, []);

  return <div>Hello World!</div>;
};

export default App;
