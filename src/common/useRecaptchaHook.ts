import { useState, useEffect } from "react";

export const useRecaptchaHook = (recaptchaSiteKey: string) => {
  const [recaptchaToken, setRecaptchaToken] = useState("");

  useEffect(() => {
    if (recaptchaToken) {
      return;
    }

    const { grecaptcha } = window as any;
    grecaptcha.ready(async () => {
      const recaptchaAction = { action: "submit" };
      const token = await grecaptcha.execute(recaptchaSiteKey, recaptchaAction);
      setRecaptchaToken(token);
    });
  }, [recaptchaSiteKey, recaptchaToken, setRecaptchaToken]);

  return recaptchaToken;
};
