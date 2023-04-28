const { celebrate, Joi } = require('celebrate');
// const BadRequest = require('../errors/badRequest');

const REGEXP = /https?:\/\/(www\.)?[a-z0-9.-]{2,}\.[a-z]{2,}\/?[-._~:/?#[\]@!$&'()*+,;=]*/;

module.exports = { REGEXP };
// ID
// const validateID = (id) => {
//   if (/^[0-9a-fA-F]{24}$/.test(id)) {
//     return id;
//   }
//   throw new BadRequest('Неверный id.');
// };

// авторизация
// module.exports.validateAddUser = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//     name: Joi.string().required().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//   }).unknown(true),
// });

// аутенфикация
// module.exports.validateLogin = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }).unknown(true),
// });

// // редактирование профиля
// module.exports.validateEditProfile = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30).required(),
//     about: Joi.string().min(2).max(30).required(),
//   }).unknown(true),
// });
module.exports.validateEditProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

// создание карточки
module.exports.validateAddCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().pattern(REGEXP),
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
// module.exports.validateUserById = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required().custom(validateID),
//   }).unknown(true),
// });
module.exports.validateUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true),
});

// module.exports.validateEditAvatar = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30).required(),
//     about: Joi.string().min(2).max(30).required(),
//   }).unknown(true),
//   params: Joi.object().keys({
//     userId: Joi.string().required().pattern(REGEXP),
//   }).unknown(true),
// });
module.exports.validateEditAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(REGEXP),
  }).unknown(true),
});
