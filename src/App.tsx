import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Scale, Search, Phone, AlertTriangle, Users, Award, Clock, CheckCircle, ArrowRight, Star, MapPin, Video, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import SignupModal from './components/signup/SignupModal';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerBookingPage from './pages/LawyerBookingPage';
import BookingFormPage from './pages/BookingFormPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from './pages/ClientsPage';

function App() {
  const { t } = useLanguage();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/avocat/:id" element={<LawyerProfilePage />} />
        <Route path="/avocat/:id/reservation" element={<LawyerBookingPage />} />
        <Route path="/avocat/:id/formulaire" element={<BookingFormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />
    </Router>
  );
}

export default App;