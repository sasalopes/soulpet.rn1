// Importações principais e variáveis de ambiente
require("dotenv").config();
const express = require("express");
const morgan = require ("morgan");

// Configuração do App
const app = express();
app.use(express.json()); // Possibilitar transitar dados usando JSON
app.use(morgan("dev"));

// Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); // efetivar a conexão


//Definição de rotas

const rotasClientes = require("./routes/clientes");
const rotasPets = require("./routes/pets")

app.use(rotasClientes); //Configurar o grupo de rotas no app
app.use(rotasPets);
// Escuta de eventos (listen)
app.listen(5000, () => {
  // Gerar as tabelas a partir do model
  // Force = apaga tudo e recria as tabelas
  connection.sync() //({ force: true });
  console.log("Servidor rodando em http://localhost:5000/");
});