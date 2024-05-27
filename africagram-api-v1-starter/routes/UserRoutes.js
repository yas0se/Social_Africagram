const express = require('express');
const router = express.Router();
const {
    createUser,
    updateUser,
    getUser,
    getUserById
} = require('../controllers/UserController');

router.post('/', createUser);
router.put('/:userId', updateUser);
router.get('/', getUser);
router.get('/:userId', getUserById);

module.exports = router;