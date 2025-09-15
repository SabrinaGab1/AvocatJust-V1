import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, Building2, Star, Filter, Search, Plus, MapPin, FileText } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

type ConsultationType = 'cabinet' | 'visio' | 'telephone';
type ConsultationStatus = 'upcoming' | 'completed' | 'cancelled';

type Consultation = {
  id: string;
  lawyerName: string;
  lawyerPhoto: string;
  date: Date;
  type: ConsultationType;
  status: ConsultationStatus;
  subject: string;
  price: number;
  duration: number;
  rating?: number;
  notes?: string;
};

const mockConsultations: Consultation[] = [
  {
    id: '1',
    lawyerName: 'Me Marie Dupont',
    lawyerPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    date: new Date(2024, 3, 15, 14, 0),
    type: 'visio',
    status: 'upcoming',
    subject: 'Création d\'entreprise',
    price: 120,
    duration: 60
  },
  {
    id: '2',
    lawyerName: 'Me Pierre Bernard',
    lawyerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    date: new Date(2024, 2, 28, 10, 0),
    type: 'cabinet',
    status: 'completed',
    subject: 'Droit immobilier',
    price: 150,
    duration: 60,
    rating: 5,
    notes: 'Consultation très utile, conseils précis et adaptés à ma situation.'
  },
  {
    id: '3',
    lawyerName: 'Me Sophie Laurent',
    lawyerPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    date: new Date(2024, 2, 15, 16, 30),
    type: 'telephone',
    status: 'completed',
    subject: 'Droit du travail',
    price: 100,
    duration: 30,
    rating: 4
  }
];

export default function UserConsultationsPage() {
  const [consultations] = useState(mockConsultations);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus | 'all'>('all');

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

  const getConsultationTypeIcon = (type: ConsultationType) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-5 w-5 text-orange-500" />;
      case 'visio':
        return <Video className="h-5 w-5 text-purple-500" />;
      case 'telephone':
        return <Phone className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: ConsultationStatus) => {
    switch (status) {
      case 'upcoming':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">À venir</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Terminée</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Annulée</span>;
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.lawyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         consultation.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mes consultations</h1>
              <p className="mt-1 text-gray-500">Gérez vos rendez-vous et consultations</p>
            </div>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Nouvelle consultation
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ConsultationStatus | 'all')}
                  className="rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="upcoming">À venir</option>
                  <option value="completed">Terminées</option>
                  <option value="cancelled">Annulées</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consultations List */}
          <div className="space-y-6">
            {filteredConsultations.map((consultation) => (
              <div key={consultation.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <img
                    src={consultation.lawyerPhoto}
                    alt={consultation.lawyerName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{consultation.lawyerName}</h3>
                        <p className="text-gray-600 mt-1">{consultation.subject}</p>
                        
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(consultation.date)}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            {getConsultationTypeIcon(consultation.type)}
                            <span className="ml-1 capitalize">{consultation.type}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{consultation.duration} min</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">{consultation.price}€</div>
                        {getStatusBadge(consultation.status)}
                      </div>
                    </div>
                    
                    {consultation.rating && (
                      <div className="flex items-center mt-3">
                        <span className="text-sm text-gray-500 mr-2">Votre note :</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < consultation.rating! ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {consultation.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{consultation.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 mt-4">
                      {consultation.status === 'upcoming' && (
                        <>
                          <button className="text-sm text-orange-500 hover:text-orange-600">
                            Modifier
                          </button>
                          <button className="text-sm text-red-500 hover:text-red-600">
                            Annuler
                          </button>
                        </>
                      )}
                      
                      {consultation.status === 'completed' && !consultation.rating && (
                        <button className="text-sm text-orange-500 hover:text-orange-600">
                          Laisser un avis
                        </button>
                      )}
                      
                      <button className="text-sm text-gray-500 hover:text-gray-600">
                        Voir les détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredConsultations.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Aucune consultation trouvée
              </h3>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas encore de consultation ou aucune ne correspond à vos critères.
              </p>
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Réserver une consultation
              </button>
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}