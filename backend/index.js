
const express = require('express'); // Importa a biblioteca express para criar o servidor
const bodyParser = require('body-parser'); // Importa o body-parser para fazer o parse do corpo das requisições
const mysql = require('mysql2'); // Importa a biblioteca mysql2 para interagir com o banco de dados MySQL
 
// Cria uma instância do express
const app = express();
// Define a porta em que o servidor vai rodar
const port = ; // Defina a porta corretamente

// Middleware para parsear o corpo das requisições como JSON
app.use(bodyParser.json());

// Criar conexão com o banco de dados MySQL



//  Criar rota para cadastrar dados
