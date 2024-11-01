import React, { useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage } from '../utils/storage';

const LoanManagement = () => {
  const [loans, setLoans] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setBooks(loadFromStorage('books'));
    setUsers(loadFromStorage('users'));
    setLoans(loadFromStorage('loans'));
  }, []);

  const addLoan = () => {
    const newLoan = { user: selectedUser, book: selectedBook, date: new Date().toLocaleDateString() };
    const updatedLoans = [...loans, newLoan];
    setLoans(updatedLoans);
    saveToStorage('loans', updatedLoans);
  };

  return (
    <div>
      <h2>Gerenciamento de Empréstimos</h2>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">Selecione um usuário</option>
        {users.map((user, index) => (
          <option key={index} value={user.name}>{user.name}</option>
        ))}
      </select>
      <select onChange={(e) => setSelectedBook(e.target.value)} value={selectedBook}>
        <option value="">Selecione um livro</option>
        {books.map((book, index) => (
          <option key={index} value={book.title}>{book.title}</option>
        ))}
      </select>
      <button onClick={addLoan}>Realizar Empréstimo</button>
      <ul>
        {loans.map((loan, index) => (
          <li key={index}>{loan.user} emprestou "{loan.book}" em {loan.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoanManagement;