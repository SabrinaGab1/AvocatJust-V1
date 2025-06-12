import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Scale, Star, Users, Award, Clock, ChevronRight, MapPin, Phone, Video, Building2, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import SignupModal from '../components/signup/SignupModal';
import AnimatedPage from '../components/AnimatedPage';

const lawyers = [
  {
    id: 1,
    name: 'Me Marie Dupont',
    specialty: 'Droit des affaires',
    city: 'Paris',
    rating: 4.8,
    reviews: 24,
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    consultationTypes: ['cabinet', 'visio', 'telephone'],
    price: 150
  },
  {
    id: 2,
    name: 'Me Thomas Martin',
    specialty: 'Droit du travail',
    city: 'Lyon',
    rating: 4.6,
    reviews: 18,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    consultationTypes: ['cabinet', 'visio'],
    price: 140
  },
  {
    id: 3,
    name: 'Me Sophie Bernard',
    specialty: 'Droit de la famille',
    city: 'Marseille',
    rating: 4.9,
    reviews: 31,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    consultationTypes: ['cabinet', 'visio', 'telephone'],
    price: 160
  },
  {
    id: 4,
    name: 'Me Pierre Rousseau',
    specialty: 'Droit pénal',
    city: 'Bordeaux',
    rating: 4.7,
    reviews: 22,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    consultationTypes: ['cabinet', 'telephone'],
    price: 180
  }
];

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

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-4 w-4" />;
      case 'visio':
        return <Video className="h-4 w-4" />;
      case 'telephone':
        return <Phone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white/80 shadow-sm sticky top-0 z-50 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Scale className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => navigate('/avocats')}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Nos avocats
                </button>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('emergency_lawyer')}
                </a>
                <a href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t('login')}
                </a>
                <button
                  onClick={() => setIsSignupModalOpen(true)}
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  {t('create_account')}
                </button>
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
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
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
                    className="flex items-center px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-lg"
                  >
                    {t('find_lawyer')}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 font-medium">
                {t('find_lawyer_online')}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-orange-500 mr-3" />
                  <div className="text-4xl font-bold text-gray-900">500+</div>
                </div>
                <p className="text-gray-900 font-medium text-lg">Avocats experts</p>
                <p className="text-gray-600">dans toute la France</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-12 w-12 text-yellow-400 mr-3" />
                  <div className="text-4xl font-bold text-gray-900">4.8</div>
                </div>
                <p className="text-gray-900 font-medium text-lg">Note moyenne</p>
                <p className="text-gray-600">satisfaction client</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Award className="h-12 w-12 text-orange-500 mr-3" />
                  <div className="text-4xl font-bold text-gray-900">15+</div>
                </div>
                <p className="text-gray-900 font-medium text-lg">Années d'expérience</p>
                <p className="text-gray-600">moyenne par avocat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Lawyers */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos avocats recommandés
              </h2>
              <p className="text-xl text-gray-600">
                Découvrez quelques-uns de nos avocats les mieux notés
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="animate-scroll">
                {[...lawyers, ...lawyers].map((lawyer, index) => (
                  <div
                    key={`${lawyer.id}-${index}`}
                    className="lawyer-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mr-6 border border-gray-100"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={lawyer.photo}
                        alt={lawyer.name}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-100"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{lawyer.name}</h3>
                        <p className="text-orange-600 font-medium">{lawyer.specialty}</p>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">{lawyer.city}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="font-medium text-gray-900">{lawyer.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({lawyer.reviews} avis)</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{lawyer.price}€</div>
                        <div className="text-xs text-gray-500">consultation</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      {lawyer.consultationTypes.map((type, idx) => (
                        <div
                          key={idx}
                          className="flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                        >
                          {getConsultationIcon(type)}
                          <span className="ml-1 capitalize">{type}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                      Consulter le profil
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/avocats')}
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Voir tous nos avocats
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('not_just_lawyers_1')} <span className="text-orange-500">AvocaJust</span>{t('not_just_lawyers_2')}
              </h2>
              <p className="text-2xl font-semibold text-gray-900">
                {t('just_lawyers')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Réponse rapide</h3>
                <p className="text-gray-600">Nos avocats s'engagent à vous répondre sous 24h maximum</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Scale className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expertise vérifiée</h3>
                <p className="text-gray-600">Tous nos avocats sont certifiés et inscrits au barreau</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Satisfaction garantie</h3>
                <p className="text-gray-600">Plus de 95% de nos clients recommandent nos services</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-orange-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Vous êtes avocat ?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Rejoignez notre communauté et développez votre clientèle
            </p>
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="inline-flex items-center px-8 py-4 bg-white text-orange-500 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg"
            >
              <Zap className="mr-2 h-6 w-6" />
              Rejoindre AvocaJust
            </button>
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
                <h3 className="font-semibold mb-4">Liens utiles</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">{t('legal_notice')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('terms')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('cookies')}</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>contact@avocajust.fr</li>
                  <li>01 23 45 67 89</li>
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