const express = require('express');
const router = express.Router();
const jogoController = require('../controllers/JogoController');

router.get('/jogos', jogoController.exhibition);

module.exports = router;
