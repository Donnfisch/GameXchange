const db = require("../models");

module.exports = {

  // Returns user's games along with have/want/trade status
    // TODO: Need to catch currentUser
  findAll: (req, res) => {
    let currentUser = 1;
    db.sequelize.query(`SELECT id, 
        userid, 
        w.gameid, 
        have, 
        want, 
        trade, 
        g.platform, 
        g.title, 
        g.region, 
        g.publisher, 
        g.version 
    FROM   wishlists w 
        LEFT JOIN (SELECT * 
                  FROM   games) AS g 
              ON ( g.gameid = w.gameid ) 
    WHERE  userid = ${currentUser}`, { type: db.sequelize.QueryTypes.SELECT })
      .then(dbGames => {
        res.json(dbGames);
      });
  },

  // Matches users trades with others
    // TODO: Need to catch currentUser
  findMatches: (req, res) => {
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
  
  // Add or update wishList items
    // TODO: catch currentUser
    // TODO: Pull ADD UUID to REACT to gen unique IDs
    // TODO: Create logic
    // TOTO: Bless the rains down in Africa
  upsert: (req, res) => {
    console.log('UPSERT');
    console.log(req.body);
    // let currentUser = 1;
    // db.wishList.create({
    //   where: { status: "approved" }, limit: 50
    // }).then(dbGames => {
    //   res.json(dbGames);
    // });
  }
}