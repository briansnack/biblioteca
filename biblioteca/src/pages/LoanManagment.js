// src/pages/LoanManagement.js
import React, { useState } from 'react';

function LoanManagement() {
  const [user, setUser] = useState('');
  const [book, setBook] = useState('');

  const handleLoanBook = () => {
    // Lógica para realizar empréstimo
    console.log('Empréstimo realizado:', { user, book });
  };

  return (
    <div>
      <h2>Gestão de Empréstimos</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Usuário</label>
          <input
            type="text"
            className="form-control"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Livro</label>
          <input
            type="text"
            className="form-control"
            value={book}
            onChange={(e) => setBook(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLoanBook}>
          Realizar Empréstimo
        </button>
      </form>
    </div>
  );
}

export default LoanManagement;