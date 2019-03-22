const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {

  // Returns user's games along with have/want/trade status
  findAll: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, 'your_jwt_secret');
    console.log(user.id);
    db.game.findAll({
      include: [{
        model: db.inventory,
        where: { userId: user.id },
      }],
    }).then(dbInventory => {
      res.json(dbInventory);
    });
  },

  // Matches users trades with others
  // TODO: Need to catch currentUser
  findMatches: (req, res) => {
    const currentUser = "5272e292-3c40-4eea-a3df-707b760fdf00";
    db.inventory.findAll({
      where: {
        trade: true,
      },
      attributes: [
        'id',
        'trade',
      ],
      include: [{
        model: db.game,
        attributes: [
          'id',
          'title',
          'platform',
          'publisher',
          'version',
        ],
        required: true,
        include: [{
          model: db.inventory,
          where: {
            userId: {
              $not: currentUser,
            },
            want: true,
          },
          attributes: ['want'],
          include: [{
            model: db.user,
            attributes: [
              'id',
              'username',
              'email',
              'firstname',
              'lastname',
              'address',
              'email',
            ],
          }],
        }],
      }],
    }).then(dbInventory => {
      res.json(dbInventory);
    });
  },

  // Add or update inventory items
  // TODO: catch currentUser PROPERLY
  // TOTO: Bless the rains down in Africa
  upsertOrDelete: (req, res) => {
    // console.log(req.body.headers.Authorization);
    const token = req.body.headers.Authorization.replace('Bearer ', '');
    const user = jwt.verify(token, 'your_jwt_secret');
    console.log(req.body);
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
