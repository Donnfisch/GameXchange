const logger = require("morgan");
const express = require("express");
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const passport = require('passport');
// const passport = require('./routes/api/passport');
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
  app.use(express.static("client/build"));
}

// ? For now, I've given up trying to port this logic into another file. passport is an object with
// ? methods on it. Invoking those methods elsewhere doesn't make them persist on the object
// ? somehow (although everything i've put to the console seemds to indicate otherwise).
// ? It's fugly, but it works. So I guess let's just leave it here ¯\_(ツ)_/¯

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    ((username, password, done) => {
      models.user.findOne({
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
              return done(null, false, { message: "Incorrect password." });
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

// // console.log("===============================================");
// // console.log("PASSPORT TYPE: " + typeof (passport));
// // console.log("PASSPORT = " + JSON.stringify(passport))
// // console.log("PASSPORT.USE = " + passport.use)
// // console.log("REQUIRING API/PASSPORT TYPE: " + typeof require('./routes/api/passport'));
// // console.log("REQUIRE API/PASSPORT = " + JSON.stringify(require("./routes/api/passport")));
// // console.log("REQUIRE OG  PASSPORT = " + JSON.stringify(require("passport")));
// // console.log("===============================================");
// // console.log("APP: " + typeof app)
// // console.log("REQUIRING AuthRoutes: " + typeof require("./routes/authRoutes"));
// // console.log("===============================================");

// Routes

// ! Using
// app.use(routes);
// ! here above the other route declarations will break the shit. Postman gives:

// <!DOCTYPE html>
// <html lang="en">
//     <head>
//         <meta charset="utf-8">
//         <title>Error</title>
//     </head>
//     <body>
//         <pre>Error: ENOENT: no such file or directory, stat &#39;/home/shane/Desktop/gamexchange/client/build/index.html&#39;</pre>
//     </body>
// </html>

const secureRoute = require("./routes/api");
require("./routes/authRoutes")(app);
app.use("/api", passport.authenticate("jwt", { session: false }), secureRoute);

// ? On the other hand, using it down here
app.use(routes);
// ? Doesn't seem to bother anything. Question is... WTF

// Initialize Database
models.sequelize.sync({ force: false }).then(() => {
  // Start the Server
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on PORT ${PORT}`);
  });
});
