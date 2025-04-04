'use strict';

module.exports = (sequelize, DataTypes) => {
  // join table for many-to-many relationship between Books and Authors
  const BookAuthor = sequelize.define('BookAuthor', {}, {
    tableName: 'book_authors',
    schema: 'books',
    timestamps: false // no timestamps needed
  });

  return BookAuthor;
};
