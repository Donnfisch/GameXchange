const router = require('express').Router();
const userController = require('../../controllers/userController');

// Matches with "/api/user..."

// Return user
router.route('/')
  .get(userController.findOne)
  .put(userController.update);

module.exports = router;
