class Jogo {
    constructor(id, nome, ano, preco, desconto, descricao, fkEmpresa, fkCategoria) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.ano = ano;
        this.preco = preco;
        this.desconto = desconto;
        this.fkEmpresa = fkEmpresa;
        this.fkCategoria = fkCategoria;
    }

    static fromRequest(body) {
        return new Jogo(body.id, body.nome, body.ano, body.preco, body.desconto, body.descricao, body.fkEmpresa, body.fkCategoria);
    }
}

module.exports = Jogo;