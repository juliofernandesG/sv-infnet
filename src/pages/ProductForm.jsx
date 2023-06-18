import React, { useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';

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

const ProductRegistration = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const productsRef = collection(firestore, 'products');
      const docRef = await addDoc(productsRef, {
        name,
        price,
        description,
      });

      console.log('Produto registrado com sucesso. ID do documento:', docRef.id);

      // Limpar os campos do formulário após o registro
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao registrar o produto:', error);
    }
  };

  return (
    <Container>
      <h1>Registrar Produto</h1>
      <Form onSubmit={handleFormSubmit}>
        <TextField
          type="text"
          label="Nome"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          type="text"
          label="Preço"
          value={price}
          onChange={handlePriceChange}
        />
        <TextField
          type="text"
          label="Descrição"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Button variant="contained" type="submit">
          Registrar Produto
        </Button>
      </Form>
    </Container>
  );
};

export default ProductRegistration;
