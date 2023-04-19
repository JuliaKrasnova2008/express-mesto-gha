const express = require('express');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' });
});
router.use(express.json());

module.exports = router;
