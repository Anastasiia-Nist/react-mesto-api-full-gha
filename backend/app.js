// для консольлогов использовать 'eslint-disable-next-line no-console'
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const corsMiddleware = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { signinValidation, signupValidation } = require('./middlewares/validation');
const authMiddleware = require('./middlewares/auth');
const errorsMiddleware = require('./middlewares/errors');
const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { messages } = require('./utils/errors');
const { SERVER_PORT, DB } = require('./utils/config');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

// параметры Express Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
// защита приложения от некоторых широко известных веб-уязвимостей
app.use(helmet());
// ограничение кол-во запросов. Для защиты от DoS-атак.
app.use(limiter);

mongoose.connect(DB);

app.use(bodyParser.json());

app.use(corsMiddleware);
app.use(requestLogger);

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);
app.use('/users', authMiddleware, usersRouter);
app.use('/cards', authMiddleware, cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError(messages.notFound));
});

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsMiddleware); // централизованный обработчик

app.listen(SERVER_PORT);
