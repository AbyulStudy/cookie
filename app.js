const spdy = require('spdy');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

// const options = {
//   key: fs.readFileSync(path.join(__dirname, './cert/server.key')),
//   cert: fs.readFileSync(path.join(__dirname, './cert/server.crt')),
//   passphrase: 'test',
// };

app.use(cookieParser());

app.get('/', (req, res) => {
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  res.cookie('default', 'cookie');
  res.cookie('Expires', 'cookie', { expires: expiryDate }); // 2022-03-11T10:35:03.253Z
  res.cookie('MaxAge', 'cookie', { maxAge: 60 * 60 * 1000 }); // milliseconds
  res.cookie('Secure', 'cookie', { secure: true });
  res.cookie('HttpOnly', 'cookie', { httpOnly: true });
  res.cookie('Path', 'cookie', { path: '/dev/byul' });
  res.cookie('Domain', 'cookie', { domain: '127.0.0.1:3000' });
  console.log('req.cookies : ', req.cookies);
  console.log('req.headers.cookie : ', req.headers.cookie);
  res.send('cookie');
});

// error (404, 500)
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find taht!');
});
app.use((err, req, res, next) => {
  console.log(err.route);
  console.error(err.stack);
  res.status(500).send('Something broke!<br>' + err);
});

const PORT = 3000;
// spdy.createServer(options, app).listen(PORT, () => {
//   console.log('https://127.0.0.1:3000/');
// });

app.listen(PORT, () => {
  console.log('http://127.0.0.1:3000/');
});
