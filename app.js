/* eslint-disable no-console */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const limiter = require('./config/rate_limit');

const auth = require('./middlewares/auth');
const routes = require('./routes');
const { createUser, login, logout } = require('./controllers/users');
const { postSigninValidation, postSignupValidation } = require('./middlewares/auth_validation');
const { NotFoundError } = require('./utils/error');
const errorHandler = require('./middlewares/error_handler');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DEFAULT_DATABASE_NAME, TEST_DATABASE_NAME } = require('./config/database');

console.log(process.env);

const { NODE_ENV } = process.env;
let { DATABASE = DEFAULT_DATABASE_NAME } = process.env;
if (NODE_ENV === 'test') {
  DATABASE = TEST_DATABASE_NAME;
}

const app = express();

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/api/signin', postSigninValidation(), login);
app.post('/api/signup', postSignupValidation(), createUser);

app.use(auth);
app.use(routes);
app.post('/api/signout', logout);
app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

module.exports = app;
