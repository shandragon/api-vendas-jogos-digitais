const dbService = require('../services/DatabaseService');
const Jogo = require("../models/Jogo");
const JogoUsuarioDTO = require('../dtos/JogoUsuarioDTO');
const JogoDTO = require('../dtos/JogoDTO');

class JogoDAO {
    async all(categoria) {
        let query = "SELECT * FROM jogos";

        // Verificando se foi passado um parâmetro de busca
        if (categoria) {
            query += " WHERE categoria LIKE '%" + categoria + "%'";
        }
        const rows = await dbService.all(query);
        if (rows == undefined) return [];
        return rows.map(row => new Jogo(row.id, row.nome, row.ano, row.preco, row.desconto, row.descricao, row.fk_empresa, row.fk_categoria));
    }

    async getExhibition() {
        const query = `
            SELECT j.*, c.nome as categoria, e.nome as empresa FROM jogos j
            JOIN categorias c ON c.id = j.fk_categoria
            JOIN empresas e ON e.id = j.fk_empresa`;

        const rows = await dbService.all(query);
        if (rows == undefined) return [];
        return rows.map(row => new JogoDTO(row.nome, row.descricao, row.ano, row.preco, row.desconto, row.categoria, row.empresa));
    }

    async findById(id) {
        const query = "SELECT * FROM jogos WHERE id = ?";
        const row = await dbService.get(query, [id]);
        if (!row) return null;
        return new Jogo(row.id, row.nome, row.ano, row.preco, row.desconto, row.descricao, row.fk_empresa, row.fk_categoria);
    }

    async findByUser(id) {
        const query = `
            SELECT j.*, ic.chave_ativacao FROM jogos j
            JOIN itens_carrinho ic ON j.id = ic.fk_jogo
            JOIN carrinhos c ON ic.fk_carrinho = c.id
            WHERE c.fk_usuario = ?`;
        const rows = await dbService.all(query, [id]);
        if (rows == undefined) return [];
        return rows.map(row => new JogoUsuarioDTO(row.chave_ativacao, new Jogo(row.id, row.nome, row.ano, row.preco, row.desconto, row.descricao, row.fk_empresa, row.fk_categoria)));
    }

    async create(jogo) {
        const query = "INSERT INTO jogos (nome, descricao, ano, preco, desconto, fk_empresa, fk_categoria) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const params = [jogo.nome, jogo.descricao, jogo.ano, jogo.preco, jogo.desconto, jogo.fkEmpresa, jogo.fkCategoria];
        const result = await dbService.run(query, params);
        jogo.id = result.lastID; // Atribuindo o ID gerado pelo banco de dados
        return jogo;
    }

    async update(jogo) {
        const query = "UPDATE jogos set nome = ?, descricao = ?, ano = ?, preco = ?, desconto = ?, fk_empresa = ?, fk_categoria = ? where id = ?";
        const params = [jogo.nome, jogo.descricao, jogo.ano, jogo.preco, jogo.desconto, jogo.fkEmpresa, jogo.fkCategoria, jogo.id];
        const result = await dbService.run(query, params);
        return { changes: result.changes };
    }

    async delete(id) {
        const query = "DELETE FROM jogos WHERE id = ?";
        const result = await dbService.run(query, [id]);
        return { changes: result.changes };
    }
}

module.exports = new JogoDAO();