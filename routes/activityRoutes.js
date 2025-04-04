const express = require('express');
const router = express.Router();

const authJwt = require('../middleware/authJwt');
const activityController = require('../controllers/activityController');

// GET /api/logs - only accessible by role == Admin 
router.get(
  '/', 
  authJwt.verifyToken,   // check if user is authenticated
  authJwt.isAdmin,       // check if user has Admin role
  activityController.getLogs
);

module.exports = router;
