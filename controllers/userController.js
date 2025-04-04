const models = require("../models");
const asyncHandler = require('express-async-handler');

const User = models.User;

// get all users (hide passwords)
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] } 
  });

  return res.status(200).json({ users });
});

// delete user by ID
exports.deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.destroy(); // delete user forever
  res.status(200).json({ message: "User deleted successfully" });
});
