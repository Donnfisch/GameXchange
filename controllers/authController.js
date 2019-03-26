
const jwt = require('jsonwebtoken');
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
// const User = require("../models/user");

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
    // find the user in db if needed
      try {
        return done(null, jwtPayload);
      } catch (error) {
        return done(error);
      }
    })
  )
);

module.exports = {

  // auth: ()

  // Login user
  login: (req, res) => {
    console.log('AUTH CONTROLLER');
    passport.authenticate(
      "local", {
        session: false,
      },
      (error, user, info) => {
        // console.log(error);
        // console.log(user);
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
      }
    )(req, res);
  },

  createUser: (req, res) => {
    db.user.findOrCreate({
      where: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    })
      .then(([user, created]) => {
        console.log(user.get({
          plain: true,
        }));
        console.log(created);
        res.send(user);
      });
  },
};
