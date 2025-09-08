import React, { useState, useRef, useEffect } from 'react';
import { Scale, User, Calendar, FileText, Settings, HelpCircle, LogOut, Bell, Search, ChevronDown, MessageSquare, CreditCard, Clock, CheckCircle, AlertCircle, Phone, Video, Building2, Star, MapPin } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

type Appointment = {
  id: string;
  lawyerName: string;
  lawyerPhoto: string;
  type: 'cabinet' | 'visio' | 'telephone';
  date: Date;
  status: 'upcoming' | 'completed' | 'cancelled';
  amount: number;
  paid: boolean;
};

type Document = {
  id: string;
  name: string;
  type: string;
  date: Date;
  lawyerName: string;
};

const mockAppointments: Appointment[] = [
  {
    id: '1',
    lawyerName: 'Me Marie Dupont',
    lawyerPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    type: 'visio',
    date: new Date(2024, 3, 15, 14, 0),
    status: 'upcoming',
    amount: 120,
    paid: true
  },
  {
    id: '2',
    lawyerName: 'Me Thomas Martin',
    lawyerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    type: 'cabinet',
    date: new Date(2024, 2, 20, 10, 0),
    status: 'completed',
    amount: 150,
    paid: true
  }
];

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Contrat de travail.pdf',
    type: 'Contrat',
    date: new Date(2024, 2, 20),
    lawyerName: 'Me Thomas Martin'
  },
  {
    id: '2',
    name: 'Note d\'honoraires.pdf',
    type: 'Facture',
    date: new Date(2024, 2, 20),
    lawyerName: 'Me Thomas Martin'
  }
];

function ClientDashboardHome() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-5 w-5 text-orange-500" />;
      case 'visio':
        return <Video className="h-5 w-5 text-purple-500" />;
      case 'telephone':
        return <Phone className="h-5 w-5 text-blue-500" />;
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
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-1 text-gray-500">Bienvenue dans votre espace personnel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rendez-vous</p>
                <p className="text-2xl font-semibold text-gray-900">{mockAppointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Consultations terminées</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockAppointments.filter(apt => apt.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Documents</p>
                <p className="text-2xl font-semibold text-gray-900">{mockDocuments.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Mes rendez-vous</h2>
              <Link 
                to="/client-dashboard/appointments"
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                Voir tout
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {mockAppointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={appointment.lawyerPhoto}
                      alt={appointment.lawyerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{appointment.lawyerName}</h3>
                      <div className="flex items-center mt-1">
                        {getAppointmentTypeIcon(appointment.type)}
                        <span className="ml-2 text-sm text-gray-500 capitalize">{appointment.type}</span>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(appointment.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(appointment.status)}
                    <span className="text-sm font-medium text-gray-900">{appointment.amount}€</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Mes documents</h2>
              <Link 
                to="/client-dashboard/documents"
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                Voir tout
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {mockDocuments.map((document) => (
              <div key={document.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{document.name}</h3>
                      <p className="text-sm text-gray-500">Par {document.lawyerName}</p>
                      <p className="text-sm text-gray-500">{formatDate(document.date)}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {document.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientAppointments() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-5 w-5 text-orange-500" />;
      case 'visio':
        return <Video className="h-5 w-5 text-purple-500" />;
      case 'telephone':
        return <Phone className="h-5 w-5 text-blue-500" />;
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
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mes rendez-vous</h1>
          <p className="mt-1 text-gray-500">Gérez vos consultations avec vos avocats</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {mockAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={appointment.lawyerPhoto}
                      alt={appointment.lawyerName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{appointment.lawyerName}</h3>
                      <div className="flex items-center mt-1">
                        {getAppointmentTypeIcon(appointment.type)}
                        <span className="ml-2 text-sm text-gray-500 capitalize">{appointment.type}</span>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(appointment.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(appointment.status)}
                    <span className="text-lg font-medium text-gray-900">{appointment.amount}€</span>
                    {appointment.paid && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Payé
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientDocuments() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mes documents</h1>
          <p className="mt-1 text-gray-500">Tous vos documents juridiques en un seul endroit</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {mockDocuments.map((document) => (
              <div key={document.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{document.name}</h3>
                      <p className="text-sm text-gray-500">Par {document.lawyerName}</p>
                      <p className="text-sm text-gray-500">{formatDate(document.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {document.type}
                    </span>
                    <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientDashboardPage() {
  const [clientName] = useState({ firstName: 'Sophie', lastName: 'Martin' });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

              <div className="flex items-center">
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="bg-white pl-6 ml-6 flex items-center space-x-4 h-16 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{clientName.firstName} {clientName.lastName}</p>
                      <p className="text-gray-500">Client</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100">
                      <div className="py-1">
                        <Link
                          to="/client-dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-3" />
                            Mon profil
                          </div>
                        </Link>
                        <Link
                          to="/client-dashboard/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-3" />
                            Paramètres
                          </div>
                        </Link>
                        <Link
                          to="/client-dashboard/help"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <HelpCircle className="h-4 w-4 mr-3" />
                            Aide
                          </div>
                        </Link>
                      </div>

                      <div className="border-t border-gray-100">
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <LogOut className="h-4 w-4 mr-3" />
                            Déconnexion
                          </div>
                        </Link>
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
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <nav className="mt-2 px-4 space-y-1">
              <Link
                to="/client-dashboard"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <User className="h-5 w-5" />
                <span>Tableau de bord</span>
              </Link>
              <Link
                to="/client-dashboard/appointments"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Calendar className="h-5 w-5" />
                <span>Mes rendez-vous</span>
              </Link>
              <Link
                to="/client-dashboard/documents"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <FileText className="h-5 w-5" />
                <span>Mes documents</span>
              </Link>
              <Link
                to="/client-dashboard/messages"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
              </Link>
              <Link
                to="/client-dashboard/billing"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <CreditCard className="h-5 w-5" />
                <span>Facturation</span>
              </Link>
              <Link
                to="/client-dashboard/settings"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </Link>
              <Link
                to="/client-dashboard/help"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Aide</span>
              </Link>
              
              <div className="pt-4 mt-4 border-t">
                <Link
                  to="/"
                  className="group relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 rounded-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/40 rounded-xl"></div>
                  <div className="relative flex items-center">
                    <LogOut className="h-5 w-5 text-orange-600 group-hover:text-red-600 transition-colors" />
                    <span className="ml-3 font-medium bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Déconnexion
                    </span>
                  </div>
                </Link>
              </div>
            </nav>
          </div>

          <div className="flex-1">
            <Routes>
              <Route index element={<ClientDashboardHome />} />
              <Route path="appointments" element={<ClientAppointments />} />
              <Route path="documents" element={<ClientDocuments />} />
              <Route path="messages" element={<div className="p-8"><h1 className="text-2xl font-bold">Messages</h1></div>} />
              <Route path="billing" element={<div className="p-8"><h1 className="text-2xl font-bold">Facturation</h1></div>} />
              <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Paramètres</h1></div>} />
              <Route path="help" element={<div className="p-8"><h1 className="text-2xl font-bold">Aide</h1></div>} />
            </Routes>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}