import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, FileText, Star, Edit, Camera, Upload } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

export default function UserProfilePage() {
  const [profilePhoto, setProfilePhoto] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200");
  const [userInfo] = useState({
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@email.com',
    phone: '06 12 34 56 78',
    address: '123 rue de Paris, 75001 Paris',
    memberSince: new Date(2024, 0, 15)
  });

  const [consultationHistory] = useState([
    {
      id: '1',
      lawyerName: 'Me Marie Dupont',
      date: new Date(2024, 2, 15),
      type: 'Visioconférence',
      subject: 'Droit des affaires',
      status: 'Terminée',
      rating: 5
    },
    {
      id: '2',
      lawyerName: 'Me Pierre Bernard',
      date: new Date(2024, 1, 28),
      type: 'Cabinet',
      subject: 'Droit immobilier',
      status: 'Terminée',
      rating: 4
    }
  ]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>
            <p className="mt-1 text-gray-500">Gérez vos informations personnelles et consultez votre historique</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      <Edit className="h-4 w-4 mr-2 inline" />
                      Modifier
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="relative">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-32 h-32 rounded-lg object-cover"
                      />
                      <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                        <Camera className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Prénom</label>
                          <p className="mt-1 text-lg text-gray-900">{userInfo.firstName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Nom</label>
                          <p className="mt-1 text-lg text-gray-900">{userInfo.lastName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Email</label>
                          <p className="mt-1 text-lg text-gray-900">{userInfo.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Téléphone</label>
                          <p className="mt-1 text-lg text-gray-900">{userInfo.phone}</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-500">Adresse</label>
                        <p className="mt-1 text-lg text-gray-900">{userInfo.address}</p>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-500">Membre depuis</label>
                        <p className="mt-1 text-lg text-gray-900">{formatDate(userInfo.memberSince)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation History */}
              <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Historique des consultations</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {consultationHistory.map((consultation) => (
                    <div key={consultation.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{consultation.lawyerName}</h3>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{formatDate(consultation.date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FileText className="h-4 w-4 mr-2" />
                              <span>{consultation.subject}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {consultation.status}
                              </span>
                              <span className="ml-2">{consultation.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                className={`h-4 w-4 ${
                                  index < consultation.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Consultations</span>
                    <span className="text-2xl font-bold text-gray-900">{consultationHistory.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Note moyenne</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-lg font-semibold text-gray-900">
                        {(consultationHistory.reduce((acc, c) => acc + c.rating, 0) / consultationHistory.length).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    Nouvelle consultation
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Mes documents
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Messagerie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}