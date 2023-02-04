const express = require("express");
const axios = require("axios");
const https = require("https");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  axios
    .get(req.query.imageUrl, { responseType: "stream", httpsAgent: agent })
    .then((axiosResp) => {
      res.set({
        "Content-Type": axiosResp.headers["content-type"],
      });
      axiosResp.data.pipe(res);
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port 3000 `);
});

module.exports = app;
