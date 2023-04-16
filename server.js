const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

require('dotenv').config();

const { checkLoggedIn } = require("./middlewares/checkLoggedIn.js");

const PORT = 8080;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log('Google profile:', profile);
  done(null, profile);
};

passport.use(new Strategy({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, verifyCallback));

const app = express();

app.use(passport.initialize());
app.use(helmet());

app.get("/", (_, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/failure", (_, res) => {
  return res.send("Failed to login.");
});

app.get("/auth/google", passport.authenticate("google", {
  scope: ['email']
}));

app.get("/auth/google/callback", passport.authenticate('google', {
  failureRedirect: '/failure',
  successRedirect: '/',
  session: false
}), (req, res) => {
  console.log("Google called us back.")
});

app.get('/auth/logout', (req, res) => {

});

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
