const express = require('express');
const router = express.Router();
const { getUserTraffic } = require('../controllers/StatisticsController');

router.get('/', getUserTraffic);

module.exports = router;