class JogoDTO {
    constructor(nome, descricao, ano, preco, categoria, empresa_nome) {
        this.nome = nome;
        this.descricao = descricao;
        this.ano = ano;
        this.preco = preco;
        this.categoria = categoria;
        this.empresa_nome = empresa_nome;
    }
}

module.exports = JogoDTO;