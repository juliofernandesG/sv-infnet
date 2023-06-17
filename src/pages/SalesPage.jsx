/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';

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

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const SalesPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Atualiza o total quando a quantidade ou o método de pagamento mudarem
    calculateTotal();
  }, [quantity, paymentMethod]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const calculateTotal = () => {
    // Lógica para calcular o total baseado na quantidade e método de pagamento
    let unitPrice = 10; // Preço unitário do produto
    let totalAmount = unitPrice * quantity;

    // Aplica desconto ou taxa adicional baseado no método de pagamento
    if (paymentMethod === 'credito') {
      totalAmount *= 1.1; // Aplica 10% de taxa para pagamento com cartão de crédito
    } else if (paymentMethod === 'debito') {
      totalAmount *= 1.05; // Aplica 5% de taxa para pagamento com cartão de débito
    } else if (paymentMethod === 'pix') {
      totalAmount *= 0.95; // Aplica 5% de desconto para pagamento com PIX
    }

    setTotal(totalAmount);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Registra a venda
    console.log('Método de pagamento:', paymentMethod);
    console.log('Quantidade:', quantity);
    console.log('Total:', total);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Sidebar />
      <Container>
        <Title>Realizar Venda</Title>
        <Form onSubmit={handleFormSubmit}>
       <TextField
  select
  label="Método de Pagamento"
  value={paymentMethod}
  onChange={handlePaymentMethodChange}
>
  <option value="dinheiro">Dinheiro</option>
  <option value="credito">Cartão de Crédito</option>
  <option value="debito">Cartão de Débito</option>
  <option value="pix">PIX</option>
</TextField>

          <TextField
            type="number"
            label="Quantidade"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <TextField
            type="text"
            label="Total"
            value={total}
            disabled
          />
          <Button variant="contained" type="submit">
            Registrar Venda
          </Button>
        </Form>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default SalesPage;
