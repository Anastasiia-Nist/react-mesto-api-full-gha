// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://mesto-by-anastasiia.nomoredomains.sbs',
  'http://mesto-by-anastasiia.nomoredomains.sbs',
  'localhost:3000'
];
// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };