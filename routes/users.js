const express = require('express');
const {
  getUsers,
  getUserById,
  addUser,
  editProfile,
  editAvatar,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', addUser);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', editProfile);
usersRouter.patch('/me/avatar', editAvatar);

module.exports = usersRouter;
