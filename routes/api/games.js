const router = require('express').Router();
const gamesController = require('../../controllers/gamesController');

// Matches with "/api/games..."

// Game
router.route('/')
  .get(gamesController.findAll)
  .post(gamesController.create);

// Get by id
router.route('/id/:id')
  .get(gamesController.findById);

// Search by title (Add platform?)
router.route('/title/:title')
  .get(gamesController.findByTitle);

module.exports = router;
