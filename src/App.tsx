import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyersDirectoryPage from './pages/LawyersDirectoryPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerBookingPage from './pages/LawyerBookingPage';
import BookingFormPage from './pages/BookingFormPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recherche" element={<SearchResultsPage />} />
        <Route path="/avocats" element={<LawyersDirectoryPage />} />
        <Route path="/avocat/:id" element={<LawyerProfilePage />} />
        <Route path="/avocat/:id/reservation" element={<LawyerBookingPage />} />
        <Route path="/avocat/:id/formulaire" element={<BookingFormPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;