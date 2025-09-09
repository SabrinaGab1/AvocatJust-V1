import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Search, Scale, Globe, ChevronDown, Star, MapPin, ArrowRight, Users, Award, Clock, CheckCircle, Phone, Video, Building2 } from 'lucide-react';
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
              <button 
                onClick={() => navigate('/search')}
                className="flex items-center text-gray-700 hover:text-orange-500 transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                Trouver un avocat
              </button>
              <Link to="/urgence" className="flex items-center text-gray-700 hover:text-orange-500 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                Urgence Avocat
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">FR</span>
                <ChevronDown className="h-3 w-3 text-gray-500" />
              </div>
              
              <Link 
                to="/login"
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Connexion
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
            </div>
          </div>
        </div>
      </section>

      {/* Text Section before Carousel */}
      <section className="py-16 bg-white">
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
            <Search className="h-5 w-5 mr-2" />
            Nos avocats
          </button>
        </div>
      </section>
      {/* Lawyers Carousel */}
      <section className="py-4 bg-white overflow-hidden">
        
        <div className="relative">
          <div className="flex animate-scroll">
            {[...mockLawyers, ...mockLawyers, ...mockLawyers].map((lawyer, index) => (
              <div
                key={`${lawyer.id}-${index}`}
                className="relative w-80 h-80 mx-3 flex-shrink-0 rounded-xl overflow-hidden"
                style={{
                  backgroundImage: `url(${lawyer.photo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6 text-white">
                  {/* Top section - Name and location */}
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      {lawyer.nom}
                    </h3>
                    <p className="text-lg font-medium mb-2">
                      {lawyer.prenom}
                    </p>
                    <p className="text-sm opacity-90 mb-4">
                      {lawyer.ville}
                    </p>
                    
                    {/* Phone icon */}
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Phone className="h-4 w-4" />
                    </div>
                  </div>
                  
                  {/* Bottom section - Specialties */}
                  <div className="space-y-2">
                    {lawyer.specialites.slice(0, 2).map((specialite, idx) => (
                      <div key={idx} className="text-sm font-medium">
                        {specialite}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="text-orange-500">AVOCAJUST</span> est votre <span className="text-orange-500">allié</span> pour vous permettre d'avancer <span className="text-orange-500">en toute sérénité</span>
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
              
              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  <span className="text-orange-500">Nos avocats de confiance</span> vous conseillent et vous défendent au quotidien
                </h3>
                
                <button
                  onClick={() => navigate('/search')}
                  className="bg-orange-500 text-white px-10 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Trouver mon Avocat
                </button>
              </div>
            </div>
            
            <div className="text-center lg:pl-8">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=600"
                alt="Avocat Super Héros"
                className="rounded-2xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300 w-80 h-96 object-cover"
              />
              <p className="mt-6 text-lg font-medium text-gray-600">Avocat Super Héros</p>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Ils parlent de nous</h2>
          <div className="flex justify-center items-center space-x-12 opacity-70">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=200&h=80"
              alt="BFM Business"
              className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=200&h=80"
              alt="Amy Karnov Group"
              className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=200&h=80"
              alt="Village de la Justice"
              className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tout le monde mérite d'être entendu, d'être reconnu.
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-bold text-orange-500">AVOCAJUST</span>, c'est un projet engagé !
          </p>
          <p className="text-gray-600 mb-8">
            Nous soutenons les associations qui œuvrent pour une société plus juste.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-orange-500 mb-6">
              Cette année, nous soutenons l'association « élève ta voix ».
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://via.placeholder.com/200x100/FF6B35/FFFFFF?text=Logo+élève+ta+voix"
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