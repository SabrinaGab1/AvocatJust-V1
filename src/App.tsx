import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Scale, Search, ChevronDown, Star, MapPin, Phone, Video, Building2, Users, Award, Clock, CheckCircle, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import SignupModal from './components/signup/SignupModal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerBookingPage from './pages/LawyerBookingPage';
import BookingFormPage from './pages/BookingFormPage';
import { useState } from 'react';

// Page d'accueil principale
function HomePage() {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <Scale className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/search" className="flex items-center text-gray-700 hover:text-orange-500 transition-colors">
                <Search className="h-4 w-4 mr-2" />
                {t('find_lawyer')}
              </Link>
              <Link to="/urgence" className="flex items-center text-gray-700 hover:text-orange-500 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                {t('emergency_lawyer')}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">{language.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <Link 
                to="/login"
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                {t('login')}
              </Link>

              <button
                onClick={() => setIsSignupModalOpen(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Vous êtes avocat ?
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('find_your')} <span className="text-orange-500">{t('trusted_lawyer')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              {t('platform_description')}
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('search_placeholder')}
                      className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg"
                  >
                    {t('find_lawyer_online')}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-4">
                {t('not_just_lawyers_1')} <span className="font-semibold text-orange-500">AVOCAJUST</span>{t('not_just_lawyers_2')}
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {t('just_lawyers')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lawyers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos avocats</h2>
          </div>

          {/* Scrolling Lawyers */}
          <div className="overflow-hidden">
            <div className="animate-scroll">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="lawyer-card bg-white rounded-xl shadow-sm p-6 mr-6 flex-shrink-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={`https://images.unsplash.com/photo-${1560250097 + i}-0b93528c311a?auto=format&fit=crop&q=80&w=60`}
                      alt="Avocat"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {['Dupont', 'Martin', 'Bernard', 'Petit'][i % 4]}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {['Marie', 'Thomas', 'Sophie', 'Lucas'][i % 4]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">
                      {['Paris', 'Lyon', 'Marseille', 'Bordeaux'][i % 4]}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                      {['Droit des affaires', 'Droit du travail', 'Droit de la famille', 'Droit pénal'][i % 4]}
                    </span>
                    <br />
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {['Droit commercial', 'Droit social', 'Droit immobilier', 'Droit des sociétés'][i % 4]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                <span className="text-orange-500">AVOCAJUST</span> est votre <span className="text-orange-500">allié</span> pour vous permettre d'avancer <span className="text-orange-500">en toute sérénité</span>
              </h2>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Nos avocats sont sélectionnés sur la base de leur expertise, leur réactivité et leur humanité. <span className="text-orange-500 font-semibold">Ce sont nos héros du droit !</span>
                </p>
                
                <p>
                  Prendre conseil auprès d'un avocat est la seule façon de vous éviter plus de tracas ! Trouver votre avocat de confiance n'a jamais été aussi simple.
                </p>
                
                <p>
                  La transparence est notre priorité : vous connaissez le montant exact que vous devez payer. Et parce que nos avocats sont justes, ils déduisent le montant de la 1ère consultation si vous leur confiez votre dossier. Pour savoir si vous pouvez bénéficier de l'aide juridictionnelle après votre 1er rendez-vous.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-lg font-semibold text-gray-900 italic mb-6">
                  Nos avocats de confiance vous conseillent et vous défendent au quotidien
                </p>
                
                <Link
                  to="/search"
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors font-semibold"
                >
                  Trouver mon Avocat
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600"
                alt="Avocat Super Héros"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
              <p className="mt-4 text-sm text-gray-500">Avocat Super Héros</p>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Ils parlent de nous</h2>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <img src="https://via.placeholder.com/120x40/666/fff?text=BFM+Business" alt="BFM Business" className="h-8" />
              <img src="https://via.placeholder.com/120x40/666/fff?text=Amy+Karnov" alt="Amy Karnov Group" className="h-8" />
              <img src="https://via.placeholder.com/120x40/666/fff?text=Village+Justice" alt="Village de la Justice" className="h-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600"
                alt="Enfants à l'école"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <div className="text-orange-500 font-semibold mb-2">NOTRE FORMATION OFFERTE !</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Le harcèlement scolaire touche <span className="text-orange-500">1 élève sur 10</span> en France
              </h2>
              
              <p className="text-gray-600 mb-6">
                Le harcèlement scolaire a des conséquences graves sur le bien-être et la réussite scolaire de nos enfants (anxiété, dépression, échec scolaire). Il est essentiel de connaître les signes avant-coureurs et de savoir comment réagir. AVOCAJUST vous offre une formation en ligne conçue par des avocats pour vous aider à protéger vos enfants.
              </p>
              
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Association Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-orange-500 font-semibold mb-4">COUP DE CŒUR ASSOCIATIF</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tout le monde mérite d'être entendu, d'être reconnu.
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-orange-500">AVOCAJUST</span>, c'est un projet engagé !
          </p>
          <p className="text-gray-600 mb-12">
            Nous soutenons les associations qui œuvrent pour une société plus juste.
          </p>

          <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-orange-500 mb-6">
              Cette année, nous soutenons l'association « élève ta voix ».
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://via.placeholder.com/200x100/f97316/fff?text=Logo+élève+ta+voix"
                  alt="Logo élève ta voix"
                  className="mx-auto mb-4"
                />
              </div>
              
              <div className="text-left">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Sa mission</h4>
                <p className="text-gray-600">
                  Aider les enfants pour qu'aucun d'entre eux ne rejoigne nos anges partis trop tôt. C'est la raison pour laquelle nous nous engageons à aider davantage de personnes, jour après jour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-orange-500 font-semibold mb-2">FAQ</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-gray-600">Voici la liste des questions les plus fréquemment posées</p>
          </div>

          <div className="space-y-4">
            {[
              "Comment prendre un rendez-vous avec un avocat sur AVOCAJUST ?",
              "Comment puis-je m'assurer que les honoraires des avocats sur AVOCAJUST correspondront à mon budget ?",
              "Est-ce qu'AVOCAJUST convient pour tous types de problèmes juridiques ?",
              "Comment est-ce qu'AVOCAJUST assure la qualité des avocats sur sa plateforme ?",
              "Les avocats d'AVOCAJUST sont-ils disponibles partout en France ?",
              "Je suis Avocat. Comment rejoindre la communauté AVOCAJUST ?"
            ].map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50">
                  <span className="font-medium text-gray-900">{question}</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            ))}
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
                <li><Link to="/login" className="hover:text-white transition-colors">Connexion</Link></li>
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
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2025 AvocaJust. {t('all_rights_reserved')}</p>
              <p>
                Vous êtes avocat et souhaitez rejoindre notre liste d'avocats à contacter en urgence ?{' '}
                <a href="mailto:contact@avocajust.fr" className="text-orange-500 hover:text-orange-400">
                  Envoyez-nous un e-mail
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />
    </div>
  );
}

// Composant App principal avec le routage
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/avocat/:id" element={<LawyerProfilePage />} />
        <Route path="/avocat/:id/reservation" element={<LawyerBookingPage />} />
        <Route path="/avocat/:id/formulaire" element={<BookingFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;