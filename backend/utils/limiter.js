const rateLimit = require('express-rate-limit');

// параметры Express Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = limiter;
