const express = require('express');
const {
  getUsers,
  getUserById,
  editProfile,
  editAvatar,
} = require('../controllers/users');
const { validateUserById, validateEditAvatar, validateEditProfile } = require('../middlewares/validation');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', validateUserById, getUserById);
usersRouter.patch('/me', validateEditProfile, editProfile);
usersRouter.patch('/me/avatar', validateEditAvatar, editAvatar);

module.exports = usersRouter;
