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
  const [regionData, setRegionData] = useState(null);

  const handleMenuButtonClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Dados de exemplo para vendas
    const salesDataExample = [
      { name: 'Jan', vendas: 1200 },
      { name: 'Fev', vendas: 1500 },
      { name: 'Mar', vendas: 1000 },
      { name: 'Abr', vendas: 1800 },
      { name: 'Mai', vendas: 1200 },
      { name: 'Jun', vendas: 2000 },
    ];

    // Dados de exemplo para métodos de pagamento
    const paymentMethodsDataExample = [
      { name: 'Cartão de Crédito', value: 65 },
      { name: 'Boleto', value: 15 },
      { name: 'Transferência', value: 20 },
    ];

    // Dados de exemplo para produtos
    const productsDataExample = [
      { name: 'Produto 1', quantidade: 10 },
      { name: 'Produto 2', quantidade: 15 },
      { name: 'Produto 3', quantidade: 8 },
      { name: 'Produto 4', quantidade: 12 },
      { name: 'Produto 5', quantidade: 5 },
    ];

    // Dados de exemplo para região de vendas
    const regionDataExample = [
      { name: 'Norte', value: 30 },
      { name: 'Sul', value: 25 },
      { name: 'Leste', value: 20 },
      { name: 'Oeste', value: 15 },
      { name: 'Central', value: 10 },
    ];

    // Simular uma requisição assíncrona para obter os dados reais
    setTimeout(() => {
      setSalesData(salesDataExample);
      setPaymentMethodsData(paymentMethodsDataExample);
      setProductsData(productsDataExample);
      setRegionData(regionDataExample);
    }, 1000); // Aguarda 1 segundo antes de definir os dados de exemplo

  }, []);

  return (
    <div style={{ backgroundColor: '#f2f2f2' }}>
      <Navbar onMenuButtonClick={handleMenuButtonClick} />
      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />

      <div style={{ padding: '16px' }}>
        <h1>Dashboard</h1>

        {/* Informações de vendas e métodos de pagamento */}
        <section style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h2>Vendas</h2>
            {salesData && (
              <LineChart width={500} height={300} data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vendas" stroke="#0000FF" name="Vendas" />
              </LineChart>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h2>Métodos de Pagamento</h2>
            {paymentMethodsData && (
              <PieChart width={500} height={300}>
                <Pie data={paymentMethodsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#0000FF" label />
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </div>
        </section>

        {/* Produtos e Região de Vendas */}
        <section style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h2>Produtos</h2>
            {productsData && (
              <BarChart width={500} height={300} data={productsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="#0000FF" name="Quantidade" />
              </BarChart>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h2>Região de Vendas</h2>
            {regionData && (
              <PieChart width={500} height={300}>
                <Pie data={regionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#0000FF" label />
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;