const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriaController');
const authMiddleware = require('../middleware/authMiddleware');

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', categoriaController.index);
router.get('/:id', categoriaController.show);


module.exports = router;
