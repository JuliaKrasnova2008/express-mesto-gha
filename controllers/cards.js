const cardSchema = require('../models/card');
const Forbidden = require('../errors/forbidden');
const NotFound = require('../errors/notFound');

// const { internalServerError } = require('../errors/errorCodes');

// возвращаем все карточки
module.exports.getCards = (req, res, next) => {
  cardSchema
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(201).send(cards))
    .catch(next);
};

// создаем карточку
module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardSchema
    .create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  cardSchema.findByIdAndDelete({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с данным _id не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Доступ запрещен');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const id = req.user._id;
  const { cardId } = req.params;

  cardSchema
    .findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с данным _id не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const id = req.user._id;
  const { cardId } = req.params;

  cardSchema.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с данным _id не найдена');
      }
      res.send(card);
    })
    .catch(next);
};
