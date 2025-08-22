const jogoDAO = require('../daos/JogoDAO');
const carrinhoDAO = require('../daos/CarrinhoDAO');
const itemCarrinhoDAO = require('../daos/ItemCarrinhoDAO');

class CarrinhoController {
  // Adicionar um jogo ao carrinho
  async add(req, res) {
    const { jogoId, quantidade } = req.body;
    const usuarioId = req.user.id;

    if (!jogoId || !quantidade || quantidade <= 0) {
      return res.status(400).json({ message: 'ID do jogo e quantidade são obrigatórios.' });
    }

    try {
      // 1. Verificar se o jogo existe e se há estoque
      const jogo = await jogoDAO.findById(jogoId);
      if (!jogo) {
        return res.status(404).json({ message: 'Jogo não encontrado.' });
      }
      if (jogo.estoque < quantidade) {
        return res.status(400).json({ message: 'Estoque insuficiente.' });
      }

      // 2. Verificar se o item já está no carrinho do usuário
      const itemCarrinho = await carrinhoDAO.findByUserAndGame(usuarioId, jogoId);

      if (itemCarrinho) {
        // 3a. Se já existe, atualiza a quantidade
        const novaQuantidade = itemCarrinho.quantidade + quantidade;
        if (jogo.estoque < novaQuantidade) {
          return res.status(400).json({ message: 'Estoque insuficiente para a quantidade total.' });
        }
        await carrinhoDAO.update(itemCarrinho.id, { quantidade: novaQuantidade });
      } else {
        // 3b. Se não existe, insere um novo item
        const carrinho = await carrinhoDAO.create(usuarioId);
        const novoItemCarrinho = await itemCarrinhoDAO.create({
          fkJogo: jogoId,
          fkCarrinho: carrinho.id,
          quantidade: quantidade
        });
      }

      res.status(200).json({ message: 'Jogo adicionado ao carrinho com sucesso!' });

    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }

  // Remover um jogo do carrinho
  async removeFromCart(req, res) {
    const { gameId } = req.params;
    const usuarioId = req.user.id;

    try {
      const result = await carrinhoDAO.deleteByUserIdAndGameId(usuarioId, gameId);

      if (result.changes > 0) {
        res.status(200).json({ message: 'Jogo removido do carrinho com sucesso!' });
      } else {
        res.status(404).json({ message: 'Jogo não encontrado no seu carrinho.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }

  // Visualizar o carrinho do usuário
  async show(req, res) {
    const usuarioId = req.user.id;

    try {
      const items = await carrinhoDAO.findByUser(usuarioId);
      
      const total = items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

      res.json({ items, total: total.toFixed(2) });

    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }
}

module.exports = new CarrinhoController();
