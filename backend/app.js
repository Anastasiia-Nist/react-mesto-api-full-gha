const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const routes = require('./routes');
const corsMiddleware = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsMiddleware = require('./middlewares/errors');
const { SERVER_PORT, DB } = require('./env.config');

const app = express();

// защита приложения от некоторых широко известных веб-уязвимостей
app.use(helmet());

mongoose.connect(DB);

app.use(bodyParser.json());

app.use(requestLogger);

// ограничение кол-во запросов. Для защиты от DoS-атак.
app.use(limiter);

app.use(corsMiddleware);

app.use(routes);

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsMiddleware); // централизованный обработчик

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});
