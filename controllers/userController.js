const jwt = require('jsonwebtoken');
const db = require('../models');

const jwtSecret = 'your_jwt_secret';

module.exports = {

  findOne: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, jwtSecret);
    db.user.findOne({
      where: { id: user.id },
      attributes: ['id', 'username', 'email', 'firstname', 'lastname', 'address'],
    })
      .then(userinfo => {
        res.json(userinfo);
      });
  },

  update: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, jwtSecret);
    console.log(`token: ${token}`);
    console.log(`req.body: ${JSON.stringify(req.body)}`);
    db.user.update(
      {
        email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address, password: req.body.password,
      },
      { where: { id: user.id } }
    )
      .then(userinfo => {
        res.json(userinfo);
      });
  },
};
