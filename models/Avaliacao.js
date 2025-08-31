class Avaliacao {
  constructor(id, fkJogo, fkUsuario, nota, comentario, data = new Date()) {
    this.id = id;
    this.fkJogo = fkJogo;
    this.fkUsuario = fkUsuario;
    this.nota = nota;
    this.comentario = comentario;
    this.data = data;
  }
}

module.exports = Avaliacao;