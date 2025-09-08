import React, { useState } from 'react';
import { Search, Scale, ArrowRight, Phone, Video, Building2, Star, MapPin, Users, Shield, Clock, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedPage from '../components/AnimatedPage';

const mockLawyers = [
  {
    id: '1',
    nom: 'Dupont',
    prenom: 'Marie',
    ville: 'Paris',
    specialites: ['Droit des affaires', 'Droit commercial'],
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    rating: 4.8,
    reviewCount: 24,
    consultationTypes: {
      cabinet: { price: 150 },
      visio: { price: 120 },
      telephone: { price: 100 }
    }
  },
  {
    id: '2',
    nom: 'Martin',
    prenom: 'Thomas',
    ville: 'Lyon',
    specialites: ['Droit du travail', 'Droit social'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    rating: 4.6,
    reviewCount: 18,
    consultationTypes: {
      cabinet: { price: 140 },
      visio: { price: 110 },
      telephone: { price: 90 }
    }
  },
  {
    id: '3',
    nom: 'Bernard',
    prenom: 'Sophie',
    ville: 'Marseille',
    specialites: ['Droit de la famille', 'Droit immobilier'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    rating: 4.9,
    reviewCount: 31,
    consultationTypes: {
      cabinet: { price: 160 },
      visio: { price: 130 },
      telephone: { price: 110 }
    }
  },
  {
    id: '4',
    nom: 'Rousseau',
    prenom: 'Pierre',
    ville: 'Bordeaux',
    specialites: ['Droit pénal', 'Droit de la défense'],
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    rating: 4.7,
    reviewCount: 19,
    consultationTypes: {
      cabinet: { price: 180 },
      visio: { price: 150 },
      telephone: { price: 120 }
    }
  }
];

export default function HomePage() {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-4 w-4 text-orange-500" />;
      case 'visio':
        return <Video className="h-4 w-4 text-purple-500" />;
      case 'telephone':
        return <Phone className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
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
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-2 py-1 text-sm rounded ${language === 'fr' ? 'bg-orange-100 text-orange-600' : 'text-gray-500'}`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 text-sm rounded ${language === 'en' ? 'bg-orange-100 text-orange-600' : 'text-gray-500'}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link 
                  to="/connexion-client"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Connexion Client
                </Link>
                <Link 
                  to="/connexion-client"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Connexion Client
                </Link>
                <Link 
                  to="/connexion-avocat"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {t('login')}
                </Link>
                <Link 
                  to="/signup"
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Je suis avocat
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
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t('find_your')} <span className="text-orange-400">{t('trusted_lawyer')}</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300">
                {t('platform_description')}
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-2 border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('search_placeholder')}
                      className="w-full pl-14 pr-4 py-4 text-lg bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    <span className="mr-2">{t('find_lawyer_online')}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Featured Lawyers Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos avocats recommandés
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez quelques-uns de nos avocats les mieux notés
            </p>
          </div>

          {/* Scrolling Lawyers */}
          <div className="relative overflow-hidden">
            <div className="animate-scroll">
              {[...mockLawyers, ...mockLawyers].map((lawyer, index) => (
                <div
                  key={`${lawyer.id}-${index}`}
                  className="lawyer-card bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 mr-6 cursor-pointer border border-gray-100 hover:border-orange-200"
                  onClick={() => navigate(`/avocat/${lawyer.id}`)}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={lawyer.photo}
                      alt={`${lawyer.prenom} ${lawyer.nom}`}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-100"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Me {lawyer.prenom} {lawyer.nom}
                      </h3>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{lawyer.ville}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{lawyer.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({lawyer.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {lawyer.specialites.slice(0, 2).map((specialite, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full mr-2"
                      >
                        {specialite}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    {Object.entries(lawyer.consultationTypes).map(([type, details]) => (
                      <div key={type} className="text-center">
                        <div className="flex justify-center mb-1">
                          {getConsultationTypeIcon(type)}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">{type}</div>
                        <div className="text-sm font-semibold text-gray-900">{details.price}€</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('not_just_lawyers_1')} <span className="text-orange-500">AvocaJust</span>{t('not_just_lawyers_2')}
            </h2>
            <p className="text-xl text-orange-600 font-medium mb-8">
              {t('just_lawyers')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avocats vérifiés</h3>
                <p className="text-gray-600">Tous nos avocats sont certifiés et inscrits au barreau</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Réponse rapide</h3>
                <p className="text-gray-600">Obtenez une réponse sous 24h maximum</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Accompagnement</h3>
                <p className="text-gray-600">Un suivi personnalisé tout au long de votre dossier</p>
              </div>
            </div>

            <Link
              to="/recherche"
              className="inline-flex items-center px-8 py-4 bg-orange-500 text-white text-lg font-medium rounded-full hover:bg-orange-600 transition-colors"
            >
              Trouver mon avocat
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <Scale className="h-8 w-8 text-orange-500" />
                  <span className="ml-2 text-xl font-semibold">AvocaJust</span>
                </div>
                <p className="text-gray-400 mb-4">
                  La plateforme qui vous met en relation avec les avocats justes pour vos droits.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('legal_notice')}</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('terms')}</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('cookies')}</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400">contact@avocajust.fr</li>
                  <li className="text-gray-400">01 23 45 67 89</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2024 AvocaJust. {t('all_rights_reserved')}.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedPage>
  );
}