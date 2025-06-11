import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Phone, Video, Building2, ChevronDown, X, Scale, Users, Award, Clock } from 'lucide-react';
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
  description: string;
  experience: number;
  barreau: string;
  consultationTypes: {
    cabinet?: { price: number; duration: number };
    visio?: { price: number; duration: number };
    telephone?: { price: number; duration: number };
  };
  acceptsLegalAid: boolean;
  languages: string[];
  nextAvailability: Date;
};

const mockLawyers: Lawyer[] = [
  {
    id: '1',
    nom: 'Dupont',
    prenom: 'Marie',
    ville: 'Paris',
    specialites: ['Droit des affaires', 'Droit commercial'],
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500',
    rating: 4.8,
    reviewCount: 24,
    description: 'Avocate spécialisée en droit des affaires avec 10 ans d\'expérience. Accompagne les entrepreneurs dans leurs projets.',
    experience: 10,
    barreau: 'Paris',
    consultationTypes: {
      cabinet: { price: 150, duration: 60 },
      visio: { price: 120, duration: 60 },
      telephone: { price: 100, duration: 30 }
    },
    acceptsLegalAid: true,
    languages: ['Français', 'Anglais'],
    nextAvailability: new Date(2024, 3, 15, 14, 0)
  },
  {
    id: '2',
    nom: 'Martin',
    prenom: 'Thomas',
    ville: 'Lyon',
    specialites: ['Droit du travail', 'Droit social'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500',
    rating: 4.6,
    reviewCount: 18,
    description: 'Expert en droit du travail, défend les salariés et accompagne les entreprises dans leurs relations sociales.',
    experience: 8,
    barreau: 'Lyon',
    consultationTypes: {
      cabinet: { price: 140, duration: 60 },
      visio: { price: 110, duration: 60 },
      telephone: { price: 90, duration: 30 }
    },
    acceptsLegalAid: false,
    languages: ['Français'],
    nextAvailability: new Date(2024, 3, 16, 10, 0)
  },
  {
    id: '3',
    nom: 'Bernard',
    prenom: 'Sophie',
    ville: 'Marseille',
    specialites: ['Droit de la famille', 'Droit immobilier'],
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500',
    rating: 4.9,
    reviewCount: 31,
    description: 'Avocate bienveillante spécialisée en droit de la famille. Accompagne avec empathie dans les moments difficiles.',
    experience: 12,
    barreau: 'Marseille',
    consultationTypes: {
      cabinet: { price: 160, duration: 60 },
      visio: { price: 130, duration: 60 },
      telephone: { price: 110, duration: 30 }
    },
    acceptsLegalAid: true,
    languages: ['Français', 'Espagnol'],
    nextAvailability: new Date(2024, 3, 14, 16, 0)
  }
];

const villes = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Nantes', 'Strasbourg', 'Lille', 'Nice', 'Rennes'];
const specialites = ['Droit des affaires', 'Droit commercial', 'Droit du travail', 'Droit social', 'Droit de la famille', 'Droit immobilier', 'Droit pénal', 'Droit des sociétés'];

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    ville: '',
    specialite: '',
    priceRange: '',
    rating: '',
    acceptsLegalAid: false,
    consultationType: ''
  });

  const [filteredLawyers, setFilteredLawyers] = useState(mockLawyers);

  useEffect(() => {
    // Apply filters
    let filtered = mockLawyers;

    if (searchQuery) {
      filtered = filtered.filter(lawyer => 
        lawyer.specialites.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
        lawyer.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.ville) {
      filtered = filtered.filter(lawyer => lawyer.ville === filters.ville);
    }

    if (filters.specialite) {
      filtered = filtered.filter(lawyer => lawyer.specialites.includes(filters.specialite));
    }

    if (filters.acceptsLegalAid) {
      filtered = filtered.filter(lawyer => lawyer.acceptsLegalAid);
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(lawyer => lawyer.rating >= minRating);
    }

    setFilteredLawyers(filtered);
  }, [searchQuery, filters]);

  const formatNextAvailability = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getConsultationTypeIcon = (type: string) => {
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

  const handleLawyerClick = (lawyerId: string) => {
    navigate(`/avocat/${lawyerId}`);
  };

  // Calculate stats for hero
  const totalLawyers = mockLawyers.length;
  const averageRating = (mockLawyers.reduce((acc, lawyer) => acc + lawyer.rating, 0) / mockLawyers.length).toFixed(1);
  const totalExperience = mockLawyers.reduce((acc, lawyer) => acc + lawyer.experience, 0);

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div 
          className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 overflow-hidden"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-orange-500/85 to-red-500/90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center">
              {/* Main Title */}
              <div className="flex items-center justify-center mb-6">
                <Scale className="h-12 w-12 text-white mr-4" />
                <h1 className="text-4xl lg:text-6xl font-bold text-white">
                  Nos Avocats
                </h1>
              </div>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Découvrez notre communauté d'avocats experts, sélectionnés pour leur compétence, 
                leur réactivité et leur engagement pour une justice accessible
              </p>

              {/* Search Bar */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                  <div className="flex items-center">
                    <div className="flex-1 relative">
                      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/70" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Recherchez par spécialité, nom d'avocat ou problématique..."
                        className="w-full pl-16 pr-6 py-4 text-lg bg-transparent text-white placeholder-white/70 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => setIsFilterModalOpen(true)}
                      className="flex items-center px-8 py-4 bg-white text-orange-500 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      <Filter className="h-5 w-5 mr-2" />
                      Filtres
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Users className="h-8 w-8 text-white/80 mr-2" />
                    <div className="text-4xl font-bold text-white">{totalLawyers}+</div>
                  </div>
                  <p className="text-white/90 font-medium">Avocats experts</p>
                  <p className="text-white/70 text-sm">dans toute la France</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Star className="h-8 w-8 text-yellow-300 mr-2" />
                    <div className="text-4xl font-bold text-white">{averageRating}</div>
                  </div>
                  <p className="text-white/90 font-medium">Note moyenne</p>
                  <p className="text-white/70 text-sm">satisfaction client</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <Award className="h-8 w-8 text-white/80 mr-2" />
                    <div className="text-4xl font-bold text-white">{totalExperience}+</div>
                  </div>
                  <p className="text-white/90 font-medium">Années d'expérience</p>
                  <p className="text-white/70 text-sm">cumulées</p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="text-sm">Réponse sous 24h</span>
                </div>
                <div className="flex items-center">
                  <Scale className="h-5 w-5 mr-2" />
                  <span className="text-sm">Avocats certifiés</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-300" />
                  <span className="text-sm">Satisfaction garantie</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg"></div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredLawyers.length} avocat{filteredLawyers.length > 1 ? 's' : ''} trouvé{filteredLawyers.length > 1 ? 's' : ''}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                onClick={() => handleLawyerClick(lawyer.id)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-orange-200"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={lawyer.photo}
                      alt={`${lawyer.prenom} ${lawyer.nom}`}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Me {lawyer.prenom} {lawyer.nom}
                      </h3>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{lawyer.ville}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{lawyer.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({lawyer.reviewCount} avis)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {lawyer.specialites.map((specialite, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                        >
                          {specialite}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                    {lawyer.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{lawyer.experience} ans d'expérience</span> • Barreau de {lawyer.barreau}
                    </div>
                    <div className="text-sm text-gray-500">
                      Prochaine disponibilité : {formatNextAvailability(lawyer.nextAvailability)}
                    </div>
                  </div>

                  {/* Consultation Types */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(lawyer.consultationTypes).map(([type, details]) => (
                        <div key={type} className="text-center">
                          <div className="flex items-center justify-center mb-1">
                            {getConsultationTypeIcon(type)}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">{type}</div>
                          <div className="text-sm font-semibold text-gray-900">{details.price}€</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {lawyer.acceptsLegalAid && (
                    <div className="mt-3 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Aide juridictionnelle acceptée
                      </span>
                    </div>
                  )}
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
                    priceRange: '',
                    rating: '',
                    acceptsLegalAid: false,
                    consultationType: ''
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
                        priceRange: '',
                        rating: '',
                        acceptsLegalAid: false,
                        consultationType: ''
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