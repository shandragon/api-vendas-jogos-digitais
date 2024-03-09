const db = require("../config/conexao");

class ClienteDAO {
  adicionar(cliente) {
    let sql = '';
    if (cliente.id !== undefined) {
      sql = `UPDATE clientes SET nome = '${cliente.nome}', email = '${cliente.email}',
       senha = '${cliente.senha}' WHERE id = ${cliente.id}`;
    } else {
      sql = `INSERT INTO clientes(nome, email, senha)
       VALUES('${cliente.nome}', '${cliente.email}', '${cliente.senha}')`;
    }

    db.run(sql);
  }

  get(id, callback) {
    db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, cliente) => {
        if (err || cliente == undefined ){
            callback("not found", null);
        } else {
            callback(null, cliente);
        }
    });
  }

  all(callback) {
    db.all('SELECT * FROM clientes', [], (err, clientes) => {
      if (err || clientes == undefined ){
          callback("not found", null);
      } else {
          callback(null, clientes);
      }
    });
  }

  total(callback) {
    db.get('SELECT count(*) as count FROM clientes', [], (err, total) => {
      if (err || total == undefined ){
          callback("not found", null);
      } else {
          callback(null, total.count);
      }
    });
  }
}

module.exports = new ClienteDAO();
