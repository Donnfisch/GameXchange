const jwt = require("jsonwebtoken");
const db = require("../models");

const jwtSecret = 'your_jwt_secret';

module.exports = {

  // Returns user's games along with have/want/trade status
  findAll: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, jwtSecret);
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
    const user = jwt.verify(token, jwtSecret);
    let outerTradeWant = 'want';
    let innerTradeWant = 'trade';

    if (req.params.direction === 'in') {
      outerTradeWant = 'trade';
      innerTradeWant = 'want';
    }

    console.log(req.params);

    db.inventory.findAll({
      where: {
        [outerTradeWant]: true,
        userId: { $not: user.id },
      },
      attributes: [
        // 'want',
        'id',
      ],
      include: [{
        model: db.user,
        attributes: [
          'id',
          'username',
          'email',
        ],
      },
      {
        model: db.game,
        required: true,
        attributes: [
          'id',
          'title',
          'platform',
          'publisher',
          'version',
        ],
        include: [{
          model: db.inventory,
          where: {
            [innerTradeWant]: true,
            userId: user.id,
          },
          attributes: [],
        }],
      }],
      order: [
        [db.user, 'email', 'DESC'],
        [db.game, 'title', 'ASC'],
      ],
    }).then(dbInventory => {
      res.json(dbInventory);
    });
  },

  // Matches games user wants, with games others have to trade
  // findMatchesIn: (req, res) => {
  //   const token = req.headers.authorization.replace('Bearer ', '');
  //   const user = jwt.verify(token, jwtSecret);
  //   db.inventory.findAll({
  //     where: {
  //       trade: true,
  //       userId: { $not: user.id },
  //     },
  //     attributes: [
  //       // 'trade',
  //       'id',
  //     ],
  //     include: [{
  //       model: db.user,
  //       attributes: [
  //         'id',
  //         'username',
  //         'email',
  //       ],
  //     },
  //     {
  //       model: db.game,
  //       required: true,
  //       attributes: [
  //         'id',
  //         'title',
  //         'platform',
  //         'publisher',
  //         'version',
  //       ],
  //       include: [{
  //         model: db.inventory,
  //         where: {
  //           want: true,
  //           userId: user.id,
  //         },
  //         attributes: [],
  //       }],
  //     }],
  //     order: [
  //       [db.user, 'email', 'DESC'],
  //     ],
  //   }).then(dbInventory => {
  //     res.json(dbInventory);
  //   });
  // },

  // Add or update inventory items
  upsertOrDelete: (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const user = jwt.verify(token, jwtSecret);
    const searchData = {
      userId: user.id,
      gameId: req.body.gameId,
    };
    db.inventory.findOne({ where: searchData })
      .then(dbUpdate => {
        if (dbUpdate) {
          if (!req.body.have && !req.body.want && !req.body.trade) {
            db.inventory.destroy({ where: searchData })
              .then(dbInventory => res.json(dbInventory))
              .catch(err => res.status(422).json(err));
          } else {
            db.inventory.update(
              req.body, { where: searchData }
            ).then(dbInventory => res.json(dbInventory))
              .catch(err => res.status(422).json(err));
          }
        } else if (req.body.have || req.body.want || req.body.trade) {
          db.inventory.create(Object.assign(req.body, { userId: user.id }))
            .then(dbInventory => res.json(dbInventory))
            .catch(err => res.status(422).json(err));
        } else {
          res.json("Nothing added to DB");
        }
      });
  },
};
