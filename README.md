# 🛒 Gestão de vendas API — Backend
API do sistema de gestão de vendas, construída em **Node.js + Express + Sequelize**, com suporte a SQLite e PostgreSQL e preparada para ambiente Docker.

## 🚀 Tecnologias
- Node.js 20
- Express
- express-promise-router
- Sequelize ORM
- SQLite / PostgreSQL
- JSON Web Token (JWT)
- Bcrypt
- Dotenv
- Axios
- Nodemon (dev)

## 📂 Estrutura
```
api/
 ├── server.js
 ├── routes/
 ├── controllers/
 ├── models/
 ├── config/
 └── .env
```

## ▶️ Scripts
```bash
npm run dev     # modo desenvolvimento (nodemon)
npm start       # modo produção
npm run lint    # ESLint
```

## 🔐 Autenticação
A API utiliza JWT com fluxo de login → geração de token → middleware de verificação.

## 🐳 Docker
A API pode ser executada dentro de um container (exemplo no docker-compose do projeto).