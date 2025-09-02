const ListaDesejoDAO = require('../daos/ListaDesejoDAO');

class ListaDesejoController {
    async add(req, res) {
        try {
            const usuarioId = req.user.id;
            const { jogoId } = req.body;
            if (!jogoId) {
                return res.status(400).json({ error: 'ID do jogo é obrigatório.' });
            }

            const jaExiste = await ListaDesejoDAO.exists(usuarioId, jogoId);
            if (jaExiste) {
                return res.status(409).json({ error: 'Jogo já está na lista de desejo.' });
            }
            const resultado = await ListaDesejoDAO.add(usuarioId, jogoId);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
            const usuarioId = req.user.id;
            const lista = await ListaDesejoDAO.getByUser(usuarioId);
            return res.status(200).json(lista);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async remove(req, res) {
        try {
            const usuarioId = req.user.id;
            const { jogoId } = req.body;
            if (!jogoId) {
                return res.status(400).json({ error: 'ID do jogo é obrigatório.' });
            }

            const lista = await ListaDesejoDAO.findByGameAndUser(usuarioId, jogoId);
            if (!lista) {
                return res.status(409).json({ error: 'Jogo não está na lista de desejo.' });
            }
            await ListaDesejoDAO.remove(lista.id);
            return res.status(200).send({ message: 'Jogo removido da lista de desejo com sucesso.' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ListaDesejoController();