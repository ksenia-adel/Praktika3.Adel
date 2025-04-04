'use strict';

module.exports = (sequelize, DataTypes) => {
  // join table for many-to-many relation between Books and Categories
  const BookCategory = sequelize.define('BookCategory', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'book_categories',
    schema: 'books',
    timestamps: false // no timestamps needed for join table
  });

  return BookCategory;
};
