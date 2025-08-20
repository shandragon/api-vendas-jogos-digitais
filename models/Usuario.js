class Usuario {
    constructor(nome, email, senha, dataNascimento, fkPerfil) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.fkPerfil = fkPerfil;
    }
}

module.exports = Usuario;
