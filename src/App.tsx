import React, { useState, Fragment, useEffect } from 'react';
import { Scale, Phone, Search, ChevronDown, X, Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Globe, Filter, Clock, Video, Building2 } from 'lucide-react';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnimatedPage from './components/AnimatedPage';
import { useLanguage } from './contexts/LanguageContext';

const avocats = [
  {
    nom: 'Dupont',
    prenom: 'Marie',
    ville: 'Paris',
    specialites: ['Droit des affaires', 'Droit commercial'],
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500'
  },
  {
    nom: 'Martin',
    prenom: 'Thomas',
    ville: 'Lyon',
    specialites: ['Droit du travail', 'Droit social'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500'
  },
  {
    nom: 'Bernard',
    prenom: 'Sophie',
    ville: 'Marseille',
    specialites: ['Droit de la famille', 'Droit immobilier'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500'
  },
  {
    nom: 'Petit',
    prenom: 'Lucas',
    ville: 'Bordeaux',
    specialites: ['Droit pénal', 'Droit des sociétés'],
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500'
  }
];

const problematiques = {
  'entreprise': {
    domaines: ['Droit des affaires', 'Droit commercial', 'Droit des sociétés'],
    exemples: ['Création d\'entreprise', 'Contrats commerciaux', 'Litiges entre associés'],
    motsClefs: ['entreprise', 'société', 'commerce', 'contrat', 'litige', 'associé', 'business']
  },
  'travail': {
    domaines: ['Droit du travail', 'Droit social'],
    exemples: ['Licenciement', 'Harcèlement', 'Contrat de travail'],
    motsClefs: ['travail', 'emploi', 'patron', 'employeur', 'salaire', 'licenciement', 'harcèlement', 'collègue']
  },
  'famille': {
    domaines: ['Droit de la famille'],
    exemples: ['Divorce', 'Garde d\'enfants', 'Succession'],
    motsClefs: ['famille', 'mariage', 'divorce', 'enfant', 'garde', 'succession', 'héritage', 'conjoint', 'époux', 'épouse', 'mari', 'femme']
  },
  'immobilier': {
    domaines: ['Droit immobilier'],
    exemples: ['Bail', 'Copropriété', 'Vente immobilière'],
    motsClefs: ['immobilier', 'maison', 'appartement', 'bail', 'loyer', 'propriétaire', 'locataire', 'voisin', 'copropriété', 'bruit']
  },
  'pénal': {
    domaines: ['Droit pénal'],
    exemples: ['Défense pénale', 'Garde à vue', 'Comparution immédiate'],
    motsClefs: ['pénal', 'délit', 'crime', 'police', 'plainte', 'victime', 'accusation']
  }
};

const villes = [
  'Paris',
  'Lyon',
  'Marseille',
  'Bordeaux',
  'Toulouse',
  'Nantes',
  'Strasbourg',
  'Lille',
  'Nice',
  'Rennes'
];

const specialites = [
  'Droit des affaires',
  'Droit commercial',
  'Droit du travail',
  'Droit social',
  'Droit de la famille',
  'Droit immobilier',
  'Droit pénal',
  'Droit des sociétés',
  'Droit fiscal',
  'Droit de la propriété intellectuelle'
];

const langues = [
  'Français',
  'Anglais',
  'Espagnol',
  'Allemand',
  'Italien',
  'Arabe',
  'Chinois',
  'Portugais'
];

type ConsultationType = 'cabinet' | 'visio' | 'telephone';

function HomePage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isUrgenceModalOpen, setIsUrgenceModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ type: string; value: string; description?: string }>>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    ville: '',
    specialite: '',
    langue: '',
    disponibilite: false
  });
  const [selectedConsultationType, setSelectedConsultationType] = useState<ConsultationType | null>(null);

  const consultationTypes = [
    {
      id: 'cabinet',
      icon: Building2,
      title: language === 'fr' ? 'Au cabinet' : 'Office',
      description: language === 'fr' ? 'Rendez-vous en personne' : 'In-person meeting'
    },
    {
      id: 'visio',
      icon: Video,
      title: language === 'fr' ? 'Visioconférence' : 'Video call',
      description: language === 'fr' ? 'Consultation en ligne' : 'Online consultation'
    },
    {
      id: 'telephone',
      icon: Phone,
      title: language === 'fr' ? 'Téléphone' : 'Phone call',
      description: language === 'fr' ? 'Appel téléphonique' : 'Phone consultation'
    }
  ];

  const findSuggestions = (query: string) => {
    if (!query.trim()) return [];
    const searchTerm = query.toLowerCase();
    const results: Array<{ type: string; value: string; description?: string }> = [];
    const words = searchTerm.split(/\s+/);

    Object.entries(problematiques).forEach(([key, { domaines, exemples, motsClefs }]) => {
      const matchesKeywords = words.some(word => 
        motsClefs.some(motClef => motClef.includes(word) || word.includes(motClef))
      );

      if (matchesKeywords) {
        domaines.forEach(domaine => {
          results.push({
            type: 'problématique',
            value: domaine,
            description: `Suggestions: ${exemples.join(', ')}`
          });
        });
      }
    });

    if (results.length === 0 && searchTerm.length > 10) {
      if (searchTerm.includes('voisin') || searchTerm.includes('bruit')) {
        results.push({
          type: 'problématique',
          value: 'Droit immobilier',
          description: 'Problèmes de voisinage, nuisances sonores'
        });
      }
      if (searchTerm.includes('femme') || searchTerm.includes('mari') || searchTerm.includes('divorce')) {
        results.push({
          type: 'problématique',
          value: 'Droit de la famille',
          description: 'Divorce, séparation, garde d\'enfants'
        });
      }
    }

    return results.slice(0, 10);
  };

  useEffect(() => {
    const matches = findSuggestions(searchQuery);
    setSuggestions(matches);
  }, [searchQuery]);

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-white">
        <nav className="bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] sticky top-0 z-50 backdrop-blur-sm bg-white/90 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Scale className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="flex items-center text-gray-700 hover:text-orange-500"
                >
                  <Search className="h-5 w-5 mr-1 text-orange-500" />
                  {language === 'fr' ? 'Trouver un avocat' : 'Find a lawyer'}
                </button>

                <button
                  onClick={() => setIsUrgenceModalOpen(true)}
                  className="flex items-center text-gray-700 hover:text-orange-500"
                >
                  <Phone className="h-5 w-5 mr-1 text-orange-500" />
                  {language === 'fr' ? 'Urgence Avocat' : 'Emergency Lawyer'}
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center text-gray-700 hover:text-orange-500">
                    <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <img 
                        src={language === 'fr' 
                          ? "https://flagcdn.com/w40/fr.png"
                          : "https://flagcdn.com/w40/gb.png"
                        }
                        alt={language === 'fr' ? "Français" : "English"}
                        className="w-6 h-4 object-cover rounded"
                      />
                      <span className="text-sm font-medium">{language.toUpperCase()}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setLanguage('fr')}
                              className={`${
                                active ? 'bg-orange-50 text-orange-500' : 'text-gray-700'
                              } flex items-center w-full px-4 py-2 text-sm`}
                            >
                              <img 
                                src="https://flagcdn.com/w40/fr.png"
                                alt="Français"
                                className="w-6 h-4 object-cover rounded mr-2"
                              />
                              Français
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => setLanguage('en')}
                              className={`${
                                active ? 'bg-orange-50 text-orange-500' : 'text-gray-700'
                              } flex items-center w-full px-4 py-2 text-sm`}
                            >
                              <img 
                                src="https://flagcdn.com/w40/gb.png"
                                alt="English"
                                className="w-6 h-4 object-cover rounded mr-2"
                              />
                              English
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Link 
                  to="/login"
                  className="text-gray-700 hover:text-orange-500 transition-colors"
                >
                  {language === 'fr' ? 'Connexion' : 'Login'}
                </Link>
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  {language === 'fr' ? 'Créer un compte' : 'Create account'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-gradient-to-br from-orange-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                <span className="inline">
                  {language === 'fr' ? 'Trouvez votre ' : 'Find your '}
                </span>
                <span className="inline text-orange-500">
                  {language === 'fr' ? 'avocat de confiance' : 'trusted lawyer'}
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                {language === 'fr' 
                  ? 'La plateforme qui vous met en relation avec les avocats justes'
                  : 'The platform that connects you with the right lawyers'}
              </p>
              
              <div className="mt-8 max-w-3xl mx-auto">
                <div className="bg-white p-2 rounded-full shadow-lg flex items-center">
                  <div className="flex-1 px-4 py-2">
                    <div className="relative">
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="w-full focus:outline-none text-gray-600 text-lg"
                          placeholder={language === 'fr' 
                            ? "Décrivez votre problématique (ex: licenciement, divorce, création d'entreprise, etc)"
                            : "Describe your issue (e.g., dismissal, divorce, business creation, etc)"}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      {suggestions.length > 0 && (
                        <div className="absolute left-0 mt-1 w-full bg-white rounded-md shadow-lg z-10">
                          <ul className="max-h-60 rounded-md py-1 text-base overflow-auto">
                            {suggestions.map((suggestion, index) => (
                              <li
                                key={index}
                                className="cursor-pointer select-none py-2 px-3 text-gray-900 hover:bg-orange-100"
                                onClick={() => {
                                  setSearchQuery(suggestion.value);
                                  setSuggestions([]);
                                }}
                              >
                                <div>
                                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 rounded-full mr-2">
                                    {suggestion.type}
                                  </span>
                                  <span className="font-medium">{suggestion.value}</span>
                                </div>
                                {suggestion.description && (
                                  <p className="mt-1 text-sm text-gray-500">{suggestion.description}</p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="ml-2 p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-16">
          <div className="text-center mb-12">
            <h2 className="text-sm tracking-wider text-gray-600 mb-4">
              {language === 'fr' 
                ? 'TROUVEZ UN AVOCAT EN LIGNE AUTOUR DE VOUS'
                : 'FIND A LAWYER ONLINE NEAR YOU'}
            </h2>
            <div className="text-2xl font-bold text-gray-900">
              {language === 'fr' ? (
                <>
                  Sur <span>AVOCAJUST</span>, ce ne sont pas juste des avocats.
                  <br />
                  Ce sont des <span className="text-orange-500">avocats justes</span> pour vos droits !
                </>
              ) : (
                <>
                  On <span>AVOCAJUST</span>, they're not just lawyers.
                  <br />
                  They're <span className="text-orange-500">just lawyers</span> for your rights!
                </>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {avocats.map((avocat, index) => (
                <div
                  key={`${avocat.nom}-${index}-1`}
                  className="lawyer-card flex-none relative border border-orange-500 rounded-lg overflow-hidden mx-6"
                  style={{
                    backgroundImage: `url(${avocat.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '300px',
                    height: '300px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                  
                  <div className="relative h-full flex flex-col justify-between p-4 text-white">
                    <div>
                      <div className="mb-3">
                        <h3 className="text-xl font-bold">{avocat.nom}</h3>
                        <p className="text-lg">{avocat.prenom}</p>
                      </div>
                      <div className="flex items-center mb-3">
                        <span className="ml-2 font-medium">{avocat.ville}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded-full bg-orange-500/20 hover:bg-orange-500/30 transition-colors">
                          <Phone className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {avocat.specialites.map((specialite, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm"
                        >
                          {specialite}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {avocats.map((avocat, index) => (
                <div
                  key={`${avocat.nom}-${index}-2`}
                  className="lawyer-card flex-none relative border border-orange-500 rounded-lg overflow-hidden mx-6"
                  style={{
                    backgroundImage: `url(${avocat.photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '300px',
                    height: '300px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
                  
                  <div className="relative h-full flex flex-col justify-between p-4 text-white">
                    <div>
                      <div className="mb-3">
                        <h3 className="text-xl font-bold">{avocat.nom}</h3>
                        <p className="text-lg">{avocat.prenom}</p>
                      </div>
                      <div className="flex items-center mb-3">
                        <span className="ml-2 font-medium">{avocat.ville}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded-full bg-orange-500/20 hover:bg-orange-500/30 transition-colors">
                          <Phone className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {avocat.specialites.map((specialite, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm"
                        >
                          {specialite}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50/50 to-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  AVOCAJUST est votre <span className="text-orange-500">allié</span> pour vous permettre d'avancer <span className="text-orange-500">en toute sérénité</span>
                </h2>

                <p className="text-2xl text-gray-900">
                  Nos avocats sont sélectionnés sur la base de leur expertise, leur réactivité et leur humanité. <span className="text-orange-500">Ce sont nos héros du droit !</span>
                </p>

                <div className="space-y-4 text-gray-600">
                  <p>
                    Prendre conseil auprès d'un avocat est la seule façon de vous éviter plus de tracas ! Trouver votre avocat de confiance n'a jamais été aussi simple.
                  </p>
                  
                  <p>
                    La transparence est notre priorité : vous connaissez le montant exact que vous devez payer. Et parce que nos avocats sont justes, ils déduisent le montant de la 1ère consultation si vous leur confiez votre dossier. Pour savoir si vous pouvez bénéficier de l'aide juridictionnelle après votre 1er rendez-vous.
                  </p>
                </div>

                <div className="text-center lg:text-left">
                  <p className="text-lg font-medium text-gray-900 italic mb-6">
                    Nos avocats de confiance vous conseillent et vous défendent au quotidien
                  </p>
                  <button className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-lg font-medium">
                    Trouver mon Avocat
                  </button>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://i.imgur.com/XkiH6P4.png"
                  alt="Avocat Super Héros"
                  className="w-full max-w-lg mx-auto"
                />
                <div className="absolute -bottom-12 -right-8 text-orange-300/20 transform rotate-45">
                  <div className="w-24 h-24 border-2 border-dashed rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Ils parlent de nous</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/BFM_Business_logo_2019.svg/1200px-BFM_Business_logo_2019.svg.png" alt="BFM Business" className="h-16 object-contain" />
              <img src="https://i.imgur.com/YLInLOY.png" alt="Amy Karnov Group" className="h-16 object-contain" />
              <img src="https://i.imgur.com/8jcYrD6.png" alt="Village de la Justice" className="h-16 object-contain" />
            </div>
          </div>
        </div>

        <div className="bg-orange-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920"
                  alt="Enfants à l'école"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="text-orange-500 font-medium mb-4">NOTRE FORMATION OFFERTE !</div>
                <h2 className="text-4xl font-bold mb-8">
                  Le harcèlement scolaire touche <span className="text-orange-500">1 élève sur 10</span> en France
                </h2>
                <div className="prose prose-lg">
                  <p>Le harcèlement scolaire a des conséquences graves sur le bien-être et la réussite scolaire de nos enfants (anxiété, dépression, échec scolaire). Il est essentiel de connaître les signes avant-coureurs et de savoir comment réagir. AVOCAJUST vous offre une formation en ligne conçue par des avocats pour vous aider à protéger vos enfants.</p>
                </div>
                <button className="mt-8 px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-lg font-medium">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50/50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-orange-500">COUP DE CŒUR ASSOCIATIF</h2>
              <p className="mt-4 text-gray-600">
                Tout le monde mérite d'être entendu, d'être reconnu.
                <br />
                AVOCAJUST, c'est un projet engagé !
                <br />
                Nous soutenons les associations qui œuvrent pour une société plus juste.
              </p>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-orange-500">
                Cette année, nous soutenons l'association « élève ta voix ».
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <img 
                  src="https://i.imgur.com/XkiH6P4.png" 
                  alt="Logo élève ta voix"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Sa mission</h4>
                <p className="text-gray-600">
                  Aider les enfants pour qu'aucun d'entre eux ne rejoigne nos anges partis trop tôt. C'est la raison pour laquelle nous nous engageons à aider davantage de personnes, jour après jour.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-orange-500 font-medium">FAQ</span>
              <h2 className="mt-2 text-3xl font-bold">Questions fréquentes</h2>
              <p className="mt-4 text-gray-600">
                Voici la liste des questions les plus fréquemment posées
              </p>
            </div>

            <div className="mt-12 max-w-3xl mx-auto space-y-4">
              <div className="bg-white rounded-lg border border-gray-200">
                <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <span className="font-medium text-gray-900">Comment prendre un rendez-vous avec un avocat sur AVOCAJUST ?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <span className="font-medium text-gray-900">Comment puis-je m'assurer que les honoraires des avocats sur AVOCAJUST correspondront à mon budget ?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <span className="font-medium text-gray-900">Est-ce qu'AVOCAJUST convient pour tous types de problèmes juridiques ?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <span className="font-medium text-gray-900">Comment est-ce qu'AVOCAJUST assure la qualité des avocats sur sa plateforme ?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <span className="font-medium text-gray-900">Les avocats d'AVOCAJUST sont-ils disponibles partout en France ?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <span className="font-medium text-gray-900">Je suis Avocat. Comment rejoindre la communauté AVOCAJUST ?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Modal */}
        <Dialog
          open={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-orange-500 to-orange-600" />
                
                <div className="relative px-8 pt-8 pb-6">
                  <div className="flex items-center justify-between mb-8">
                    <Dialog.Title className="text-2xl font-bold text-white">
                      {language === 'fr' ? 'Trouver votre avocat' : 'Find your lawyer'}
                    </Dialog.Title>
                    <button
                      onClick={() => setIsSearchModalOpen(false)}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {language === 'fr' ? 'Type de consultation' : 'Consultation type'}
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {consultationTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedConsultationType(type.id as ConsultationType)}
                            className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                              selectedConsultationType === type.id
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-200'
                            }`}
                          >
                            <div className={`p-3 rounded-full mb-2 ${
                              selectedConsultationType === type.id
                                ? 'bg-orange-100 text-orange-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <type.icon className="h-6 w-6" />
                            </div>
                            <h4 className="font-medium text-gray-900">{type.title}</h4>
                            <p className="text-sm text-gray-500 text-center mt-1">
                              {type.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'fr' ? 'Ville' : 'City'}
                        </label>
                        <select
                          value={selectedFilters.ville}
                          onChange={(e) => setSelectedFilters({ ...selectedFilters, ville: e.target.value })}
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">{language === 'fr' ? 'Toutes les villes' : 'All cities'}</option>
                          {villes.map((ville) => (
                            <option key={ville} value={ville}>{ville}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {language === 'fr' ? 'Langue' : 'Language'}
                        </label>
                        <select
                          value={selectedFilters.langue}
                          onChange={(e) => setSelectedFilters({ ...selectedFilters, langue: e.target.value })}
                          className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">{language === 'fr' ? 'Toutes les langues' : 'All languages'}</option>
                          {langues.map((langue) => (
                            <option key={langue} value={langue}>{langue}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'fr' ? 'Spécialité' : 'Specialty'}
                      </label>
                      <select
                        value={selectedFilters.specialite}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, specialite: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">{language === 'fr' ? 'Toutes les spécialités' : 'All specialties'}</option>
                        {specialites.map((specialite) => (
                          <option key={specialite} value={specialite}>{specialite}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedFilters.disponibilite}
                          onChange={(e) => setSelectedFilters({ ...selectedFilters, disponibilite: e.target.checked })}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">
                          {language === 'fr' ? 'Disponible maintenant' : 'Available now'}
                        </span>
                      </label>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => setIsSearchModalOpen(false)}
                          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          {language === 'fr' ? 'Annuler' : 'Cancel'}
                        </button>
                        <button
                          className="px-6 py-2.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                        >
                          {language === 'fr' ? 'Rechercher' : 'Search'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Emergency Modal */}
        <Dialog
          open={isUrgenceModalOpen}
          onClose={() => setIsUrgenceModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  {language === 'fr' ? 'Urgence 24h/24' : '24/7 Emergency'}
                </Dialog.Title>
                <button
                  onClick={() => setIsUrgenceModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-4">
                    06.17.32.44.68
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {language === 'fr' 
                      ? 'Appelez-nous ou décrivez votre situation ci-dessous'
                      : 'Call us or describe your situation below'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <textarea
                    rows={4}
                    placeholder={language === 'fr' 
                      ? "Décrivez brièvement votre situation d'urgence..."
                      : "Briefly describe your emergency situation..."}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    className="w-full mt-3 px-4 py-2.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    {language === 'fr' ? 'Envoyer' : 'Send'}
                  </button>
                </div>

                <div className="border-t pt-4 text-sm text-gray-500">
                  <p>
                    {language === 'fr'
                      ? "Vous êtes avocat et souhaitez rejoindre notre liste d'avocats à contacter en urgence ?"
                      : "Are you a lawyer and want to join our emergency contact list?"}
                  </p>
                  <a 
                    href="mailto:hello@avocajust.com"
                    className="text-orange-500 hover:text-orange-600 inline-flex items-center mt-1"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    hello@avocajust.com
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setIsUrgenceModalOpen(false)}
                  className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {language === 'fr' ? 'Fermer' : 'Close'}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Scale className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-semibold">AvocaJust</span>
            </div>
            <p className="text-gray-400 mb-6">
              La première communauté d'avocats engagés pour une justice accessible et équitable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Trouver un avocat
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Urgence 24/7
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Consultation en ligne
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Devis personnalisé
                </a>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400  hover:text-orange-500 transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                <span>123 rue de la Justice, 75001 Paris</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2 text-orange-500" />
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2 text-orange-500" />
                <span>contact@avocajust.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} AvocaJust. Tous droits réservés.
              </p>
              <p className="text-gray-400 text-sm md:ml-8">
                Vous êtes avocat et souhaitez rejoindre notre liste d'avocats à contacter en urgence ?{' '}
                <a href="mailto:hello@avocajust.com" className="text-orange-500 hover:text-orange-400">
                  Envoyez-nous un e-mail
                </a>
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                    CGV
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <Footer />
          </>
        } />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
    </AnimatePresence>
  );
}