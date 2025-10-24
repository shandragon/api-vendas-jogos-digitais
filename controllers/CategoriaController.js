const CategoriaDAO = require('../daos/CategoriaDAO');

class CategoriaController {
    async index(req, res) {
        try {
            const categorias = await CategoriaDAO.all(req.query.categoria);
            if (categorias.length === 0) return res.status(204).json();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Erro ao buscar categorias.' });
        }
    }
}

module.exports = new CategoriaController;