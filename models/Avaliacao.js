class Avaliacao {
  constructor(id, fkJogo, fkUsuario, nota, comentario) {
    this.id = id;
    this.fkJogo = fkJogo;
    this.fkUsuario = fkUsuario;
    this.nota = nota;
    this.comentario = comentario;
  }
}

module.exports = Avaliacao;