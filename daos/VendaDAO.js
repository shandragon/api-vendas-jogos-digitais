const dbService = require('../services/DatabaseService');
const Venda = require("../models/Venda");

class VendaDAO {
  async findById(id) {
    const sql = 'SELECT * FROM vendas WHERE id = ?';
    const row = await dbService.get(sql, [id]);
    return row;
  }

  async findByUser(usuarioId) {
    const sql = 'SELECT * FROM vendas WHERE fk_usuario = ?';
    const rows = await dbService.all(sql, [usuarioId]);
    rows.map(row => new Venda(row.id, row.valor_total, row.quantidade, row.data, row.fk_usuario));
    return rows;
  }

  async findAll() {
    const sql = 'SELECT * FROM vendas';
    const rows = await dbService.all(sql);
    return rows;
  }

  async create(venda) {
    const sql = 'INSERT INTO vendas (fk_usuario, data, valor_total, quantidade) VALUES (?, ?, ?, ?)';
    const params = [venda.fkUsuario, venda.data, venda.valorTotal, venda.quantidade];
    const result = await dbService.run(sql, params);
    venda.id = result.lastID;
    return venda;
  }

  async update(id, venda) {
    const sql = 'UPDATE vendas SET fk_usuario = ?, data = ?, valor_total = ?, quantidade = ? WHERE id = ?';
    const params = [venda.usuarioId, venda.data, venda.valorTotal, venda.quantidade, id];
    const result = await dbService.run(sql, params);
    return { changes: result.changes };
  }

  async delete(id) {
    const sql = 'DELETE FROM vendas WHERE id = ?';
    const result = await dbService.run(sql, [id]);
    return { changes: result.changes };
  }
}

module.exports = new VendaDAO();
