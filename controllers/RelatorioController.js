const RelatorioDAO = require('../daos/RelatorioDAO');

class RelatorioController {
    async jogoMaisVendido(req, res) {
        const top = req.query.top;
        const empresa = req.query.empresa;

        try {
            if (!top) {
                top = 10;
            }
            let jogos = null
            if (empresa) {
                jogos = await RelatorioDAO.countGameSellByEnterprise(top, empresa);
            } else {
                jogos = await RelatorioDAO.countGameMostSell(top);
            }
            
            if (!jogos) {
                return res.status(204).json({ error: "Sem dados suficiente." });
            }
            res.json(jogos);
        } catch (error) {
            return res.status(500).json({ error: error.message, message: 'Erro ao listar jogos mais vendidos.' });
        }
    }
}

module.exports = new RelatorioController;