const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('vendas.db')

module.exports = db