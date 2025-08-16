const db = require("../config/conexao");

class UsuarioDAO {
  adicionar(usuario) {
    let sql = '';
    if (usuario.id !== undefined) {
      sql = `UPDATE usuarios SET nome = '${usuario.nome}', email = '${usuario.email}',
       senha = '${usuario.senha}' WHERE id = ${usuario.id}`;
    } else {
      sql = `INSERT INTO usuarios(nome, email, senha)
       VALUES('${usuario.nome}', '${usuario.email}', '${usuario.senha}')`;
    }

    db.run(sql);
  }

  get(id, callback) {
    db.get('SELECT * FROM usuarios WHERE id = ?', [id], (err, usuario) => {
        if (err || usuario == undefined ){
            callback("not found", null);
        } else {
            callback(null, usuario);
        }
    });
  }

  all(callback) {
    db.all('SELECT * FROM usuarios', [], (err, usuarios) => {
      if (err || usuarios == undefined ){
          callback("not found", null);
      } else {
          callback(null, usuarios);
      }
    });
  }

  total(callback) {
    db.get('SELECT count(*) as count FROM usuarios', [], (err, total) => {
      if (err || total == undefined ){
          callback("not found", null);
      } else {
          callback(null, total.count);
      }
    });
  }
}

module.exports = new UsuarioDAO();
