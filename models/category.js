'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // many-to-many relation: Category <-> Book
      Category.belongsToMany(models.Book, {
        through: {
          model: 'book_categories',
          unique: false
        },
        foreignKey: 'categoryId',
        otherKey: 'bookId',
        timestamps: false
      });
    }
  }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    schema: 'books',
    timestamps: false 
  });

  return Category;
};
