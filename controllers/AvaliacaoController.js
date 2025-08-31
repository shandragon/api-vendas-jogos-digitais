const avaliacaoDAO = require('../daos/AvaliacaoDAO');
const Avaliacao = require('../models/Avaliacao');

class AvaliacaoController {
  async create(req, res) {
    const { jogoId, nota, comentario } = req.body;
    const usuarioId = req.user.id;

    if (!jogoId || !nota) {
      return res.status(400).json({ message: 'ID do jogo e nota são obrigatórios.' });
    }

    if (nota < 1 || nota > 5) {
      return res.status(400).json({ message: 'A nota deve ser entre 1 e 5.' });
    }

    try {
      const avaliacaoExistente = await avaliacaoDAO.findByUserAndGame(usuarioId, jogoId);
      if (avaliacaoExistente) {
        return res.status(400).json({ message: 'Você já avaliou este jogo.' });
      }

      const novaAvaliacao = new Avaliacao(null, jogoId, usuarioId, nota, comentario || '');

      const resultado = await avaliacaoDAO.create(novaAvaliacao);
      res.status(201).json({ message: 'Avaliação criada com sucesso!', avaliacao: resultado });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }

  async update(req, res) {
    const { jogoId, nota, comentario } = req.body;
    const usuarioId = req.user.id;

    if (!jogoId || !nota) {
      return res.status(400).json({ message: 'ID do jogo e nota são obrigatórios.' });
    }

    if (nota < 1 || nota > 5) {
      return res.status(400).json({ message: 'A nota deve ser entre 1 e 5.' });
    }

    try {
      const avaliacaoExistente = await avaliacaoDAO.findByUserAndGame(usuarioId, jogoId);
      if (!avaliacaoExistente) {
        return res.status(404).json({ message: 'Avaliação não encontrada para este jogo.' });
      }

      const resultado = await avaliacaoDAO.update(avaliacaoExistente.id, nota, comentario || '');
      if (resultado.changes === 0) {
        return res.status(400).json({ message: 'Nenhuma alteração foi feita na avaliação.' });
      }

      res.json({ message: 'Avaliação atualizada com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }

  async index(req, res) {
    const jogoId = req.query.jogoId;
    const usuarioId = req.user.id;

    try {
      let avaliacoes;
      if (jogoId) {
        avaliacoes = await avaliacaoDAO.findByUserAndGame(usuarioId, jogoId);
      } else {
        avaliacoes = await avaliacaoDAO.findByUser(usuarioId);
      }

      if (!avaliacoes || avaliacoes.length === 0) {
        return res.status(204).json();
      }

      res.json(avaliacoes);
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }

  async mediaAvaliacoes(req, res) {
    const jogoId = req.params.jogoId;

    if (!jogoId) {
      return res.status(400).json({ message: 'ID do jogo é obrigatório.' });
    }

    try {
      const avaliacoes = await avaliacaoDAO.findByGame(jogoId);
      if (!avaliacoes || avaliacoes.length === 0) {
        return res.status(204).json();
      }

      const somaNotas = avaliacoes.reduce((sum, a) => sum + a.nota, 0);
      const media = somaNotas / avaliacoes.length;

      res.json({ media: parseFloat(media.toFixed(2)), totalAvaliacoes: avaliacoes.length, avaliacoes });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
  }
}
module.exports = new AvaliacaoController();