const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 5000;

app.use(express.json());

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'biblioteca',
  password: 'B@nanaebom123',
  database: 'biblioteca'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota para obter todos os livros
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Rota para adicionar um livro
app.post('/books', (req, res) => {
  const { title, author, genre } = req.body;
  const query = 'INSERT INTO books (title, author, genre, status) VALUES (?, ?, ?, "disponível")';
  db.query(query, [title, author, genre], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, title, author, genre, status: "disponível" });
  });
});

// Rota para gerenciar empréstimos
app.post('/loans', (req, res) => {
  const { book_id, user_id } = req.body;
  const query = 'INSERT INTO loans (book_id, user_id, loan_date) VALUES (?, ?, CURDATE())';
  db.query(query, [book_id, user_id], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, book_id, user_id, loan_date: new Date() });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});