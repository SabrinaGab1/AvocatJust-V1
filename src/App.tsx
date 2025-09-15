import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Scale, Globe, ChevronDown, Star, MapPin, ArrowRight, Users, Award, Clock, CheckCircle, Phone, Video, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import AnimatedPage from './components/AnimatedPage';
import AuthModal from './components/AuthModal';

// Import pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerBookingPage from './pages/LawyerBookingPage';
import BookingFormPage from './pages/BookingFormPage';
import ClientLoginPage from './pages/ClientLoginPage';
import ClientRegisterPage from './pages/ClientRegisterPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import ClientsPage from './pages/ClientsPage';

function HomePage() {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const specialties = [
    'Droit des affaires',
    'Droit de la famille',
    'Droit pénal',
    'Droit immobilier',
    'Droit du travail',
    'Droit fiscal'
  ];

  const locations = [
    'Paris',
    'Lyon',
    'Marseille',
    'Toulouse',
    'Nice',
    'Nantes'
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedSpecialty) params.append('specialty', selectedSpecialty);
    if (selectedLocation) params.append('location', selectedLocation);
    
    navigate(`/search?${params.toString()}`);
  };

  const mockLawyers = [
    {
      id: '1',
      name: 'Me Marie Dupont',
      specialty: 'Droit des affaires',
      location: 'Paris',
      rating: 4.8,
      reviews: 24,
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
      price: 150,
      consultationTypes: ['cabinet', 'visio', 'telephone']
    },
    {
      id: '2',
      name: 'Me Thomas Martin',
      specialty: 'Droit du travail',
      location: 'Lyon',
      rating: 4.6,
      reviews: 18,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      price: 140,
      consultationTypes: ['cabinet', 'visio']
    },
    {
      id: '3',
      name: 'Me Sophie Bernard',
      specialty: 'Droit de la famille',
      location: 'Marseille',
      rating: 4.9,
      reviews: 31,
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      price: 160,
      consultationTypes: ['cabinet', 'visio', 'telephone']
    }
  ];

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        {/* Header */}
        <header className="bg-white/80 shadow-sm sticky top-0 z-50 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Scale className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">AvocaJust</span>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <Link to="/search" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  {t('find_lawyer')}
                </Link>
                <Link to="/urgence" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">
                  {t('emergency_lawyer')}
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                    className="flex items-center text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{language.toUpperCase()}</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </button>
                </div>
                
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-700 hover:text-orange-500 transition-colors font-medium"
                >
                  {t('login')}
                </button>
                
                <Link 
                  to="/signup"
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors font-medium"
                >
                  {t('create_account')}
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-orange-500">{t('find_your')}</span><br />
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {t('trusted_lawyer')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              {t('platform_description')}
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    placeholder={t('search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-6 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Toute la France</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('find_lawyer_online')}
              </button>

              {/* Quick consultation type buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    params.append('type', 'visio');
                    navigate(`/search?${params.toString()}`);
                  }}
                  className="flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-white hover:scale-105 transition-all duration-200 shadow-sm"
                >
                  <Video className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-gray-700 font-medium">Visio</span>
                </button>
                
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    params.append('type', 'telephone');
                    navigate(`/search?${params.toString()}`);
                  }}
                  className="flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-white hover:scale-105 transition-all duration-200 shadow-sm"
                >
                  <Phone className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">Téléphone</span>
                </button>
                
                <button
                  onClick={() => {
                    const params = new URLSearchParams();
                    params.append('type', 'zone');
                    navigate(`/search?${params.toString()}`);
                  }}
                  className="flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-white hover:scale-105 transition-all duration-200 shadow-sm"
                >
                  <MapPin className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-gray-700 font-medium">Zone</span>
                </button>
              </div>
            </div>

            {/* Brand Message */}
            <div className="max-w-4xl mx-auto">
              <p className="text-2xl text-gray-700 mb-4">
                {t('not_just_lawyers_1')} <span className="font-bold text-orange-500">AvocaJust</span>{t('not_just_lawyers_2')}
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {t('just_lawyers')}
              </p>
            </div>
          </div>
        </section>

        {/* Lawyer Carousel */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos avocats partenaires
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez quelques-uns de nos avocats de confiance
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div className="flex animate-scroll space-x-6">
                {[...mockLawyers, ...mockLawyers].map((lawyer, index) => (
                  <div
                    key={`${lawyer.id}-${index}`}
                    className="lawyer-card flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => navigate(`/avocat/${lawyer.id}`)}
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={lawyer.photo}
                          alt={lawyer.name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-100"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">{lawyer.name}</h3>
                          <p className="text-gray-600">{lawyer.specialty}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium text-gray-900">{lawyer.rating}</span>
                        </div>
                        <span className="ml-2 text-sm text-gray-500">({lawyer.reviews} avis)</span>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-600">{lawyer.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2">
                          {lawyer.consultationTypes.includes('telephone') && (
                            <Phone className="h-4 w-4 text-green-500" />
                          )}
                          {lawyer.consultationTypes.includes('visio') && (
                            <Video className="h-4 w-4 text-blue-500" />
                          )}
                          {lawyer.consultationTypes.includes('cabinet') && (
                            <Building2 className="h-4 w-4 text-purple-500" />
                          )}
                        </div>
                        <span className="text-lg font-semibold text-gray-900">À partir de {lawyer.price}€</span>
                      </div>
                      
                      <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                        Voir le profil
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pourquoi choisir AvocaJust ?
              </h2>
              <p className="text-xl text-gray-600">
                Une plateforme conçue pour simplifier l'accès à la justice
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Avocats vérifiés
                </h3>
                <p className="text-gray-600">
                  Tous nos avocats sont vérifiés et inscrits au barreau
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Expertise reconnue
                </h3>
                <p className="text-gray-600">
                  Des spécialistes dans tous les domaines du droit
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Réponse rapide
                </h3>
                <p className="text-gray-600">
                  Obtenez une réponse sous 24h maximum
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-xl text-gray-600">
                Trouvez votre avocat en 3 étapes simples
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Décrivez votre besoin
                </h3>
                <p className="text-gray-600">
                  Expliquez votre situation juridique en quelques mots
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Choisissez votre avocat
                </h3>
                <p className="text-gray-600">
                  Comparez les profils et sélectionnez l'avocat qui vous convient
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Prenez rendez-vous
                </h3>
                <p className="text-gray-600">
                  Réservez votre consultation en ligne ou au cabinet
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à trouver votre avocat ?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Rejoignez des milliers de clients satisfaits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white text-orange-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Commencer maintenant
              </button>
              <Link
                to="/search"
                className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-orange-500 transition-colors font-semibold"
              >
                Parcourir les avocats
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Scale className="h-8 w-8 text-orange-500" />
                  <span className="ml-2 text-xl font-bold">AvocaJust</span>
                </div>
                <p className="text-gray-400 text-sm">
                  La première communauté d'avocats engagés pour une justice accessible et équitable.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link to="/search" className="hover:text-white transition-colors">Trouver un avocat</Link></li>
                  <li><Link to="/urgence" className="hover:text-white transition-colors">Urgence 24/7</Link></li>
                  <li><Link to="/consultation" className="hover:text-white transition-colors">Consultation en ligne</Link></li>
                  <li><Link to="/devis" className="hover:text-white transition-colors">Devis personnalisé</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Informations</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
                  <li><Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link></li>
                  <li><Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
                  <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="space-y-2 text-gray-400 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>123 rue de la Justice, 75001 Paris</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center">
                    <span>contact@avocajust.fr</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">© 2025 AvocaJust. {t('all_rights_reserved')}</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <Link to="/mentions" className="text-gray-400 hover:text-white text-sm">{t('legal_notice')}</Link>
                  <Link to="/cgv" className="text-gray-400 hover:text-white text-sm">{t('terms')}</Link>
                  <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">{t('cookies')}</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </AnimatedPage>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/avocat/:id" element={<LawyerProfilePage />} />
      <Route path="/avocat/:id/reservation" element={<LawyerBookingPage />} />
      <Route path="/avocat/:id/formulaire" element={<BookingFormPage />} />
      
      {/* Lawyer routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard/*" element={<DashboardPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      
      {/* Client routes */}
      <Route path="/client/login" element={<ClientLoginPage />} />
      <Route path="/client/register" element={<ClientRegisterPage />} />
      <Route path="/client/dashboard/*" element={<ClientDashboardPage />} />
    </Routes>
  );
}

export default App;