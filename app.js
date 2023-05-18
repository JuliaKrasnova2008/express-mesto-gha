const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const helmet = require('helmet');
const router = require('./routes');
// const { login, addUser } = require('./controllers/users');
// const { REGEXP } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const defaultErr = require('./errors/defaultErr');
const NotFound = require('./errors/notFound');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const authRouter = require('./routes/auth');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(authRouter);
app.use(auth);
app.use(router);
app.use((req, res, next) => {
  next(new NotFound('Порта не существует'));
});
app.use(errorLogger);
app.use(errors());

app.use(defaultErr);

app.listen(PORT, () => {
  console.log('server started on port 3000');
});
