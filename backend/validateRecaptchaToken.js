const fetch = require("node-fetch");
const { RECAPTCHA_SECRET_KEY } = require("./recaptchaEnvVars");

const validateRecaptchaToken = async (token) => {
  if (!token) {
    return false;
  }

  const recaptchaOptions = {
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
  };
  const fetchOptions = {
    method: "POST",
    body: `secret=${recaptchaOptions.secret}&response=${recaptchaOptions.response}`,
    headers: { "Content-type": "application/x-www-form-urlencoded" },
  };

  try {
    const resp = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      fetchOptions
    );
    const respJson = await resp.json();
    const { success, score } = respJson;

    const isValidRecaptchaAttempt = success && score > 0.5;
    return isValidRecaptchaAttempt;
  } catch (e) {
    return false;
  }
};

module.exports = validateRecaptchaToken;
