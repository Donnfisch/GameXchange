const router = require("express").Router();
const gamesController = require("../../controllers/gamesController");

// Matches with "/api/games..."
router.route("/")
  .get(gamesController.findAll)
  .post(gamesController.create);

router.route("/id/:id")
  .get(gamesController.findById)
  // .put(booksController.update)
  // .delete(booksController.remove);

router.route("/title/:title")
  .get(gamesController.findByTitle)

router.route("/match/")
  .get(gamesController.matchGames)

router.route("/match/:direction")
  .get(gamesController.matchGames)

router.route("/mygames")
  .get(gamesController.myGames)

module.exports = router;
