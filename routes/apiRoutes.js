/* eslint-disable no-console */
var db = require("../models");
var router = require("express").Router();

// Get all games
router.get("/games", function(req, res) {
  console.log("GAMES ROUTER HIT");
  db.game.findAll({
  }).then(function(games) {
    res.json(games);
    console.log(games);
  });
});

router.get("/games/:id", function(req, res) {
  db.game.findOne({
    where: {
      id: req.body.gameId
    },
    include: [db.games]
  }).then(function(dbGames) {
    res.json(dbGames);
  });
});
  
// Add new game
router.post("/games", function(req, res) {
  db.game.create({
    Title: req.body.title,
    GameID: req.body.gameId,
    Platform: req.bdoy.platform,
    Region: req.body.platform,
    Publisher: req.body.publisher
  })
    .then(function(dbgame) {
      res.json(dbgame);
    });
});

router.delete("/games/:id", function(req, res) {
  db.Author.destroy({
    where: {
      id: req.params.gamesId
    }
  }).then(function(dbgames) {
    res.json(dbgames);
  });
});

router.get("/users", function(req, res) {
  db.users.findAll({}).then(function(dbUsers) {
    res.json(dbUsers);
  });
});

router.post("/wishlists", function(req, res) {

});

module.exports = router;
