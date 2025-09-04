import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerBookingPage from './pages/LawyerBookingPage';
import BookingFormPage from './pages/BookingFormPage';
import LoginPage from './pages/LoginPage';
import ClientLoginPage from './pages/ClientLoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ClientDashboardPage from './pages/ClientDashboardPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recherche" element={<SearchResultsPage />} />
      <Route path="/avocat/:id" element={<LawyerProfilePage />} />
      <Route path="/avocat/:id/reservation" element={<LawyerBookingPage />} />
      <Route path="/avocat/:id/formulaire" element={<BookingFormPage />} />
      <Route path="/connexion-avocat" element={<LoginPage />} />
      <Route path="/connexion-client" element={<ClientLoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard/*" element={<DashboardPage />} />
      <Route path="/client-dashboard/*" element={<ClientDashboardPage />} />
    </Routes>
  );
}