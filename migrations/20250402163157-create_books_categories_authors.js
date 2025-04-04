// https://sequelize.org/docs/v6/other-topics/migrations/
// if there is no schema "books" in your database, before migration remove <<"schema": "books">> from config/config.json

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // create schema if it doesn't exist
    await queryInterface.createSchema('books');

    // USERS table
    await queryInterface.createTable({ tableName: 'users', schema: 'books' }, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // CATEGORIES table
    await queryInterface.createTable({ tableName: 'categories', schema: 'books' }, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // AUTHORS table
    await queryInterface.createTable({ tableName: 'authors', schema: 'books' }, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    // BOOKS table
    await queryInterface.createTable({ tableName: 'books', schema: 'books' }, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publicationYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    // BOOK_AUTHORS table (many-to-many)
    await queryInterface.createTable({ tableName: 'book_authors', schema: 'books' }, {
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'books', schema: 'books' },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'authors', schema: 'books' },
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });

    // BOOK_CATEGORIES table (many-to-many)
    await queryInterface.createTable({ tableName: 'book_categories', schema: 'books' }, {
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'books', schema: 'books' },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'categories', schema: 'books' },
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });

    // COMMENTS table
    await queryInterface.createTable({ tableName: 'comments', schema: 'books' }, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'books', schema: 'books' },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'users', schema: 'books' },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // ACTIVITY_LOGS table
    await queryInterface.createTable({ tableName: 'activity_logs', schema: 'books' }, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'users', schema: 'books' },
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      details: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // order matters
    await queryInterface.dropTable({ tableName: 'activity_logs', schema: 'books' });
    await queryInterface.dropTable({ tableName: 'comments', schema: 'books' });
    await queryInterface.dropTable({ tableName: 'book_categories', schema: 'books' });
    await queryInterface.dropTable({ tableName: 'book_authors', schema: 'books' });
    await queryInterface.dropTable({ tableName: 'books', schema: 'books' });
    await queryInterface.dropTable({ tableName: 'authors', schema: 'books' });
    await queryInterface.dropTable({ tableName: 'categories', schema: 'books' });
    await queryInterface.dropTable({ tableName: 'users', schema: 'books' });
    await queryInterface.dropSchema('books');
  }
};
