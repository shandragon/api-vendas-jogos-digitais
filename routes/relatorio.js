const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/RelatorioController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/jogos-mais-vendidos', relatorioController.jogoMaisVendido);

module.exports = router;
