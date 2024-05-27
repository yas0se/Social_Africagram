const express = require('express');
const router = express.Router();
const { userLogin, userRegister, adminLogin, adminRegister } = require('../controllers/AuthController');

router.post('/user/login', userLogin);
router.post('/user/register', userRegister);
router.post('/admin/login', adminLogin);
router.post('/logout', logout);

module.exports = router;