import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CadastroForm from './CadastroForm';
import UserList from './UserList';
import UpdateForm from './UpdateForm';
import './App.css'; // Importa o CSS

const App = () => {
  return (
    <Router>
      <div>
       <nav>
       <header>
          <h1>Formulário de cadastro</h1>
        </header>
          <ul>
            <li><Link to="/">Cadastro</Link></li>
            <li><Link to="/usuarios">Listar Usuários</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<CadastroForm />} />
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/usuarios/editar/:id" element={<UpdateForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


