import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateForm.css'; // Importa o CSS

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [profissao, setProfissao] = useState('');

  useEffect(() => {
    fetch(`http:///172.28.0.3:3001/api/usuarios/${id}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setNome(data.nome);
        setIdade(data.idade);
        setCpf(data.cpf);
        setProfissao(data.profissao);
      })
      .catch(error => console.error('Erro ao buscar usuário:', error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://172.28.0.3:3001/api/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, idade, cpf, profissao }),
    });

    if (response.ok) {
      alert('Usuário atualizado com sucesso!');
      navigate('/usuarios'); // Redireciona para a lista de usuários
    } else {
      alert('Erro ao atualizar usuário.');
    }
  };

  if (!user) return <p>Carregando...</p>;

  return (
<>
  <div className="form-central">
    <form onSubmit={handleUpdate}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </label>
      <br />
      <label>
        Idade:
        <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} required />
      </label>
      <br />
      <label>
        CPF:
        <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
      </label>
      <br />
      <label>
        Profissão:
        <input type="text" value={profissao} onChange={(e) => setProfissao(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Atualizar</button>
      </form>
    </div> 
 </> 
  );
}

export default UpdateForm;
