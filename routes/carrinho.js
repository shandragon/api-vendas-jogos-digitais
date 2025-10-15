const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/CarrinhoController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', carrinhoController.all);
router.get('/ativo', carrinhoController.show);
router.post('/add', carrinhoController.add);
router.delete('/:gameId', carrinhoController.removeFromCart);

module.exports = router;