const models = require("../models");
const asyncHandler = require("express-async-handler");

const ActivityLog = models.ActivityLog;
const User = models.User;

// fetch all user activity logs
exports.getLogs = asyncHandler(async (req, res) => {
  const logs = await ActivityLog.findAll({
    include: [{ model: User, attributes: ['username'] }], // show username
    order: [['createdAt', 'DESC']] // latest first
  });

  res.status(200).json(logs);
});
