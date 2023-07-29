const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { messages } = require('../utils/errors');

const SECRET_STRING = require('../utils/config');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(messages.unauthorized);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'
    payload = jwt.verify(token, SECRET_STRING);
  } catch (err) {
    throw new UnauthorizedError(messages.unauthorized);
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};

module.exports = authMiddleware;
