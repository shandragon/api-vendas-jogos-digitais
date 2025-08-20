class Jogo {
    constructor(id, nome, ano, preco, descricao, fkEmpresa, fkCategoria) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.ano = ano;
        this.preco = preco;
        this.fkEmpresa = fkEmpresa;
        this.fkCategoria = fkCategoria;
    }

    static fromRequest(body) {
        return new Jogo(body.id, body.nome, body.ano, body.preco, body.descricao, body.fkEmpresa, body.fkCategoria);
    }
}

module.exports = Jogo;