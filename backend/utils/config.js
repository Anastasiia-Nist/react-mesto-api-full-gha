require('dotenv').config();

const { NODE_ENV, DB_HOST, PORT, JWT_SECRET } = process.env;

// задаем переменные с дефолтными (dev) значениями
const DEV_SECRET = 'some-secret-key';
const DEV_DB_HOST = 'mongodb://127.0.0.1:27017/mestodb';
const DEV_PORT = 3000;

// далее задаем переменные, которые уже пойдут наружу
const DB = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;

const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;

const SECRET_STRING = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_SECRET;

module.exports = {
  DB,
  SERVER_PORT,
  SECRET_STRING,
};
