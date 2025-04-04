'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // each comment belongs to one user and one book
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }

  Comment.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    schema: 'books',
    timestamps: false // createdAt/updatedAt handled via migration
  });

  return Comment;
};
