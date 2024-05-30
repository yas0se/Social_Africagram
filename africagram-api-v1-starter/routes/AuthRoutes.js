const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/AuthController');
const comparePassword =  require("../utils/comparePasswords")
const hashPassword = require("../utils/hashPassword")
const validateInputs = require("../errors/bad-request");
const authenticateToken = require('../errors/unauthenticated');
const {startSession} = require('../utils/jwt');
router.post('/login', comparePassword, startSession, login );
router.post('/register',validateInputs,hashPassword, register);
router.get('/logout', authenticateToken,logout);

module.exports = router;