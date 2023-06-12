import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import SalesPage from '../pages/SalesPage';
import MyCalendar from '../components/MyCalender';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Defina a rota "/" para redirecionar para a página de login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/salespage" element={<SalesPage />} />
        <Route path="/mycalendar" element={<MyCalendar />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
