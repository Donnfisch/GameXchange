const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = function (app) {
  app.post("/api/auth", (request, response) => {
    passport.authenticate(
      "local", {
        session: false,
      },
      (error, user, info) => {
        if (error || !user) {
          return response.status(403).json({
            message: "Unable to Authrize",
            user,
            error,
            info,
          });
        }
        request.login(user, {
          session: false,
        }, (error) => {
          if (error) {
            response.send(error);
          }
          const sanitizedUser = {
            id: user.id,
            username: user.username,
            email: user.email,
          };

          // generate a signed son web token with the contents of user object and return it in the response
          const token = jwt.sign(sanitizedUser, "your_jwt_secret");
          response.json({
            user: sanitizedUser,
            token,
          });
        });
      }
    )(request, response);
  });
};
