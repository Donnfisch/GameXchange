/* eslint-disable no-console */
var db = require("../models");
// var jwt = require("jsonwebtoken");


module.exports = function (app) {
  // Load index page
  // * Pretty sure this doesn't quite work the way we want it to but **WORKS**
  app.get("/", function (request, response) {
    if (!request.cookies.token) {
      return db.game.findAll({}).then(function(dbgames) {
        response.render("login", {
          msg: "Welcome!",
          games: dbgames
        });
      });
    }
    response.redirect("/search");
  });

  // RAW SEARCH NO META
  app.get("/search", function (req, res) {
    console.log("\n GAME SEARCH search \n");
    console.log("RESPONSE: " + JSON.stringify(req.query));
    var offset = "";
    if (req.query.offset) {
      offset = "OFFSET " + req.query.offset;
    }
    db.sequelize.query(`SELECT g.gameId, w.have, w.want, w.trade, platform, title, region, publisher, version FROM games g 
      LEFT JOIN
      (SELECT * FROM wishLists WHERE userid = 1) as w
      ON (g.gameId = w.gameId) WHERE title LIKE '%` + req.query.title + `%'
      LIMIT 100 ` + offset, { type: db.sequelize.QueryTypes.SELECT})
      .then(gamesdb => {
        // console.log(gamesdb);
        res.render("gamesearch", {gamesdb});
      });
  });

  // MATCH QUERY
  // STILL NEEDS USERID FROM COOKIE
  // NEEDS TO RUN SECOND TIME TO MATCH CURRENT USERS TRADES TO OTHERS HAVES
  app.get("/matches", function(req, res) {
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
                                            AND A.userid = 1 
                                            AND B.userid != 1) AS m 
                                  ON ( u.userid = m.theiruserid )) AS h 
                ON ( g.gameid = h.mygameid )
                ORDER BY email`, { type: db.sequelize.QueryTypes.SELECT})
      .then(matchdb => {
        res.render("matches", {matchdb});
      });
  });

  // RETURNS USERS GAMES
  app.get("/mygames", function(req, res) {
    console.log("RESPONSE: " + JSON.stringify(req.query));
    var offset = "";
    if (req.query.offset) {
      offset = "OFFSET " + req.query.offset;
    }
    db.sequelize.query(`SELECT id, userId, w.gameId, have, want, trade, g.platform, g.title, g.region, g.publisher, g.version FROM wishLists w
    LEFT JOIN
    (SELECT * FROM games) as g
    ON (g.gameId = w.gameId) WHERE userId = 1` + offset, { type: db.sequelize.QueryTypes.SELECT})
      .then(mygames => {
        res.render("mygames", {mygames});
      });
  });

  // Render Registration Page
  app.get("/registration", function (request, response) {
    response.render("registration");
  });

  // Render Registration Success Page
  app.get("/registrationSuccess", function (request, response) {
    response.render("registrationSuccess");
  });

  // Delete cookie and render logout
  app.get("/logout", function (request, response) {
    response.clearCookie("token");
    response.render("logout");
  });

  // Create New User
  // ! Functions properly for user creation but fails after
  app.post("/userCreate", function (request, response) {

    db.user.create({
      username: request.body.username,
      password: request.body.password,
      email: request.body.email,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      address: request.body.address,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(function (db) {
      // * No clue why this doesn't work properly.
      // * POSTMAN shows all the html here but the goddam window doesnt change
      return response.render("registrationSuccess", {
        msg: `User ${db.username} was created at ${db.createdAt}`
      });
    });
    // * Tried redirecting here then got "Can't set headers after they are sent"
    // ? What on earth is that about ?
    // response.redirect("/registrationSuccess");
  });

  // ! MAKE SURE THIS STAYS AT THE BOTTOM !
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};