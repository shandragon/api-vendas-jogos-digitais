const sqlite = require('sqlite3').verbose();
require("dotenv").config();

class Database {
    constructor() {
        if (!Database.instance) {
            this._connect();
            Database.instance = this;
        }
        return Database.instance;
    }

    _connect() {
        this.db = new sqlite.Database(process.env.DB_NAME || 'vendas.db', (err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err.message);
            } else {
                console.log('Conexão com o banco de dados estabelecida com sucesso.');
                this._createTable();
                this._seed();
            }
        });
        
    }

    _createTable() {
        this.db.serialize(() => {
            // Habilita o suporte a chaves estrangeiras
            this.db.get("PRAGMA foreign_keys = ON");

            // Tabela de Perfis (Admin, Cliente)
            this.db.run(`CREATE TABLE IF NOT EXISTS perfis (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL UNIQUE
            )`);

            // Criação da tabela de usuários
            this.db.run(`CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome varchar(255) NOT NULL,
                email varchar(255) NOT NULL UNIQUE,
                senha varchar(255) NOT NULL,
                data_nascimento datetime,
                fk_perfil INTEGER NOT NULL,
                FOREIGN KEY(fk_perfil) REFERENCES perfis(id))`);

            // Criação da tabela de categoria de jogos
            this.db.run(`CREATE TABLE IF NOT EXISTS categorias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome varchar(255) NOT NULL UNIQUE)`);

            // Criação da tabela de empresas
            this.db.run(`CREATE TABLE IF NOT EXISTS empresas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome varchar(255) NOT NULL UNIQUE)`);

            // Criação da tabela de jogos
            this.db.run(`CREATE TABLE IF NOT EXISTS jogos (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                nome varchar(255) NOT NULL,
                ano integer NOT NULL,
                preco real NOT NULL,
                descricao TEXT,
                fk_empresa integer NOT NULL,
                fk_categoria integer NOT NULL,
                FOREIGN KEY(fk_empresa) REFERENCES empresas(id),
                FOREIGN KEY(fk_categoria) REFERENCES categorias(id))`);

            // Criação da tabela de carrinhos
            this.db.run(`CREATE TABLE IF NOT EXISTS carrinhos (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                fk_usuario INTEGER NOT NULL, 
                FOREIGN KEY(fk_usuario) REFERENCES usuarios(id))`);

            // Criação da tabela de vendas
            this.db.run(`CREATE TABLE IF NOT EXISTS vendas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fk_usuario INTEGER NOT NULL,
                valor_total real NOT NULL,
                quantidade integer NOT NULL,
                data datetime DEFAULT(datetime('now')),
                FOREIGN KEY(fk_usuario) REFERENCES usuarios(id))`);

            // Criação da tabela de itens do carrinho
            this.db.run(`CREATE TABLE IF NOT EXISTS itens_carrinho (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                fk_jogo INTEGER NOT NULL, 
                fk_carrinho INTEGER NOT NULL, 
                fk_venda INTEGER,
                quantidade INTEGER NOT NULL DEFAULT 1,
                FOREIGN KEY(fk_jogo) REFERENCES jogos(id), 
                FOREIGN KEY(fk_carrinho) REFERENCES carrinhos(id), 
                FOREIGN KEY(fk_venda) REFERENCES vendas(id))`);
        });
    }

    _seed(){
        this.db.serialize(() => {
            // Insere perfis
            this.db.run(`INSERT OR IGNORE INTO perfis (nome) VALUES ('Administrador')`);
            this.db.run(`INSERT OR IGNORE INTO perfis (nome) VALUES ('Cliente')`);

            // Insere categorias
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Ação')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Aventura')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('RPG')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Estratégia')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Simulação')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Esportes')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Corrida')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Puzzle')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Luta')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Tiro')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Plataforma')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Horror')`);
            this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES ('Indie')`);

            // Insere empresas
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Nintendo')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Sony')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Microsoft')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Valve')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Electronic Arts')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Activision')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Ubisoft')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Rockstar Games')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Bandai Namco')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Sega')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Capcom')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Square Enix')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Bethesda')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Epic Games')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('CD Projekt Red')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Riot Games')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Blizzard Entertainment')`);
        });
    }
}

// Exporta uma única instância do banco
module.exports = new Database();