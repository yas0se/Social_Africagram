const express = require('express');
const router = express.Router();
const { getNewsfeed } = require('../controllers/NewsFeedController');

router.get('/:step', getNewsfeed);

module.exports = router;