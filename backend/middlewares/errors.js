const { statuses, messages } = require('../utils/errors');

const errorsMiddleware = (err, req, res, next) => {
  const { statusCode = statuses.default, message } = err;

  if (err.code === 11000) {
    res.status(statuses.conflict).send({ message: messages.user.conflictEmail });
    return;
  }
  if (statusCode === statuses.default) {
    res.status(statusCode).send({ message: messages.serverError });
    return;
  }

  res.status(statusCode).send({ message });

  next();
};
module.exports = errorsMiddleware;
