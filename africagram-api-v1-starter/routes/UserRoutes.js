const express = require('express');
const router = express.Router();
const {
    createUser,
    updateUser,
    getUser,
    getUserById,
    deleteUser,
    makeAdmin
} = require('../controllers/UserController');
const hashPassword = require('../utils/hashPassword');

router.post('/', hashPassword ,createUser);
router.put('/:userId',hashPassword ,updateUser);
router.get('/', getUser);
router.get('/:userId', getUserById);
router.delete('/:userId',deleteUser);
router.put('/:userId',makeAdmin);

module.exports = router;