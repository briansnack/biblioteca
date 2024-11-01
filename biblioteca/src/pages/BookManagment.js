// src/pages/BookManagement.js
import React, { useState } from 'react';

function BookManagement() {
  const [bookTitle, setBookTitle] = useState('');

  const handleAddBook = () => {
    // Lógica para adicionar livro
    console.log('Livro adicionado:', bookTitle);
  };

  return (
    <div>
      <h2>Gestão de Livros</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Título do Livro</label>
          <input
            type="text"
            className="form-control"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddBook}>
          Adicionar Livro
        </button>
      </form>
    </div>
  );
}

export default BookManagement;