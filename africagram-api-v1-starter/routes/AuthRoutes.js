const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/AuthController');
const comparePassword =  require("../utils/comparePasswords")
const hashPassword = require("../utils/hashPassword")
router.post('/login', comparePassword, userLogin);
router.post('/register',hashPassword, userRegister);
router.post('/logout', logout);

module.exports = router;