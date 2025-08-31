const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/AvaliacaoController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas são protegidas
router.use(authMiddleware);

router.post('/', avaliacaoController.create);
router.put('/', avaliacaoController.update);
router.get('/', avaliacaoController.index);
router.get('/media/:jogoId', avaliacaoController.mediaAvaliacoes);

module.exports = router;