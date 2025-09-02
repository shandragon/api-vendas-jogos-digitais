const { hashPassword, verifyPassword } = require('../util/cripto');
const jwt = require('jsonwebtoken');
const UsuarioDAO = require('../daos/UsuarioDAO');
const PerfilDAO = require('../daos/PerfilDAO');

class AuthController {
    async register(req, res) {
        const { nome, email, senha } = req.body;
        let { dataNascimento } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        if (dataNascimento) {
            const [dia, mes, ano] = dataNascimento.split('/');
            dataNascimento = new Date(`${ano}-${mes}-${dia}T00:00:00`);
            if (isNaN(Date.parse(dataNascimento))) {
                return res.status(400).json({ message: 'Data de nascimento inválida.' });
            }
            dataNascimento = dataNascimento.toISOString();
        }

        try {
            const existingUser = await UsuarioDAO.getByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'E-mail já cadastrado.' });
            }

            const hashedPassword = await hashPassword(senha);

            const clienteProfile = await PerfilDAO.getByName('Cliente');
            if (!clienteProfile) {
                return res.status(500).json({ message: 'Perfil de cliente não encontrado.' });
            }

            const newUser = await UsuarioDAO.create({ nome, email, dataNascimento, senha: hashedPassword, fkPerfil: clienteProfile.id });

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

            const isMatch = await verifyPassword(senha, user.senha);
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

    async changePassword(req, res) {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        console.log(req.body);

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Senha atual e nova senha são obrigatórias.' });
        }
        
        try {
            const user = await UsuarioDAO.getWithPasswd(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            console.log(user)
            const isMatch = await verifyPassword(currentPassword, user.senha);
            if (!isMatch) {
                return res.status(401).json({ message: 'Senha atual incorreta.' });
            }

            const hashedNewPassword = await hashPassword(newPassword);
            await UsuarioDAO.updatePassword(userId, hashedNewPassword);

            res.json({ message: 'Senha alterada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor ao tentar alterar a senha.', error: error.message });
        }
    }
}

module.exports = new AuthController();
