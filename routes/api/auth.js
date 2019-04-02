const router = require('express').Router();

// const jwt = require("jsonwebtoken");
// const db = require('../../models');
const authController = require('../../controllers/authController');

router.route('/')
  .post(authController.login);

router.route('/user/create')
  .post(authController.createUser);

module.exports = router;
