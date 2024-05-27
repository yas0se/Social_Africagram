const express = require('express');
const router = express.Router();

const {
  createPostComment,
  deletePostComment,
  getPostComment,
  getPostCommentById
} = require('../controllers/CommentController');

// Create Post Comment
router.post('/:postId/comments', createPostComment);

// Delete Post Comment
router.delete('/:postId/comments/:commentId', deletePostComment);

// Get Post Comments
router.get('/:postId/comments', getPostComment);

// Get Post Comment by ID
router.get('/:postId/comments/:commentId', getPostCommentById);

module.exports = router;