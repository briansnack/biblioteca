import React, { useState, useEffect } from 'react';

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Carregar lista de livros ao montar o componente
  useEffect(() => {
    fetch('/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  // Função para adicionar um novo livro
  const handleAddBook = (e) => {
    e.preventDefault();
    fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author }),
    })
      .then((response) => response.json())
      .then((newBook) => {
        setBooks([...books, newBook]);
        setTitle('');
        setAuthor('');
      });
  };

  return (
    <div className="container">
      <h2>Gerenciamento de Livros</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Título do livro"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor do livro"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Adicionar Livro</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author} ({book.available ? 'Disponível' : 'Emprestado'})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookManagement;