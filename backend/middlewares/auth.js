const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { messages } = require('../utils/errors');
const { SECRET_KEY } = require('../env.config');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(messages.unauthorized);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError(messages.unauthorized);
  }

  req.user = payload;
  next();
};

module.exports = authMiddleware;
