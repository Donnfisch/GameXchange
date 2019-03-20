
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

  // Login user
  login: (req, res) => {
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
          // generate a signed son web token with the contents of user object and return it in the response
          const token = jwt.sign(sanitizedUser, "your_jwt_secret");
          res.json({
            user: sanitizedUser,
            token,
          });
        });
      }
    )(req, res);
  },

};

// router.get('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user) => {
//     console.log('fart');
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, () => {
//       if (err) { return next(err); }
//       return res.redirect(`/users/${user.username}`);
//     });
//     return res.status(403);
//   })(req, res, next);
// });
// const auth = (req, res, next) => {
//   res.send('Poop');
//   passport.authenticate('local', (req, res) => {
//     res.json({ id: req.user.id, username: req.user.username });
//   });
// };

// app.post('/api/posts', verifyToken, (req, res) => {
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         messge: 'Post created...',
//         authData,
//       });
//     }
//   });
// });

// Verify Token
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers.authorization;
//   // check it bearer is undefined
//   if (typeof bearerHeader !== 'undefined') {
//     // Split at the space
//     const bearer = bearerHeader.split(' ');
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
// }
