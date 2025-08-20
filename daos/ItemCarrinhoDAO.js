const dbService = require('../services/dbService');
const ItemCarrinho = require("../models/ItemCarrinho");

class ItemCarrinhoDAO {
  async create(item) {
    const sql = 'INSERT INTO itens_carrinho (fk_jogo, fk_carrinho, fk_venda) VALUES (?, ?, ?)';
    const params = [item.fkJogo, item.fkCarrinho, item.fkVenda];
    const result = await dbService.run(sql, params);
    return new ItemCarrinho(result.lastID, ...item );
  }

  async findById(id) {
    const sql = 'SELECT * FROM itens_carrinho WHERE id = ?';
    const row = await dbService.get(sql, [id]);
    return new ItemCarrinho(row.id, row.fk_jogo, row.fk_carrinho, row.fk_venda);
  }

  async findByCarrinho(fkCarrinho) {
    const sql = 'SELECT * FROM itens_carrinho ic WHERE fk_carrinho = ?';
    const rows = await dbService.all(sql, [fkCarrinho]);
    return rows.map(row => new ItemCarrinho(row.id, row.fk_jogo, row.fk_carrinho, row.fk_venda));
  }

  async update(item) {
    const sql = 'UPDATE itens_carrinho SET fk_jogo = ?, fk_carrinho = ?, fk_venda = ?, quantidade = ? WHERE id = ?';
    const params = [itemDaCompra.compraId, itemDaCompra.jogoId, itemDaCompra.precoUnitario, itemDaCompra.quantidade, id];
    const result = await dbService.run(sql, params);
    return { changes: result.changes };
  }

  async delete(id) {
    const sql = 'DELETE FROM itens_carrinho WHERE id = ?';
    const result = await dbService.run(sql, [id]);
    return { changes: result.changes };
  }
}

module.exports = new ItemDaCompraDAO();
