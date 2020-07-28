const express = require("express");
const app = express();
const BACKEND_PORT = 3005;

const runApp = () => {
  app.get("/unprotected", (req, res) => {
    const item = { item: { name: "Beyerdynamic DT 1350" } };
    res.status(200);
    res.json(item);
  });

  app.listen(BACKEND_PORT, () =>
    console.log(`Example app listening at http://localhost:${BACKEND_PORT}`)
  );
};

module.exports = runApp;
