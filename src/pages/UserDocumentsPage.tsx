import React, { useState } from 'react';
import { FileText, Upload, Download, Eye, Trash2, Plus, Search, Filter, Calendar } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

type DocumentType = 'identity' | 'contract' | 'invoice' | 'legal' | 'other';

type Document = {
  id: string;
  name: string;
  type: DocumentType;
  size: string;
  uploadDate: Date;
  lawyerName?: string;
  consultationId?: string;
};

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Carte_identite.pdf',
    type: 'identity',
    size: '2.1 MB',
    uploadDate: new Date(2024, 2, 15),
    lawyerName: 'Me Marie Dupont',
    consultationId: '1'
  },
  {
    id: '2',
    name: 'Contrat_travail.pdf',
    type: 'contract',
    size: '1.8 MB',
    uploadDate: new Date(2024, 2, 10),
    lawyerName: 'Me Pierre Bernard',
    consultationId: '2'
  },
  {
    id: '3',
    name: 'Facture_consultation.pdf',
    type: 'invoice',
    size: '0.5 MB',
    uploadDate: new Date(2024, 2, 5),
    lawyerName: 'Me Sophie Laurent',
    consultationId: '3'
  }
];

export default function UserDocumentsPage() {
  const [documents] = useState(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getDocumentTypeLabel = (type: DocumentType) => {
    switch (type) {
      case 'identity':
        return 'Pièce d\'identité';
      case 'contract':
        return 'Contrat';
      case 'invoice':
        return 'Facture';
      case 'legal':
        return 'Document juridique';
      case 'other':
        return 'Autre';
    }
  };

  const getDocumentTypeColor = (type: DocumentType) => {
    switch (type) {
      case 'identity':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-green-100 text-green-800';
      case 'invoice':
        return 'bg-yellow-100 text-yellow-800';
      case 'legal':
        return 'bg-purple-100 text-purple-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (document.lawyerName && document.lawyerName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || document.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mes documents</h1>
              <p className="mt-1 text-gray-500">Gérez tous vos documents juridiques</p>
            </div>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Télécharger un document
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
                    placeholder="Rechercher un document..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                  />
                </div>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as DocumentType | 'all')}
                  className="rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">Tous les types</option>
                  <option value="identity">Pièce d'identité</option>
                  <option value="contract">Contrat</option>
                  <option value="invoice">Facture</option>
                  <option value="legal">Document juridique</option>
                  <option value="other">Autre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-gray-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{document.name}</h3>
                      <p className="text-xs text-gray-500">{document.size}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentTypeColor(document.type)}`}>
                    {getDocumentTypeLabel(document.type)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Ajouté le {formatDate(document.uploadDate)}</span>
                  </div>
                  {document.lawyerName && (
                    <div className="text-xs text-gray-500">
                      Partagé avec {document.lawyerName}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-16">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Aucun document trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas encore de document ou aucun ne correspond à vos critères.
              </p>
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Télécharger votre premier document
              </button>
            </div>
          )}

          {/* Upload Zone */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-300 transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Glissez-déposez vos documents ici
              </h3>
              <p className="text-gray-600 mb-4">
                ou cliquez pour sélectionner des fichiers
              </p>
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Sélectionner des fichiers
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Formats acceptés : PDF, JPG, PNG (max 10MB)
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}