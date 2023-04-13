const path = require("path");
const express = require("express");

const PORT = 8080;

const app = express();

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/secret", (req, res) => {
  return res.send("Your personal secret value is 42!");
});

app.listen(8080, () => {
  console.log(`Server running at port: ${PORT}`);
});