const { body } = require('express-validator');

exports.loginValidator = [
  body('username', 'Username is required').notEmpty(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

exports.createUserValidator = [
  body('username', 'Username is required').notEmpty(),
  body('email', 'Valid email is required').isEmail(),
  body('password', 'Password is required').notEmpty(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];
