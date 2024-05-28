const express = require('express');
const router = express.Router();
const {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPostById
} = require('../controllers/PostController');

router.post('/', createPost);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);
router.get('/',getPost)
router.get('/:postId', getPostById);

module.exports = router;