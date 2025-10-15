const dbService = require('../services/DatabaseService');
const ItemCarrinho = require("../models/ItemCarrinho");

class ItemCarrinhoDAO {
  async create(item) {
    const sql = 'INSERT INTO itens_carrinho (fk_jogo, fk_carrinho) VALUES (?, ?)';
    const params = [item.fkJogo, item.fkCarrinho];
    const result = await dbService.run(sql, params);
    return new ItemCarrinho(result.lastID, item.fkJogo, item.fkCarrinho);
  }

  async updateChaveAtivacao(id, chaveAtivacao) {
    const sql = `UPDATE itens_carrinho SET chave_ativacao = ? WHERE id = ?`;
    const result = await dbService.run(sql, [chaveAtivacao, id]);
    return { changes: result.changes };
  }

  async findById(id) {
    const sql = 'SELECT * FROM itens_carrinho WHERE id = ?';
    const row = await dbService.get(sql, [id]);
    return new ItemCarrinho(row.id, row.fk_jogo, row.fk_carrinho);
  }

  async findByCarrinho(fkCarrinho) {
    const sql = 'SELECT * FROM itens_carrinho ic WHERE fk_carrinho = ?';
    const rows = await dbService.all(sql, [fkCarrinho]);
    return rows.map(row => new ItemCarrinho(row.id, row.fk_jogo, row.fk_carrinho, row.chave_ativacao));
  }

  async findByCarrinhoAndGame(fkCarrinho, fkJogo) {
    const sql = 'SELECT * FROM itens_carrinho ic WHERE fk_carrinho = ? AND fk_jogo = ?';
    const row = await dbService.get(sql, [fkCarrinho, fkJogo]);
    if (!row) return null;
    return new ItemCarrinho(row.id, row.fk_jogo, row.fk_carrinho);
  }

  async delete(id) {
    const sql = 'DELETE FROM itens_carrinho WHERE id = ?';
    const result = await dbService.run(sql, [id]);
    return { changes: result.changes };
  }
}

module.exports = new ItemCarrinhoDAO();
