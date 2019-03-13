const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const inventory = sequelize.define("inventory", {
    have: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    want: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    trade: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  inventory.associate = models => {
    inventory.belongsTo(models.game, { forgeinKey: { allowNull: false } });
    inventory.belongsTo(models.user, { forgeinKey: { allowNull: false } });
  };

  inventory.findUserInventory = currentUser => (sequelize.query(
    `SELECT w.id,
      w.userid,
      w.gameid,
      have,
      want,
      trade,
      g.platform,
      g.title,
      g.region,
      g.publisher,
      g.version
    FROM inventories w
    LEFT JOIN (SELECT * FROM games) AS g
      ON ( g.id = w.gameid )
    WHERE  w.userid = "${currentUser}"`,
    { type: sequelize.QueryTypes.SELECT }
  ));

  inventory.findMatches = (currentUser, direction) => {
    let userIdACompare = "!=";
    let userIdBCompare = "=";
    let userToMatch = "m.myUserId";
    if (direction === "in") {
      userIdACompare = "=";
      userIdBCompare = "!=";
      userToMatch = "m.theirUserId";
    }
    return (sequelize.query(
      `SELECT g.id, 
        g.title, 
        g.platform, 
        g.region, 
        g.publisher, 
        g.version, 
        h.id, 
        h.username, 
        h.firstname, 
        h.lastname, 
        h.address, 
        h.email 
      FROM games g 
      INNER JOIN (SELECT u.id, 
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
                              FROM inventories A, 
                                inventories B 
                              WHERE  A.want <> 0 
                                AND B.have <> 0 
                                AND A.gameid = B.gameid 
                                AND A.userid ${userIdACompare} "${currentUser}" 
                                AND B.userid ${userIdBCompare} "${currentUser}") AS m 
                  ON ( u.id = ${userToMatch} )) AS h 
      ON ( g.id = h.mygameid )
      ORDER BY email;`,
      { type: sequelize.QueryTypes.SELECT }
    ));
  };

  return inventory;
};
