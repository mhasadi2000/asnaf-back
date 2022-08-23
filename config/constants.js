const READ_DATABASE_ADDRESS =
  process.env.READ_DATABASE_ADDRESS || 'mongodb://localhost:27017';

const WRITE_DATABASE_ADDRESS =
  process.env.READ_DATABASE_ADDRESS || 'mongodb://localhost:27017';

const PORT = process.env.PORT || 3000;

const COUNT_LIMITER = process.env.COUNT_LIMITER || 400;

const MESSAGE_LIMIT =
  process.env.MESSAGE_LIMIT ||
  'Too many accounts created from this IP, please try again after ten minutes';

const CROSS = process.env.CROSS || ['http://localhost:3000'];

const JWT_SECRET= 'pishrun-ansaf-api';

module.exports = {
  READ_DATABASE_ADDRESS,
  WRITE_DATABASE_ADDRESS,
  PORT,
  COUNT_LIMITER,
  MESSAGE_LIMIT,
  CROSS,
  JWT_SECRET
};
