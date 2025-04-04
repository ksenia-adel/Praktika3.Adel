'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // many-to-many relation: Book <-> Author
      Book.belongsToMany(models.Author, {
        through: {
          model: 'book_authors',
          unique: false
        },
        foreignKey: 'bookId',
        otherKey: 'authorId',
        timestamps: false
      });

      // many-to-many relation: Book <-> Category
      Book.belongsToMany(models.Category, {
        through: {
          model: 'book_categories',
          unique: false
        },
        foreignKey: 'bookId',
        otherKey: 'categoryId',
        timestamps: false
      });

      // one-to-many relation: Book -> Comment
      Book.hasMany(models.Comment, {
        foreignKey: 'bookId'
      });
    }
  }

  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    schema: 'books',
    timestamps: false // no needed
  });

  return Book;
};
