const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// Rota para registrar um novo usuário
// POST /auth/register
router.post('/register', authController.register);

// Rota para login de usuário
// POST /auth/login
router.post('/login', authController.login);

module.exports = router;
