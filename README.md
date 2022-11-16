# API Digital Wallet.

# Guia prático de conteúdos:

- [API Digital Wallet.](#api-digital-wallet)
- [Guia prático de conteúdos:](#guia-prático-de-conteúdos)
  - [1. Visao geral do projeto](#1-visao-geral-do-projeto)
    - [Linguagem utilizada no projeto:](#linguagem-utilizada-no-projeto)
    - [URL da API:](#url-da-api)
  - [2. Diagrama de entidades relacionais](#2-diagrama-de-entidades-relacionais)
  - [3.1 Instalando as dependencias:](#31-instalando-as-dependencias)
  - [3.2 Configurando as variaveis de ambiente](#32-configurando-as-variaveis-de-ambiente)
  - [3.3 Ligando o servidor](#33-ligando-o-servidor)
  - [4. Users](#4-users)
    - [Endpoints da rota users](#endpoints-da-rota-users)
  - [4.1. Criação de Usuário](#41-criação-de-usuário)
    - [Exemplo de Request:](#exemplo-de-request)
    - [Corpo da Requisição:](#corpo-da-requisição)
    - [Schema de Validação com Yup:](#schema-de-validação-com-yup)
    - [Exemplo de Response:](#exemplo-de-response)
    - [Possíveis Erros:](#possíveis-erros)

---

## 1. Visao geral do projeto

Dependencias utilizadas utilizadas.

- [prisma](https://www.prisma.io/docs/getting-started/quickstart)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [express](https://expressjs.com/pt-br/)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [express-yup-middleware](https://www.npmjs.com/package/express-yup-middleware)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)
- [uuid](https://www.npmjs.com/package/uuid)
- [yup](https://www.npmjs.com/package/yup)

### Linguagem utilizada no projeto:

Todo o codigo da api foi feito a partir do typescript. Por isso, para instalar as dependencias sera necessario passar a tipagem e instalar as dev dependencies.

**@types/biblioteca -D**

### URL da API:

https://capstone-m4.herokuapp.com/

## 2. Diagrama de entidades relacionais

![DER](diagram.png)

## 3.1 Instalando as dependencias:

- Clone o repositorio para sua maquina;
- Rode o seguinte comando para instalar todas as dependencias e gerar sua node_modules:

```shell
yarn
```

ou caso utilize o gerenciador de pacotes npm:

```shell
npm install
```

## 3.2 Configurando as variaveis de ambiente

Crie o arquivo **.env** seguindo a estrutura definida pelo **.env.example**

```
.env

POSTGRES_PASSWORD=SUA_SENHA
POSTGRES_USER=SEU_USER
POSTGRES_DB=SEU_DB
SECRET_KEY=SUA_SECRET_KEY
DATABASE_URL="postgresql://SEU_USER_AQUI:SUA_SENHA_AQUI@localhost:5432/SEU_DB_AQUI?schema=public"
```

Dessa forma voce vai configurar suas credenciais do postgres.

## 3.3 Ligando o servidor

```
sudo docker-compose up postgres
yarn prisma migrate dev
yarn dev
```

## 4. Users

O objeto User é definido como:

| Campo      | Tipo    | Descrição                         |
| ---------- | ------- | --------------------------------- |
| id         | string  | Identificador único do usuário    |
| name       | string  | O nome do usuário.                |
| email      | string  | O e-mail do usuário.              |
| password   | string  | A senha de acesso do usuário      |
| phone      | string  | O telefone do usuário             |
| isSupplier | boolean | Informa se o usuário é fornecedor |

### Endpoints da rota users

| Método | Rota            | Descrição                                                           |
| ------ | --------------- | ------------------------------------------------------------------- |
| POST   | /user/signup    | Criação de um usuário.                                              |
| POST   | /user/signin    | Login do usuário.                                                   |
| GET    | /user/me        | Lista um usuário usando seu token como parâmetro.                   |
| GET    | /user/suppliers | Lista todos os fornecedores usando o token de login como parâmetro. |
| PATCH  | /user/me        | Atualizar nome e email de um usuário.                               |
| PATCH  | /user/password  | Atualizar senha de um usuário.                                      |
| PATCH  | /user/role      | Atualizar função de um usuário.                                     |
| DELETE | /user/me        | Deletar um usuário.                                                 |

---

## 4.1. Criação de Usuário

### Exemplo de Request:

```
POST /user/signup
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Bico",
  "email": "bico@mail.com",
  "password": "1234",
  "phone": "1234-5678"
}
```

### Schema de Validação com Yup:

```javascript
schema: {
    body: {
      yupSchema: object()
        .shape({
          name: string().required("name is required"),
          email: string()
            .required("email is required")
            .email("Invalid email format"),
          password: string().required("password is required"),
          phone: string().required("Phone is required"),
        })
        .noUnknown(true),
      validateOptions: {
        abortEarly: false,
        stripUnknown: false,
      },
    },
  },
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "abfe0aca-f0f4-43d6-be13-2419fa172f19",
  "name": "Bico",
  "email": "bico@email.com",
  "phone": "1234-5678",
  "isSupplier": false
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                 |
| --------------- | ------------------------- |
| 409 Conflict    | Email already registered. |
| 400 Bad Request | Key is required.          |

---
