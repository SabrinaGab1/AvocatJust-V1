import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLandingPage from './pages/MainLandingPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerBookingPage from './pages/LawyerBookingPage';
import BookingFormPage from './pages/BookingFormPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/recherche" element={<SearchResultsPage />} />
      <Route path="/avocat/:id" element={<LawyerProfilePage />} />
      <Route path="/avocat/:id/reservation" element={<LawyerBookingPage />} />
      <Route path="/avocat/:id/formulaire" element={<BookingFormPage />} />
      <Route path="/connexion" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard/*" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;