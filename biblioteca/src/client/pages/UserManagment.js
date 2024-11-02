import React, { useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage } from '../utils/storage';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  useEffect(() => {
    setUsers(loadFromStorage('users'));
  }, []);

  const addUser = () => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveToStorage('users', updatedUsers);
    setNewUser({ name: '', role: '' });
  };

  return (
    <div>
      <h2>Gerenciamento de Usuários</h2>
      <input
        type="text"
        placeholder="Nome"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Função (ex: Aluno, Professor)"
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      />
      <button onClick={addUser}>Adicionar Usuário</button>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;