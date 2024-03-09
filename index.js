const express = require('express')
const consign = require('consign')
const Tabelas = require('./config/Tabelas')

Tabelas.init()
Tabelas.seed()

const app = express()

consign().include('controllers').into(app)

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))

app.get('/', (request, response) => {
    response.send('Servidor on-line!')
})

