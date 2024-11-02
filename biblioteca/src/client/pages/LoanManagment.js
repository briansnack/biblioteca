import React, { useState, useEffect } from 'react';

const LoanManagement = () => {
  const [loans, setLoans] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  // Carregar livros, usuários e empréstimos do backend
  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Erro ao buscar livros:', error));

    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));

    fetch('http://localhost:3000/api/loans')
      .then(response => response.json())
      .then(data => setLoans(data))
      .catch(error => console.error('Erro ao buscar empréstimos:', error));
  }, []);

  const addLoan = async () => {
    if (!selectedUser || !selectedBook) {
      alert("Selecione um usuário e um livro.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: selectedUser, book_id: selectedBook, return_date: '2024-12-31' }), // Exemplo de return_date
      });

      if (response.ok) {
        const addedLoan = await response.json();
        setLoans([...loans, addedLoan]);

        // Atualizar status do livro localmente
        setBooks(books.map(book => 
          book.id === addedLoan.book_id ? { ...book, status: 'emprestado' } : book
        ));

        setSelectedUser('');
        setSelectedBook('');
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao realizar empréstimo:', error);
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Empréstimos</h2>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">Selecione um usuário</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <select onChange={(e) => setSelectedBook(e.target.value)} value={selectedBook}>
        <option value="">Selecione um livro</option>
        {books.filter(book => book.status === 'disponível').map((book) => (
          <option key={book.id} value={book.id}>{book.title}</option>
        ))}
      </select>
      <button onClick={addLoan}>Realizar Empréstimo</button>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            {loan.user_id} emprestou "{loan.book_id}" em {loan.loan_date} 
            {loan.returned ? ` (Retornado em ${loan.return_date})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanManagement;