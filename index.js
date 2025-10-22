const express = require('express');
const cors = require('cors');
const v1Routes = require('./routes/v1');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('ERRO: O arquivo .env não foi encontrado!');
  console.error('Por favor, crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias.');

  process.exit(1);
}

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

// Realiza um parse do body para uma estrutura JSON
app.use(express.json());

// Habilitar o middleware CORS para todas as rotas
app.use(cors());

app.listen(APP_PORT, '0.0.0.0', () => {
  console.log(`API de vendas de jogos em execução na porta ${APP_PORT}.`);
  console.log(`Acesse a url http://localhost:${APP_PORT}`);
});

app.get('/check', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API está funcionando corretamente.' });
});

app.use('/api/v1', v1Routes);


