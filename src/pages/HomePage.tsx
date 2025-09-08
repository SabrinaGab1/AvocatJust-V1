import React, { useState } from 'react';
import { Search, Scale, Globe, ChevronDown, Star, ArrowRight, Play, Users, Shield, Clock, Award, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedPage from '../components/AnimatedPage';

const lawyers = [
  {
    id: '1',
    nom: 'Dupont',
    prenom: 'Marie',
    ville: 'Paris',
    specialites: ['Droit des affaires', 'Droit commercial'],
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: '2',
    nom: 'Martin',
    prenom: 'Thomas',
    ville: 'Lyon',
    specialites: ['Droit du travail', 'Droit social'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: '3',
    nom: 'Bernard',
    prenom: 'Sophie',
    ville: 'Marseille',
    specialites: ['Droit de la famille', 'Droit immobilier'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: '4',
    nom: 'Petit',
    prenom: 'Lucas',
    ville: 'Bordeaux',
    specialites: ['Droit pénal', 'Droit des sociétés'],
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
  }
];

const faqs = [
  {
    question: "Comment prendre un rendez-vous avec un avocat sur AVOCAJUST ?",
    answer: "Il vous suffit de rechercher un avocat selon votre problématique, de consulter son profil et de choisir un créneau disponible. Le paiement se fait en ligne de manière sécurisée."
  },
  {
    question: "Comment puis-je m'assurer que les honoraires des avocats sur AVOCAJUST correspondront à mon budget ?",
    answer: "Tous les tarifs sont affichés clairement sur les profils des avocats. Vous pouvez filtrer par gamme de prix et comparer les honoraires avant de prendre rendez-vous."
  },
  {
    question: "Est-ce qu'AVOCAJUST convient pour tous types de problèmes juridiques ?",
    answer: "Nos avocats couvrent tous les domaines du droit : famille, travail, immobilier, pénal, commercial, etc. Vous trouverez forcément un spécialiste pour votre situation."
  },
  {
    question: "Comment est-ce qu'AVOCAJUST assure la qualité des avocats sur sa plateforme ?",
    answer: "Tous nos avocats sont vérifiés et inscrits au barreau. Ils sont sélectionnés sur leur expertise, leur réactivité et leur bienveillance. Les avis clients permettent de maintenir un haut niveau de qualité."
  },
  {
    question: "Les avocats d'AVOCAJUST sont-ils disponibles partout en France ?",
    answer: "Oui, nous avons des avocats dans toute la France. Vous pouvez consulter en présentiel dans leur cabinet ou à distance par visioconférence."
  },
  {
    question: "Je suis Avocat. Comment rejoindre la communauté AVOCAJUST ?",
    answer: "Rendez-vous sur notre page d'inscription avocat et suivez les étapes. Notre équipe vérifiera votre profil et vous accompagnera dans votre intégration."
  }
];

export default function HomePage() {
  const { language, setLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center">
                  <Scale className="h-8 w-8 text-orange-500" />
                  <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
                </Link>
                
                <div className="hidden md:flex items-center space-x-6">
                  <Link 
                    to="/recherche" 
                    className="text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    {t('find_lawyer')}
                  </Link>
                  <Link 
                    to="/urgence" 
                    className="text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    {t('emergency_lawyer')}
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {language === 'fr' ? 'Français' : 'English'}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {language.toUpperCase()}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {showLanguageMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setLanguage('fr');
                            setShowLanguageMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          🇫🇷 Français
                        </button>
                        <button
                          onClick={() => {
                            setLanguage('en');
                            setShowLanguageMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          🇬🇧 English
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-orange-500 transition-colors"
                >
                  {t('login')}
                </Link>
                <Link 
                  to="/register" 
                  className="text-gray-700 hover:text-orange-500 transition-colors"
                >
                  Créer un compte
                </Link>
                <Link 
                  to="/signup"
                  className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Vous êtes avocat ?
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-orange-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                {t('find_your')} <span className="text-orange-500">{t('trusted_lawyer')}</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                {t('platform_description')}
              </p>
              
              <form onSubmit={handleSearch} className="mt-10 max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search_placeholder')}
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full sm:w-auto px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
                >
                  {t('find_lawyer_online')}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('not_just_lawyers_1')} <span className="text-orange-500">AVOCAJUST</span>{t('not_just_lawyers_2')}
            </h2>
            <p className="text-xl text-orange-600 font-semibold">
              {t('just_lawyers')}
            </p>
          </div>
        </section>

        {/* Lawyers Carousel */}
        <section className="py-16 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos avocats</h2>
            
            <div className="relative">
              <div className="animate-scroll">
                {[...lawyers, ...lawyers].map((lawyer, index) => (
                  <div
                    key={`${lawyer.id}-${index}`}
                    className="lawyer-card bg-white rounded-xl shadow-sm p-6 mx-3 flex-shrink-0"
                  >
                    <div className="text-center">
                      <img
                        src={lawyer.photo}
                        alt={`${lawyer.prenom} ${lawyer.nom}`}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {lawyer.nom}
                      </h3>
                      <p className="text-orange-500 font-medium">{lawyer.prenom}</p>
                      <p className="text-gray-600 text-sm mt-2 flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {lawyer.ville}
                      </p>
                      <div className="mt-4 space-y-1">
                        {lawyer.specialites.map((specialite, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mr-1"
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
        </section>

        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  <span className="text-orange-500">AVOCAJUST</span> est votre allié pour vous permettre d'avancer en toute sérénité
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Nos avocats sont sélectionnés sur la base de leur expertise, leur réactivité et leur humanité. 
                    Ce sont nos héros du droit !
                  </p>
                  <p>
                    Prendre conseil auprès d'un avocat est la seule façon de vous éviter plus de tracas ! 
                    Trouver votre avocat de confiance n'a jamais été aussi simple.
                  </p>
                  <p>
                    La transparence est notre priorité : vous connaissez le montant exact que vous devez payer. 
                    Et parce que nos avocats sont justes, ils déduisent le montant de la 1ère consultation si vous 
                    leur confiez votre dossier. Pour savoir si vous pouvez bénéficier de l'aide juridictionnelle 
                    après votre 1er rendez-vous.
                  </p>
                </div>
                <Link
                  to="/recherche"
                  className="inline-flex items-center mt-8 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Trouver mon Avocat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600"
                  alt="Avocat Super Héros"
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-xl shadow-lg">
                  <p className="font-semibold">Avocat Super Héros</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nos avocats de confiance vous conseillent et vous défendent au quotidien
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expertise vérifiée</h3>
                <p className="text-gray-600">Tous nos avocats sont inscrits au barreau et spécialisés dans leur domaine</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Réactivité garantie</h3>
                <p className="text-gray-600">Réponse rapide et prise de rendez-vous en ligne 24h/24</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparence totale</h3>
                <p className="text-gray-600">Tarifs clairs et pas de frais cachés</p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/recherche"
                className="inline-flex items-center px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
              >
                Trouver mon Avocat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Press Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Ils parlent de nous</h2>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="text-gray-500 font-semibold">BFM Business</div>
              <div className="text-gray-500 font-semibold">Amy Karnov Group</div>
              <div className="text-gray-500 font-semibold">Village de la Justice</div>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"
                  alt="Enfants à l'école"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div>
                <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                  NOTRE FORMATION OFFERTE !
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Le harcèlement scolaire touche 1 élève sur 10 en France
                </h2>
                <p className="text-gray-600 mb-6">
                  Le harcèlement scolaire a des conséquences graves sur le bien-être et la réussite scolaire de nos enfants 
                  (anxiété, dépression, échec scolaire). Il est essentiel de connaître les signes avant-coureurs et de savoir 
                  comment réagir. AVOCAJUST vous offre une formation en ligne conçue par des avocats pour vous aider à protéger vos enfants.
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  En savoir plus
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Association Support */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                  COUP DE CŒUR ASSOCIATIF
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Tout le monde mérite d'être entendu, d'être reconnu.
                </h2>
                <p className="text-xl text-orange-600 font-semibold mb-4">
                  AVOCAJUST, c'est un projet engagé !
                </p>
                <p className="text-gray-600 mb-6">
                  Nous soutenons les associations qui œuvrent pour une société plus juste.
                </p>
                <p className="text-gray-600 mb-6">
                  Cette année, nous soutenons l'association « élève ta voix ».
                </p>
                <div className="bg-gray-100 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">ETV</span>
                    </div>
                    <span className="text-gray-600">Logo élève ta voix</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sa mission</h4>
                  <p className="text-gray-600">
                    Aider les enfants pour qu'aucun d'entre eux ne rejoigne nos anges partis trop tôt. 
                    C'est la raison pour laquelle nous nous engageons à aider davantage de personnes, jour après jour.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=600"
                  alt="Association support"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">FAQ</h2>
              <p className="text-xl text-gray-600">Questions fréquentes</p>
              <p className="text-gray-500 mt-2">Voici la liste des questions les plus fréquemment posées</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        expandedFaq === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center mb-4">
                  <Scale className="h-8 w-8 text-orange-500" />
                  <span className="ml-2 text-xl font-semibold">AvocaJust</span>
                </div>
                <p className="text-gray-400 mb-4">
                  La première communauté d'avocats engagés pour une justice accessible et équitable.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/recherche" className="hover:text-white transition-colors">Trouver un avocat</Link></li>
                  <li><Link to="/urgence" className="hover:text-white transition-colors">Urgence 24/7</Link></li>
                  <li><Link to="/consultation" className="hover:text-white transition-colors">Consultation en ligne</Link></li>
                  <li><Link to="/devis" className="hover:text-white transition-colors">Devis personnalisé</Link></li>
                  <li><Link to="/login" className="hover:text-white transition-colors">Connexion</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Informations</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
                  <li><Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link></li>
                  <li><Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
                  <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Contact</h4>
                  <div className="space-y-1 text-gray-400 text-sm">
                    <p className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      123 rue de la Justice, 75001 Paris
                    </p>
                    <p className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      01 23 45 67 89
                    </p>
                    <p className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      contact@avocajust.fr
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">
                    © 2025 AvocaJust. {t('all_rights_reserved')}.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                Vous êtes avocat et souhaitez rejoindre notre liste d'avocats à contacter en urgence ?{' '}
                <a href="mailto:contact@avocajust.fr" className="text-orange-500 hover:text-orange-400 transition-colors">
                  Envoyez-nous un e-mail
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedPage>
  );
}