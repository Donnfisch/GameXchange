const router = require('express').Router();
const authController = require('../../controllers/authController');

router.route('/')
  .post(authController.login);

router.route('/user/')
  .post(authController.createUser);

module.exports = router;
