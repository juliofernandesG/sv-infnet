import React, { useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import  auth  from '../config/firebase'; // Certifique-se de importar o objeto de autenticação do Firebase corretamente

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '16px',
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Aqui você pode adicionar a lógica de autenticação com o Firebase
      await auth().signInWithEmailAndPassword(email, password);
      console.log('Usuário autenticado com sucesso!');
    } catch (error) {
      console.log('Erro ao autenticar usuário:', error);
    }
  };

  return (
    <Container>
      <h1>Entre agora</h1>
      <Form onSubmit={handleFormSubmit}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          type="password"
          label="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" type="submit">
          Entrar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
