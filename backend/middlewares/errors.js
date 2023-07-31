const { statuses, messages } = require('../utils/errors');

const errorsMiddleware = (err, req, res, next) => {
  const { statusCode = statuses.default, message } = err;

  if (statusCode === statuses.default) {
    res.status(statusCode).send({ message: messages.serverError });
    return;
  }

  res.status(statusCode).send({ message });

  next();
};
module.exports = errorsMiddleware;
