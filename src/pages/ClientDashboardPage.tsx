import React, { useState } from 'react';
import { Scale, User, MessageSquare, Calendar, Search, Bell, LogOut, Settings, FileText, Star, Phone, Video, Building2, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

type Consultation = {
  id: string;
  lawyerName: string;
  lawyerPhoto: string;
  type: 'cabinet' | 'visio' | 'telephone';
  date: Date;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
};

type Message = {
  id: string;
  lawyerName: string;
  lawyerPhoto: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
};

const mockConsultations: Consultation[] = [
  {
    id: '1',
    lawyerName: 'Me Marie Dupont',
    lawyerPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    type: 'visio',
    date: new Date(2024, 3, 15, 14, 0),
    status: 'upcoming',
    price: 120
  },
  {
    id: '2',
    lawyerName: 'Me Thomas Martin',
    lawyerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    type: 'cabinet',
    date: new Date(2024, 2, 20, 10, 0),
    status: 'completed',
    price: 150
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    lawyerName: 'Me Marie Dupont',
    lawyerPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    lastMessage: 'Voici les documents que vous avez demandés...',
    timestamp: new Date(2024, 2, 20, 15, 30),
    unread: true
  },
  {
    id: '2',
    lawyerName: 'Me Thomas Martin',
    lawyerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    lastMessage: 'Merci pour votre confiance. À bientôt !',
    timestamp: new Date(2024, 2, 19, 11, 15),
    unread: false
  }
];

export default function ClientDashboardPage() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-5 w-5 text-purple-500" />;
      case 'visio':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'telephone':
        return <Phone className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">À venir</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Terminé</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Annulé</span>;
      default:
        return null;
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center">
                <Scale className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
              </Link>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
                  <Bell className="h-6 w-6" />
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Jean Dupont</p>
                      <p className="text-xs text-gray-500">Client</p>
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                        <Settings className="h-4 w-4 mr-3" />
                        Paramètres
                      </button>
                      <button 
                        onClick={() => navigate('/')}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Bonjour Jean 👋</h1>
            <p className="text-gray-600">Voici un aperçu de votre activité</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link
              to="/search"
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 hover:border-blue-200"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Trouver un avocat</h3>
                  <p className="text-sm text-gray-500">Rechercher par spécialité</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </Link>

            <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 hover:border-green-200 text-left">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Messagerie</h3>
                  <p className="text-sm text-gray-500">2 nouveaux messages</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </button>

            <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100 hover:border-purple-200 text-left">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Mes rendez-vous</h3>
                  <p className="text-sm text-gray-500">1 consultation à venir</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Consultations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Mes consultations</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Voir tout
                </button>
              </div>

              <div className="space-y-4">
                {mockConsultations.map((consultation) => (
                  <div key={consultation.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={consultation.lawyerPhoto}
                      alt={consultation.lawyerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{consultation.lawyerName}</h3>
                        {getStatusBadge(consultation.status)}
                      </div>
                      <div className="flex items-center mt-1 space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          {getConsultationTypeIcon(consultation.type)}
                          <span className="ml-1 capitalize">{consultation.type}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDate(consultation.date)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{consultation.price}€</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Messages récents</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Voir tout
                </button>
              </div>

              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <img
                      src={message.lawyerPhoto}
                      alt={message.lawyerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{message.lawyerName}</h3>
                        <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">{message.lastMessage}</p>
                      {message.unread && (
                        <div className="flex items-center mt-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-xs text-blue-600 font-medium">Nouveau message</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">3</h3>
                  <p className="text-sm text-gray-500">Consultations totales</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">2</h3>
                  <p className="text-sm text-gray-500">Dossiers résolus</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                  <p className="text-sm text-gray-500">Satisfaction moyenne</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}