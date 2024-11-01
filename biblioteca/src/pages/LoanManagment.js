import React, { useState, useEffect } from 'react';

function LoanManagement() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetch('/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data));

    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleLoan = (e) => {
    e.preventDefault();
    fetch('/api/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId: selectedBook, userId: selectedUser }),
    }).then(() => {
      // Atualize a lista de livros para refletir o novo status de disponibilidade
      setBooks(books.map((book) => (book.id === selectedBook ? { ...book, available: false } : book)));
      setSelectedBook('');
      setSelectedUser('');
    });
  };

  return (
    <div className="container">
      <h2>Gerenciamento de Empréstimos</h2>
      <form onSubmit={handleLoan}>
        <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} required>
          <option value="">Selecione um livro</option>
          {books.filter((book) => book.available).map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Selecione um usuário</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">Realizar Empréstimo</button>
      </form>
    </div>
  );
}

export default LoanManagement;