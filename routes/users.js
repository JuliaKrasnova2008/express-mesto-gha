const express = require('express');
const {
  getUsers,
  getUserById,
  addUser,
  editProfile,
  editAvatar,
} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/users', getUsers);
usersRouter.post('/users', addUser);
usersRouter.get('/users/:userId', getUserById);
usersRouter.patch('/users/me', editProfile);
usersRouter.patch('/users/me/avatar', editAvatar);

module.exports = usersRouter;
