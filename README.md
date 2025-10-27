# API de Vendas de Jogos Digitais

## 1. Escopo

Uma API RESTful responsável por gerenciar uma loja de jogos digitais.

### 1.1 Funcionalidades Gerais

- Permite a busca de uma empresa.
- Permite o cadastro, a edição e a remoção de uma empresa para o usuário de perfil admin.
- Permite a busca de um jogo.
- Permite o cadastro, a edição e a remoção de um jogo para o usuário de perfil admin.

## 2. Requisitos Funcionais da API

### 2.1. Autenticação e Autorização

RF01 – Permitir cadastro de usuário com: nome completo, e-mail, senha, data de nascimento.

RF02 – Permitir login de usuário com e-mail e senha.

RF03 – Diferenciar perfis de acesso: cliente e administrador.

RF04 – Autenticação baseada em JWT.

### 2.2. Jogos

RF01 – Cadastrar jogo (apenas admin) com: título, descrição, categoria, preço, ano de lançamento, desenvolvedora.

RF02 – Listar todos os jogos com filtros por: categoria e palavras-chave no título/descrição.

RF03 – Detalhar um jogo específico.

RF04 – Permitir ao usuário adicionar jogos à lista de desejos.

RF05 – Permitir ao usuário adicionar jogos ao carrinho.

RF06 – Permitir listar todas as categorias.

RF07 – Buscar uma categoria específica.

### 2.3. Vendas

RF01 – Finalizar venda (simulação de pagamento).

RF01 – Consultar histórico de compras do usuário.

RF02 – Gerar uma chave de ativação automaticamente.

### 2.4. Avaliações do Jogo

RF01 – Usuários podem avaliar jogos com nota (1–5) e comentário.

RF02 – API disponibilizará média de avaliações e quantidade de comentários.

RF03 – Comentários devem permitir marcação de spoilers (EM CONSTRUÇÃO).

## 3. Requisitos Não Funcionais

A API fornecerá informações de modo a forçar o frontend a trabalhar com:

RNF01 – Exibição de mensagens claras de erro (ex.: campos obrigatórios, senha fraca, e-mail já cadastrado).

RNF02 – Retornar códigos HTTP adequados (200, 201, 400, 401, 403, 404, 422, 500).

RNF03 – Retornar mensagens de validação detalhadas em JSON legível (exemplo: "error": "Senha deve ter pelo menos 8 caracteres").

RNF04 – Suporte a paginação e ordenação em listagens (EM CONSTRUÇÃO).

RNF05 – API deve retornar mensagens de confirmação em operações sensíveis (ex.: exclusão de conta, remoção de item do carrinho).

## 4. Protocolos e Tecnologias

- Protocolo: HTTP/HTTPS
- Formato de dados: JSON
- Autenticação: JWT
- Padrão de API: RESTful
- Versionamento: /api/v1/...

