const validateRecaptchaToken = require("./validateRecaptchaToken");

const getItemHandler = async (req, res) => {
  const { recaptcha_token } = req.headers;

  const isRecaptchaTokenPresent = !!recaptcha_token;
  if (isRecaptchaTokenPresent) {
    await getProtectedData(req, res);
    return;
  }

  getUnprotectedData(req, res);
};

const getUnprotectedData = (_, res) => {
  const item = { item: { name: "Beyerdynamic DT 1350" } };
  res.status(200);
  res.json(item);
};

const getProtectedData = async (req, res) => {
  const { recaptcha_token } = req.headers;
  const isValidToken = await validateRecaptchaToken(recaptcha_token);
  if (!isValidToken) {
    res.status(403);
    res.end();
    return;
  }

  const item = { item: { name: "Beyerdynamic DT 1350", price: "123" } };
  res.status(200);
  res.json(item);
};

module.exports = getItemHandler;
