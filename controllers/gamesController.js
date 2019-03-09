const db = require("../models");

// Defining methods for the gamesController
module.exports = {

  // Lists all games
  findAll: (req, res) => {
    db.Game.findAll({
      where: { status: "approved" }, limit: 50
    }).then(dbGames => {
      res.json(dbGames);
    });
  },

  // Find game by id
  findById: (req, res) => {
    db.Game.findByPk(req.params.id)
      .then(dbGame => {
        res.json(dbGame);
      });
  },

  // Search games by title
  findByTitle: (req, res) => {
    db.Game.findAll({
      where: { title: { $like: '%' + req.params.title + '%' } }, limit: 50
    }).then(dbGames => {
      res.json(dbGames);
    });
  },

  // Create game
  create: function (req, res) {
    req.body.status = "requested";
    db.Game.create(req.body)
      .then(dbGame => res.json(dbGame))
      .catch(err => res.status(422).json(err));
  }
};
