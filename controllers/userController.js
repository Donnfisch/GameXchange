const jwt = require("jsonwebtoken");
const db = require("../models");

const jwtSecret = 'your_jwt_secret';

module.exports = {

  findOne: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, jwtSecret);
    db.user.findOne({ where: { id: user.id } })
      .then(userinfo => {
        res.json(userinfo);
      });
  },
};
