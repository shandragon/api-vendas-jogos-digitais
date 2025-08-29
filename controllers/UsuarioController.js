const UsuarioDAO = require('../daos/UsuarioDAO');
const PerfilDAO = require('../daos/PerfilDAO');
const JogoDAO = require('../daos/JogoDAO');

class UsuarioController {
    index(req, res) {
        UsuarioDAO.all((err, usuarios) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(usuarios);
        });
    }

    async show(req, res) {
        try {
            const id = req.params.id;
            const usuario = await UsuarioDAO.get(id);
            if (!usuario) {
                return res.status(204).json({ error: "Usuário não encontrada." });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Erro ao buscar usuário.' });
        }
    }

    async getGame(req, res) {
        try {
            const usuarioId = req.user.id;
            const jogos = await JogoDAO.findByUser(usuarioId);
            if (!jogos) {
                return res.status(204).json({ error: "Usuário sem jogos." });
            }
            res.json(jogos);
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Erro ao buscar jogos do usuário.' });
        }
    }

    async createProfile(req, res) {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ message: 'O nome do perfil é obrigatório.' });
        }
        try {
            const existingProfile = await PerfilDAO.getByName(nome);
            if (existingProfile) {
                return res.status(409).json({ message: 'Este perfil já existe.' });
            }

            const newProfile = await PerfilDAO.create({ nome });
            res.status(201).json({ message: 'Perfil criado com sucesso!', profileId: newProfile.id });
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor.', error: error.message });
        }
    }

    async getAllProfiles(req, res) {
        try {
            const profiles = await PerfilDAO.all();
            res.json(profiles);
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor.', error: error.message });
        }
    }

    create(req, res) {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) return res.status(400).json({ error: "Campos nome, email e senha são obrigatórios" });

        const usuario = { nome, email, senha };
        UsuarioDAO.adicionar(usuario);
        res.status(201).json({ message: "Usuário criado com sucesso." });
    }

    update(req, res) {
        const { nome, email, senha } = req.body;
        const id = req.params.id;

        if (!nome || !email || !senha) return res.status(400).json({ error: "Campos nome, email e senha são obrigatórios" });

        const usuario = { id, nome, email, senha };
        UsuarioDAO.adicionar(usuario);
        res.json({ message: "Usuário atualizado com sucesso." });
    }

    delete(req, res) {
        const id = req.params.id;

        UsuarioDAO.get(id, (err, usuario) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!usuario) return res.status(404).json({ error: "Usuário não encontrado." });

            UsuarioDAO.adicionar({ id });
            res.json({ message: "Usuário removido com sucesso." });
        });
    }
}

module.exports = new UsuarioController();
