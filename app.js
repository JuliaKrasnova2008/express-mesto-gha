const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '643d543739258bf3387065a8'
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use('/', router);

app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Такой адрес не существует',
  });
});

app.listen(PORT, () => console.log(`Server started ${PORT}`));
