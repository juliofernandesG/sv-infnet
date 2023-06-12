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
      {/* Restante do conteúdo da sua página */}
      <Footer />
    </div>
  );
};

export default HomePage;
