const express = require('express');
const router = express.Router();

// Rotas
const authRoutes = require('./auth');
const empresaRoutes = require('./empresa');
const userRoutes = require('./usuario');
const profileRoutes = require('./profile');
const jogoRoutes = require('./jogo');

router.get('/', (req, res) => res.send('API Version 1.0.0 on-line!'));

router.use('/auth', authRoutes);
router.use('/empresas', empresaRoutes);
router.use('/usuarios', userRoutes);
router.use('/profiles', profileRoutes);
router.use('/jogos', jogoRoutes);

module.exports = router;