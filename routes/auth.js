const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEXP } = require('../middlewares/validation');
const { login, addUser } = require('../controllers/users');

authRouter.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
  }),
  login
);
authRouter.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().regex(REGEXP),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      })
  }),
  addUser
);

module.exports = authRouter;
