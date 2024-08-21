import React, { useState } from 'react';
import './CadastroForm.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CadastroForm = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [profissao, setProfissao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://172.28.0.4:3001/api/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, idade, cpf, profissao }),
    });

    const message = await response.text();
  
    if (response.ok) {
      toast.success('Cadastro realizado com sucesso!');
      setNome('');
      setIdade('');
      setCpf('');
      setProfissao('');
    } else {
      toast.error(message);
    }
  };

  const handleCpfChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setCpf(value);
    }
  };

  return (
    <>
      <div className="form-central">
        <form onSubmit={handleSubmit}>
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
            <input 
              type="text" 
              value={cpf} 
              onChange={handleCpfChange} 
              maxLength="11" 
              required 
            />
          </label>
          <br />
          <label>
            Profissão:
            <input type="text" value={profissao} onChange={(e) => setProfissao(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default CadastroForm;
