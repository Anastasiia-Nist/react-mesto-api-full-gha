// для консольлогов использовать 'eslint-disable-next-line no-console'
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const cookieParser = require('cookie-parser');
const { signinValidation, signupValidation } = require('./middlewares/validation');
const authMiddleware = require('./middlewares/auth');
const errorsMiddleware = require('./middlewares/errors');
const { createUser, login } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { messages } = require('./utils/errors');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

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

// подключаемся к серверу mongo
mongoose.connect(DB_URL);

app.use(bodyParser.json());
// app.use(cookieParser());

/*  app.use((req, res, next) => {
  req.user = {
    _id: '64a2a1ee8038a3f41b443963',
  };  */

app.post('/signin', signinValidation, login);
app.post('/signup', signupValidation, createUser);
app.use('/users', authMiddleware, usersRouter);
app.use('/cards', authMiddleware, cardsRouter);

app.use((req, res, next) => {
  next(new NotFoundError(messages.notFound));
});
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsMiddleware); // централизованный обработчик

app.listen(PORT);
