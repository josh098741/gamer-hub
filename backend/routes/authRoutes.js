const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout
} = require('../controllers/authController');

const validateRegister = require('../middleware/validation/validateRegister');
const validateLogin = require('../middleware/validation/validateLogin');

router.post('/api/auth/register',validateRegister,register);

router.post('/api/auth/login',validateLogin,login);

router.post('/api/auth/logout',logout)

module.exports = router