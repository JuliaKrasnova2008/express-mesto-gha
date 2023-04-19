const userSchema = require('../models/user');
const STATUS_CODE = require('../errors/errorCodes');

// ищем всех пользователей
module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(STATUS_CODE.internalServerError).send({ message: 'Произошла ошибка на сервере.' });
    });
};

// ищем по ID
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(STATUS_CODE.badRequest)
          .send({ message: 'Переданы некорректные данные' });
      } if (error.message === 'NotFound') {
        return res.status(STATUS_CODE.notFound).send({ message: 'Пользователь не найден' });
      }
      return res.status(STATUS_CODE.internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};

// создать пользователя

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;

  userSchema
    .create({ name, about, avatar })
    .then((user) => res.status(STATUS_CODE.сreated).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res
          .status(STATUS_CODE.badRequest)
          .send({ message: 'Передены невалидные данные.' });
      } else {
        res.status(STATUS_CODE.internalServerError).send({ message: 'Произошла ошибка на сервере.' });
      }
    });
};

// редактировать профиль

module.exports.editProfile = (req, res) => {
  const id = req.user._id;
  const { name, about } = req.body;

  userSchema.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.badRequest).send({ message: 'Передены невалидные данные.' });
      } else {
        res.status(STATUS_CODE.internalServerError).send({ message: 'Произошла ошибка на сервере.' });
      }
    });
};

// редактирование аватара

module.exports.editAvatar = (req, res) => {
  const id = req.user._id;
  const avatar = req.body;

  userSchema.findByIdAndUpdate(id, avatar, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.badRequest).send({ message: 'Передены невалидные данные.' });
      } else {
        res.status(STATUS_CODE.internalServerError).send({ message: 'Произошла ошибка на сервере.' });
      }
    });
};
