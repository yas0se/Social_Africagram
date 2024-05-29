const express = require('express');
const router = express.Router();
const {
    followUser,
    
} = require('../controllers/FollowerController');

router.post('/:id', followUser);
module.exports = router;