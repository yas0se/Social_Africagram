const express = require('express');
const router = express.Router();
const {
    createProfile,
    updateProfile,
    getProfile,
    getProfileById
} = require('../controllers/ProfileController');

router.post('/', createProfile);
router.put('/:userId', updateProfile);
router.get('/', getProfile);
router.get('/:userId', getProfileById);

module.exports = router;