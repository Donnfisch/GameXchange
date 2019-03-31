
const jwt = require('jsonwebtoken');
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Sequelize = require('sequelize');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const uuid = require('uuid');
const db = require("../models");

// Defining methods for the authController
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    ((username, password, done) => {
      db.user.findOne({
        where: {
          username,
        },
      })
        .then(
          (user) => {
            if (!user) {
              return done(null, false, { message: 'Incorrect username or password.' });
            }
            if (!user.validatePassword(password)) {
              return done(null, false, { message: "Incorrect username or password." });
            }
            return done(null, user, { message: "Logged In Successfully" });
          }
        )
        .catch((error) => {
          done(error);
          throw error;
        });
    })
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    ((jwtPayload, done) => {
      try {
        return done(null, jwtPayload);
      } catch (error) {
        return done(error);
      }
    })
  )
);

module.exports = {
  // Login user
  login: (req, res) => {
    passport.authenticate(
      "local", {
        session: false,
      },
      (error, user, info) => {
        if (error || !user) {
          return res.status(403).json({
            message: "Unable to Authorize",
            user,
            error,
            info,
          });
        }
        req.login(user, {
          session: false,
        }, (newError) => {
          if (newError) {
            res.send(newError);
          }
          const sanitizedUser = {
            id: user.id,
            username: user.username,
            email: user.email,
          };
          const token = jwt.sign(sanitizedUser, "your_jwt_secret");
          res.json({
            user: sanitizedUser,
            token,
          });
        });
        return null;
      }
    )(req, res);
  },

  createUser: (req, res) => {
    console.log(req.body);
    const { Op } = Sequelize;
    const {
      username,
      email,
      password,
      firstname,
      lastname,
      address,
    } = req.body;

    return db.user.findOrCreate({
      where: { [Op.or]: [{ username }, { email }] },
      // where: {username: "JDoe"},
      defaults: {
        id: uuid(),
        username,
        email,
        address,
        firstname,
        lastname,
        password,
      },
    })
      .then(([user, created]) => {
        res.send({ user, created });
      });
  },
};
