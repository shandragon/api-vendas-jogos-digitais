const dbService = require('../services/DatabaseService');
const Categoria = require("../models/Categoria");

class CategoriaDAO {
    async all(categoria) {
        let query = "SELECT * FROM categorias";

        const rows = await dbService.all(query);
        if (rows == undefined) return [];
        return rows.map(row => new Categoria(row.id, row.nome));
    }

    async findById(id) {
        const query = "SELECT * FROM categorias WHERE id = ?";
        const row = await dbService.get(query, [id]);
        if (!row) return null;
        return new Categoria(row.id, row.nome);
    }
}

module.exports = new CategoriaDAO();