const jogoDAO = require('../daos/JogoDAO');
const carrinhoDAO = require('../daos/CarrinhoDAO');
const itemCarrinhoDAO = require('../daos/ItemCarrinhoDAO');

class CarrinhoController {
  // Adicionar um jogo ao carrinho
  async add(req, res) {
    const jogoId = req.body.jogoId;
    const usuarioId = req.user.id;

    if (!jogoId) {
      return res.status(400).json({ message: 'ID do jogo é obrigatório.' });
    }

    try {
      // 1. Verificar se o jogo existe
      const jogo = await jogoDAO.findById(jogoId);
      if (!jogo) {
        return res.status(404).json({ message: 'Jogo não encontrado.' });
      }

      // 2. Verificar se existe carrinho ativo para o usuário
      let carrinho = await carrinhoDAO.findAtivoByUser(usuarioId);
      if (!carrinho) {
        carrinho = await carrinhoDAO.create(usuarioId);
      } else {
        // Se o carrinho já existe, carregar os itens existentes
        const itensExistentes = await itemCarrinhoDAO.findByCarrinho(carrinho.id);
        carrinho.itens = itensExistentes;
      }

      const itemCarrinho = await carrinhoDAO.findAtivoByUserAndGame(usuarioId, jogoId);

      if (!itemCarrinho) {
        const novoItemCarrinho = await itemCarrinhoDAO.create({
          fkJogo: jogoId,
          fkCarrinho: carrinho.id
        });
        carrinho.itens.push(novoItemCarrinho);
      } else {
        return res.status(400).json({ message: 'Jogo já está no carrinho.' });
      }

      res.status(200).json({ message: 'Jogo adicionado ao carrinho com sucesso!', carrinho });

    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }

  // Remover um jogo do carrinho
  async removeFromCart(req, res) {
    const gameId = req.params.gameId;
    const usuarioId = req.user.id;


    if (!gameId) {
      return res.status(400).json({ message: 'ID do jogo é obrigatório.' });
    }

    try {
      const carrinho = await carrinhoDAO.findAtivoByUser(usuarioId);
      if (!carrinho) {
        return res.status(400).json({ message: 'Carrinho encontra-se vazio.' });
      }

      const itemCarrinho = await itemCarrinhoDAO.findByCarrinhoAndGame(carrinho.id, gameId);

      if (itemCarrinho) {
        const result = await itemCarrinhoDAO.delete(itemCarrinho.id);
        if (result.changes > 0) {
          return res.status(200).json({ message: 'Jogo removido do carrinho com sucesso!' });
        }
      }

      res.status(404).json({ message: 'Jogo não encontrado no seu carrinho.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }

  // Visualizar o carrinho do usuário
  async show(req, res) {
    const usuarioId = req.user.id;

    try {
      const carrinho = await carrinhoDAO.findAtivoByUser(usuarioId);

      if (!carrinho) {
        return res.status(200).json({ message: 'Carrinho vazio.' });
      }

      const itens = await itemCarrinhoDAO.findByCarrinho(carrinho.id);
      carrinho.itens = itens;

      res.json({ carrinho });

    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }

  async all(req, res) {
    const usuarioId = req.user.id;

    try {
      const carrinhos = await carrinhoDAO.findByUser(usuarioId);

      const carrinhosComItens = await Promise.all(
        carrinhos.map(async (carrinho) => {
          const itens = await itemCarrinhoDAO.findByCarrinho(carrinho.id);
          return {...carrinho, itens};
        })
      );

      res.json({ carrinhosComItens });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }
}

module.exports = new CarrinhoController();
