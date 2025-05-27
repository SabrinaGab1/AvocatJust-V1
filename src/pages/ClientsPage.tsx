import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Phone, Mail, MapPin, FileText, Calendar, MessageSquare, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';

type Client = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  photo: string;
  statut: 'actif' | 'inactif';
  dateCreation: Date;
  dernierContact: Date;
  dossiers: number;
  notes?: string;
};

const mockClients: Client[] = [
  {
    id: '1',
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@email.com',
    telephone: '06 12 34 56 78',
    adresse: '123 rue de Paris, 75001 Paris',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    statut: 'actif',
    dateCreation: new Date(2024, 1, 15),
    dernierContact: new Date(2024, 2, 20),
    dossiers: 3
  },
  {
    id: '2',
    nom: 'Dubois',
    prenom: 'Pierre',
    email: 'pierre.dubois@email.com',
    telephone: '06 23 45 67 89',
    adresse: '456 avenue des Champs-Élysées, 75008 Paris',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    statut: 'actif',
    dateCreation: new Date(2024, 0, 10),
    dernierContact: new Date(2024, 2, 18),
    dossiers: 2
  },
  {
    id: '3',
    nom: 'Bernard',
    prenom: 'Marie',
    email: 'marie.bernard@email.com',
    telephone: '06 34 56 78 90',
    adresse: '789 boulevard Haussmann, 75009 Paris',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    statut: 'inactif',
    dateCreation: new Date(2023, 11, 5),
    dernierContact: new Date(2024, 1, 15),
    dossiers: 1
  }
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'tous' | 'actif' | 'inactif'>('tous');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = 
      client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'tous' || client.statut === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
            
            <button
              onClick={() => setIsAddClientModalOpen(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Nouveau client</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
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

                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as 'tous' | 'actif' | 'inactif')}
                      className="pl-4 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="tous">Tous les statuts</option>
                      <option value="actif">Actifs</option>
                      <option value="inactif">Inactifs</option>
                    </select>
                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
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
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              client.statut === 'actif'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {client.statut === 'actif' ? 'Actif' : 'Inactif'}
                          </span>
                          <div className="relative">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <MoreVertical className="h-5 w-5" />
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
                          <FileText className="h-4 w-4" />
                          <span>{client.dossiers} dossier{client.dossiers > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MessageSquare className="h-4 w-4" />
                          <span>Dernier contact le {formatDate(client.dernierContact)}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-4">
                        <button className="text-sm text-orange-500 hover:text-orange-600 flex items-center">
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedClient(client);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-sm text-red-500 hover:text-red-600 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <Dialog
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center space-x-3 text-red-600 mb-4">
                <AlertCircle className="h-6 w-6" />
                <Dialog.Title className="text-lg font-semibold">
                  Confirmer la suppression
                </Dialog.Title>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Êtes-vous sûr de vouloir supprimer le client {selectedClient?.prenom} {selectedClient?.nom} ? 
                Cette action est irréversible.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    // Handle delete logic here
                    setIsDeleteModalOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}