const sqlite = require('sqlite3').verbose();
require("dotenv").config();

class Conexao {
    constructor() {
        if (!Conexao.instance) {
            this._connect();
            Conexao.instance = this;
        }
        return Conexao.instance;
    }

    _connect() {
        this.db = new sqlite.Database(process.env.DB_NAME || 'vendas.db', (err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err.message);
            } else {
                console.log('Conexão com o banco de dados estabelecida com sucesso.');
                this._createTable();
            }
        });
        this.db.get("PRAGMA foreign_keys = ON");
    }

    _createTable() {
        // Criação da tabela de usuários
        this.db.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(255) NOT NULL, email varchar(255) NOT NULL, senha varchar(255) NOT NULL, data_nascimento datetime, UNIQUE(email))');

        // Criação da tabela de empresas
        this.db.run('CREATE TABLE IF NOT EXISTS empresas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(255) NOT NULL, UNIQUE(nome))');

        // Criação da tabela de jogos
        this.db.run('CREATE TABLE IF NOT EXISTS jogos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(255) NOT NULL, categoria varchar(255) NOT NULL, ano integer NOT NULL, fk_empresa integer NOT NULL, FOREIGN KEY(fk_empresa) REFERENCES empresas(id))');

        // Criação da tabela de carrinhos
        this.db.run('CREATE TABLE IF NOT EXISTS carrinhos (id INTEGER PRIMARY KEY AUTOINCREMENT, fk_usuario INTEGER NOT NULL, FOREIGN KEY(fk_usuario) REFERENCES usuarios(id))');

        // Criação da tabela de vendas
        this.db.run('CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY AUTOINCREMENT, fk_usuario INTEGER NOT NULL, valor_total real NOT NULL, quantidade integer NOT NULL, FOREIGN KEY(fk_usuario) REFERENCES usuarios(id))');

        // Criação da tabela de itens do carrinho
        this.db.run('CREATE TABLE IF NOT EXISTS itens_carrinho (id INTEGER PRIMARY KEY AUTOINCREMENT, fk_jogo INTEGER NOT NULL, fk_carrinho INTEGER NOT NULL, fk_venda INTEGER, FOREIGN KEY(fk_jogo) REFERENCES jogos(id), FOREIGN KEY(fk_carrinho) REFERENCES carrinhos(id), FOREIGN KEY(fk_venda) REFERENCES vendas(id))');
    }
}

// Exporta uma única instância do banco
module.exports = new Conexao();