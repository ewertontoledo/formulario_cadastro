require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Cria uma instância da app
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Configurar o CORS
app.use(cors());

// Configurar a conexão com o banco de dados
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Verificar conexão com o banco de dados
db.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Conectado ao banco de dados MySQL.');
  connection.release();
});

// Função para validar CPF
const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; // CPF deve ter 11 dígitos e não pode ser uma sequência repetida
  }
  
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
};

// Função para verificar se o CPF já existe no banco de dados
const verificarCPFExistente = (cpf, callback) => {
  const query = 'SELECT COUNT(*) AS count FROM usuarios WHERE cpf = ?';
  
  db.query(query, [cpf], (err, results) => {
    if (err) {
      console.error('Erro ao verificar CPF:', err);
      callback(err, null);
    } else {
      callback(null, results[0].count > 0);
    }
  });
};


// Rota POST para o caminho '/api/cadastro'
app.post('/api/cadastro', (req, res) => {
  const { nome, idade, cpf, profissao } = req.body;

  if (!validarCPF(cpf)) {
    return res.status(400).send('CPF inválido.');
  }

  verificarCPFExistente(cpf, (err, cpfExistente) => {
    if (err) {
      return res.status(500).send('Erro ao verificar CPF.');
    }
    
    if (cpfExistente) {
      return res.status(400).send('CPF já existente.');
    }

    const query = 'INSERT INTO usuarios (nome, idade, cpf, profissao) VALUES (?, ?, ?, ?)';
    
    db.query(query, [nome, idade, cpf, profissao], (err) => {
      if (err) {
        console.error('Erro ao inserir no banco de dados:', err);
        res.status(500).send('Erro ao realizar o cadastro.');
      } else {
        res.status(200).send('Cadastro realizado com sucesso!');
      }
    });
  });
});

// Rota GET para obter todos os usuários
app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).send('Erro ao buscar usuários.');
    } else {
      res.status(200).json(results);
    }
  });
});


// Rota GET para obter um usuário específico pelo ID
app.get('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).send('Erro ao buscar usuário.');
    } else if (results.length === 0) {
      res.status(404).send('Usuário não encontrado.');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, idade, cpf, profissao } = req.body;

  const query = 'UPDATE usuarios SET nome = ?, idade = ?, cpf = ?, profissao = ? WHERE id = ?';
  
  db.query(query, [nome, idade, cpf, profissao, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).send('Erro ao atualizar usuário.');
    } else {
      res.status(200).send('Usuário atualizado com sucesso!');
    }
  });
});


// Rota DELETE para excluir um usuário pelo ID
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM usuarios WHERE id = ?';
  
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      res.status(500).send('Erro ao excluir usuário.');
    } else {
      res.status(200).send('Usuário excluído com sucesso!');
    }
  });
});

// Faz o servidor Express começar a escutar na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});