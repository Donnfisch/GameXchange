const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");

// Matches with "/api/games"
router.route("/")
  .get(gamesController.findAll)
  // .post(gamesController.create);

// Matches with "/api/games/id/:id"
router.route("/id/:id")
  .get(gamesController.findById)
  // .put(booksController.update)
  // .delete(booksController.remove);

// Matches with "/api/games/title/:title"
router.route("/title/:title")
  .get(gamesController.findByTitle)

router.route("/match/")
  .get(gamesController.matchGames)

router.route("/match/:direction")
  .get(gamesController.matchGames)

module.exports = router;
