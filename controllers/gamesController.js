const db = require("../models");

// Defining methods for the gamesController
module.exports = {
  
  // Lists all games
  findAll: (req, res) => {
    db.Game.findAll({ where: {status: "approved"}, limit:50
    }).then(dbGames => {
      res.json(dbGames);
    });
  },

  // Find game by id
  findById: (req, res) => {
    db.Game.findByPk(req.params.id)
      .then(dbGame => {
      res.json(dbGame);
    });
  },

  // Search games by title
  findByTitle: (req, res) => {
    db.Game.findAll({ where: {title: { $like: '%' + req.params.title + '%'}}, limit:50
    }).then(dbGames => {
      res.json(dbGames);
    });
  },

  // Returns user's games along with have/want/trade status
  myGames: (req, res) => {
    db.sequelize.query(`SELECT id, userId, w.gameId, have, want, trade, g.platform, g.title, g.region, g.publisher, g.version FROM wishLists w
    LEFT JOIN
    (SELECT * FROM games) as g
    ON (g.gameId = w.gameId) WHERE userId = 1`, { type: db.sequelize.QueryTypes.SELECT})
    .then(dbGames => {
      res.json(dbGames);
    });
  },

  // Matches users trades with others
  matchGames: (req, res) => {
    console.log(req.params.direction);
    let currentUser = 2;
    let userIdACompare = "!=";
    let userIdBCompare = "=";
    let userToMatch = "m.myUserId";
    if (req.params.direction === "in") {
      userIdACompare = "=";
      userIdBCompare = "!=";
      userToMatch = "m.theirUserId";
    }
    db.sequelize.query(`SELECT g.gameid, 
      g.title, 
      g.platform, 
      g.region, 
      g.publisher, 
      g.version, 
      h.userid, 
      h.username, 
      h.firstname, 
      h.lastname, 
      h.address, 
      h.email 
    FROM games g 
    INNER JOIN (SELECT u.userid, 
                      u.username, 
                      u.firstname, 
                      u.lastname, 
                      u.address, 
                      u.email, 
                      m.mygameid 
                FROM   users u 
                      INNER JOIN (SELECT A.gameid AS myGameId, 
                                          B.gameid AS theirGameId, 
                                          A.userid AS myUserId, 
                                          B.userid AS theirUserId, 
                                          A.want   AS want, 
                                          B.have   AS have 
                                  FROM    wishLists A, 
                                          wishLists B 
                                  WHERE  A.want <> 0 
                                            AND B.have <> 0 
                                            AND A.gameid = B.gameid 
                                            AND A.userid ${userIdACompare} ${currentUser} 
                                            AND B.userid ${userIdBCompare} ${currentUser}) AS m 
                                  ON ( u.userid = ${userToMatch} )) AS h 
                ON ( g.gameid = h.mygameid )
                ORDER BY email`, { type: db.sequelize.QueryTypes.SELECT })
      .then(dbGames => {
        res.json(dbGames);
      });
  },

  // Create game
  create: function(req, res) {
    console.log(req.body);
    req.body.status = "requested";
    db.Game.create(req.body)
      .then(dbGame => res.json(dbGame))
      .catch(err => res.status(422).json(err));
  }

  // update: function(req, res) {
  //   db.Book
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Book
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
