const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes');
const { login, addUser } = require('./controllers/users');
const { REGEXP } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const defaultErr = require('./errors/defaultErr');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
// app.post('/signin', validateLogin, login);
// app.post('/signup', validateAddUser, addUser);

app.use(auth);
app.use(router);

app.use(errors());

app.use((req, res) => {
  res.status(404).send({
    message: 'Порта не существует'
  });
});

app.use(defaultErr);

mongoose.connect('mongodb://localhost:27017/mestodb');

// роуты, не требующие авторизации,

app.listen(3000, () => {
  console.log('server started on port 3000');
});
