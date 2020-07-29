const fetch = require("node-fetch");
const express = require("express");
const app = express();
// cors to allow local setup
const cors = require("cors");
const { RECAPTCHA_SECRET_KEY } = require("./recaptchaEnvVars");

const corsMiddleware = cors();
const BACKEND_PORT = process.env.BACKEND_PORT;

const runApp = () => {
  app.get("/unprotected", corsMiddleware, (req, res) => {
    const item = { item: { name: "Beyerdynamic DT 1350" } };
    res.status(200);
    res.json(item);
  });

  app.options("/protected", corsMiddleware, (req, res) => {
    res.status(200);
    res.end();
  });

  app.get("/protected", corsMiddleware, async (req, res) => {
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
  });

  app.listen(BACKEND_PORT, () =>
    console.log(`Example app listening at http://localhost:${BACKEND_PORT}`)
  );
};

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
  const resp = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    fetchOptions
  );
  const respJson = await resp.json();
  const { success } = respJson;

  return success;
};

module.exports = runApp;
