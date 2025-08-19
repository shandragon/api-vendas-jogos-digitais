const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioDAO = require('../daos/UsuarioDAO');
const PerfilDAO = require('../daos/PerfilDAO');

class AuthController {
    async register(req, res) {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        try {
            const existingUser = await UsuarioDAO.getByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'E-mail já cadastrado.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(senha, salt);

            const clienteProfile = await PerfilDAO.getByName('Cliente');
            if (!clienteProfile) {
                return res.status(500).json({ message: 'Perfil de cliente não encontrado.' });
            }

            const newUser = await UsuarioDAO.create({ nome, email, senha: hashedPassword, fkPerfil: clienteProfile.id });

            res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: newUser.id });
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor ao tentar cadastrar usuário.', error: error.message });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
        }

        try {
            const user = await UsuarioDAO.getByEmail(email);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const isMatch = await bcrypt.compare(senha, user.senha);
            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciais inválidas.' });
            }

            const payload = {
                id: user.id,
                nome: user.nome,
                perfil: user.perfil
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ message: 'Login bem-sucedido!', token });

        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor ao tentar fazer login.', error: error.message });
        }
    }
}

module.exports = new AuthController();
