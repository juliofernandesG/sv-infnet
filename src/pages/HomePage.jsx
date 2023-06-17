import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <Navbar onMenuButtonClick={handleMenuButtonClick} />
      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />

      <div style={{ padding: '16px' }}>
        <h1>Dashboard</h1>

        {/* Informações de vendas */}
        <section>
          <h2>Vendas</h2>
          {/* Adicione aqui o código para exibir as informações de vendas */}
        </section>

        {/* Métodos de pagamento */}
        <section>
          <h2>Métodos de Pagamento</h2>
          {/* Adicione aqui o código para exibir as informações de métodos de pagamento */}
        </section>

        {/* Produtos */}
        <section>
          <h2>Produtos</h2>
          {/* Adicione aqui o código para exibir as informações de produtos */}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
