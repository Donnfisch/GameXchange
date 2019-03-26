const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {

  // Returns user's games along with have/want/trade status
  findAll: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, 'your_jwt_secret');
    // console.log(user.id);
    db.game.findAll({
      include: [{
        model: db.inventory,
        where: { userId: user.id },
      }],
    }).then(dbInventory => {
      res.json(dbInventory);
    });
  },

  // Matches games others want, with games user has to trade
  findMatchesOut: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, 'your_jwt_secret');
    db.inventory.findAll({
      where: {
        want: true,
        userId: { $not: user.id },
      },
      attributes: [
        'want',
      ],
      include: [{
        model: db.user,
        attributes: [
          // 'id',
          'username',
          'email',
        ],
      },
      {
        model: db.game,
        attributes: [
          'id',
          'title',
          'platform',
          'publisher',
          'version',
        ],
      }],
    }).then(dbInventory => {
      res.json(dbInventory);
    });
  },

  // Matches games user wants, with games others have to trade
  findMatchesIn: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, 'your_jwt_secret');
    db.inventory.findAll({
      where: {
        trade: true,
        userId: { $not: user.id },
      },
      attributes: [
        'trade',
      ],
      include: [{
        model: db.user,
        attributes: [
          // 'id',
          'username',
          'email',
        ],
      },
      {
        model: db.game,
        attributes: [
          'id',
          'title',
          'platform',
          'publisher',
          'version',
        ],
      }],
    }).then(dbInventory => {
      res.json(dbInventory);
    });
  },

  // Add or update inventory items
  upsertOrDelete: (req, res) => {
    console.log('UPSERT');
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, 'your_jwt_secret');
    db.inventory.findOne({
      where: {
        userId: user.id,
        gameId: req.body.gameId,
      },
    }).then(dbUpdate => {
      if (dbUpdate) {
        if (!req.body.have && !req.body.want && !req.body.trade) {
          db.inventory.destroy({
            where: {
              userId: user.id,
              gameId: req.body.gameId,
            },
          }).then(dbInventory => res.json(dbInventory))
            .catch(err => res.status(422).json(err));
        } else {
          db.inventory.update(
            req.body, {
              where: {
                userId: user.id,
                gameId: req.body.gameId,
              },
            }
          ).then(dbInventory => res.json(dbInventory))
            .catch(err => res.status(422).json(err));
        }
      } else if (req.body.have || req.body.want || req.body.trade) {
        db.inventory.create(req.body)
          .then(dbInventory => res.json(dbInventory))
          .catch(err => res.status(422).json(err));
      } else {
        res.json("Nothing added to DB");
      }
    });
  },
};
