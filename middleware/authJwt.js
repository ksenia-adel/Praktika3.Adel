const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require("../models");

// verify JWT token and extract userId
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization'); // token must be sent in the Authorization header
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    req.userId = decoded.userId; // attach userId to request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// check if the user role == Admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.userId);
    if (!user) return res.status(404).send({ message: "User not found!" });

    if (user.role.toLowerCase() === "admin") {
      next(); // allow access
    } else {
      return res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error verifying admin role." });
  }
};

module.exports = {
  verifyToken,
  isAdmin
};
