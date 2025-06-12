import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Scale, Users, Award, Clock, ChevronDown, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';

type Lawyer = {
  id: string;
  nom: string;
  prenom: string;
  ville: string;
  specialites: string[];
  photo: string;
  rating: number;
  reviewCount: number;
  experience: number;
  barreau: string;
  acceptsLegalAid: boolean;
};

const mockLawyers: Lawyer[] = [
  {
    id: '1',
    nom: 'Dupont',
    prenom: 'Marie',
    ville: 'Paris',
    specialites: ['Droit des affaires', 'Droit commercial'],
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300',
    rating: 4.8,
    reviewCount: 24,
    experience: 10,
    barreau: 'Paris',
    acceptsLegalAid: true
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
    experience: 8,
    barreau: 'Lyon',
    acceptsLegalAid: false
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
    experience: 12,
    barreau: 'Marseille',
    acceptsLegalAid: true
  },
  {
    id: '4',
    nom: 'Rousseau',
    prenom: 'Pierre',
    ville: 'Bordeaux',
    specialites: ['Droit pénal', 'Droit des victimes'],
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    rating: 4.7,
    reviewCount: 22,
    experience: 15,
    barreau: 'Bordeaux',
    acceptsLegalAid: true
  },
  {
    id: '5',
    nom: 'Leroy',
    prenom: 'Camille',
    ville: 'Toulouse',
    specialites: ['Droit des sociétés', 'Droit fiscal'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    rating: 4.5,
    reviewCount: 16,
    experience: 7,
    barreau: 'Toulouse',
    acceptsLegalAid: false
  },
  {
    id: '6',
    nom: 'Moreau',
    prenom: 'Antoine',
    ville: 'Nantes',
    specialites: ['Droit de l\'environnement', 'Droit public'],
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
    rating: 4.8,
    reviewCount: 19,
    experience: 11,
    barreau: 'Nantes',
    acceptsLegalAid: true
  },
  {
    id: '7',
    nom: 'Petit',
    prenom: 'Isabelle',
    ville: 'Strasbourg',
    specialites: ['Droit européen', 'Droit international'],
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    rating: 4.9,
    reviewCount: 27,
    experience: 13,
    barreau: 'Strasbourg',
    acceptsLegalAid: false
  },
  {
    id: '8',
    nom: 'Garcia',
    prenom: 'Manuel',
    ville: 'Nice',
    specialites: ['Droit immobilier', 'Droit de la construction'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    rating: 4.6,
    reviewCount: 21,
    experience: 9,
    barreau: 'Nice',
    acceptsLegalAid: true
  }
];

const villes = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes', 'Strasbourg', 'Nice'];
const specialites = ['Droit des affaires', 'Droit commercial', 'Droit du travail', 'Droit social', 'Droit de la famille', 'Droit immobilier', 'Droit pénal', 'Droit des sociétés'];

export default function LawyersDirectoryPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    ville: '',
    specialite: '',
    rating: '',
    acceptsLegalAid: false
  });

  const filteredLawyers = mockLawyers.filter(lawyer => {
    const matchesSearch = 
      lawyer.specialites.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lawyer.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.prenom.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVille = !filters.ville || lawyer.ville === filters.ville;
    const matchesSpecialite = !filters.specialite || lawyer.specialites.includes(filters.specialite);
    const matchesRating = !filters.rating || lawyer.rating >= parseFloat(filters.rating);
    const matchesLegalAid = !filters.acceptsLegalAid || lawyer.acceptsLegalAid;

    return matchesSearch && matchesVille && matchesSpecialite && matchesRating && matchesLegalAid;
  });

  const handleLawyerClick = (lawyerId: string) => {
    navigate(`/avocat/${lawyerId}`);
  };

  // Calculate stats
  const totalLawyers = mockLawyers.length;
  const averageRating = (mockLawyers.reduce((acc, lawyer) => acc + lawyer.rating, 0) / mockLawyers.length).toFixed(1);
  const totalExperience = mockLawyers.reduce((acc, lawyer) => acc + lawyer.experience, 0);

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
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
              <div className="flex items-center mb-6">
                <Scale className="h-12 w-12 text-white mr-4" />
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Nos Avocats
                </h1>
              </div>
              
              <p className="mt-6 text-xl text-gray-300">
                Découvrez notre communauté d'avocats experts, sélectionnés pour leur compétence, 
                leur réactivité et leur engagement pour une justice accessible et équitable.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Stats Section */}
        <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-gray-50 rounded-xl p-2 border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Recherchez par spécialité, nom d'avocat..."
                      className="w-full pl-12 pr-4 py-3 text-base bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtres
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-8 w-8 text-orange-500 mr-3" />
                  <div className="text-4xl font-bold text-gray-900">{totalLawyers}+</div>
                </div>
                <p className="text-gray-900 font-medium">Avocats experts</p>
                <p className="text-gray-600 text-sm">dans toute la France</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Star className="h-8 w-8 text-yellow-400 mr-3" />
                  <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
                </div>
                <p className="text-gray-900 font-medium">Note moyenne</p>
                <p className="text-gray-600 text-sm">satisfaction client</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Award className="h-8 w-8 text-orange-500 mr-3" />
                  <div className="text-4xl font-bold text-gray-900">{totalExperience}+</div>
                </div>
                <p className="text-gray-900 font-medium">Années d'expérience</p>
                <p className="text-gray-600 text-sm">cumulées</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-orange-500" />
                <span className="text-sm">Réponse sous 24h</span>
              </div>
              <div className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-orange-500" />
                <span className="text-sm">Avocats certifiés</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                <span className="text-sm">Satisfaction garantie</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredLawyers.length} avocat{filteredLawyers.length > 1 ? 's' : ''}
                </h2>
                {searchQuery && (
                  <p className="text-gray-600 mt-1">
                    Résultats pour "{searchQuery}"
                  </p>
                )}
              </div>
              
              {/* Quick Filters */}
              <div className="hidden lg:flex items-center space-x-4">
                <select
                  value={filters.ville}
                  onChange={(e) => setFilters({ ...filters, ville: e.target.value })}
                  className="rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Toutes les villes</option>
                  {villes.map((ville) => (
                    <option key={ville} value={ville}>{ville}</option>
                  ))}
                </select>
                
                <select
                  value={filters.specialite}
                  onChange={(e) => setFilters({ ...filters, specialite: e.target.value })}
                  className="rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Toutes les spécialités</option>
                  {specialites.map((specialite) => (
                    <option key={specialite} value={specialite}>{specialite}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Lawyers Grid - Smaller Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                onClick={() => handleLawyerClick(lawyer.id)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-orange-200 group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={lawyer.photo}
                    alt={`${lawyer.prenom} ${lawyer.nom}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-center mb-1">
                    Me {lawyer.prenom} {lawyer.nom}
                  </h3>
                  
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-600">{lawyer.ville}</span>
                  </div>
                  
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    <span className="text-xs font-medium text-gray-900">{lawyer.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({lawyer.reviewCount})</span>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    {lawyer.specialites.slice(0, 2).map((specialite, index) => (
                      <div
                        key={index}
                        className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-center"
                      >
                        {specialite}
                      </div>
                    ))}
                    {lawyer.specialites.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{lawyer.specialites.length - 2} autres
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">
                      {lawyer.experience} ans d'expérience
                    </div>
                    {lawyer.acceptsLegalAid && (
                      <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                        Aide juridictionnelle
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLawyers.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Aucun avocat trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche ou vos filtres.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    ville: '',
                    specialite: '',
                    rating: '',
                    acceptsLegalAid: false
                  });
                }}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Filter Modal */}
        <Dialog
          open={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Filtres de recherche
                </Dialog.Title>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville
                  </label>
                  <select
                    value={filters.ville}
                    onChange={(e) => setFilters({ ...filters, ville: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Toutes les villes</option>
                    {villes.map((ville) => (
                      <option key={ville} value={ville}>{ville}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spécialité
                  </label>
                  <select
                    value={filters.specialite}
                    onChange={(e) => setFilters({ ...filters, specialite: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Toutes les spécialités</option>
                    {specialites.map((specialite) => (
                      <option key={specialite} value={specialite}>{specialite}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note minimum
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Toutes les notes</option>
                    <option value="4.5">4.5 étoiles et plus</option>
                    <option value="4.0">4.0 étoiles et plus</option>
                    <option value="3.5">3.5 étoiles et plus</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.acceptsLegalAid}
                      onChange={(e) => setFilters({ ...filters, acceptsLegalAid: e.target.checked })}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Accepte l'aide juridictionnelle
                    </span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setFilters({
                        ville: '',
                        specialite: '',
                        rating: '',
                        acceptsLegalAid: false
                      });
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Réinitialiser
                  </button>
                  <button
                    onClick={() => setIsFilterModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}