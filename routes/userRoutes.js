const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const userController = require('../controllers/userController');

// get all users (admin only)
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], userController.getAllUsers);

// delete a user by ID (admin only)
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser);

module.exports = router;
