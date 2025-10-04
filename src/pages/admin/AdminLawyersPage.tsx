import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, Shield, AlertTriangle, FileText } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';

type Lawyer = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  barreau: string;
  specialites: string[];
  statut: 'actif' | 'en_attente' | 'suspendu' | 'rejete';
  dateInscription: Date;
  consultations: number;
  rating: number;
  photo: string;
  documentsVerifies: boolean;
};

const mockLawyers: Lawyer[] = [
  {
    id: '1',
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@cabinet-avocat.fr',
    barreau: 'Paris',
    specialites: ['Droit des affaires', 'Droit commercial'],
    statut: 'actif',
    dateInscription: new Date(2024, 0, 15),
    consultations: 24,
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    documentsVerifies: true
  },
  {
    id: '2',
    nom: 'Martin',
    prenom: 'Thomas',
    email: 'thomas.martin@avocat.fr',
    barreau: 'Lyon',
    specialites: ['Droit du travail', 'Droit social'],
    statut: 'en_attente',
    dateInscription: new Date(2024, 2, 10),
    consultations: 0,
    rating: 0,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    documentsVerifies: false
  }
];

export default function AdminLawyersPage() {
  const [lawyers] = useState(mockLawyers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'tous' | 'actif' | 'en_attente' | 'suspendu' | 'rejete'>('tous');

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = 
      lawyer.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lawyer.barreau.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'tous' || lawyer.statut === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'actif':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Actif</span>;
      case 'en_attente':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">En attente</span>;
      case 'suspendu':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Suspendu</span>;
      case 'rejete':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Rejeté</span>;
      default:
        return null;
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des avocats</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un avocat..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as 'tous' | 'actif' | 'en_attente' | 'suspendu' | 'rejete')}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="tous">Tous les statuts</option>
                      <option value="actif">Actifs</option>
                      <option value="en_attente">En attente</option>
                      <option value="suspendu">Suspendus</option>
                      <option value="rejete">Rejetés</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredLawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <img
                      src={lawyer.photo}
                      alt={`${lawyer.prenom} ${lawyer.nom}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Me {lawyer.prenom} {lawyer.nom}
                          </h3>
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                            <span>{lawyer.email}</span>
                            <span>Barreau de {lawyer.barreau}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {getStatusBadge(lawyer.statut)}
                          {!lawyer.documentsVerifies && (
                            <AlertTriangle className="h-5 w-5 text-yellow-500" title="Documents non vérifiés" />
                          )}
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                              <Eye className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-gray-100">
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                              <XCircle className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                              <FileText className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {lawyer.specialites.map((specialite, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {specialite}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Inscrit le {formatDate(lawyer.dateInscription)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Shield className="h-4 w-4" />
                          <span>{lawyer.consultations} consultation{lawyer.consultations > 1 ? 's' : ''}</span>
                        </div>
                        {lawyer.rating > 0 && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>⭐ {lawyer.rating}/5</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <FileText className="h-4 w-4" />
                          <span>{lawyer.documentsVerifies ? 'Documents OK' : 'Documents manquants'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}