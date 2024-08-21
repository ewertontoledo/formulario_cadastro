import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Certifique-se de importar o CSS

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/usuarios')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  const handleDelete = async (userId) => {
    const response = await fetch(`http://localhost:3001/api/usuarios/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Usuário excluído com sucesso!');
      setUsers(users.filter(user => user.id !== userId));
    } else {
      alert('Erro ao excluir usuário.');
    }
  };

  return (
    <div className="user-list-container">
    <h3>Após listar usuários, para atualizar cadastro, clicar em "editar" e para deletar, clique em "excluir"</h3>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <div><strong>Nome:</strong> {user.nome}</div>
              <div><strong>Idade:</strong> {user.idade} anos</div>
              <div><strong>CPF:</strong> {user.cpf}</div>
              <div><strong>Profissão:</strong> {user.profissao}</div>
            </div>
            <div className="user-actions">
              <button className="button delete" onClick={() => handleDelete(user.id)}>Excluir</button>
              <Link className="button edit" to={`/usuarios/editar/${user.id}`}>Editar</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;


