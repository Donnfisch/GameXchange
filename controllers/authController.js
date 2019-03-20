const jwt = require('jsonwebtoken');
// const User = require("../models/user");
// Defining methods for the authController
module.exports = {

  // Lists all games
  loginDammit: (req, res) => {
    // Mock user
    const user = {
      id: 1,
      username: 'shane',
      email: 'test@example.com',
    };

    jwt.sign({ user }, 'secretkey', (err, token) => {
      res.json({
        token,
      });
    });
  }
};
