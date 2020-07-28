const express = require("express");
const app = express();
// cors to allow local setup
const cors = require("cors");

const corsMiddleware = cors();
const BACKEND_PORT = 3005;

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

  app.get("/protected", corsMiddleware, (req, res) => {
    const { recaptcha_token } = req.headers;
    if (!recaptcha_token) {
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

module.exports = runApp;
