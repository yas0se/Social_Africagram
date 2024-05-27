const express = require('express');
const router = express.Router();
const {
    createPostLike,
    deletePostLike,
    getPostLike
} = require('../controllers/LikesController');

router.post('/:postId/likes', createPostLike);
router.delete('/:postId/likes/:userId', deletePostLike);
router.get('/:postId/likes', getPostLike);

module.exports = router;