// const express = require('express');
// const {
//   getCards,
//   deleteCard,
//   addCard,
//   likeCard,
//   dislikeCard,
// } = require('../controllers/cards');

// const cardsRouter = express.Router();

// cardsRouter.get('/', getCards);
// cardsRouter.post('/', addCard);
// cardsRouter.delete('/:cardId', deleteCard);
// cardsRouter.put('/:cardId/likes', likeCard);
// cardsRouter.delete('/:cardId/likes', dislikeCard);

// module.exports = cardsRouter;

const cardRoutes = require('express').Router();

const {
  getCards,
  deleteCard,
  addCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.post('/', addCard);
cardRoutes.delete('/:cardId', deleteCard);
cardRoutes.put('/:cardId/likes', likeCard);
cardRoutes.delete('/:cardId/likes', dislikeCard);
module.exports = cardRoutes;
