import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Scale, Globe, ChevronDown, Star, MapPin, ArrowRight, Users, Award, Clock, CheckCircle, Phone, Video, Building2, Check } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { useLanguage } from './contexts/LanguageContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyerProfilePage from './pages/LawyerProfilePage';
import LawyerBookingPage from './pages/LawyerBookingPage';
import BookingFormPage from './pages/BookingFormPage';
import SignupModal from './components/signup/SignupModal';

const HomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isLoginChoiceModalOpen, setIsLoginChoiceModalOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('FR');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' }
  ];

  const lawyerLanguages = [
    'Français',
    'Anglais', 
    'Espagnol',
    'Allemand',
    'Italien',
    'Arabe',
    'Chinois',
    'Russe'
  ];

  const specialties = [
    'Droit des affaires',
    'Droit de la famille',
    'Droit pénal',
    'Droit immobilier',
    'Droit du travail',
    'Droit fiscal'
  ];

  const searchSuggestions = [
    'Droit de la famille',
    'Droit des affaires',
    'Droit du travail',
    'Droit pénal',
    'Droit immobilier',
    'Droit fiscal',
    'Droit commercial',
    'Droit des sociétés',
    'Droit social',
    'Divorce',
    'Licenciement',
    'Création d\'entreprise',
    'Contrat de travail',
    'Garde d\'enfants',
    'Pension alimentaire',
    'Succession',
    'Achat immobilier',
    'Vente immobilier',
    'Bail commercial',
    'Contentieux commercial',
    'Droit pénal des affaires',
    'Harcèlement au travail',
    'Rupture conventionnelle',
    'Accident du travail'
  ];

  // Mapping intelligent pour reconnaître le langage naturel
  const intelligentMapping = {
    // Famille et relations
    'papa': 'Droit de la famille - Garde d\'enfants',
    'maman': 'Droit de la famille - Garde d\'enfants',
    'enfant': 'Droit de la famille - Garde d\'enfants',
    'divorce': 'Droit de la famille - Divorce',
    'séparation': 'Droit de la famille - Divorce',
    'mariage': 'Droit de la famille',
    'pension': 'Droit de la famille - Pension alimentaire',
    'garde': 'Droit de la famille - Garde d\'enfants',
    'héritage': 'Droit de la famille - Succession',
    'succession': 'Droit de la famille - Succession',
    
    // Accidents et responsabilité
    'accident': 'Droit de la responsabilité - Accident',
    'blessé': 'Droit de la responsabilité - Dommages corporels',
    'voiture': 'Droit de la responsabilité - Accident de la route',
    'route': 'Droit de la responsabilité - Accident de la route',
    'assurance': 'Droit des assurances',
    'indemnisation': 'Droit de la responsabilité - Indemnisation',
    
    // Travail
    'travail': 'Droit du travail',
    'patron': 'Droit du travail - Relations employeur',
    'chef': 'Droit du travail - Relations employeur',
    'licencié': 'Droit du travail - Licenciement',
    'licenciement': 'Droit du travail - Licenciement',
    'salaire': 'Droit du travail - Rémunération',
    'harcèlement': 'Droit du travail - Harcèlement',
    'discrimination': 'Droit du travail - Discrimination',
    'congé': 'Droit du travail - Congés',
    'maladie': 'Droit du travail - Arrêt maladie',
    
    // Immobilier
    'maison': 'Droit immobilier - Achat/Vente',
    'appartement': 'Droit immobilier - Achat/Vente',
    'logement': 'Droit immobilier',
    'propriétaire': 'Droit immobilier - Relations locatives',
    'locataire': 'Droit immobilier - Relations locatives',
    'loyer': 'Droit immobilier - Relations locatives',
    'voisin': 'Droit immobilier - Troubles de voisinage',
    'construction': 'Droit de la construction',
    
    // Entreprise
    'entreprise': 'Droit des affaires - Création d\'entreprise',
    'société': 'Droit des sociétés',
    'associé': 'Droit des sociétés - Relations entre associés',
    'client': 'Droit commercial - Relations clients',
    'fournisseur': 'Droit commercial - Relations fournisseurs',
    'contrat': 'Droit des contrats',
    'facture': 'Droit commercial - Recouvrement',
    'impayé': 'Droit commercial - Recouvrement',
    
    // Pénal
    'police': 'Droit pénal',
    'commissariat': 'Droit pénal',
    'tribunal': 'Droit pénal',
    'procès': 'Droit pénal',
    'plainte': 'Droit pénal - Dépôt de plainte',
    'vol': 'Droit pénal - Vol',
    'agression': 'Droit pénal - Violences',
    'violence': 'Droit pénal - Violences',
    
    // Situations courantes
    'problème': 'Consultation juridique générale',
    'conseil': 'Consultation juridique générale',
    'aide': 'Consultation juridique générale',
    'question': 'Consultation juridique générale'
  };

  const locations = [
    'Paris',
    'Lyon',
    'Marseille',
    'Toulouse',
    'Nice',
    'Nantes'
  ];

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      const lowerValue = value.toLowerCase();
      
      // Recherche intelligente basée sur les mots-clés
      const intelligentSuggestions = [];
      
      // Vérifier les mappings intelligents
      for (const [keyword, suggestion] of Object.entries(intelligentMapping)) {
        if (lowerValue.includes(keyword)) {
          intelligentSuggestions.push(suggestion);
        }
      }
      
      // Recherche classique dans les suggestions existantes
      const classicSuggestions = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(lowerValue)
      );
      
      // Combiner les suggestions (intelligentes en premier)
      const allSuggestions = [...new Set([...intelligentSuggestions, ...classicSuggestions])];
      
      setFilteredSuggestions(allSuggestions.slice(0, 8)); // Limiter à 8 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0 && filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Délai pour permettre le clic sur les suggestions
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };
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
      nom: 'Dupont',
      prenom: 'Marie',
      ville: 'Paris',
      specialites: ['Droit des affaires', 'Droit commercial'],
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
      rating: 4.8,
      reviewCount: 24
    },
    {
      id: '2',
      nom: 'Martin',
      prenom: 'Thomas',
      ville: 'Lyon',
      specialites: ['Droit du travail', 'Droit social'],
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      rating: 4.6,
      reviewCount: 18
    },
    {
      id: '3',
      nom: 'Bernard',
      prenom: 'Sophie',
      ville: 'Marseille',
      specialites: ['Droit de la famille', 'Droit immobilier'],
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      rating: 4.9,
      reviewCount: 31
    },
    {
      id: '4',
      nom: 'Petit',
      prenom: 'Lucas',
      ville: 'Bordeaux',
      specialites: ['Droit pénal', 'Droit des sociétés'],
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
      rating: 4.7,
      reviewCount: 22
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">AvocaJust</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsLoginChoiceModalOpen(true)}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Connexion
              </button>
              
              <button
                onClick={() => setIsSignupModalOpen(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Vous êtes avocat ?
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Trouvez votre <span className="text-orange-500">avocat de confiance</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              La plateforme qui vous met en relation avec les avocats justes
            </p>

            {/* Search Bar - Style simplifié */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Décrivez votre problématique (ex: licenciement, divorce, création d'entreprise, etc)"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="w-full pl-12 pr-16 py-4 text-lg border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-lg bg-white"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
                
                {/* Suggestions dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-6 py-3 hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl group"
                      >
                        <div className="flex items-center">
                          <Search className="h-4 w-4 text-gray-400 group-hover:text-orange-500 mr-3 transition-colors" />
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick consultation type buttons */}
            <div className="flex justify-center space-x-4 mt-2">
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
                  params.append('type', 'cabinet');
                  navigate(`/search?${params.toString()}`);
                }}
                className="flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-white hover:scale-105 transition-all duration-200 shadow-sm"
              >
                <Building2 className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-gray-700 font-medium">Présentiel</span>
              </button>
              
              <button
                onClick={() => {
                  setShowLanguageDropdown(!showLanguageDropdown);
                }}
                className="relative flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:bg-white hover:scale-105 transition-all duration-200 shadow-sm"
              >
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-700 font-medium">Langue</span>
                
                {/* Language Dropdown */}
                {showLanguageDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {lawyerLanguages.map((language) => (
                      <button
                        key={language}
                        onClick={(e) => {
                          e.stopPropagation();
                          const params = new URLSearchParams();
                          params.append('language', language);
                          navigate(`/search?${params.toString()}`);
                          setShowLanguageDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors"
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Text Section before Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">
            TROUVEZ UN AVOCAT EN LIGNE AUTOUR DE VOUS
          </p>
          <p className="text-xl text-gray-900 mb-2">
            Sur <span className="font-bold">AVOCAJUST</span>, ce ne sont pas juste des avocats.
          </p>
          <p className="text-xl text-gray-900 mb-8">
            Ce sont des <span className="text-orange-500 font-bold">avocats justes</span> pour vos droits !
          </p>
          
          <button
            onClick={() => navigate('/search')}
            className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors font-semibold inline-flex items-center"
           >
             Trouver un avocat
             <ArrowRight className="h-5 w-5 ml-2" />
           </button>
        </div>
      </section>

      {/* Featured Lawyers Section */}
      <section className="-mt-4 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-6" style={{ width: 'calc(300px * 8 + 1.5rem * 7)' }}>
              {[...mockLawyers, ...mockLawyers].map((lawyer, index) => (
              <div
                key={`${lawyer.id}-${index}`}
                className="lawyer-card relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer group flex-shrink-0"
                onClick={() => navigate(`/avocat/${lawyer.id}`)}
              >
                <div className="aspect-[3/4] relative">
                  <img
                    src={lawyer.photo}
                    alt={`${lawyer.prenom} ${lawyer.nom}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(lawyer.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm">{lawyer.rating} ({lawyer.reviewCount})</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1">
                      {lawyer.prenom} {lawyer.nom}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-200 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {lawyer.ville}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {lawyer.specialites.slice(0, 2).map((specialite, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-orange-500/80 text-xs rounded-full"
                        >
                          {specialite}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                <span className="text-orange-500">AVOCAJUST</span> est votre <span className="text-orange-500">allié</span> pour vous avancer <span className="text-orange-500">en toute sérénité</span>
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p className="font-medium">
                  Nos avocats sont sélectionnés sur la base de leur expertise, leur réactivité et leur humanité. <span className="text-orange-500 font-semibold">Ce sont nos héros du droit !</span>
                </p>
                
                <p>
                  Prendre conseil auprès d'un avocat est la seule façon de vous éviter plus de tracas ! Trouver votre avocat de confiance n'a jamais été aussi simple.
                </p>
                
                <p>
                  La transparence est notre priorité : vous connaissez le montant exact que vous devez payer. Et parce que nos avocats sont justes, ils déduisent le montant de la 1ère consultation si vous leur confiez votre dossier. Pour savoir si vous pouvez bénéficier de l'aide juridictionnelle après votre 1er rendez-vous.
                </p>
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=600"
                alt="Avocat de confiance"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              DANS LES MÉDIAS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ils parlent de <span className="text-orange-500">nous</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment AVOCAJUST révolutionne l'accès au droit et transforme la relation entre avocats et clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Article 1 - Le Figaro */}
            <div
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=600"
                  alt="Article Le Figaro"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                
                {/* Logo overlay */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-blue-800 font-bold text-lg">Le Figaro</span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold uppercase tracking-wide">
                      Article Premium
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-300 transition-colors leading-tight">
                    "La révolution numérique du droit français"
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Analyse approfondie de notre impact sur l'écosystème juridique français
                  </p>
                </div>
              </div>
            </div>

            {/* Article 2 - BFM Business */}
            <div
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=600"
                  alt="Article BFM Business"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                
                {/* Logo overlay */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-red-600 font-bold text-lg">BFM</span>
                    <span className="text-gray-800 font-medium ml-1">BUSINESS</span>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-full text-xs font-semibold uppercase tracking-wide">
                      Interview TV
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-300 transition-colors leading-tight">
                    "L'avenir de la consultation juridique"
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Une enquête exclusive sur la digitalisation du secteur juridique
                  </p>
                </div>
              </div>
            </div>

            {/* Article 3 - Village Justice */}
            <div
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600"
                  alt="Article Village Justice"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                
                {/* Logo overlay */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-orange-600 font-bold text-sm">VILLAGE JUSTICE</span>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold uppercase tracking-wide">
                      Dossier Spécial
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-300 transition-colors leading-tight">
                    "Innovation et accessibilité juridique"
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Comment AVOCAJUST démocratise l'accès aux services juridiques
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="text-gray-600 font-medium">Articles de presse</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">15</div>
                <div className="text-gray-600 font-medium">Médias partenaires</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">2M+</div>
                <div className="text-gray-600 font-medium">Vues médias</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-gray-600 font-medium">Avis positifs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formation Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600"
                alt="Enfants à l'école"
                className="rounded-lg shadow-lg"
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
              
              <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors font-semibold">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Association Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-orange-500 font-semibold mb-4">COUP DE CŒUR ASSOCIATIF</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Tout le monde mérite d'être entendu, d'être reconnu.
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-bold text-orange-500">AVOCAJUST</span>, c'est un projet engagé !
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Nous soutenons l'association <span className="font-bold">Élève ta voix</span> qui lutte contre le harcèlement scolaire.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
                alt="Logo élève ta voix"
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
            
            <div className="text-left">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Sa mission</h4>
              <p className="text-gray-600 mb-6">
                Élève ta voix accompagne les victimes de harcèlement scolaire et leurs familles. L'association propose un soutien psychologique, des conseils juridiques et des actions de sensibilisation dans les établissements scolaires.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Accompagnement personnalisé des familles</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Interventions dans les écoles</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Formation des équipes éducatives</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
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
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{question}</h3>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
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
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2025 AvocaJust. Tous droits réservés.</p>
              <p className="text-gray-400 text-sm mt-4 md:mt-0">
                Vous êtes avocat et souhaitez rejoindre notre liste d'avocats à contacter en urgence ? 
                <a href="mailto:contact@avocajust.fr" className="text-orange-500 hover:text-orange-400 ml-1">
                  Envoyez-nous un e-mail
                </a>
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link to="/mentions" className="text-gray-400 hover:text-white text-sm">Mentions légales</Link>
                <Link to="/cgv" className="text-gray-400 hover:text-white text-sm">CGV</Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />

      {/* Login Choice Modal */}
      <Dialog
        open={isLoginChoiceModalOpen}
        onClose={() => setIsLoginChoiceModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Scale className="h-12 w-12 text-orange-500" />
              </div>
              <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">
                Connexion
              </Dialog.Title>
              <p className="text-gray-600 mb-8">
                Choisissez votre type de compte
              </p>

              <div className="space-y-4">
                <Link
                  to="/login?type=avocat"
                  onClick={() => setIsLoginChoiceModalOpen(false)}
                  className="w-full flex items-center justify-center px-6 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold"
                >
                  <Scale className="h-5 w-5 mr-3" />
                  Je suis avocat
                </Link>
                
                <Link
                  to="/login?type=utilisateur"
                  onClick={() => setIsLoginChoiceModalOpen(false)}
                  className="w-full flex items-center justify-center px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  <Users className="h-5 w-5 mr-3" />
                  Je suis utilisateur
                </Link>
              </div>

              <button
                onClick={() => setIsLoginChoiceModalOpen(false)}
                className="mt-6 text-sm text-gray-500 hover:text-gray-700"
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

function App() {
  return (
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
  );
}

export default App;