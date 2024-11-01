import React, { useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage } from '../utils/storage';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '' });

  // Carregar livros do localStorage
  useEffect(() => {
    const loadedBooks = loadFromStorage('books') || []; 
    setBooks(loadedBooks);
  }, []);

  const addBook = () => {
    if (!newBook.title || !newBook.author || !newBook.genre) {
      alert("Por favor, preencha todos os campos.");
      return; 
    }

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    saveToStorage('books', updatedBooks);
    setNewBook({ title: '', author: '', genre: '' }); 
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
        {books.map((book, index) => (
          <li key={index}>{book.title} - {book.author} ({book.genre})</li>
        ))}
      </ul>
    </div>
  );
};

export default BookManagement;