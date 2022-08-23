const express = require('express');
const bodyParser = require('body-parser');
require('express-async-errors');
require('dotenv').config({ path: './config/.env' });
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const CROSS = 'http://localhost:3000';
const {
  read_connection,
  write_connection
} = require('./config/database/mongoConnection');

const { PORT, COUNT_LIMITER, MESSAGE_LIMIT } = require('./config/constants');

global.readConnection = read_connection;
global.writeConnection = write_connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());

app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: COUNT_LIMITER,
  message: MESSAGE_LIMIT
});
app.use(limiter);

// const readRoutes = require('./src/routes/read');
const smsRoutes = require('./src/routes/sms');
const otpRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');



app.use((req, res, next) => {
  const allowedOrigins = CROSS;
  const { origin } = req.headers;
  if (allowedOrigins.indexOf(origin) > -1)
    res.setHeader('Access-Control-Allow-Origin', origin);

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-HTTP-Method-Override, X-Requested-With, Content-Type, Accept, Content-Length, Authorization, Cookie, authorization'
  );
  // res.header("Access-Control-Expose-Headers", "Set-Cookie")

  // TODO: handel option request problem.
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});

app.use('/api/v1/sms', smsRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1/users', userRoutes);


app.use((err, req, res, next) => {
  if (err.status) res.status(err.status).json(err);
  else res.status(500).json({ message: 'Something went wrong' });
  console.log(err);
  next(err);
});

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});




