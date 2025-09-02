const express = require('express');
const router = express.Router();
const listaDesejoController = require('../controllers/ListaDesejoController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', listaDesejoController.show);
router.post('/', listaDesejoController.add);
router.delete('/', listaDesejoController.remove);

module.exports = router;
