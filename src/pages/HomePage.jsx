import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [salesData, setSalesData] = useState(null);
  const [paymentMethodsData, setPaymentMethodsData] = useState(null);
  const [productsData, setProductsData] = useState(null);

  const handleMenuButtonClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Dados de exemplo para vendas
    const salesDataExample = [
      { name: 'Jan', sales: 1200 },
      { name: 'Fev', sales: 1500 },
      { name: 'Mar', sales: 1000 },
      { name: 'Abr', sales: 1800 },
      { name: 'Mai', sales: 1200 },
      { name: 'Jun', sales: 2000 },
    ];

    // Dados de exemplo para métodos de pagamento
    const paymentMethodsDataExample = [
      { name: 'Cartão de Crédito', value: 65 },
      { name: 'Boleto', value: 15 },
      { name: 'Transferência', value: 20 },
    ];

    // Dados de exemplo para produtos
    const productsDataExample = [
      { name: 'Produto 1', quantity: 10 },
      { name: 'Produto 2', quantity: 15 },
      { name: 'Produto 3', quantity: 8 },
      { name: 'Produto 4', quantity: 12 },
      { name: 'Produto 5', quantity: 5 },
    ];

    // Simular uma requisição assíncrona para obter os dados reais
    setTimeout(() => {
      setSalesData(salesDataExample);
      setPaymentMethodsData(paymentMethodsDataExample);
      setProductsData(productsDataExample);
    }, 1000); // Aguarda 1 segundo antes de definir os dados de exemplo

  }, []);

  return (
    <div>
      <Navbar onMenuButtonClick={handleMenuButtonClick} />
      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />

      <div style={{ padding: '16px' }}>
        <h1>Dashboard</h1>

        {/* Informações de vendas */}
        <section>
          <h2>Vendas</h2>
          {salesData && (
            <LineChart width={500} height={300} data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          )}
        </section>

        {/* Métodos de pagamento */}
        <section>
          <h2>Métodos de Pagamento</h2>
          {paymentMethodsData && (
            <PieChart width={500} height={300}>
              <Pie data={paymentMethodsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </section>

        {/* Produtos */}
        <section>
          <h2>Produtos</h2>
          {productsData && (
            <BarChart width={500} height={300} data={productsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;