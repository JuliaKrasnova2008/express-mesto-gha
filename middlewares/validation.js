const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const BadRequest = require('../errors/badRequest');

// url
const validateUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  throw new BadRequest('Пользователь по данному URL не найден');
};

// ID
const validateID = (id) => {
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  throw new BadRequest('Неверный id.');
};

// авторизация
module.exports.validateAddUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

// аутенфикация
module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

// редактирование профиля
module.exports.validateEditProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }).unknown(true),
});

// создание карточки
module.exports.validateAddCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateUrl),
  }).unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true)
});

module.exports.validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true)
});

module.exports.validateLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true)
});

// поиск пользователя по ID
module.exports.validateUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateID),
  }).unknown(true),
});

module.exports.validateEditAvatar = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }).unknown(true),
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateID),
  }).unknown(true),
});
