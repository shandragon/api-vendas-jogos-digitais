const ClienteDAO = require('../dao/ClienteDao')

module.exports = app => {
    app.get('/clientes', (request, response) => {
        ClienteDAO.all((err, clientes) => {
            response.header("Access-Control-Allow-Origin", "*");
            if (err == null) {
                response.send(clientes);
            } else {
                response.status(404).send('Not found');
            }
        });
    })
}


