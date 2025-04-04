const verifySignUp = require("../middleware/verifySignup");
const controller = require("../controllers/authController");
const validator = require("../config/validationbody");

module.exports = (app) => {
  // set CORS headers for all requests
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // POST /api/auth/signup
  app.post(
    "/api/auth/signup",
    [
      validator.createUserValidator,              // validate request body
      verifySignUp.checkDuplicateUsernameOrEmail  // check for existing username/email
    ],
    controller.signup
  );

  // POST /api/auth/signin
  app.post("/api/auth/signin", validator.loginValidator, controller.signin);
};
