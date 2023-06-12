import React, { useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import auth from '../config/firebase';

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
  width: '300px',
});

const Title = styled('h1')({
  marginBottom: '24px',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'blue',
  fontSize: '14px',
});

// Define o tema personalizado com as cores do Google
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const Login = ({ history }) => {
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
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Usuário autenticado com sucesso!');
      history.push('/homepage');
    } catch (error) {
      console.log('Erro ao autenticar usuário:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
      console.log('Usuário autenticado com sucesso com o Google!');
      history.push('/homepage');
    } catch (error) {
      console.log('Erro ao autenticar usuário com o Google:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Entre agora</Title>
        <Form onSubmit={handleFormSubmit}>
          <Button variant="contained" onClick={handleGoogleSignIn}>
            Entrar com o Google
          </Button>
          <TextField type="email" label="Email" value={email} onChange={handleEmailChange} />
          <TextField
            type="password"
            label="Senha"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button variant="contained" type="submit">
            Entrar
          </Button>
          <StyledLink to="/register">Crie sua conta</StyledLink>
        </Form>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
