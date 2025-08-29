class ItemCarrinho {
  constructor(id, fkJogo, fkCarrinho, chave_ativacao) {
    this.id = id;
    this.fkJogo = fkJogo;
    this.fkCarrinho = fkCarrinho;
    this.chave_ativacao = chave_ativacao;
  }
}

module.exports = ItemCarrinho;