# <p align="center">Projeto Trybe Futebol Clube</p>

<div align="center">
  
| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-97.45%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-90.9%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-97.03%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-98.32%25-brightgreen.svg)    |

</div>

## Contexto

Este é um projeto full e consiste em um website informativo sobre partidas e classificações de futebol, onde o frontend foi disponibilizado pela `Trybe`. Minha responsabilidade foi desenvolver o backend utilizando o método `TDD` além da integração das aplicações via `docker-compose` e `teste de integração`.

<details>

<summary><strong>Rode o projeto localmente</strong></summary><br>

> ⚠️ É preciso ter o [Node](https://nodejs.org/en) instalado em sua máquina.
>

> ⚠️ É preciso usar a versão 16 do [Node](https://nodejs.org/en), rode `nvm use` 16.
>

> ⚠️ Caso não tenha o nvm instalado, siga a orientação de instalação no [link](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) e use a versão 16.
>
<!-- > ⚠️ É preciso criar um arquivo `.env` na raiz do projeto, siga o exemplo do arquivo [`env.example`](./env.example). -->
>

1. Clone o repositório:

```BASH
git clone git@github.com:mairess/project-trybe-futebol-clube.git
```

2. Instale as dependências:

```BASH
npm run install:apps
```

3. Inicie o container do banco de dados:

```BASH
npm run compose:db
```

4. Inicie os servidores:

```BASH
npm run start:servers
```

5. O servidor `back` estará disponível na porta `3001` e o `front` na porta `3000`

</details>

<details>

<summary><strong>Rode o projeto com o docker</strong></summary><br>

> ⚠️ É preciso ter o [Docker](https://www.docker.com/get-started/) instalado em sua máquina.

1. Clone o repositório:

```BASH
git clone git@github.com:mairess/project-trybe-futebol-clube.git
```

2. Suba os containers:

```BASH
npm run compose:up
```

3. O servidor `back` estará disponível na porta `3001` e o `front` na porta `3000`

</details>


<details>

<summary><strong>Rode os testes</strong></summary><br>

Rode os testes:

```SHELL
npm test
```

Rode a cobertura:

```SHELL
npm run test:coverage
```

</details>

## Documentação da API

A documentação desta api está disponível na rota `/api-docs`

## Tecnologias utilizadas

- Typescript
- Node
- Express
- Sequelize
- MySQL
- JWT
- Bcrypt
- Joi
- Docker
- Mocha
- Chai
- Sinon
- Swagger-ui
