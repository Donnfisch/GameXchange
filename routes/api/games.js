const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");

// Matches with "/api/games..."

// Return all games
router.route("/")
  .get(gamesController.findAll)
  .post(gamesController.create);

// Return game by id
router.route("/id/:id")
  .get(gamesController.findById);

// Search by title (Add platform?)
router.route("/title/:title")
  .get(gamesController.findByTitle);

module.exports = router;
