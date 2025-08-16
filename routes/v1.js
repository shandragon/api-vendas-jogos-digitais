const express = require('express');
const router = express.Router();

const JogoController = require('../controllers/JogoController');
const EmpresaController = require('../controllers/EmpresaController');

router.get('/', (req, res) => res.send('API Version 1.0.0 on-line!'));

router.get('/empresas', EmpresaController.index);
router.get('/empresas/:id', EmpresaController.show);
router.post('/empresas', EmpresaController.create);
router.put('/empresas/:id', EmpresaController.update);
router.delete('/empresas/:id', EmpresaController.delete);

router.get('/jogos', JogoController.index);
router.get('/jogos/:id', JogoController.show);
router.post('/jogos', JogoController.create);
router.put('/jogos/:id', JogoController.update);
router.delete('/jogos/:id', JogoController.delete);

module.exports = router;