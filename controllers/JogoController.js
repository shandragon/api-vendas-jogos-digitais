const JogoDAO = require('../daos/JogoDAO');
const Jogo = require('../models/Jogo');

class JogoController {
    async index(req, res) {
        try {
            const jogos = await JogoDAO.all(req.query.categoria);
            if (jogos.length === 0) return res.status(204).json();
            res.json(jogos);
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Erro ao buscar jogos.' });
        }
    }

    async show(req, res) {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).json({ error: "ID do jogo é obrigatório." });
            }
            const jogo = await JogoDAO.findById(id);
            if (!jogo) {
                return res.status(204).json({ error: "Jogo não encontrado." });
            }
            res.json(jogo);
        } catch (error) {
            return res.status(500).json({ error: error.message, message: 'Erro ao buscar jogo.' });
        }
    }

    async create(req, res) {
        const jogo = Jogo.fromRequest(req.body);
        if (!jogo.nome && !jogo.preco && !jogo.fkCategoria && !jogo.ano && !jogo.fkEmpresa) return res.status(400).json({ error: "Campos nome, preço, ano, fkCategoria e fkEmpresa são obrigatórios" });

        try {
            const newJogo = await JogoDAO.create(jogo);
            res.status(201).json(newJogo);
        } catch (error) {
            return res.status(500).json({ error: error.message, message: 'Erro ao criar jogo.' });
        }
    }

    update(req, res) {
        const { nome, categoria, ano } = req.body;
        const id = req.params.id;

        JogoDAO.update(id, nome, categoria, ano, (err, jogo) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!jogo) return res.status(204).json({ error: "Jogo não encontrado" });
            res.json({ message: "Jogo editado com sucesso." });
        });
    }

    delete(req, res) {
        const id = req.params.id;

        JogoDAO.delete(id, (err, jogo) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!jogo) return res.status(204).json({ error: "Jogo não encontrado." });
            res.json({ message: "Jogo removido com sucesso." });
        });
    }
}

module.exports = new JogoController;