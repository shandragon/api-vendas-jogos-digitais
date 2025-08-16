const UsuarioDAO = require('../daos/UsuarioDao');

class UsuarioController {
    index(req, res) {
        UsuarioDAO.all((err, usuarios) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(usuarios);
        });
    }

    show(req, res) {
        const id = req.params.id;
        UsuarioDAO.get(id, (err, usuario) => {
            if (err) return res.status(500).json({ error: err.message });
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json('Usuário não encontrado.');
            }
        });
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
