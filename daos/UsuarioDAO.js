const dbService = require('../services/DatabaseService');
const Usuario = require("../models/Usuario");

class UsuarioDAO {

  async get(id) {
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    const row = await dbService.get(sql, [id]);
    if (!row) return null;
    let usuario = new Usuario(row.nome, row.email, row.senha, row.data_nascimento, row.fk_perfil);
    usuario.id = row.id;
    delete usuario.senha; // Nunca retornar a senha
    return usuario;
  }

  async getWithPasswd(id) {
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    const row = await dbService.get(sql, [id]);
    if (!row) return null;
    let usuario = new Usuario(row.nome, row.email, row.senha, row.data_nascimento, row.fk_perfil);
    usuario.id = row.id;
    return usuario;
  }

  async getByEmail(email) {
    const sql = 'SELECT u.id, u.nome, u.email, u.senha, p.nome as perfil FROM usuarios u JOIN perfis p ON u.fk_perfil = p.id WHERE u.email = ?';
    const row = await dbService.get(sql, [email]);
    return row;
  }

  async all() {
    const sql = 'SELECT * FROM usuarios';
    const rows = await dbService.all(sql);
    return rows;
  }

  async updatePassword(id, password) {
    const sql = 'UPDATE usuarios SET senha = ? WHERE id = ?';
    const params = [password, id];
    const result = await dbService.run(sql, params);
    return { changes: result.changes };
  }

  async total() {
    const sql = 'SELECT count(*) as count FROM usuarios';
    return await dbService.get(sql);
  }

  async create(usuario) {
    const sql = 'INSERT INTO usuarios (nome, email, senha, fk_perfil, data_nascimento) VALUES (?, ?, ?, ?, ?)';
    const params = [usuario.nome, usuario.email, usuario.senha, usuario.fkPerfil, usuario.dataNascimento];
    const result = await dbService.run(sql, params);
    return { id: result.lastID, ...usuario };
  }

  async update(id, usuario) {
    const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ?, fk_perfil = ? WHERE id = ?';
    const params = [usuario.nome, usuario.email, usuario.senha, usuario.fkPerfil, id];
    const result = await dbService.run(sql, params);
    return { changes: result.changes };
  }

  async delete(id) {
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    const result = await dbService.run(sql, [id]);
    return { changes: result.changes };
  }
}

module.exports = new UsuarioDAO();
