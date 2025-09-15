import React, { useState } from 'react';
import { Search, Scale, Globe, ChevronDown, Star, MapPin, ArrowRight, Users, Award, Clock, CheckCircle, Phone, Video, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@headlessui/react';

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
              <Link 
                to="/signup"
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Vous êtes avocat ?
              </Link>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Connexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Trouvez votre <span className="text-orange-500">avocat de confiance</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            La plateforme qui vous met en relation avec les avocats justes
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Décrivez votre problématique (ex: licenciement, divorce, création d'entreprise, etc)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Rechercher des avocats
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
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600">
              Une plateforme moderne pour une justice accessible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Avocats vérifiés
              </h3>
              <p className="text-gray-600">
                Tous nos avocats sont vérifiés et certifiés
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Conseils experts
              </h3>
              <p className="text-gray-600">
                Des conseils juridiques de qualité professionnelle
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Réponse rapide
              </h3>
              <p className="text-gray-600">
                Obtenez une réponse dans les 24h
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
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              En quelques étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Décrivez votre situation
              </h3>
              <p className="text-gray-600">
                Expliquez votre problématique juridique
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Trouvez votre avocat
              </h3>
              <p className="text-gray-600">
                Parcourez les profils d'avocats qualifiés
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Prenez rendez-vous
              </h3>
              <p className="text-gray-600">
                Réservez une consultation en ligne ou au cabinet
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Obtenez des conseils
              </h3>
              <p className="text-gray-600">
                Recevez des conseils juridiques personnalisés
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
              Avocats recommandés
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos avocats les mieux notés
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
                    Voir le profil
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
            Prêt à trouver votre avocat ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers de clients satisfaits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Commencer
            </Link>
            <Link
              to="/lawyers"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
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
                <Scale className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">AvocatConnect</span>
              </div>
              <p className="text-gray-400">
                La plateforme de référence pour trouver votre avocat
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/lawyers" className="hover:text-white transition-colors">Trouver un avocat</Link></li>
                <li><Link to="/consultation" className="hover:text-white transition-colors">Consultation</Link></li>
                <li><Link to="/legal-advice" className="hover:text-white transition-colors">Conseils juridiques</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Carrières</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition-colors">Politique des cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AvocatConnect. Tous droits réservés.</p>
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

export default HomePage;