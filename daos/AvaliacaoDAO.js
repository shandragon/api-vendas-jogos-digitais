const dbService = require('../services/DatabaseService');
const avaliacao = require('../models/Avaliacao');

class AvaliacaoDAO {
    async findById(id) {
        const sql = 'SELECT * FROM avaliacoes WHERE id = ?';
        const row = await dbService.get(sql, [id]);
        return row ? new avaliacao(row.id, row.fk_jogo, row.fk_usuario, row.nota, row.comentario) : null;
    }

    async findByUserAndGame(fkUsuario, fkJogo) {
        const sql = 'SELECT * FROM avaliacoes WHERE fk_usuario = ? AND fk_jogo = ?';
        const row = await dbService.get(sql, [fkUsuario, fkJogo]);
        return row ? new avaliacao(row.id, row.fk_jogo, row.fk_usuario, row.nota, row.comentario) : null;
    }

    async findByGame(fkJogo) {
        const sql = 'SELECT * FROM avaliacoes WHERE fk_jogo = ?';
        const rows = await dbService.all(sql, [fkJogo]);
        return rows.map(row => new avaliacao(row.id, row.fk_jogo, row.fk_usuario, row.nota, row.comentario));
    }

    async findByUser(fkUsuario) {
        const sql = 'SELECT * FROM avaliacoes WHERE fk_usuario = ?';
        const rows = await dbService.all(sql, [fkUsuario]);
        return rows.map(row => new avaliacao(row.id, row.fk_jogo, row.fk_usuario, row.nota, row.comentario));
    }

    async create(fkUsuario, fkJogo, nota, comentario) {
        const sql = 'INSERT INTO avaliacoes (fk_usuario, fk_jogo, nota, comentario) VALUES (?, ?, ?, ?)';
        const params = [fkUsuario, fkJogo, nota, comentario];
        const result = await dbService.run(sql, params);
        return new avaliacao(result.lastID, fkJogo, fkUsuario, nota, comentario);
    }

    async update(id, nota, comentario) {
        const sql = `UPDATE avaliacoes SET nota = ?, comentario = ? WHERE id = ?`;
        const result = await dbService.run(sql, [nota, comentario, id]);
        return { changes: result.changes };
    }

    async delete(id) {
        const sql = 'DELETE FROM avaliacoes WHERE id = ?';
        const result = await dbService.run(sql, [id]);
        return { changes: result.changes };
    }
}

module.exports = AvaliacaoDAO;