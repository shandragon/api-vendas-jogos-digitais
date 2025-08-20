const EmpresaDAO = require('../daos/EmpresaDAO');

class EmpresaController {
    async index(req, res) {
        try {
            const empresas = await EmpresaDAO.findAll(req.query.nome);
            if (empresas.length === 0) {
                return res.status(204).json();
            }
            res.json(empresas);
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Erro ao buscar empresas.' });
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id;
            const empresa = await EmpresaDAO.findById(id);
            if (!empresa) {
                return res.status(204).json({ error: "Empresa não encontrada." });
            }
            res.json(empresa);
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Erro ao buscar empresa.' });
        }
    }

    async create(req, res) {
        try {
            const { nome } = req.body;
            if (!nome) {
                return res.status(400).json({ error: "Campo nome é obrigatório." });
            }
            const empresa = await EmpresaDAO.create(nome);
            res.status(201).json(empresa);
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Erro ao criar empresa.' });
        }
    }

    async update(req, res) {
        try {
            const { nome } = req.body;
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "ID da empresa é obrigatório." });
            }
            if (!nome) {
                return res.status(400).json({ error: "Campo nome é obrigatório." });
            }
            const empresa = await EmpresaDAO.update(id, nome);
            res.status(200).json(empresa);
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Erro ao atualizar empresa.' });
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "ID da empresa é obrigatório." });
            }

            const empresa = await EmpresaDAO.delete(id);
            res.status(200).json('Empresa removida com sucesso.');
        } catch (error) {
            res.status(500).json({ error: error.message, message: 'Erro ao deletar empresa.' });
        }
    }
}

module.exports = new EmpresaController;