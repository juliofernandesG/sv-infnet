import React, { useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import MenuItem from '@mui/material/MenuItem';

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

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const productsRef = collection(firestore, 'products');
      const docRef = await addDoc(productsRef, {
        productName,
        description,
        price,
        category,
        stock,
      });

      console.log('Produto adicionado com sucesso. ID do documento:', docRef.id);

      // Limpar os campos do formulário
      setProductName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setStock('');

      // Atualizar a lista de produtos
      fetchProducts();
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error);
    }
  };

  const handleMenuButtonClick = () => {
    setIsSidebarOpen(true);
  };

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(firestore, 'products');
      const productsQuery = query(
        productsCollection,
        orderBy('productName'),
        limit(10)
      );
      const querySnapshot = await getDocs(productsQuery);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Erro ao buscar os produtos:', error);
    }
  };

  // Buscar os produtos ao carregar o componente
  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar onMenuButtonClick={handleMenuButtonClick} />
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Container>
        <Title>Adicionar Produto</Title>
        <Form onSubmit={handleFormSubmit}>
          <TextField
            label="Nome do Produto"
            value={productName}
            onChange={handleProductNameChange}
          />
          <TextField
            label="Descrição"
            value={description}
            onChange={handleDescriptionChange}
          />
          <TextField
            label="Preço"
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
          <TextField
            label="Categoria"
            value={category}
            onChange={handleCategoryChange}
          />
          <TextField
            label="Estoque"
            type="number"
            value={stock}
            onChange={handleStockChange}
          />
          <Button variant="contained" type="submit">
            Adicionar Produto
          </Button>
        </Form>
        <Title>Lista de Produtos</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.productName}</strong> - {product.description} - R${product.price}
            </li>
          ))}
        </ul>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default AddProductForm;
