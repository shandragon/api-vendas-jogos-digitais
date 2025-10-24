const express = require('express');
const router = express.Router();

// Rotas
router.get('/', (req, res) => res.send('API Version 1.0.0 on-line!'));

router.use('/auth', require('./auth'));
router.use('/empresas', require('./empresa'));
router.use('/usuarios', require('./usuario'));
router.use('/profiles', require('./profile'));
router.use('/jogos', require('./jogo'));
router.use('/categorias', require('./categoria'));
router.use('/carrinho', require('./carrinho'));
router.use('/vendas', require('./venda'));
router.use('/avaliacoes', require('./avaliacao'));
router.use('/lista-desejo', require('./listaDesejo'));
router.use('/relatorios', require('./relatorio'));

// Rota pública
router.use('/public', require('./public'));

module.exports = router;