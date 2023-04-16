const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");

const { checkLoggedIn } = require("./middlewares/checkLoggedIn.js")

const PORT = 8080;

const app = express();

app.use(helmet());

app.get("/", (_, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/auth/google", (req, res) => {

})

app.get("/auth/google/callback", (req, res) => {

})

app.get('/auth/logout', (req, res) => {

})

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Your personal secret value is 42!");
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(8080, () => {
    console.log(`Server running at port: ${PORT}`);
  });
