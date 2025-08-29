const vendaDAO = require('../daos/VendaDAO');
const carrinhoDAO = require('../daos/CarrinhoDAO');
const itemCarrinhoDAO = require('../daos/ItemCarrinhoDAO');
const jogoDAO = require('../daos/JogoDAO');
const Venda = require("../models/Venda");
const { generateActivationKey } = require('../util/cripto');

class VendaController {
    async checkout(req, res) {
        const usuarioId = req.user.id;

        try {
            const carrinho = await carrinhoDAO.findAtivoByUser(usuarioId);
            if (!carrinho) {
                return res.status(200).json({ message: 'Carrinho vazio.' });
            }

            const itens = await itemCarrinhoDAO.findByCarrinho(carrinho.id);
            if (itens.length === 0) {
                return res.status(200).json({ message: 'Carrinho vazio.' });
            }

            const jogos = await Promise.all(itens.map(item => jogoDAO.findById(item.fkJogo)));
            const valorTotal = Number(jogos.reduce((total, jogo) => total + jogo.preco, 0).toFixed(2));
            
            const novaVenda = await vendaDAO.create(new Venda(null, valorTotal, itens.length, new Date(), usuarioId));
            // Gerar chaves de ativação e salvar itens do carrinho com as chaves
            for (const item of itens) {
                const chaveAtivacao = generateActivationKey();
                await itemCarrinhoDAO.updateChaveAtivacao(item.id, chaveAtivacao);
            }

            // Marcar o carrinho como finalizado
            await carrinhoDAO.finalize(carrinho.id, novaVenda.id);
            res.status(200).json({ message: 'Compra realizada com sucesso!', venda: novaVenda });
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor durante o checkout.', error: error.message });
        }
    }

    async history(req, res) {
        const usuarioId = req.user.id;
        try {
            const vendas = await vendaDAO.findByUser(usuarioId);
            res.json(vendas);
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor.', error: error.message });
        }
    }
}

module.exports = new VendaController();
