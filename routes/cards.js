const express = require('express');
const {
  getCards,
  deleteCard,
  addCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardsRouter = express.Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', addCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/likes/:cardId', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
