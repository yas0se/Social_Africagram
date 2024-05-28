const express = require('express');
const router = express.Router();
const {
    createProfile,
    updateProfile,
    getProfile,
    getProfileById
} = require('../controllers/ProfileController');

router.post('/', createProfile);
router.put('/', updateProfile);
router.get('/', getProfile);
// router.get('/:id', getProfileById);

module.exports = router;