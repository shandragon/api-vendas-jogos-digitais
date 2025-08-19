const db = require('../config/Database').db;

class DatabaseService {
    /**
     * Executa uma query SQL que não retorna linhas (INSERT, UPDATE, DELETE).
     * @param {string} sql A query SQL.
     * @param {Array} params Os parâmetros para a query.
     * @returns {Promise<{lastID: number, changes: number}>}
     */
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) {
                    console.error('Erro ao executar a query:', sql, params, err);
                    reject(err);
                } else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
        });
    }

    /**
     * Executa uma query e retorna a primeira linha resultante.
     * @param {string} sql A query SQL.
     * @param {Array} params Os parâmetros para a query.
     * @returns {Promise<Object>}
     */
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) {
                    console.error('Erro ao buscar o registro:', sql, params, err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    /**
     * Executa uma query e retorna todas as linhas resultantes.
     * @param {string} sql A query SQL.
     * @param {Array} params Os parâmetros para a query.
     * @returns {Promise<Array<Object>>}
     */
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    console.error('Erro ao buscar todos os registros:', sql, params, err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = new DatabaseService();