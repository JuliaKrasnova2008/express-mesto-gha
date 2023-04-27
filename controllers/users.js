const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = require('../models/user');
const { сreated } = require('../errors/errorCodes');

const Unauthorized = require('../errors/unauthorized');
const Conflict = require('../errors/conflict');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');

// ищем всех пользователей
module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(next)
};

// ищем по ID
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  userSchema
    .findById(userId)
    .orFail(() => {
      throw new NotFound('Пользователь по данному _id не найден')
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Пользователь не найден'));
      } else {
        next(error)
      }
    });
};

//получаем текущего пользователя
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  userSchema
    .findById(_id)
    .orFail(() => {
      throw new NotFound('Пользователь с данным _id не найден')
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'))
      } else {
        next(error)
      }
    });
};

// создать пользователя
module.exports.addUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userSchema
      .create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(сreated).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new Conflict('Такой пользователь уже существует'));
      } else if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
      } else {
        next(error);
      }
    });
};


//контроллер login, который получает из запроса почту и пароль и проверяет их.
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  userSchema.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неверная почта или пароль')
      }
      return bcrypt.compare(password, user.password)
        .then((response) => {
          if (!response) {
            next(new Unauthorized('Неверная почта или пароль'))
          }
          const token = jwt.sign(
            { _id: user._id }, 'some-secret-key', { expiresIn: '7d' },
          );
          return res.send({ token });
        })
    })
    .catch(next);
};


// редактировать профиль
module.exports.editProfile = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;

  userSchema.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь с данным _id не найден')
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'))
      } else {
        next(error)
      }
    });
};

// редактирование аватара
module.exports.editAvatar = (req, res, next) => {
  const id = req.user._id;
  const avatar = req.body;

  userSchema.findByIdAndUpdate(id, avatar, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь с данным _id не найден')
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'))
      } else {
        next(error)
      }
    });
};