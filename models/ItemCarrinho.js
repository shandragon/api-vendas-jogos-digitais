class ItemCarrinho {
  constructor(id, fkJogo, fkCarrinho) {
    this.id = id;
    this.fkJogo = fkJogo;
    this.fkCarrinho = fkCarrinho;
  }
}

module.exports = ItemCarrinho;