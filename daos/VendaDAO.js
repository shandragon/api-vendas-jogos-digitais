const dbService = require('../services/dbService');

class VendaDAO {
  async findById(id) {
    const sql = 'SELECT * FROM vendas WHERE id = ?';
    const row = await dbService.get(sql, [id]);
    return row;
  }

  async findByUserId(usuarioId) {
    const sql = 'SELECT * FROM vendas WHERE fk_usuario = ?';
    const rows = await dbService.all(sql, [usuarioId]);
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
    return { id: result.lastID, ...venda };
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
