const jwt = require('jsonwebtoken');
const db = require('../models');

// Defining methods for the gamesController
module.exports = {

  // Lists all games
  findAll: (req, res) => {
    db.game.findAll({
      where: { status: 'approved' }, limit: 50,
    }).then(dbGames => {
      res.json(dbGames);
    });
  },

  // Find game by id
  findById: (req, res) => {
    db.game.findByPk(req.params.id)
      .then(dbGame => {
        res.json(dbGame);
      });
  },

  // Search games by title
  findByTitle: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, 'your_jwt_secret');
    db.game.findAll({
      where: {
        title: {
          $like: `%${req.params.title}%`,
        },
        status: 'approved',
      },
      limit: 50,
      include: [{
        model: db.inventory,
        where: { userId: user.id },
        required: false,
      }],
    }).then(dbGames => {
      // console.log(dbGames);
      res.json(dbGames);
    });
  },

  // Create game
  create: (req, res) => {
    db.game.create(req.body)
      .then(dbGame => res.json(dbGame))
      .catch(err => res.status(422).json(err));
  },
};
