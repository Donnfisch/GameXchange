const router = require("express").Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require('../../models/user');
const authController = require("../../controllers/authController");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    ((username, password, done) => {
      User.findOne({
        where: {
          username,
        },
      })
        .then(
          (user) => {
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validatePassword(password)) {
              return done(null, false, { message: "Incorrect email or password." });
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


// router.get('/login', (req, res, next) => {
//   passport.authenticate('local', (err, user) => {
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
// 	res.send('Poop');
// 	passport.authenticate('local', (req, res) => {
// 		res.json({ id: req.user.id, username: req.user.username });
// 	});
// } 

router.route('/login')
  .post(authController.loginDammit)
  .get((req, res) => res.send({ message: "Fuck yourself" }));














module.exports = router;
