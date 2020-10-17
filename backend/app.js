const express = require("express");
const cors = require("cors");
const getItemHandler = require("./getItemHandler");

const BACKEND_PORT = process.env.BACKEND_PORT;

const runApp = () => {
  const app = express();
  // cors to allow local setup
  const corsMiddleware = cors();

  app.get("/getItem", corsMiddleware, (req, res) => {
    getItemHandler(req, res);
  });

  // for preflight CORS request
  app.options("/getItem", corsMiddleware, (_, res) => {
    res.status(204);
    res.end();
  });

  app.listen(BACKEND_PORT, () =>
    console.log(`Example app listening at http://localhost:${BACKEND_PORT}`)
  );

  return app;
};

module.exports = runApp;
