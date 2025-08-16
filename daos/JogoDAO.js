const db = require("../config/conexao").db;
const Jogo = require("../models/Jogo");

class JogoDAO {
    static findAll(categoria, callback) {
        let query = "SELECT * FROM jogos";

        // Verificando se foi passado um parâmetro de busca
        if (categoria) {
            query += " WHERE categoria LIKE '%" + categoria + "%'";
        }

        db.all(query, [], (err, rows) => {
            if (err){
                callback("not found", null);
            } else {
                if (rows == undefined) return callback(null, []);
                const jogos = rows.map(row => new Jogo(row.id, row.nome, row.categoria, row.ano, row.fk_empresa));
                callback(null, jogos);
            }
        });
    }

    static findById(id, callback) {
        const query = "SELECT * FROM jogos WHERE id = ?";
        db.get(query, [id], (err, row) => {
            if (err) return callback(err, null);
            if (!row) return callback(null, null);
            callback(null, new Jogo(row.id, row.nome, row.categoria, row.ano, row.fk_empresa));
        });
    }

    static create(nome, categoria, ano, fkEmpresa, callback) {
        const query = "INSERT INTO jogos (nome, categoria, ano, fk_empresa) VALUES (?, ?, ?, ?)";
        db.run(query, [nome, categoria, ano, fkEmpresa], function (err) {
            if (err) return callback(err, null);
            callback(null, new Jogo(this.lastID, nome, categoria, ano, fkEmpresa));
        });
    }

    static update(id, nome, categoria, ano, callback) {
        const query = "UPDATE jogos set nome = ?, categoria = ?, ano = ? where id = ?";
        db.run(query, [nome, categoria, ano, id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }

    static delete(id, callback) {
        const query = "DELETE FROM jogos WHERE id = ?";
        db.run(query, [id], function (err) {
            if (err) return callback(err);
            callback(null, this.changes > 0);
        });
    }
}

module.exports = JogoDAO;