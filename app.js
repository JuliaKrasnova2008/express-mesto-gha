const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');

const app = express();
const { login, addUser } = require('./controllers/users');

const { PORT = 3000, MONGO_URL } = process.env;
const { validateAddUser, validateLogin } = require('./middlewares/validation');
const auth = require('./middlewares/auth');

const { internalServerError } = require('./errors/errorCodes');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');

// роуты, не требующие авторизации,
app.post('/signin', login, validateLogin);
app.post('/signup', addUser, validateAddUser);
app.use(auth);
app.use(router);

async function connection() {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    // eslint-disable-next-line no-console
    console.log(`App connected ${MONGO_URL}`);
    await app.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`Server started ${PORT}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(internalServerError).send({ message: 'На сервере произошла ошибка' });
  }
  next();
});

connection();
