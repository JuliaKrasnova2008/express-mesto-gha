const cardSchema = require('../models/card');
const Forbidden = require('../errors/forbidden');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');

// const { internalServerError } = require('../errors/errorCodes');

// возвращаем все карточки
module.exports.getCards = (req, res, next) => {
  cardSchema
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ cards }))
    .catch(next);
};

// создаем карточку
module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardSchema
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании карточки.'));
      } else {
        next(error);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  cardSchema.findByIdAndDelete({ _id: cardId })
    .orFail(() => {
      throw new NotFound('Карточка с данным _id не найдена');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Доступ запрещен');
      }
      return res.send({ card });
    })
    .catch((error) => {
      if (error.name === 'NotFound') {
        next(new NotFound('Карточка с данным _id не найдена'));
      } else if (error.name === 'CastError') {
        next(new BadRequest('Неправильно передан id.'));
      } else {
        next(error);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const id = req.user._id;
  const { cardId } = req.params;

  cardSchema
    .findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .orFail(() => {
      throw new NotFound('Передан несуществующий id карточки');
    })
    .then((card) => {
      res.send({ card });
    })
    .catch((error) => {
      if (error.name === 'NotFound') {
        next(new NotFound('Карточка с данным _id не найдена'));
      } else if (error.name === 'CastError') {
        next(new BadRequest('Неправильно передан id.'));
      } else {
        next(error);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const id = req.user._id;
  const { cardId } = req.params;

  cardSchema.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true })
    .orFail(() => {
      throw new NotFound('Передан несуществующий id карточки');
    })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFound('Карточка с данным _id не найдена'));
      }
    })
    .catch((error) => {
      if (error.name === 'NotFound') {
        next(new NotFound('Карточка с данным _id не найдена'));
      } else if (error.name === 'CastError') {
        next(new BadRequest('Неправильно передан id.'));
      } else {
        next(error);
      }
    });
};
