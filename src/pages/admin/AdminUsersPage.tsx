import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Ban, CheckCircle, XCircle, Mail, Phone, Calendar } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';

type User = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateInscription: Date;
  statut: 'actif' | 'suspendu' | 'banni';
  consultations: number;
  photo: string;
};

const mockUsers: User[] = [
  {
    id: '1',
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@email.com',
    telephone: '06 12 34 56 78',
    dateInscription: new Date(2024, 1, 15),
    statut: 'actif',
    consultations: 3,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: '2',
    nom: 'Dubois',
    prenom: 'Pierre',
    email: 'pierre.dubois@email.com',
    telephone: '06 23 45 67 89',
    dateInscription: new Date(2024, 0, 10),
    statut: 'actif',
    consultations: 2,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: '3',
    nom: 'Bernard',
    prenom: 'Marie',
    email: 'marie.bernard@email.com',
    telephone: '06 34 56 78 90',
    dateInscription: new Date(2023, 11, 5),
    statut: 'suspendu',
    consultations: 1,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'
  }
];

export default function AdminUsersPage() {
  const [users] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'tous' | 'actif' | 'suspendu' | 'banni'>('tous');

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'tous' || user.statut === statusFilter;
    
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
      case 'suspendu':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Suspendu</span>;
      case 'banni':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Banni</span>;
      default:
        return null;
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un utilisateur..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as 'tous' | 'actif' | 'suspendu' | 'banni')}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="tous">Tous les statuts</option>
                      <option value="actif">Actifs</option>
                      <option value="suspendu">Suspendus</option>
                      <option value="banni">Bannis</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <img
                      src={user.photo}
                      alt={`${user.prenom} ${user.nom}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {user.prenom} {user.nom}
                          </h3>
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {user.email}
                            </span>
                            <span className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {user.telephone}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {getStatusBadge(user.statut)}
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                              <Eye className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-gray-100">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-yellow-600 rounded-lg hover:bg-gray-100">
                              <Ban className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>Inscrit le {formatDate(user.dateInscription)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4" />
                          <span>{user.consultations} consultation{user.consultations > 1 ? 's' : ''}</span>
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