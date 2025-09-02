const express = require('express');
const router = express.Router();

// Rotas
const authRoutes = require('./auth');
const empresaRoutes = require('./empresa');
const userRoutes = require('./usuario');
const profileRoutes = require('./profile');
const jogoRoutes = require('./jogo');
const carrinhoRoutes = require('./carrinho');
const vendaRoutes = require('./venda');
const avaliacaoRoutes = require('./avaliacao');
const listaDesejoRoutes = require('./listaDesejo');

router.get('/', (req, res) => res.send('API Version 1.0.0 on-line!'));

router.use('/auth', authRoutes);
router.use('/empresas', empresaRoutes);
router.use('/usuarios', userRoutes);
router.use('/profiles', profileRoutes);
router.use('/jogos', jogoRoutes);
router.use('/carrinho', carrinhoRoutes);
router.use('/vendas', vendaRoutes);
router.use('/avaliacoes', avaliacaoRoutes);
router.use('/lista-desejo', listaDesejoRoutes);

module.exports = router;