const express = require('express');
const router = express.Router();
const {
    createPost,
    updatePost,
    deletePost,
    createPostById
} = require('../controllers/PostController');

router.post('/', createPost);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);
router.get('/:postId', createPostById);

module.exports = router;