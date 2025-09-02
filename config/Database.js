const sqlite = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const { hashPassword } = require('../util/cripto');

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
                FOREIGN KEY(fk_categoria) REFERENCES categorias(id),
                UNIQUE(nome, fk_empresa))`);

            // Criação da tabela de vendas
            this.db.run(`CREATE TABLE IF NOT EXISTS vendas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fk_usuario INTEGER NOT NULL,
                valor_total real NOT NULL,
                quantidade integer NOT NULL,
                data datetime DEFAULT(datetime('now')),
                FOREIGN KEY(fk_usuario) REFERENCES usuarios(id))`);

            // Criação da tabela de carrinhos
            this.db.run(`CREATE TABLE IF NOT EXISTS carrinhos (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                fk_usuario INTEGER NOT NULL, 
                fk_venda INTEGER,
                status TEXT NOT NULL DEFAULT 'A',
                FOREIGN KEY(fk_usuario) REFERENCES usuarios(id), 
                FOREIGN KEY(fk_venda) REFERENCES vendas(id))`);

            // Criação da tabela de itens do carrinho
            this.db.run(`CREATE TABLE IF NOT EXISTS itens_carrinho (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                fk_jogo INTEGER NOT NULL, 
                fk_carrinho INTEGER NOT NULL,
                chave_ativacao TEXT,
                FOREIGN KEY(fk_jogo) REFERENCES jogos(id), 
                FOREIGN KEY(fk_carrinho) REFERENCES carrinhos(id))`);

            // Criação da tabela de avaliações
            this.db.run(`CREATE TABLE IF NOT EXISTS avaliacoes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fk_usuario INTEGER NOT NULL,
                fk_jogo INTEGER NOT NULL,
                nota INTEGER NOT NULL CHECK(nota >= 1 AND nota <= 5),
                comentario TEXT,
                data datetime DEFAULT(datetime('now')),
                FOREIGN KEY(fk_usuario) REFERENCES usuarios(id),
                FOREIGN KEY(fk_jogo) REFERENCES jogos(id),
                UNIQUE(fk_usuario, fk_jogo))`);

            // Criação da tabela de lista de desejos
            this.db.run(`CREATE TABLE IF NOT EXISTS lista_desejos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fk_usuario INTEGER NOT NULL,
                fk_jogo INTEGER NOT NULL,
                FOREIGN KEY(fk_usuario) REFERENCES usuarios(id),
                FOREIGN KEY(fk_jogo) REFERENCES jogos(id),
                UNIQUE(fk_usuario, fk_jogo))`);
        });
    }

    async _seed(){
        this.db.serialize(async () => {
            // Insere perfis
            this.db.run(`INSERT OR IGNORE INTO perfis (nome) VALUES ('Administrador')`);
            this.db.run(`INSERT OR IGNORE INTO perfis (nome) VALUES ('Cliente')`);

            // Insere um usuários
            const passAdmin = await hashPassword('admin123');
            const passCliente = await hashPassword('cliente123');
            this.db.run(`INSERT OR IGNORE INTO usuarios (nome, email, senha, fk_perfil) VALUES ('Admin', 'admin@avjd.com', '${passAdmin}', (SELECT id FROM perfis WHERE nome = 'Administrador'))`);
            this.db.run(`INSERT OR IGNORE INTO usuarios (nome, email, senha, fk_perfil) VALUES ('Cliente', 'cliente@avjd.com', '${passCliente}', (SELECT id FROM perfis WHERE nome = 'Cliente'))`);

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
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Epic Games')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('CD Projekt Red')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Riot Games')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Blizzard Entertainment')`);
            this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES ('Dumativa')`);
        
            this._seedJogosFromCSV();
        });
    }

    _seedJogosFromCSV() {
        const csvFilePath = path.join(__dirname, 'jogos.csv');
        fs.readFile(csvFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo CSV:', err);
                return;
            }

            const lines = data.split('\n').slice(1);
            lines.forEach(line => {
                const [nome, ano, preco, descricao, empresa, categoria] = line.split(',');
                if (nome) {
                    this.db.run(`INSERT OR IGNORE INTO empresas (nome) VALUES (?)`, [empresa]);
                    this.db.run(`INSERT OR IGNORE INTO categorias (nome) VALUES (?)`, [categoria]);
                    this.db.run(`INSERT OR IGNORE INTO jogos (nome, ano, preco, descricao, fk_empresa, fk_categoria) VALUES 
                        (?, ?, ?, ?, (SELECT id FROM empresas WHERE nome = ?), (SELECT id FROM categorias WHERE nome = ?))`, 
                        [nome, parseInt(ano), parseFloat(preco), descricao, empresa, categoria]);
                }
            });
        });
    }
}

// Exporta uma única instância do banco
module.exports = new Database();