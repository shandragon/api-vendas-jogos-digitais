const moment = require('moment');

class JogoDTO {
    constructor(id, nome, email, dataNascimento, fkPerfil) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.dataNascimento = (dataNascimento) ? moment(dataNascimento).format('DD/MM/YYYY') : null;
        this.fkPerfil = fkPerfil;
    }
}

module.exports = JogoDTO;