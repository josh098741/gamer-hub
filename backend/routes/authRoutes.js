const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout
} = require('../controllers/authController');

const validateRegister = require('../middleware/validation/validateRegister');
const validateLogin = require('../middleware/validation/validateLogin');

// Fixed route paths - removed /api prefix since it's handled in server.js
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

module.exports = router;