const router = require('express').Router();
const userController = require('../../controllers/userController');

// Matches with "/api/user..."

// User
router.route('/')
  .get(userController.findOne)
  .put(userController.update);

module.exports = router;
