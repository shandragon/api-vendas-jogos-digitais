const dbService = require('../services/DatabaseService');

class PerfilDAO {
    async get(id) {
        const sql = 'SELECT * FROM perfis WHERE id = ?';
        const row = await dbService.get(sql, [id]);
        return row;
    }

    async getByName(nome) {
        const sql = 'SELECT * FROM perfis WHERE nome = ?';
        const row = await dbService.get(sql, [nome]);
        return row;
    }

    async all() {
        const sql = 'SELECT * FROM perfis';
        const rows = await dbService.all(sql);
        return rows;
    }

    async create(perfil) {
        const sql = 'INSERT INTO perfis (nome) VALUES (?)';
        const params = [perfil.nome];
        const result = await dbService.run(sql, params);
        return { id: result.lastID, ...perfil };
    }

    async update(id, perfil) {
        const sql = 'UPDATE perfis SET nome = ? WHERE id = ?';
        const params = [perfil.nome, id];
        const result = await dbService.run(sql, params);
        return { changes: result.changes };
    }

    async delete(id) {
        const sql = 'DELETE FROM perfis WHERE id = ?';
        const result = await dbService.run(sql, [id]);
        return { changes: result.changes };
    }
}

module.exports = new PerfilDAO();
