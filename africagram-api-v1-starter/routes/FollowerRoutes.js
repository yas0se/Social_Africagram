const express = require('express');
const router = express.Router();
const {
    createFollower,
    deleteFollower,
    getFollower,
    getFollowByIder
} = require('../controllers/FollowerController');

router.post('/:userId/followers', createFollower);
router.delete('/:userId/followers/:followerId', deleteFollower);
router.get('/:userId/followers', getFollower);
router.get('/:userId/followers/:followerId', getFollowByIder);

module.exports = router;