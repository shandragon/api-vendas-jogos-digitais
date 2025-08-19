const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/EmpresaController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Todas as rotas são protegidas
router.use(authMiddleware);

router.get('/', empresaController.index);
router.get('/:id', empresaController.show);
router.post('/', [adminMiddleware], empresaController.create);
router.put('/:id', [adminMiddleware], empresaController.update);
router.delete('/:id', [adminMiddleware], empresaController.delete);

module.exports = router;