import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuário registrado:', user);
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Registro de Usuário
      </Typography>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
          gap: '10px',
        }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          fullWidth
          margin="normal"
        />
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Registrar
        </Button>
        <Link component={RouterLink} to="/login">
          Voltar para o login
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
