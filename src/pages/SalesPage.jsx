import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import MenuItem from '@mui/material/MenuItem'; // Importe o componente MenuItem aqui

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
  const [product, setProduct] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    calculateTotal();
  }, [quantity, paymentMethod]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleProductSearch = () => {
    console.log('Produto buscado:', product);
  };

  const calculateTotal = useCallback(() => {
    let unitPrice = 10;
    let totalAmount = unitPrice * quantity;

    if (paymentMethod === 'credito') {
      totalAmount *= 1.1;
    } else if (paymentMethod === 'debito') {
      totalAmount *= 1.05;
    } else if (paymentMethod === 'pix') {
      totalAmount *= 0.95;
    }

    setTotal(totalAmount);
  }, [paymentMethod, quantity]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const salesRef = collection(firestore, 'sales');
      const docRef = await addDoc(salesRef, {
        product,
        paymentMethod,
        quantity,
        total,
      });

      console.log('Venda registrada com sucesso. ID do documento:', docRef.id);
    } catch (error) {
      console.error('Erro ao registrar a venda:', error);
    }
  };

  const handleMenuButtonClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar onMenuButtonClick={handleMenuButtonClick} />
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Container>
        <Title>Realizar Venda</Title>
        <Form onSubmit={handleFormSubmit}>
          <TextField
            label="Produto"
            value={product}
            onChange={(event) => setProduct(event.target.value)}
          />
          <Button variant="contained" onClick={handleProductSearch}>
            Buscar
          </Button>
          <TextField
            label="Quantidade"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <TextField
            select
            label="Método de Pagamento"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <MenuItem value="credito">Cartão de Crédito</MenuItem>
            <MenuItem value="debito">Cartão de Débito</MenuItem>
            <MenuItem value="pix">PIX</MenuItem>
          </TextField>
          <TextField label="Total" value={total.toFixed(2)} disabled />
          <Button variant="contained" type="submit">
            Realizar Venda
          </Button>
        </Form>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default SalesPage;
