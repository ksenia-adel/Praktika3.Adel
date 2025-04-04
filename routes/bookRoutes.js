const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const bookController = require('../controllers/bookController');

// Admin-only routes
router.post('/', authJwt.verifyToken, authJwt.isAdmin, bookController.createBook);   // create book
router.put('/:id', authJwt.verifyToken, authJwt.isAdmin, bookController.updateBook); // update book
router.delete('/:id', authJwt.verifyToken, authJwt.isAdmin, bookController.deleteBook); // delete book

// accessible by all authenticated users
router.get('/', authJwt.verifyToken, bookController.getAllBooks); // get all books

module.exports = router;
