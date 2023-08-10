// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://a.nistratova14.fvds.ru',
  'https://a.nistratova14.fvds.ru',
];
// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { allowedCors, DEFAULT_ALLOWED_METHODS };
