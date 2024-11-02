import React, { useState, useEffect } from 'react';
import { loadFromStorage } from '../utils/storage';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '' });

  // Carregar livros do backend
  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Erro ao buscar livros:', error));
  }, []);

  const addBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.genre) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        const addedBook = await response.json();
        setBooks([...books, addedBook]);
        setNewBook({ title: '', author: '', genre: '' });
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Livros</h2>
      <input
        type="text"
        placeholder="Título"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Autor"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
      />
      <input
        type="text"
        placeholder="Gênero"
        value={newBook.genre}
        onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
      />
      <button onClick={addBook}>Adicionar Livro</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} - {book.author} ({book.genre})</li>
        ))}
      </ul>
    </div>
  );
};

export default BookManagement;