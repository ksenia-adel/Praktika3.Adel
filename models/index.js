const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Book = require('./book')(sequelize, DataTypes);
db.Author = require('./author')(sequelize, DataTypes);
db.Category = require('./category')(sequelize, DataTypes);
db.Comment = require('./comment')(sequelize, DataTypes);
db.ActivityLog = require('./activity_log')(sequelize, DataTypes);
db.BookAuthor = require('./book_author')(sequelize, DataTypes);
db.BookCategory = require('./book_categories')(sequelize, DataTypes);

Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
