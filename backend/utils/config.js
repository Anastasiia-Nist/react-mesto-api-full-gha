const dotenv = require('dotenv');

dotenv.config();

const {
  SERVER_PORT = 3000,
  DB = 'mongodb://127.0.0.1:27017/mestodb',
  SECRET_KEY = 'some-secret-key',
  NODE_ENV = 'development',
} = process.env;

module.exports = {
  DB,
  SERVER_PORT,
  SECRET_KEY,
  NODE_ENV,
};
