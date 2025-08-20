const express = require('express');
const router = express.Router();
const jogoController = require('../controllers/JogoController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', jogoController.index);
router.get('/:id', jogoController.show);
router.post('/', [adminMiddleware], jogoController.create);

/*
router.put('/:id', JogoController.update);
router.delete('/:id', JogoController.delete);
*/

module.exports = router;
