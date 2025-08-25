class Carrinho {
    constructor(id, fkUsuario, status = 'A', fkVenda = null) {
        this.id = id;
        this.fkUsuario = fkUsuario;
        this.fkVenda = fkVenda;
        this.status = status; // 'A' para ativo, 'F' para finalizado, 'C' para cancelado
        this.itens = []; // Inicializa a lista de itens do carrinho
    }
}

module.exports = Carrinho;