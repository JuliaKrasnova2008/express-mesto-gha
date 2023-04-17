const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch(() => {
      res.status(400).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user)).catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Передены невалидные данные.' });
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports.editProfile = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(404).send({ message: 'Пользователь не найден' });
    }).catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Передены невалидные данные.' });
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports.editAvatar = (req, res) => {
  const id = req.user._id;
  const avatar = req.body;

  User.findByIdAndUpdate(id, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(404).send({ message: 'Пользователь не найден' });
    }).catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Передены невалидные данные.' });
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};
