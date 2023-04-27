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
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// аутенфикация
module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// редактирование профиля
module.exports.validateEditProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

// редактирование аватара
module.exports.validateEditAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
});
// создание карточки
module.exports.validateAddCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validateUrl),
  }),
});

// поиск пользователя по ID
module.exports.validateUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateID),
  }),
});

// поиск карточки по Id
module.exports.validateCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validateID),
  }),
});
