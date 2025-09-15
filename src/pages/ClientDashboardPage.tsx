import React, { useState } from 'react';
import { Scale, User, Calendar, MessageSquare, FileText, Settings, HelpCircle, LogOut, Bell, Search, ChevronDown, Star, MapPin, Phone, Video, Building2, Clock, Euro, Plus } from 'lucide-react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

type Consultation = {
  id: string;
  lawyerName: string;
  lawyerPhoto: string;
  type: 'cabinet' | 'visio' | 'telephone';
  date: Date;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  specialty: string;
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
    price: 120,
    specialty: 'Droit des affaires'
  },
  {
    id: '2',
    lawyerName: 'Me Thomas Martin',
    lawyerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    type: 'cabinet',
    date: new Date(2024, 2, 20, 10, 0),
    status: 'completed',
    price: 150,
    specialty: 'Droit du travail'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    lawyerName: 'Me Marie Dupont',
    lawyerPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    lastMessage: 'Merci pour les documents envoyés. Je vais les examiner.',
    timestamp: new Date(2024, 2, 20, 15, 30),
    unread: true
  }
];

function ClientOverview() {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-4 w-4 text-orange-500" />;
      case 'visio':
        return <Video className="h-4 w-4 text-purple-500" />;
      case 'telephone':
        return <Phone className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">À venir</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Terminé</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Annulé</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Consultations</p>
              <p className="text-2xl font-semibold text-gray-900">{mockConsultations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Messages</p>
              <p className="text-2xl font-semibold text-gray-900">{mockMessages.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <Euro className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total dépensé</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockConsultations.reduce((total, consultation) => total + consultation.price, 0)}€
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/search')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="text-center">
              <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600">Trouver un avocat</span>
            </div>
          </button>

          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <div className="text-center">
              <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600">Messagerie</span>
            </div>
          </button>

          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <div className="text-center">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600">Mes documents</span>
            </div>
          </button>

          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
            <div className="text-center">
              <HelpCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-600">Aide</span>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Consultations */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Mes consultations</h2>
            <Link to="/client/consultations" className="text-sm text-blue-600 hover:text-blue-500">
              Voir tout
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {mockConsultations.map((consultation) => (
            <div key={consultation.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={consultation.lawyerPhoto}
                    alt={consultation.lawyerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{consultation.lawyerName}</h3>
                    <p className="text-sm text-gray-500">{consultation.specialty}</p>
                    <div className="flex items-center mt-1">
                      {getConsultationTypeIcon(consultation.type)}
                      <span className="ml-1 text-sm text-gray-500 capitalize">{consultation.type}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{formatDate(consultation.date)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(consultation.status)}
                  <span className="text-sm font-medium text-gray-900">{consultation.price}€</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Messages récents</h2>
            <Link to="/client/messages" className="text-sm text-blue-600 hover:text-blue-500">
              Voir tout
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {mockMessages.map((message) => (
            <div key={message.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start space-x-4">
                <img
                  src={message.lawyerPhoto}
                  alt={message.lawyerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{message.lawyerName}</h3>
                    <span className="text-xs text-gray-500">
                      {new Intl.DateTimeFormat('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 truncate">{message.lastMessage}</p>
                  {message.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ClientDashboardPage() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    // Logique de déconnexion
    navigate('/');
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-full px-4 sm:px-6">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center">
                <Scale className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
              </Link>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                  <Bell className="h-5 w-5" />
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
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100">
                      <div className="py-1">
                        <Link
                          to="/client/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Mon profil
                        </Link>
                        <Link
                          to="/client/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Paramètres
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                        >
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          <div className="w-64 bg-white min-h-[calc(100vh-4rem)] shadow-sm border-r">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <nav className="mt-2 px-4 space-y-1">
              <Link
                to="/client/dashboard"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <User className="h-5 w-5" />
                <span>Tableau de bord</span>
              </Link>
              <Link
                to="/client/consultations"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Calendar className="h-5 w-5" />
                <span>Mes consultations</span>
              </Link>
              <Link
                to="/client/messages"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
              </Link>
              <Link
                to="/client/documents"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <FileText className="h-5 w-5" />
                <span>Documents</span>
              </Link>
              <Link
                to="/search"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Search className="h-5 w-5" />
                <span>Trouver un avocat</span>
              </Link>
              <Link
                to="/client/settings"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </Link>
              <Link
                to="/client/help"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Aide</span>
              </Link>
              
              <div className="pt-4 mt-4 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500/10 to-red-500/10 hover:from-red-500/20 hover:to-red-500/20 rounded-xl transition-all duration-300"
                >
                  <LogOut className="h-5 w-5 text-red-600 mr-3" />
                  <span className="font-medium text-red-600">Déconnexion</span>
                </button>
              </div>
            </nav>
          </div>

          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="mt-1 text-gray-500">Bienvenue dans votre espace personnel</p>
              </div>

              <Routes>
                <Route index element={<ClientOverview />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}