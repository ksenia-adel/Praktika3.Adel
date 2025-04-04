'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      // many-to-many: where one author can have many books, and one book can have many authors
      Author.belongsToMany(models.Book, {
        through: {
          model: 'book_authors',
          unique: false // prevent unique constraint errors
        },
        foreignKey: 'authorId',
        otherKey: 'bookId',
        timestamps: false // disable timestamps
      });
    }
  }

  Author.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Author',
    tableName: 'authors',
    schema: 'books',
    timestamps: false // disable createdAt/updatedAt for this table
  });

  return Author;
};
