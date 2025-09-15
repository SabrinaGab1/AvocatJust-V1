import React, { useState } from 'react';
import { Search, Scale, Globe, ChevronDown, Star, MapPin, ArrowRight, Users, Award, Clock, CheckCircle, Phone, Video, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@headlessui/react';

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AvocatConnect</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/lawyers" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('find_lawyer')}
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('about')}
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('contact')}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Connexion
              </button>
              <Link 
                to="/signup"
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Vous êtes avocat ?
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('hero_title')}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('hero_subtitle')}
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">{t('select_specialty')}</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">{t('select_location')}</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              {t('search_lawyers')}
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('why_choose_us')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('features_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('verified_lawyers')}
              </h3>
              <p className="text-gray-600">
                {t('verified_lawyers_desc')}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('expert_advice')}
              </h3>
              <p className="text-gray-600">
                {t('expert_advice_desc')}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('quick_response')}
              </h3>
              <p className="text-gray-600">
                {t('quick_response_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('how_it_works')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('how_it_works_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('step_1')}
              </h3>
              <p className="text-gray-600">
                {t('step_1_desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('step_2')}
              </h3>
              <p className="text-gray-600">
                {t('step_2_desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('step_3')}
              </h3>
              <p className="text-gray-600">
                {t('step_3_desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('step_4')}
              </h3>
              <p className="text-gray-600">
                {t('step_4_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lawyers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('featured_lawyers')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('featured_lawyers_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Me. Jean Dupont
                      </h3>
                      <p className="text-gray-600">Droit des affaires</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">4.9 (127 avis)</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">Paris, France</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-green-500" />
                      <Video className="h-4 w-4 text-blue-500 ml-2" />
                      <Building2 className="h-4 w-4 text-purple-500 ml-2" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">150€/h</span>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    {t('view_profile')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('cta_title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              {t('get_started')}
            </Link>
            <Link
              to="/lawyers"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              {t('browse_lawyers')}
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
                <Scale className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">AvocatConnect</span>
              </div>
              <p className="text-gray-400">
                {t('footer_description')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/lawyers" className="hover:text-white transition-colors">{t('find_lawyer')}</Link></li>
                <li><Link to="/consultation" className="hover:text-white transition-colors">{t('consultation')}</Link></li>
                <li><Link to="/legal-advice" className="hover:text-white transition-colors">{t('legal_advice')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">{t('about')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('contact')}</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">{t('careers')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('legal')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t('privacy_policy')}</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">{t('terms_of_service')}</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">{t('cookie_policy')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AvocatConnect. {t('all_rights_reserved')}</p>
          </div>
        </div>
      </footer>

      {/* Login Choice Modal */}
      <Dialog
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Scale className="h-8 w-8 text-blue-600" />
              </div>
              
              <Dialog.Title className="text-xl font-semibold text-gray-900 mb-2">
                Choisissez votre profil
              </Dialog.Title>
              
              <p className="text-gray-600 mb-6">
                Sélectionnez le type de compte pour vous connecter
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    navigate('/client-login');
                  }}
                  className="w-full flex items-center justify-center px-6 py-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                >
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Je suis utilisateur</div>
                    <div className="text-sm text-gray-600">Je cherche un avocat</div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center px-6 py-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
                >
                  <Scale className="h-6 w-6 text-orange-600 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Je suis avocat</div>
                    <div className="text-sm text-gray-600">J'ai un cabinet d'avocat</div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                Annuler
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('hero_title')}
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('hero_subtitle')}
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">{t('select_specialty')}</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">{t('select_location')}</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              {t('search_lawyers')}
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('why_choose_us')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('features_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('verified_lawyers')}
              </h3>
              <p className="text-gray-600">
                {t('verified_lawyers_desc')}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('expert_advice')}
              </h3>
              <p className="text-gray-600">
                {t('expert_advice_desc')}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('quick_response')}
              </h3>
              <p className="text-gray-600">
                {t('quick_response_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('how_it_works')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('how_it_works_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('step_1')}
              </h3>
              <p className="text-gray-600">
                {t('step_1_desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('step_2')}
              </h3>
              <p className="text-gray-600">
                {t('step_2_desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('step_3')}
              </h3>
              <p className="text-gray-600">
                {t('step_3_desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('step_4')}
              </h3>
              <p className="text-gray-600">
                {t('step_4_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lawyers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('featured_lawyers')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('featured_lawyers_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Me. Jean Dupont
                      </h3>
                      <p className="text-gray-600">Droit des affaires</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">4.9 (127 avis)</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-600">Paris, France</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-green-500" />
                      <Video className="h-4 w-4 text-blue-500 ml-2" />
                      <Building2 className="h-4 w-4 text-purple-500 ml-2" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">150€/h</span>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    {t('view_profile')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('cta_title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              {t('get_started')}
            </Link>
            <Link
              to="/lawyers"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              {t('browse_lawyers')}
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
                <Scale className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">AvocatConnect</span>
              </div>
              <p className="text-gray-400">
                {t('footer_description')}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('services')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/lawyers" className="hover:text-white transition-colors">{t('find_lawyer')}</Link></li>
                <li><Link to="/consultation" className="hover:text-white transition-colors">{t('consultation')}</Link></li>
                <li><Link to="/legal-advice" className="hover:text-white transition-colors">{t('legal_advice')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">{t('about')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('contact')}</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">{t('careers')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('legal')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t('privacy_policy')}</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">{t('terms_of_service')}</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">{t('cookie_policy')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AvocatConnect. {t('all_rights_reserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;