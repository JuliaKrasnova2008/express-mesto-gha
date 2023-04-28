const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes');
const { login, addUser } = require('./controllers/users');
const { validateAddUser, validateLogin } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const defaultErr = require('./errors/defaultErr');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validateLogin, login);
app.post('/signup', validateAddUser, addUser);

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
