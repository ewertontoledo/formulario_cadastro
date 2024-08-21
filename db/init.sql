-- Cria o banco de dados apenas se não existir
CREATE DATABASE IF NOT EXISTS cadastro_db;

USE cadastro_db;

-- Cria a tabela usuarios apenas se não existir
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  idade INT NOT NULL,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  profissao VARCHAR(100) NOT NULL
);