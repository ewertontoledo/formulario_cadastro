const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'cadastro_db'
});

db.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected to database');
});

app.post('/cadastro', (req, res) => {
  const { nome, idade, cpf, profissao } = req.body;
  const query = 'INSERT INTO cadastro (nome, idade, cpf, profissao) VALUES (?, ?, ?, ?)';
  db.execute(query, [nome, idade, cpf, profissao], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('Cadastro realizado com sucesso');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});