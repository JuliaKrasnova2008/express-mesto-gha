const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
// const helmet = require('helmet');
const router = require('./routes');
const { login, addUser } = require('./controllers/users');
const { REGEXP } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const defaultErr = require('./errors/defaultErr');
const NotFound = require('./errors/notFound');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);

app.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  login
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().regex(REGEXP),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
      .unknown(true),
  }),
  addUser
);

app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  next(new NotFound('Порта не существует'));
});

app.use(defaultErr);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log('server started on port 3000');
});
