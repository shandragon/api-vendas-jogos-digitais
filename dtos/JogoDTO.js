class JogoDTO {
    constructor(nome, descricao, ano, preco, desconto, categoria, empresa_nome) {
        this.nome = nome;
        this.descricao = descricao;
        this.ano = ano;
        this.preco = preco;
        if (desconto !== null && desconto !== undefined) {
            this.desconto = desconto;
        }
        this.categoria = categoria;
        this.empresa_nome = empresa_nome;
    }
}

module.exports = JogoDTO;