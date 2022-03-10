const spdy = require('spdy');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const options = {
  key: fs.readFileSync(path.join(__dirname, './cert/server.key')),
  cert: fs.readFileSync(path.join(__dirname, './cert/server.crt')),
  passphrase: 'test',
};

const PORT = 3000;
spdy.createServer(options, app).listen(PORT, () => {
  console.log('start!');
});
