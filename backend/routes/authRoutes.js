const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout
} = require('../controllers/authController');

const validateRegister = require('../middleware/validation/validateRegister');
const validateLogin = require('../middleware/validation/validateLogin');

//POST /api/auth/register
router.post('/api/auth/register',validateRegister,register);

//POST /api/auth/login
router.post('/api/auth/login',validateLogin,login);

//POST /api/auth/logout
router.post('/api/auth/logout',logout)

module.exports = router