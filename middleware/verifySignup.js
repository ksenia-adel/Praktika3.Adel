const models = require("../models");

// check if username already exists
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: { username: req.body.username }
    });

    if (user) {
      return res.status(400).send({
        message: "Username is already in use!"
      });
    }

    next(); // continue to next if no duplicate
  } catch (err) {
    return res.status(500).send({
      message: "Error checking duplicates",
      error: err.message
    });
  }
};

module.exports = {
  checkDuplicateUsernameOrEmail
};
