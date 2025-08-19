const adminMiddleware = (req, res, next) => {
  // Este middleware deve ser usado DEPOIS do authMiddleware,
  // pois ele depende do req.user que o authMiddleware define.
  if (!req.user || req.user.perfil !== 'Administrador') {
    return res.status(403).json({ message: 'Acesso negado. Rota exclusiva para administradores.' });
  }
  next();
};

module.exports = adminMiddleware;
