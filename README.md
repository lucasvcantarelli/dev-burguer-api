# 🍔 Dev Burguer API

API REST de uma hamburgueria com cadastro de usuários, autenticação, catálogo de produtos e categorias e gestão de pedidos.

> **Status:** backend concluído · front-end em desenvolvimento

## Funcionalidades

- Cadastro de usuários e login com geração de token **JWT** (senhas criptografadas com **bcrypt**)
- Controle de acesso: rotas protegidas por autenticação e rotas restritas a **administradores**
- CRUD de **produtos** (nome, preço, categoria, oferta e imagem)
- CRUD de **categorias** com imagem
- Upload de imagens com **Multer** e acesso público aos arquivos enviados
- Criação e listagem de **pedidos** e atualização do status do pedido (admin)
- Validação dos dados de entrada com **Yup**

## Tecnologias

| Camada | Ferramentas |
| --- | --- |
| Runtime / Framework | Node.js, Express 5 (ES Modules) |
| Banco relacional | PostgreSQL + Sequelize (migrations com sequelize-cli) |
| Banco não relacional | MongoDB + Mongoose (pedidos) |
| Autenticação | JSON Web Token, bcrypt |
| Upload | Multer, uuid |
| Validação | Yup |
| Qualidade de código | Biome |

### Por que dois bancos?

Usuários, produtos e categorias são dados relacionais (produto pertence a uma categoria) e ficam no **PostgreSQL**. Os pedidos guardam uma "foto" dos produtos no momento da compra (nome, preço, categoria, quantidade e imagem), um documento flexível que fica no **MongoDB**.

## Estrutura

```
src/
├── app/
│   ├── controllers/   # Regras de cada recurso (User, Session, Product, Category, Order)
│   ├── middlewares/   # auth (JWT) e admin
│   ├── models/        # Models Sequelize (User, Product, Category)
│   └── schemas/       # Schema Mongoose (Order)
├── config/            # Banco, autenticação, Multer e rota de arquivos
├── database/
│   ├── index.js       # Conexão com PostgreSQL e MongoDB
│   └── migrations/    # Migrations do Sequelize
├── app.js             # Configuração do Express
├── routes.js          # Rotas da API
└── server.js          # Inicialização do servidor (porta 3001)
```

## Rotas

Rotas marcadas com 🔒 exigem o header `Authorization: Bearer <token>`. Rotas com 👑 exigem usuário administrador.

| Método | Rota | Descrição | Acesso |
| --- | --- | --- | --- |
| POST | `/users` | Cria um usuário | Público |
| POST | `/sessions` | Faz login e retorna o token | Público |
| GET | `/products` | Lista produtos | 🔒 |
| POST | `/products` | Cria produto (multipart com `file`) | 🔒 👑 |
| PUT | `/products/:id` | Atualiza produto | 🔒 👑 |
| GET | `/categories` | Lista categorias | 🔒 |
| POST | `/categories` | Cria categoria (multipart com `file`) | 🔒 👑 |
| PUT | `/categories/:id` | Atualiza categoria | 🔒 👑 |
| POST | `/orders` | Cria pedido | 🔒 |
| GET | `/orders` | Lista pedidos | 🔒 |
| PUT | `/orders/:id` | Atualiza o status do pedido | 🔒 👑 |

Imagens enviadas ficam disponíveis em `/product-file/<arquivo>` e `/category-file/<arquivo>`.

### Exemplos

**Criar pedido** — `POST /orders`

```json
{
  "products": [
    { "id": 1, "quantity": 2 },
    { "id": 3, "quantity": 1 }
  ]
}
```

**Atualizar status** — `PUT /orders/:id`

```json
{ "status": "Saiu para entrega" }
```

## Como rodar localmente

**Pré-requisitos:** Node.js, pnpm, PostgreSQL (porta 5432) e MongoDB (porta 27017). Uma forma prática é subir os bancos com Docker:

```bash
docker run --name devburguer-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=<sua_senha> -e POSTGRES_DB=dev-burguer-db -p 5432:5432 -d postgres
docker run --name devburguer-mongo -p 27017:27017 -d mongo
```

1. Clone o repositório e instale as dependências:

```bash
git clone https://github.com/lucasvcantarelli/dev-burguer-api.git
cd dev-burguer-api
pnpm install
```

2. Ajuste as credenciais do banco em `src/config/database.cjs` e o segredo do JWT em `src/config/auth.js`.

3. Rode as migrations:

```bash
pnpm exec sequelize-cli db:migrate
```

4. Inicie o servidor (modo watch):

```bash
pnpm dev
```

A API fica disponível em `http://localhost:3001`.

## Próximos passos

- [ ] Front-end consumindo a API
- [ ] Variáveis de ambiente (`.env`) para credenciais e segredo do JWT
- [ ] Documentação interativa das rotas

## Autor

**Lucas Cantarelli** · Desenvolvedor Full Stack

[LinkedIn](https://www.linkedin.com/in/devlucascantarelli) · [Portfólio](https://cantarellitech.com.br) · [GitHub](https://github.com/lucasvcantarelli)
