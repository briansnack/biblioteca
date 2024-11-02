const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const enviarNotificacao = require('./services/mailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota para obter todos os livros
app.get('/api/books', async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT * FROM books');
    res.json(results);
  } catch (err) {
    console.error('Erro ao buscar livros:', err);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Rota para adicionar um novo livro
app.post('/api/books', async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const [results] = await db.promise().query(
      'INSERT INTO books (title, author, genre, status) VALUES (?, ?, ?, "disponível")',
      [title, author, genre]
    );
    res.status(201).json({ id: results.insertId, title, author, genre, status: "disponível" });
  } catch (err) {
    console.error('Erro ao adicionar livro:', err);
    res.status(500).json({ error: 'Erro ao adicionar livro' });
  }
});

// Rota para adicionar um novo usuário
app.post('/api/users', async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const [results] = await db.promise().query(
      'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
      [name, email, role]
    );
    res.status(201).json({ id: results.insertId, name, email, role });
  } catch (err) {
    console.error('Erro ao adicionar usuário:', err);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
});

// Rota para realizar um empréstimo
app.post('/api/loans', async (req, res) => {
  const { book_id, user_id, return_date } = req.body;
  const loan_date = new Date();

  try {
    // Verificar se o livro está disponível
    const [bookResults] = await db.promise().query(
      'SELECT * FROM books WHERE id = ? AND status = "disponível"',
      [book_id]
    );

    if (bookResults.length === 0) {
      return res.status(400).json({ error: 'Livro não disponível para empréstimo' });
    }

    // Atualizar o status do livro para 'emprestado'
    await db.promise().query('UPDATE books SET status = "emprestado" WHERE id = ?', [book_id]);

    // Registrar o empréstimo
    const [loanResults] = await db.promise().query(
      'INSERT INTO loans (book_id, user_id, loan_date, return_date, returned) VALUES (?, ?, ?, ?, false)',
      [book_id, user_id, loan_date, return_date]
    );

    // Obter o e-mail do usuário
    const [userResults] = await db.promise().query('SELECT email FROM users WHERE id = ?', [user_id]);

    if (userResults.length > 0) {
      const userEmail = userResults[0].email;
      const subject = 'Confirmação de Empréstimo de Livro';
      const message = `Olá,\n\nVocê emprestou o livro "${bookResults[0].title}". Por favor, devolva até ${return_date}.\n\nObrigado!`;

      try {
        await enviarNotificacao(userEmail, subject, message);
      } catch (notificationError) {
        console.error('Erro ao enviar notificação:', notificationError);
      }
    }

    res.status(201).json({ id: loanResults.insertId, book_id, user_id, loan_date, return_date, returned: false });
  } catch (err) {
    console.error('Erro ao registrar empréstimo:', err);
    res.status(500).json({ error: 'Erro ao registrar empréstimo' });
  }
});

// Rota para retornar um livro
app.post('/api/returns', async (req, res) => {
  const { loan_id } = req.body;
  const return_date = new Date();

  try {
    // Verificar se o empréstimo existe e não foi retornado
    const [loanResults] = await db.promise().query(
      'SELECT * FROM loans WHERE id = ? AND returned = false',
      [loan_id]
    );

    if (loanResults.length === 0) {
      return res.status(400).json({ error: 'Empréstimo inválido ou já retornado' });
    }

    const { book_id } = loanResults[0];

    // Atualizar o status do livro para 'disponível'
    await db.promise().query('UPDATE books SET status = "disponível" WHERE id = ?', [book_id]);

    // Atualizar o empréstimo para indicar que foi retornado
    await db.promise().query('UPDATE loans SET returned = true, return_date = ? WHERE id = ?', [return_date, loan_id]);

    res.status(200).json({ message: 'Livro retornado com sucesso', loan_id, return_date });
  } catch (err) {
    console.error('Erro ao retornar livro:', err);
    res.status(500).json({ error: 'Erro ao retornar livro' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});