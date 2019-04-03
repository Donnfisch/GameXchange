const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
      .then(userInfo => {
        res.json(userInfo);
      });
  },

  update: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, jwtSecret);
    db.user.findOne({ where: { id: user.id } })
      .then(dbUser => {
        if (!req.body.password) {
          // console.log('no password');
          db.user.findOne({ where: { email: req.body.email, id: { $not: user.id } } })
            .then(emailMatch => {
              if (!emailMatch) {
                db.user.update(
                  {
                    email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address,
                  },
                  { where: { id: user.id } }
                )
                  .then(() => res.status(200).json({ message: 'User has been updated' }));
              } else {
                // console.log('FUCK');
                return res.status(400).json({ message: 'Email address already in use' });
              }
              return null;
            });
        } else if (bcrypt.compareSync(
          req.body.oldPassword,
          dbUser.password
        )) {
          db.user.findOne({ where: { email: req.body.email, id: { $not: user.id } } })
            .then(emailMatch => {
              if (!emailMatch) {
                db.user.update(
                  {
                    email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, address: req.body.address, password: req.body.password,
                  },
                  { where: { id: user.id } }
                )
                  .then(() => res.status(200).json({ message: 'Password has been changed' }));
              } else {
                return res.status(400).json({ message: 'Email address already in use' });
              }
              return null;
            });
        } else {
          return res.status(403).json({ message: 'Unable to Authorize' });
        }
        return null;
      });
  },
};
