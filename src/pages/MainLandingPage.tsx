import React, { useState } from 'react';
import { Search, Scale, Menu, X, ChevronDown, Star, MapPin, Phone, Video, Building2, Users, Award, Clock, MessageSquare, Shield, Zap, Mail, Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedPage from '../components/AnimatedPage';

export default function MainLandingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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
                  Trouver un avocat
                </Link>
                <Link to="/urgence" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Urgence Avocat
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Français</span>
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">FR</span>
                </div>
                <Link to="/connexion" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Connexion
                </Link>
                <Link to="/signup" className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors">
                  Créer un compte
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Trouvez votre avocat de confiance
            </h1>
            <p className="text-xl text-white/90 mb-8">
              La plateforme qui vous met en relation avec les avocats justes
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Décrivez votre problématique (ex: licenciement, divorce, création d'entreprise, etc)"
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
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              TROUVEZ UN AVOCAT EN LIGNE AUTOUR DE VOUS
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
              <Link
                to="/recherche"
                className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Trouver un avocat
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition-colors text-lg"
              >
                Rejoindre AvocaJust
              </Link>
            </div>
          </div>
        </div>

        {/* Slogan Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sur <span className="text-orange-500">AVOCAJUST</span>, ce ne sont pas juste des avocats.
            </h2>
            <p className="text-xl text-orange-500 font-semibold">
              Ce sont des avocats justes pour vos droits !
            </p>
          </div>
        </div>

        {/* Lawyer Carousel */}
        <div className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nos avocats
            </h2>
            
            <div className="relative">
              <div className="animate-scroll">
                {/* First set of lawyers */}
                {[
                  {
                    name: 'Dupont',
                    firstName: 'Marie',
                    location: 'Paris',
                    specialties: ['Droit des affaires', 'Droit commercial'],
                    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300'
                  },
                  {
                    name: 'Martin',
                    firstName: 'Thomas',
                    location: 'Lyon',
                    specialties: ['Droit du travail', 'Droit social'],
                    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
                  },
                  {
                    name: 'Bernard',
                    firstName: 'Sophie',
                    location: 'Marseille',
                    specialties: ['Droit de la famille', 'Droit immobilier'],
                    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
                  },
                  {
                    name: 'Petit',
                    firstName: 'Lucas',
                    location: 'Bordeaux',
                    specialties: ['Droit pénal', 'Droit des sociétés'],
                    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
                  }
                ].concat([
                  {
                    name: 'Dupont',
                    firstName: 'Marie',
                    location: 'Paris',
                    specialties: ['Droit des affaires', 'Droit commercial'],
                    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300'
                  },
                  {
                    name: 'Martin',
                    firstName: 'Thomas',
                    location: 'Lyon',
                    specialties: ['Droit du travail', 'Droit social'],
                    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
                  },
                  {
                    name: 'Bernard',
                    firstName: 'Sophie',
                    location: 'Marseille',
                    specialties: ['Droit de la famille', 'Droit immobilier'],
                    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
                  },
                  {
                    name: 'Petit',
                    firstName: 'Lucas',
                    location: 'Bordeaux',
                    specialties: ['Droit pénal', 'Droit des sociétés'],
                    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
                  }
                ]).map((lawyer, index) => (
                  <div key={index} className="lawyer-card bg-white rounded-xl shadow-lg p-6 mx-3 flex-shrink-0">
                    <div className="text-center">
                      <img
                        src={lawyer.photo}
                        alt={`${lawyer.firstName} ${lawyer.name}`}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                      />
                      <h3 className="font-semibold text-gray-900 text-lg">{lawyer.name}</h3>
                      <h4 className="font-medium text-gray-700">{lawyer.firstName}</h4>
                      <div className="flex items-center justify-center mt-2">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-gray-600 text-sm">{lawyer.location}</span>
                      </div>
                      <div className="mt-3 space-y-1">
                        {lawyer.specialties.map((specialty, idx) => (
                          <div key={idx} className="text-orange-500 text-sm font-medium">
                            {specialty}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AVOCAJUST est votre allié pour vous permettre d'avancer en toute sérénité
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Nos avocats sont sélectionnés sur la base de leur expertise, leur réactivité et leur humanité. Ce sont nos héros du droit !
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-600 mb-6">
                  Prendre conseil auprès d'un avocat est la seule façon de vous éviter plus de tracas ! Trouver votre avocat de confiance n'a jamais été aussi simple.
                </p>
                <p className="text-gray-600 mb-6">
                  La transparence est notre priorité : vous connaissez le montant exact que vous devez payer. Et parce que nos avocats sont justes, ils déduisent le montant de la 1ère consultation si vous leur confiez votre dossier. Pour savoir si vous pouvez bénéficier de l'aide juridictionnelle après votre 1er rendez-vous.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Nos avocats de confiance vous conseillent et vous défendent au quotidien
                </h3>
                <Link
                  to="/recherche"
                  className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
                >
                  Trouver mon Avocat
                </Link>
              </div>
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500"
                  alt="Avocat Super Héros"
                  className="rounded-lg shadow-lg mx-auto"
                />
                <p className="mt-4 text-gray-600 font-medium">Avocat Super Héros</p>
              </div>
            </div>
          </div>
        </div>

        {/* Press Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Ils parlent de nous</h2>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="text-lg font-semibold text-gray-600">BFM Business</div>
              <div className="text-lg font-semibold text-gray-600">Amy Karnov Group</div>
              <div className="text-lg font-semibold text-gray-600">Village de la Justice</div>
            </div>
          </div>
        </div>

        {/* Training Section */}
        <div className="py-16 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=500"
                  alt="Enfants à l'école"
                  className="rounded-lg shadow-lg"
                />
                <p className="mt-4 text-center text-gray-600 font-medium">Enfants à l'école</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  NOTRE FORMATION OFFERTE !
                </h2>
                <h3 className="text-xl font-semibold text-orange-500 mb-4">
                  Le harcèlement scolaire touche 1 élève sur 10 en France
                </h3>
                <p className="text-gray-600 mb-6">
                  Le harcèlement scolaire a des conséquences graves sur le bien-être et la réussite scolaire de nos enfants (anxiété, dépression, échec scolaire). Il est essentiel de connaître les signes avant-coureurs et de savoir comment réagir. AVOCAJUST vous offre une formation en ligne conçue par des avocats pour vous aider à protéger vos enfants.
                </p>
                <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Association Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                COUP DE CŒUR ASSOCIATIF
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                Tout le monde mérite d'être entendu, d'être reconnu.
              </p>
              <p className="text-lg font-semibold text-orange-500 mb-8">
                AVOCAJUST, c'est un projet engagé !<br />
                Nous soutenons les associations qui œuvrent pour une société plus juste.
              </p>
              <p className="text-gray-600 mb-8">
                Cette année, nous soutenons l'association « élève ta voix ».
              </p>
              <div className="bg-gray-200 w-32 h-16 mx-auto rounded-lg flex items-center justify-center mb-8">
                <span className="text-gray-600 text-sm">Logo élève ta voix</span>
              </div>
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Sa mission</h3>
                <p className="text-gray-600">
                  Aider les enfants pour qu'aucun d'entre eux ne rejoigne nos anges partis trop tôt. C'est la raison pour laquelle nous nous engageons à aider davantage de personnes, jour après jour.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">FAQ</h2>
              <p className="text-xl text-gray-600">Questions fréquentes</p>
              <p className="text-gray-600 mt-2">Voici la liste des questions les plus fréquemment posées</p>
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
                  <button className="w-full text-left flex items-center justify-between">
                    <span className="font-medium text-gray-900">{question}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              ))}
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
                  <li><Link to="/connexion" className="hover:text-white transition-colors">Connexion</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Informations</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
                  <li><Link to="/conditions" className="hover:text-white transition-colors">Conditions d'utilisation</Link></li>
                  <li><Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
                  <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="space-y-2 text-gray-400">
                  <p>123 rue de la Justice, 75001 Paris</p>
                  <p>01 23 45 67 89</p>
                  <p>contact@avocajust.fr</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800 text-center">
              <Link
                to="/signup"
                className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors font-semibold text-lg mb-6"
              >
                Rejoindre AvocaJust
              </Link>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-center md:text-left">
                  © 2025 AvocaJust. Tous droits réservés.
                </p>
                <p className="text-gray-400 text-center md:text-right mt-4 md:mt-0">
                  Vous êtes avocat et souhaitez rejoindre notre liste d'avocats à contacter en urgence ? Envoyez-nous un e-mail
                </p>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <Link to="/mentions-legales" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Mentions légales
                </Link>
                <Link to="/cgv" className="text-gray-400 hover:text-white transition-colors text-sm">
                  CGV
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedPage>
  );
}