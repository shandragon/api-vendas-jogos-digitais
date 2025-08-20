const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsuarioController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', userController.getAllProfiles);
router.post('/', [adminMiddleware], userController.createProfile);

module.exports = router;