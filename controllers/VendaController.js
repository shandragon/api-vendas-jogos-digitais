module.exports = app => {
    app.get('/vendas', (request, response) => {
        response.send('Rota de vendas')
    })
}