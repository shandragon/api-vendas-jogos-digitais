const dbService = require('../services/DatabaseService');
const Jogo = require("../models/Jogo");

class JogoDAO {
    async all(categoria) {
        let query = "SELECT * FROM jogos";

        // Verificando se foi passado um parâmetro de busca
        if (categoria) {
            query += " WHERE categoria LIKE '%" + categoria + "%'";
        }
        const rows = await dbService.all(query);
        if (rows == undefined) return [];
        return rows.map(row => new Jogo(row.id, row.nome, row.categoria, row.ano, row.fk_empresa));
    }

    async findById(id) {
        const query = "SELECT * FROM jogos WHERE id = ?";
        const row = await dbService.get(query, [id]);
        if (!row) return null;
        return new Jogo(row.id, row.nome, row.categoria, row.ano, row.fk_empresa);
    }

    async create(jogo) {
        const query = "INSERT INTO jogos (nome, descricao, ano, preco, fk_empresa, fk_categoria) VALUES (?, ?, ?, ?, ?, ?)";
        const params = [jogo.nome, jogo.descricao, jogo.ano, jogo.preco, jogo.fkEmpresa, jogo.fkCategoria];
        const result = await dbService.run(query, params);
        jogo.id = result.lastID; // Atribuindo o ID gerado pelo banco de dados
        return jogo;
    }

    async update(id, nome, categoria, ano) {
        const query = "UPDATE jogos set nome = ?, categoria = ?, ano = ? where id = ?";
        db.run(query, [nome, categoria, ano, id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }

    async delete(id) {
        const query = "DELETE FROM jogos WHERE id = ?";
        db.run(query, [id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }
}

module.exports = new JogoDAO();