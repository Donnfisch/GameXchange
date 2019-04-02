const router = require('express').Router();
const userController = require('../../controllers/userController');

// Matches with "/api/user..."

// Return user
router.route('/')
  .get(userController.findOne)
  .post(userController.update);
console.log('fart');

module.exports = router;
