import React, { useState } from 'react';
import { Search, Scale, Menu, X, ChevronDown, Star, MapPin, Phone, Video, Building2, Users, Award, Clock, MessageSquare, Shield, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SignupModal from '../components/signup/SignupModal';
import AnimatedPage from '../components/AnimatedPage';

export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white/80 shadow-sm sticky top-0 z-50 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center">
                <Scale className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link to="/recherche" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('find_lawyer')}
                </Link>
                <Link to="/urgence" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('emergency_lawyer')}
                </Link>
                <Link to="/connexion" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('login')}
                </Link>
              </div>

              <div className="flex items-center space-x-4">
               <Link 
                 to="/signup"
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
               >
                Vous êtes avocat ?
               </Link>
              
              <Link 
                to="/signup"
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Rejoindre AvocaJust
              </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div 
          className="relative bg-cover bg-center py-24"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000&h=600)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Main Title */}
              <div className="flex items-center mb-6">
                <Scale className="h-12 w-12 text-white mr-4" />
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {t('find_your')} <span className="text-orange-400">{t('trusted_lawyer')}</span>
                </h1>
              </div>
              
              <p className="mt-6 text-xl text-gray-300">
                {t('platform_description')}
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('search_placeholder')}
                      className="w-full pl-16 pr-6 py-4 text-lg bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Rechercher
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-500">2,500+</div>
                <div className="text-gray-600 mt-1">Avocats vérifiés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500">50,000+</div>
                <div className="text-gray-600 mt-1">Consultations réalisées</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500">4.8/5</div>
                <div className="text-gray-600 mt-1">Note moyenne</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('find_lawyer_online')}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
              <Link
                to="/recherche"
                className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Trouver un avocat
              </Link>
              <button
                onClick={() => setIsSignupModalOpen(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-colors text-lg"
              >
                Vous êtes avocat ?
              </button>
            </div>
          </div>
        </div>

        {/* Slogan Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('not_just_lawyers_1')} <span className="text-orange-500">AvocaJust</span>{t('not_just_lawyers_2')}
            </h2>
            <p className="text-xl text-orange-500 font-semibold">
              {t('just_lawyers')}
            </p>
          </div>
        </div>

        {/* Lawyer Carousel */}
        <div className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nos avocats partenaires
            </h2>
            
            <div className="relative">
              <div className="animate-scroll">
                {/* First set of lawyers */}
                {[
                  {
                    name: 'Me Sophie Martin',
                    specialty: 'Droit des affaires',
                    location: 'Paris',
                    rating: 4.9,
                    reviews: 127,
                    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
                    consultations: ['cabinet', 'visio', 'telephone'],
                    price: 150
                  },
                  {
                    name: 'Me Thomas Dubois',
                    specialty: 'Droit du travail',
                    location: 'Lyon',
                    rating: 4.8,
                    reviews: 89,
                    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
                    consultations: ['cabinet', 'visio'],
                    price: 140
                  },
                  {
                    name: 'Me Claire Bernard',
                    specialty: 'Droit de la famille',
                    location: 'Marseille',
                    rating: 4.9,
                    reviews: 156,
                    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
                    consultations: ['cabinet', 'visio', 'telephone'],
                    price: 160
                  },
                  {
                    name: 'Me Pierre Moreau',
                    specialty: 'Droit immobilier',
                    location: 'Bordeaux',
                    rating: 4.7,
                    reviews: 73,
                    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
                    consultations: ['cabinet', 'telephone'],
                    price: 130
                  }
                ].concat([
                  {
                    name: 'Me Sophie Martin',
                    specialty: 'Droit des affaires',
                    location: 'Paris',
                    rating: 4.9,
                    reviews: 127,
                    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
                    consultations: ['cabinet', 'visio', 'telephone'],
                    price: 150
                  },
                  {
                    name: 'Me Thomas Dubois',
                    specialty: 'Droit du travail',
                    location: 'Lyon',
                    rating: 4.8,
                    reviews: 89,
                    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
                    consultations: ['cabinet', 'visio'],
                    price: 140
                  },
                  {
                    name: 'Me Claire Bernard',
                    specialty: 'Droit de la famille',
                    location: 'Marseille',
                    rating: 4.9,
                    reviews: 156,
                    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
                    consultations: ['cabinet', 'visio', 'telephone'],
                    price: 160
                  },
                  {
                    name: 'Me Pierre Moreau',
                    specialty: 'Droit immobilier',
                    location: 'Bordeaux',
                    rating: 4.7,
                    reviews: 73,
                    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
                    consultations: ['cabinet', 'telephone'],
                    price: 130
                  }
                ]).map((lawyer, index) => (
                  <div key={index} className="lawyer-card bg-white rounded-xl shadow-lg p-6 mx-3 flex-shrink-0">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={lawyer.photo}
                        alt={lawyer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{lawyer.name}</h3>
                        <p className="text-orange-500 text-sm font-medium">{lawyer.specialty}</p>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-gray-600 text-sm">{lawyer.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="font-medium text-gray-900">{lawyer.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({lawyer.reviews})</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{lawyer.price}€</div>
                        <div className="text-xs text-gray-500">consultation</div>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-2 mb-4">
                      {lawyer.consultations.map((type) => (
                        <div key={type} className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                          {type === 'cabinet' && <Building2 className="h-4 w-4 text-orange-500" />}
                          {type === 'visio' && <Video className="h-4 w-4 text-orange-500" />}
                          {type === 'telephone' && <Phone className="h-4 w-4 text-orange-500" />}
                        </div>
                      ))}
                    </div>

                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                      Consulter le profil
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pourquoi choisir AvocaJust ?
              </h2>
              <p className="text-xl text-gray-600">
                Une plateforme conçue pour simplifier l'accès à la justice
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avocats vérifiés</h3>
                <p className="text-gray-600">Tous nos avocats sont vérifiés et inscrits au barreau</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Réponse rapide</h3>
                <p className="text-gray-600">Obtenez une réponse sous 24h maximum</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualité garantie</h3>
                <p className="text-gray-600">Satisfaction client garantie ou remboursé</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Support 24/7</h3>
                <p className="text-gray-600">Une équipe à votre écoute en permanence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Scale className="h-8 w-8 text-orange-500" />
                  <span className="ml-2 text-xl font-semibold">AvocaJust</span>
                </div>
                <p className="text-gray-400">
                  La plateforme qui vous met en relation avec les avocats justes
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/recherche" className="hover:text-white transition-colors">Trouver un avocat</Link></li>
                  <li><Link to="/urgence" className="hover:text-white transition-colors">Urgence juridique</Link></li>
                  <li><Link to="/consultation" className="hover:text-white transition-colors">Consultation en ligne</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Avocats</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/signup" className="hover:text-white transition-colors">Rejoindre AvocaJust</Link></li>
                  <li><Link to="/connexion" className="hover:text-white transition-colors">Espace avocat</Link></li>
                  <li><Link to="/tarifs" className="hover:text-white transition-colors">Nos tarifs</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/aide" className="hover:text-white transition-colors">Centre d'aide</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/mentions-legales" className="hover:text-white transition-colors">{t('legal_notice')}</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 AvocaJust. {t('all_rights_reserved')}</p>
            </div>
          </div>
        </footer>

        {/* Signup Modal */}
        <SignupModal 
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
        />
      </div>
    </AnimatedPage>
  );
}