import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SecondHomePage from './pages/SecondHomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerBookingPage from './pages/LawyerBookingPage';
import BookingFormPage from './pages/BookingFormPage';
import ClientLoginPage from './pages/ClientLoginPage';
import ClientSignupPage from './pages/ClientSignupPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SecondHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/client-login" element={<ClientLoginPage />} />
        <Route path="/client-signup" element={<ClientSignupPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/avocat/:id" element={<LawyerProfilePage />} />
        <Route path="/avocat/:id/reservation" element={<LawyerBookingPage />} />
        <Route path="/avocat/:id/formulaire" element={<BookingFormPage />} />
      </Routes>
    </div>
  );
}

export default App;