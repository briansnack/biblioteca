import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">Biblioteca</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/books">Gestão de Livros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/loans">Gestão de Empréstimos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">Gerenciar Usuários</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;