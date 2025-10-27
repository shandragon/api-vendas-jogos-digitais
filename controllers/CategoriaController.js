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



    async show(req, res) {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).json({ error: "ID da categoria é obrigatória." });
            }
            const categoria = await CategoriaDAO.findById(id);
            if (!categoria) {
                return res.status(204).json({ error: "Categoria não encontrada." });
            }
            res.json(categoria);
        } catch (error) {
            return res.status(500).json({ error: error.message, message: 'Erro ao buscar categoria.' });
        }
    }
}

module.exports = new CategoriaController;