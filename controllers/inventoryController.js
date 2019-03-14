const db = require("../models");

module.exports = {

  // Returns user's games along with have/want/trade status
  // TODO: Need to catch currentUser
  findAll: (req, res) => {
    const currentUser = "5272e292-3c40-4eea-a3df-707b760fdf00";
    db.game.findAll({
      include: [{
        model: db.inventory,
        where: { userId: currentUser },
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
  // TODO: catch currentUser
  // TOTO: Bless the rains down in Africa
  upsertOrDelete: (req, res) => {
    // const currentUser = "5272e292-3c40-4eea-a3df-707b760fdf00";
    db.inventory.findOne({
      where: {
        userId: req.body.userId,
        gameId: req.body.gameId,
      },
    }).then(dbUpdate => {
      if (dbUpdate) {
        if (req.body.have === "false" && req.body.want === "false" && req.body.trade === "false") {
          db.inventory.destroy({
            where: {
              userId: req.body.userId,
              gameId: req.body.gameId,
            },
          }).then(dbInventory => res.json(dbInventory))
            .catch(err => res.status(422).json(err));
        } else {
          db.inventory.update(
            req.body, {
              where: {
                userId: req.body.userId,
                gameId: req.body.gameId,
              },
            }
          ).then(dbInventory => res.json(dbInventory))
            .catch(err => res.status(422).json(err));
        }
      } else if (req.body.have === "true" || req.body.want === "true" || req.body.trade === "true") {
        db.inventory.create(req.body)
          .then(dbInventory => res.json(dbInventory))
          .catch(err => res.status(422).json(err));
      } else {
        res.json("Nothing added to DB");
      }
    });
  },
};
