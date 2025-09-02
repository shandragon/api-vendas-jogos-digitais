const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para registrar um novo usuário
// POST /auth/register
router.post('/register', authController.register);

// Rota para login de usuário
// POST /auth/login
router.post('/login', authController.login);

router.put('/change-password', [authMiddleware], authController.changePassword);

module.exports = router;
