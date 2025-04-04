const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const models = require("../models");
const User = models.User;

// user registration
exports.signup = async (req, res) => {
  // check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create a new user record in the database
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'User' // default role is 'User' if not provided
    });

    // if success
    res.status(201).send({ message: "User was registered successfully!" });

  } catch (err) {

    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    // find the user by username
    const user = await User.findOne({
      where: { username: req.body.username }
    });

    // if user not found
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // compare input password with the hashed password in the DB
    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    // if password is incorrect
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!"
      });
    }

    // generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.SECRET_ACCESS_TOKEN, // secret key
      {
        algorithm: 'HS256',
        expiresIn: 86400
      }
    );

    // send user info and access token
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
