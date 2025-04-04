'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    static associate(models) {
      // each log belongs only to one user
      ActivityLog.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  ActivityLog.init({
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ActivityLog',
    tableName: 'activity_logs',
    schema: 'books',
    timestamps: true
  });

  return ActivityLog;
};
