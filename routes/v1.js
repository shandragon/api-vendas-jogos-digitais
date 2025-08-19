const express = require('express');
const router = express.Router();

const JogoController = require('../controllers/JogoController');


// Rotas
const authRoutes = require('./auth');
const empresaRoutes = require('./empresa');

router.get('/', (req, res) => res.send('API Version 1.0.0 on-line!'));

router.get('/jogos', JogoController.index);
router.get('/jogos/:id', JogoController.show);
router.post('/jogos', JogoController.create);
router.put('/jogos/:id', JogoController.update);
router.delete('/jogos/:id', JogoController.delete);

router.use('/auth', authRoutes);
router.use('/empresas', empresaRoutes);

module.exports = router;