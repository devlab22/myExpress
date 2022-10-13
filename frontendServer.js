const express = require('express');
const path = require('path');
const app = express();
const configs = require("./configs.json")

const PORT = configs.PORT || 9000;
const HOST = configs.HOST || "localhost";

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  console.log(`server on ${HOST}:${PORT}`)
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, HOST);