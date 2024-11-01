import React, { useState, useEffect } from 'react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  // Carregar lista de usuários ao montar o componente
  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  // Função para adicionar um novo usuário
  const handleAddUser = (e) => {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role }),
    })
      .then((response) => response.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        setName('');
        setRole('');
      });
  };

  return (
    <div className="container">
      <h2>Gerenciamento de Usuários</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Nome do usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Função (aluno, professor, funcionário)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <button type="submit">Adicionar Usuário</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;