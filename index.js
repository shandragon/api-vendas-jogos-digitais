const express = require('express');
const v1Routes = require('./routes/v1');

const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

// Realiza um parse do body para uma estrutura JSON
app.use(express.json());

app.listen(APP_PORT, '0.0.0.0', () => {
  console.log(`API de vendas de jogos em execução na porta ${APP_PORT}.`);
  console.log(`Acesse a url http://localhost:${APP_PORT}`);
});

app.get('/check', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API está funcionando corretamente.' });
});

app.use('/api/v1', v1Routes);


