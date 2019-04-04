const router = require('express').Router();
const authController = require('../../controllers/authController');

// resolves to api/game

// game/auth
router.route('/auth')
  .post(authController.login);

// game
router.route('/')
  .post(authController.createUser);

module.exports = router;
