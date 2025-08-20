class Jogo {
    constructor(id, valorTotal, quantidade, data, fkUsuario) {
        this.id = id;
        this.valorTotal = valorTotal;
        this.quantidade = quantidade;
        this.data = data;
        this.fkUsuario = fkUsuario;
    }
}

module.exports = Jogo;