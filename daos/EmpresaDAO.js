const db = require("../config/Database").db;
const dbService = require('../services/DatabaseService');

const Empresa = require("../models/Empresa");

class EmpresaDAO {
    async findAll(nome) {
        let query = "SELECT * FROM empresas";

        // Verificando se foi passado um parâmetro de busca
        if (nome) {
            query += " WHERE nome LIKE '%" + nome + "%'";
        }

        return await dbService.all(query);
    }

    async findById(id) {
        const query = "SELECT * FROM empresas WHERE id = ?";
        return await dbService.get(query, [id]);
    }

    async create(nome) {
        try {
            const query = "INSERT INTO empresas (nome) VALUES (?)";
            const result = await dbService.run(query, [nome]);
            return new Empresa(result.lastID, nome);
        } catch (error) {
            throw new Error("Erro ao criar empresa: " + error.message);
        }
    }

    async update(id, nome) {
        try {
            const query = "UPDATE empresas set nome = ? where id = ?";
            const result = await dbService.run(query, [nome, id]);
            return { id, nome };
        } catch (error) {
            throw new Error("Erro ao atualizar empresa: " + error.message);
        }
    }

    async delete(id) {
        try {
            const query = "DELETE FROM empresas WHERE id = ?";
            const result = await dbService.run(query, [id]);
            return { id };
        } catch (error) {
            throw new Error("Erro ao deletar empresa: " + error.message);
        }
    }
}

module.exports = new EmpresaDAO();