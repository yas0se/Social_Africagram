const express = require('express');
const router = express.Router();
const { getStatistics } = require('../controllers/StatisticsController');

router.get('/', getStatistics);

module.exports = router;