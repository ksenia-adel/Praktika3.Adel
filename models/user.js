'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // one user can have many comments
      User.hasMany(models.Comment, { foreignKey: 'userId' });

      // one user can have many activity logs
      User.hasMany(models.ActivityLog, { foreignKey: 'userId' });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // ensures valid email format
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('User', 'Admin'),
      allowNull: false // role must be explicitly provided
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    schema: 'books',
    timestamps: false 
  });

  return User;
};
