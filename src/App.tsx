import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerBookingPage from './pages/LawyerBookingPage';
import BookingFormPage from './pages/BookingFormPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/avocat/:id" element={<LawyerProfilePage />} />
        <Route path="/avocat/:id/reservation" element={<LawyerBookingPage />} />
        <Route path="/avocat/:id/formulaire" element={<BookingFormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;