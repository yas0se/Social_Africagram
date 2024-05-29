const express = require('express');
const router = express.Router();
const {
    createPostLike,
    deletePostLike,
    getPostLike
} = require('../controllers/LikesController');

router.post('/:postId', createPostLike);
router.delete('/:postId', deletePostLike);
router.get('/:postId', getPostLike);

module.exports = router;