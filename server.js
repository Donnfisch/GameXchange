const logger = require("morgan");
const express = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
// const jwt = require('jsonwebtoken');
const models = require("./models");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();


// Configure middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line no-console
  console.log("WTF!");
  app.use(express.static("client/build"));
}

passport.use(new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  function(username, password, cb) {
    models.user.findOne({
      where: {
        username: username
      }
    }).then(
      function(user) {
        if (!user || !user.validatePassword(password)) {
          return cb(null, false, {message: "Incorrect email or password."});
        }
        return cb(null, user, {message: "Logged In Successfully"});
      }
    ).catch(function(error) {
      cb(error);
      throw error;
    });
  }
));

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

// app.use(routes);


// Routes
let secureRoute = require("./routes/apiRoutes");
require("./routes/authRoutes")(app);
app.use("/api", passport.authenticate("jwt", { session: false }), secureRoute);
require("./routes/htmlRoutes")(app);


// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Welcome to the API',
//   });
// });

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

// app.post('/api/login', (req, res) => {
//   // Mock user
//   const user = {
//     id: 1,
//     username: 'shane',
//     email: 'test@example.com',
//   };

//   jwt.sign({ user }, 'secretkey', (err, token) => {
//     res.json({
//       token,
//     });
//   });
// });

// // Verify Token
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

models.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on PORT ${PORT}`);
    // console.log(passport.stack[0].route);
    console.log(models.user.findOne({ where: { username: 'JDoe' } }));
  });
});
