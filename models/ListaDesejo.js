
class ListaDesejo {
    constructor(id, fk_usuario, fk_jogo) {
        this.id = id;
        this.fk_usuario = fk_usuario;
        this.fk_jogo = fk_jogo;
    }
}

module.exports = ListaDesejo;