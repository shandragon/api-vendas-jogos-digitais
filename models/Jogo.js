class Jogo {
    constructor(id, nome, categoria, ano, fkEmpresa) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.ano = ano;
        this.fkEmpresa = fkEmpresa;
    }
}

module.exports = Jogo;