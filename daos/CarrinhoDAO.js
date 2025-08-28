const dbService = require('../services/DatabaseService');
const Carrinho = require("../models/Carrinho");

class CarrinhoDAO {
  async findByUser(fkUsuario) {
    const sql = 'SELECT * FROM carrinhos WHERE fk_usuario = ?';
    const rows = await dbService.all(sql, [fkUsuario]);
    return rows.map(row => new Carrinho(row.id, row.fk_usuario));
  }

  async findAtivoByUser(fkUsuario) {
    const sql = 'SELECT * FROM carrinhos WHERE fk_usuario = ? AND status = "A"';
    const row = await dbService.get(sql, [fkUsuario]);
    return row ? new Carrinho(row.id, row.fk_usuario, row.status, row.fk_venda) : null;
  }

  async findAtivoByUserAndGame(fkUsuario, fkJjogo) {
    const sql = `SELECT * FROM carrinhos c 
    JOIN itens_carrinho ic ON c.id = ic.fk_carrinho
    WHERE c.fk_usuario = ? AND ic.fk_jogo = ? AND c.status = 'A'`;
    const row = await dbService.get(sql, [fkUsuario, fkJjogo]);
    return row;
  }

  async findById(id) {
    const sql = 'SELECT * FROM carrinhos WHERE id = ?';
    const row = await dbService.get(sql, [id]);
    return row ? new Carrinho(row.id, row.fk_usuario, row.status, row.fk_venda) : null;
  }

  async findAll() {
    const sql = 'SELECT * FROM carrinhos';
    const rows = await dbService.all(sql);
    return rows.map(row => new Carrinho(row.id, row.fk_usuario, row.status, row.fk_venda));
  }

  async create(fkUsuario) {
    const sql = 'INSERT INTO carrinhos (fk_usuario) VALUES (?)';
    const params = [fkUsuario];
    const result = await dbService.run(sql, params);
    return new Carrinho(result.lastID, fkUsuario, result.status, result.fk_venda);
  }

  async finalize(id, fkVenda) {
    const sql = `UPDATE carrinhos SET status = 'F', fk_venda = ? WHERE id = ?`;
    const result = await dbService.run(sql, [fkVenda, id]);
    return { changes: result.changes };
  }

  async update(id, fkUsuario) {
    const sql = `UPDATE carrinhos SET fk_usuario = ? WHERE id = ?`;
    const result = await dbService.run(sql, [fkUsuario, id]);
    return { changes: result.changes };
  }

  async delete(id) {
    const sql = 'DELETE FROM carrinhos WHERE id = ?';
    const result = await dbService.run(sql, [id]);
    return { changes: result.changes };
  }

  async deleteByUserId(fkUsuario) {
    const sql = 'DELETE FROM carrinhos WHERE fk_usuario = ?';
    const result = await dbService.run(sql, [fkUsuario]);
    return { changes: result.changes };
  }
}

module.exports = new CarrinhoDAO();
