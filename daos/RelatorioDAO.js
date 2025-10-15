const dbService = require('../services/DatabaseService');
const Jogo = require("../models/Jogo");
const JogoMaisVendidoDTO = require('../dtos/JogoMaisVendidoDTO');

class RelatorioDAO {
    async countGameMostSell(top) {
        const query = `
            SELECT
                j.nome AS jogo,
                e.nome AS empresa,
                COUNT(ic.fk_jogo) as total_vendas
            FROM jogos j
            LEFT JOIN itens_carrinho ic ON j.id = ic.fk_jogo
            LEFT JOIN carrinhos c ON ic.fk_carrinho = c.id
            LEFT JOIN empresas e ON j.fk_empresa = e.id
            WHERE c.status = 'F'
            GROUP BY j.id, j.nome, j.preco
            ORDER BY total_vendas DESC
            LIMIT ?`;
        const rows = await dbService.all(query, [top]);
        if (rows == undefined) return [];
        return rows.map(row => new JogoMaisVendidoDTO(row.jogo, row.empresa, row.total_vendas));
    }

    async countGameSellByEnterprise(top, empresaId) {
        const query = `
            SELECT
                j.nome AS jogo,
                e.nome AS empresa,
                COUNT(ic.fk_jogo) as total_vendas
            FROM jogos j
            LEFT JOIN itens_carrinho ic ON j.id = ic.fk_jogo
            LEFT JOIN carrinhos c ON ic.fk_carrinho = c.id
            LEFT JOIN empresas e ON j.fk_empresa = e.id
            WHERE c.status = 'F' AND e.id = ?
            GROUP BY j.id, j.nome, j.preco
            ORDER BY total_vendas DESC
            LIMIT ?`;
        const rows = await dbService.all(query, [empresaId, top]);
        if (rows == undefined) return [];
        return rows.map(row => new JogoMaisVendidoDTO(row.jogo, row.empresa, row.total_vendas));
    }
}

module.exports = new RelatorioDAO();