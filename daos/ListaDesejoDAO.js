const ListaDesejo = require('../models/ListaDesejo');
const dbService = require('../services/DatabaseService');

class ListaDesejoDAO {
    async add(usuarioId, jogoId) {
        const query = 'INSERT INTO lista_desejos (fk_usuario, fk_jogo) VALUES (?, ?)';
        const params = [usuarioId, jogoId];
        const result = await dbService.run(query, params);
        const lista = new ListaDesejo(result.lastID, usuarioId, jogoId);
        return lista;
    }

    async getByUser(fkUsuario) {
        const query = `
            SELECT jogos.*
            FROM lista_desejos
            JOIN jogos ON lista_desejos.fk_jogo = jogos.id
            WHERE lista_desejos.fk_usuario = ?
        `;
        return await dbService.all(query, [fkUsuario]);;
    }

    async findByGameAndUser(usuarioId, jogoId) {
        const query = 'SELECT * FROM lista_desejos WHERE fk_usuario = ? AND fk_jogo = ?';
        const row = await dbService.get(query, [usuarioId, jogoId]);
        return row ? new ListaDesejo(row.id, row.fk_usuario, row.fk_jogo) : null;
    }

    async exists(usuarioId, jogoId) {
        const query = 'SELECT 1 FROM lista_desejos WHERE fk_usuario = ? AND fk_jogo = ? LIMIT 1';
        const exists = await dbService.get(query, [usuarioId, jogoId]);
        if (!exists) return false;
        return true;
    }

    async countByGame(jogoId) {
        const query = 'SELECT COUNT(*) as total FROM lista_desejos WHERE fk_jogo = ?';
        const total = await dbService.get(query, [jogoId]);
        return total;
    }

    async remove(id) {
        const query = 'DELETE FROM lista_desejos WHERE id = ?';
        const result = await dbService.run(query, [id]);
        return { changes: result.changes };
    }
}

module.exports = new ListaDesejoDAO();