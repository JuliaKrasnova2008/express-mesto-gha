const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (card.deletedCount === 0) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ message: 'Карточка удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: 'Неправильно передан id.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((card) => res.send(card)).catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Передены невалидные данные.' });
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports.likeCard = (req, res) => {
  const id = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true, runValidators: true })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    }).catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Неправильно передан id.' });
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  const id = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: id } }, { new: true, runValidators: true })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    }).catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Неправильно передан id.' });
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};
