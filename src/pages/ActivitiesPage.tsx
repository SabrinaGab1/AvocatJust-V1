import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Phone, Mail, MapPin, FileText, Clock, MessageSquare, Edit, Trash2, AlertCircle, Users, X, ChevronDown, Euro, Calendar, Video, Building2, Download, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';

type AppointmentStatus = 'upcoming' | 'past' | 'cancelled';
type AppointmentType = 'telephone' | 'visio' | 'cabinet';

type Appointment = {
  id: string;
  clientName: string;
  clientId: string;
  type: AppointmentType;
  status: AppointmentStatus;
  date: Date;
  amount: number;
  paid: boolean;
  notes?: string;
};

type Client = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  photo: string;
  dateCreation: Date;
  dernierRdv?: Date;
  problematique?: string;
  notes?: string;
  documents: {
    type: 'cni' | 'convention' | 'facture';
    name: string;
    url: string;
    date: Date;
  }[];
  rdvCount: number;
};

const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Sophie Martin',
    clientId: '1',
    type: 'visio',
    status: 'upcoming',
    date: new Date(2024, 3, 1, 14, 0),
    amount: 150,
    paid: true
  },
  {
    id: '2',
    clientName: 'Pierre Dubois',
    clientId: '2',
    type: 'cabinet',
    status: 'past',
    date: new Date(2024, 2, 20, 10, 0),
    amount: 200,
    paid: true,
    notes: 'Consultation initiale - Droit commercial'
  },
  {
    id: '3',
    clientName: 'Marie Bernard',
    clientId: '3',
    type: 'telephone',
    status: 'cancelled',
    date: new Date(2024, 2, 15, 15, 30),
    amount: 100,
    paid: false
  }
];

const mockClients: Client[] = [
  {
    id: '1',
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@email.com',
    telephone: '06 12 34 56 78',
    adresse: '123 rue de Paris, 75001 Paris',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    dateCreation: new Date(2024, 1, 15),
    dernierRdv: new Date(2024, 2, 20),
    problematique: 'Création d\'entreprise',
    notes: 'Cliente intéressée par un accompagnement juridique complet',
    documents: [
      {
        type: 'cni',
        name: 'CNI.pdf',
        url: '#',
        date: new Date(2024, 2, 19)
      },
      {
        type: 'convention',
        name: 'Convention_Honoraires.pdf',
        url: '#',
        date: new Date(2024, 2, 19)
      }
    ],
    rdvCount: 3
  },
  {
    id: '2',
    nom: 'Dubois',
    prenom: 'Pierre',
    email: 'pierre.dubois@email.com',
    telephone: '06 23 45 67 89',
    adresse: '456 avenue des Champs-Élysées, 75008 Paris',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    dateCreation: new Date(2024, 0, 10),
    dernierRdv: new Date(2024, 2, 18),
    problematique: 'Litige commercial',
    notes: 'Dossier complexe nécessitant une attention particulière',
    documents: [
      {
        type: 'cni',
        name: 'CNI.pdf',
        url: '#',
        date: new Date(2024, 2, 17)
      }
    ],
    rdvCount: 2
  }
];

const stats = [
  {
    id: 1,
    name: 'Chiffre d\'affaires',
    value: '12 500€',
    change: '+8.1%',
    changeType: 'increase'
  },
  {
    id: 2,
    name: 'Rendez-vous',
    value: '24',
    change: '+5.4%',
    changeType: 'increase'
  },
  {
    id: 3,
    name: 'Nouveaux clients',
    value: '12',
    change: '-1.2%',
    changeType: 'decrease'
  }
];

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | 'all'>('all');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState<'appointments' | 'clients'>('appointments');
  const [isAppointmentDetailsOpen, setIsAppointmentDetailsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const getAppointmentTypeIcon = (type: AppointmentType) => {
    switch (type) {
      case 'telephone':
        return <Phone className="h-5 w-5 text-blue-500" />;
      case 'visio':
        return <Video className="h-5 w-5 text-purple-500" />;
      case 'cabinet':
        return <Building2 className="h-5 w-5 text-orange-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const calculateTotalRevenue = () => {
    return mockAppointments
      .filter(apt => apt.paid)
      .reduce((total, apt) => total + apt.amount, 0);
  };

  const filteredAppointments = mockAppointments.filter(appointment => {
    if (selectedStatus !== 'all' && appointment.status !== selectedStatus) {
      return false;
    }
    return appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredClients = mockClients.filter(client => {
    return (
      client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Activités</h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                  <div
                    className={`flex items-center ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="text-sm ml-1">{stat.change}</span>
                  </div>
                </div>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'appointments'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Rendez-vous
                </button>
                <button
                  onClick={() => setActiveTab('clients')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'clients'
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Clients
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'appointments' ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as AppointmentStatus | 'all')}
                        className="rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="all">Tous les RDV</option>
                        <option value="upcoming">RDV à venir</option>
                        <option value="past">RDV passés</option>
                        <option value="cancelled">RDV annulés</option>
                      </select>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg cursor-pointer"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsAppointmentDetailsOpen(true);
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          {getAppointmentTypeIcon(appointment.type)}
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{appointment.clientName}</h3>
                            <p className="text-sm text-gray-500">{formatDate(appointment.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.status === 'upcoming'
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {appointment.status === 'upcoming' ? 'À venir' :
                             appointment.status === 'past' ? 'Passé' : 'Annulé'}
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(appointment.amount)}
                          </span>
                          {appointment.paid && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Payé
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher un client..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {filteredClients.map((client) => (
                      <div
                        key={client.id}
                        className="py-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start">
                          <img
                            src={client.photo}
                            alt={`${client.prenom} ${client.nom}`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {client.prenom} {client.nom}
                                </h3>
                                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <Mail className="h-4 w-4 mr-1" />
                                    {client.email}
                                  </span>
                                  <span className="flex items-center">
                                    <Phone className="h-4 w-4 mr-1" />
                                    {client.telephone}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex space-x-2">
                                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                    <Edit className="h-5 w-5" />
                                  </button>
                                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <span>{client.adresse}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Client depuis le {formatDate(client.dateCreation)}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>{client.rdvCount} rendez-vous</span>
                              </div>
                              {client.dernierRdv && (
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>Dernier RDV le {formatDate(client.dernierRdv)}</span>
                                </div>
                              )}
                            </div>

                            {client.problematique && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900">Problématique</h4>
                                <p className="mt-1 text-sm text-gray-600">{client.problematique}</p>
                              </div>
                            )}

                            {client.documents.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900">Documents</h4>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {client.documents.map((doc, index) => (
                                    <a
                                      key={index}
                                      href={doc.url}
                                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    >
                                      <FileText className="h-4 w-4 mr-2" />
                                      {doc.type === 'cni' && 'Pièce d\'identité'}
                                      {doc.type === 'convention' && 'Convention d\'honoraires'}
                                      {doc.type === 'facture' && 'Facture'}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Appointment Details Modal */}
        <Dialog
          open={isAppointmentDetailsOpen}
          onClose={() => setIsAppointmentDetailsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              {selectedAppointment && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                      Détails du rendez-vous
                    </Dialog.Title>
                    <button
                      onClick={() => setIsAppointmentDetailsOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getAppointmentTypeIcon(selectedAppointment.type)}
                          <span className="ml-2 font-medium text-gray-900 capitalize">
                            {selectedAppointment.type}
                          </span>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedAppointment.status === 'upcoming'
                            ? 'bg-green-100 text-green-800'
                            : selectedAppointment.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedAppointment.status === 'upcoming' ? 'À venir' :
                           selectedAppointment.status === 'past' ? 'Passé' : 'Annulé'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Client</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedAppointment.clientName}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date et heure</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(selectedAppointment.date)}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Montant</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatCurrency(selectedAppointment.amount)}
                        {selectedAppointment.paid && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Payé
                          </span>
                        )}
                      </p>
                    </div>

                    {selectedAppointment.notes && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedAppointment.notes}</p>
                      </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
                      {selectedAppointment.status === 'upcoming' && (
                        <>
                          <button
                            onClick={() => {
                              // Handle reschedule
                              setIsAppointmentDetailsOpen(false);
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            Reporter
                          </button>
                          <button
                            onClick={() => {
                              // Handle cancellation
                              setIsAppointmentDetailsOpen(false);
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                          >
                            Annuler
                          </button>
                        </>
                      )}
                      {selectedAppointment.status === 'past' && !selectedAppointment.paid && (
                        <button
                          onClick={() => {
                            // Handle invoice generation
                            setIsAppointmentDetailsOpen(false);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                        >
                          Générer la facture
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}