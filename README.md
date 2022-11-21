# API Digital Wallet.

# Guia prático de conteúdos:

- [API Digital Wallet.](#api-digital-wallet)
- [Guia prático de conteúdos:](#guia-prático-de-conteúdos)
  - [1. Visao geral do projeto](#1-visao-geral-do-projeto)
    - [Linguagem utilizada no projeto:](#linguagem-utilizada-no-projeto)
  - [2. Diagrama de entidades relacionais](#2-diagrama-de-entidades-relacionais)
  - [3.1 Instalando as dependencias:](#31-instalando-as-dependencias)
  - [3.2 Configurando as variaveis de ambiente](#32-configurando-as-variaveis-de-ambiente)
  - [3.3 Ligando o servidor](#33-ligando-o-servidor)
  - [4. Users](#4-users)
    - [Endpoints da rota users](#endpoints-da-rota-users)
  - [4.1. Criação de Usuário](#41-criação-de-usuário)
    - [Exemplo de Request:](#exemplo-de-request)
    - [Corpo da Requisição:](#corpo-da-requisição)
    - [Exemplo de Response:](#exemplo-de-response)
    - [Possíveis Erros:](#possíveis-erros)
  - [4.2. Login](#42-login)
    - [Exemplo de Request:](#exemplo-de-request-1)
    - [Corpo da Requisição:](#corpo-da-requisição-1)
    - [Exemplo de Response:](#exemplo-de-response-1)
    - [Possíveis Erros:](#possíveis-erros-1)
  - [5. Account](#5-account)
    - [Endpoints da rota users](#endpoints-da-rota-users-1)
  - [5.1. Visualização da conta](#51-visualização-da-conta)
    - [Exemplo de Request:](#exemplo-de-request-2)
    - [Parâmetros da Requisição:](#parâmetros-da-requisição)
    - [Corpo da Requisição:](#corpo-da-requisição-2)
    - [Exemplo de Response:](#exemplo-de-response-2)
    - [Possíveis Erros:](#possíveis-erros-2)
  - [6. Transactions](#6-transactions)
    - [Endpoints da rota users](#endpoints-da-rota-users-2)
  - [6.1. Realização de uma nova transação.](#61-realização-de-uma-nova-transação)
    - [Exemplo de Request:](#exemplo-de-request-3)
    - [Parâmetros da Requisição:](#parâmetros-da-requisição-1)
    - [Corpo da Requisição:](#corpo-da-requisição-3)
    - [Schema de validacao com Yup:](#schema-de-validacao-com-yup)
    - [Exemplo de Response:](#exemplo-de-response-3)
    - [Possíveis Erros:](#possíveis-erros-3)
  - [6.2. Listagem das transações.](#62-listagem-das-transações)
    - [Exemplo de Request:](#exemplo-de-request-4)
    - [Parâmetros da Requisição:](#parâmetros-da-requisição-2)
    - [Corpo da Requisição:](#corpo-da-requisição-4)
    - [Exemplo de Response:](#exemplo-de-response-4)
    - [Possíveis Erros:](#possíveis-erros-4)

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
- [yup](https://www.npmjs.com/package/yup)
- [cors](https://www.npmjs.com/package/cors)

### Linguagem utilizada no projeto:

Todo o codigo da api foi feito a partir do typescript. Por isso, para instalar as dependencias sera necessario passar a tipagem e instalar as dev dependencies.

**@types/biblioteca -D**

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

| Campo     | Tipo   | Descrição                               |
| --------- | ------ | --------------------------------------- |
| id        | string | Identificador único do usuário          |
| username  | string | O nome do usuário.                      |
| password  | string | A senha de acesso do usuário            |
| accountId | string | Identificador único da conta do usuário |

### Endpoints da rota users

| Método | Rota         | Descrição             |
| ------ | ------------ | --------------------- |
| POST   | /user/signup | Criação de uma conta. |
| POST   | /user/signin | Login de uma conta.   |

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
  "username": "teste",
  "password": "1234567M"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": 1,
  "username": "teste",
  "accountId": 1
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                                      |
| -------------- | -------------------------------------------------------------- |
| 409 Conflict   | Username already exists!                                       |
| 409 Conflict   | Username must have at least 3 characteres.                     |
| 403 Forbidden  | The password does not match what is expected from the pattern. |

---

## 4.2. Login

### Exemplo de Request:

```
POST /user/signin
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "username": "teste",
  "password": "1234567M"
}
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImFjY291bnRJZCI6MSwiaWF0IjoxNjY5MDQyMzc2LCJleHAiOjE2NjkxMjg3NzZ9.HRzO-AXOh4K6X7KIq1lMqVkaFlBmFPV5ImO_vxQu4Vs"
}
```

### Possíveis Erros:

| Código do Erro | Descrição             |
| -------------- | --------------------- |
| 403 Forbidden  | Wrong email/password. |

---

## 5. Account

O objeto User é definido como:

| Campo   | Tipo   | Descrição                      |
| ------- | ------ | ------------------------------ |
| id      | string | Identificador único do usuário |
| balance | number | O balance da conta do usuário. |

### Endpoints da rota users

| Método | Rota        | Descrição                        |
| ------ | ----------- | -------------------------------- |
| GET    | /account/me | Visualização da conta do usuário |

---

## 5.1. Visualização da conta

### Exemplo de Request:

```
GET /account/me
Host: http://localhost:3000
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro    | Tipo   | Descrição                             |
| ------------ | ------ | ------------------------------------- |
| Bearer Token | string | Token de acesso temporário do usuário |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "balance": "100"
}
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 401 Unauthorized | Unauthorized.            |
| 404 Not Found    | Account does not exists! |

---

## 6. Transactions

O objeto User é definido como:

| Campo             | Tipo   | Descrição                               |
| ----------------- | ------ | --------------------------------------- |
| id                | number | Identificador único do usuário.         |
| debitedAccountId  | number | Identificador único da conta debitada.  |
| creditedAccountId | number | Identificador único da conta creditada. |
| value             | number | Valor da transação realizada.           |
| createdAt         | string | Data de realização da transação.        |

### Endpoints da rota users

| Método | Rota              | Descrição                                        |
| ------ | ----------------- | ------------------------------------------------ |
| POST   | /transaction/new  | Realização de uma nova transação.                |
| GET    | /transaction/list | Listagem das transações realizadas pelo usuário. |

---

## 6.1. Realização de uma nova transação.

### Exemplo de Request:

```
POST /transaction/new
Host: http://localhost:3000
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro    | Tipo   | Descrição                             |
| ------------ | ------ | ------------------------------------- |
| Bearer Token | string | Token de acesso temporário do usuário |

### Corpo da Requisição:

```json
{
  "username": "teste",
  "cashOut": "44.5"
}
```

### Schema de validacao com Yup:

```javascript
  schema: {
    body: {
      yupSchema: yup
        .object()
        .shape({
          username: yup.string().required("username is required"),
          cashOut: yup.number().positive().required("number is required"),
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
200 OK
```

```json
{
  "transation": {
    "id": 2,
    "debitedAccountId": 1,
    "creditedAccountId": 2,
    "value": "44.5",
    "createdAt": "2022-11-20T19:45:56.477Z"
  }
}
```

### Possíveis Erros:

| Código do Erro         | Descrição                                         |
| ---------------------- | ------------------------------------------------- |
| 400 Bad Request        | Key is required.                                  |
| 401 Unauthorized       | Unauthorized.                                     |
| 404 Not Found          | Username doesn't exist.                           |
| 405 Method Not Allowed | You are not allowed to transfer to yourself.      |
| 405 Method Not Allowed | You are not allowed to transfer negative balance. |
| 401 Unauthorized       | Negative balance.                                 |

---

## 6.2. Listagem das transações.

### Exemplo de Request:

```
GET /transaction/list
Host: http://localhost:3000
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro    | Tipo   | Descrição                             |
| ------------ | ------ | ------------------------------------- |
| Bearer Token | string | Token de acesso temporário do usuário |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
  "transactions": {
    "sentTransaction": [],
    "receivedTransaction": []
  }
}
```

### Possíveis Erros:

| Código do Erro   | Descrição     |
| ---------------- | ------------- |
| 401 Unauthorized | Unauthorized. |

---
