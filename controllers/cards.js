const Card = require('../models/card');
const NotFound = require('../errors/errors');

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      } else {
        res.status(500).send({
          message: 'Произошла ошибка на сервере.',
        });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ cards });
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove({ _id: cardId })
    .orFail(() => {
      throw new NotFound();
    })
    .then((card) => {
      res.send({ card });
    })
    .catch((error) => {
      if (error.name === 'NotFound') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      } else if (error.name === 'CastError') {
        res.status(400).send({ message: 'Неправильно передан id.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере.' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  const id = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound();
    })
    .then((card) => {
      res.send({ card });
    })
    .catch((error) => {
      if (error.name === 'NotFound') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      } else if (error.name === 'CastError') {
        res.status(400).send({ message: 'Неправильно передан id.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере.' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  const id = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound();
    })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((error) => {
      if (error.name === 'NotFound') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      } else if (error.name === 'CastError') {
        res.status(400).send({ message: 'Неправильно передан id.' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере.' });
      }
    });
};
