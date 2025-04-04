const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const commentController = require('../controllers/commentController');

// create a comment for a book (only authenticated users)
router.post('/:bookId', authJwt.verifyToken, commentController.createComment);

// get all comments for a book (only authenticated users)
router.get('/:bookId', authJwt.verifyToken, commentController.getCommentsByBook);

// delete a comment (only comment owner or admin)
router.delete('/:commentId', authJwt.verifyToken, commentController.deleteComment);

module.exports = router;
