import React, { useState } from 'react';
import { Search, Filter, Eye, Calendar, Clock, Euro, Phone, Video, Building2 } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';

type ConsultationType = 'cabinet' | 'visio' | 'telephone';
type ConsultationStatus = 'programmee' | 'en_cours' | 'terminee' | 'annulee';

type Consultation = {
  id: string;
  clientName: string;
  lawyerName: string;
  date: Date;
  type: ConsultationType;
  status: ConsultationStatus;
  price: number;
  duration: number;
  subject: string;
};

const mockConsultations: Consultation[] = [
  {
    id: '1',
    clientName: 'Sophie Martin',
    lawyerName: 'Me Marie Dupont',
    date: new Date(2024, 3, 15, 14, 0),
    type: 'visio',
    status: 'programmee',
    price: 120,
    duration: 60,
    subject: 'Création d\'entreprise'
  },
  {
    id: '2',
    clientName: 'Pierre Dubois',
    lawyerName: 'Me Thomas Martin',
    date: new Date(2024, 3, 10, 10, 0),
    type: 'cabinet',
    status: 'terminee',
    price: 150,
    duration: 60,
    subject: 'Droit du travail'
  },
  {
    id: '3',
    clientName: 'Marie Bernard',
    lawyerName: 'Me Sophie Laurent',
    date: new Date(2024, 3, 12, 16, 30),
    type: 'telephone',
    status: 'annulee',
    price: 100,
    duration: 30,
    subject: 'Droit immobilier'
  }
];

export default function AdminConsultationsPage() {
  const [consultations] = useState(mockConsultations);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'toutes' | 'programmee' | 'en_cours' | 'terminee' | 'annulee'>('toutes');

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = 
      consultation.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.lawyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'toutes' || consultation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: ConsultationStatus) => {
    switch (status) {
      case 'programmee':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Programmée</span>;
      case 'en_cours':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">En cours</span>;
      case 'terminee':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Terminée</span>;
      case 'annulee':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Annulée</span>;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: ConsultationType) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-5 w-5 text-orange-500" />;
      case 'visio':
        return <Video className="h-5 w-5 text-purple-500" />;
      case 'telephone':
        return <Phone className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des consultations</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher une consultation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as 'toutes' | 'programmee' | 'en_cours' | 'terminee' | 'annulee')}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="toutes">Tous les statuts</option>
                      <option value="programmee">Programmées</option>
                      <option value="en_cours">En cours</option>
                      <option value="terminee">Terminées</option>
                      <option value="annulee">Annulées</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredConsultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {consultation.subject}
                        </h3>
                        <div className="flex items-center space-x-4">
                          {getStatusBadge(consultation.status)}
                          <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Client:</span> {consultation.clientName}
                        </div>
                        <div>
                          <span className="font-medium">Avocat:</span> {consultation.lawyerName}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(consultation.date)}
                        </div>
                        <div className="flex items-center">
                          {getTypeIcon(consultation.type)}
                          <span className="ml-1 capitalize">{consultation.type}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{consultation.duration} minutes</span>
                        </div>
                        <div className="flex items-center">
                          <Euro className="h-4 w-4 mr-1" />
                          <span>{consultation.price}€</span>
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