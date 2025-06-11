import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Phone, Video, Building2, Calendar, Clock, Award, Languages, Scale, CheckCircle, MessageSquare } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

type ConsultationType = 'cabinet' | 'visio' | 'telephone';

type LawyerProfile = {
  id: string;
  nom: string;
  prenom: string;
  ville: string;
  adresse: string;
  specialites: string[];
  photo: string;
  rating: number;
  reviewCount: number;
  description: string;
  experience: number;
  barreau: string;
  consultationTypes: {
    cabinet?: { price: number; duration: number; description: string };
    visio?: { price: number; duration: number; description: string };
    telephone?: { price: number; duration: number; description: string };
  };
  acceptsLegalAid: boolean;
  languages: string[];
  nextAvailability: Date;
  formations: string[];
  certifications: string[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    date: Date;
    author: string;
  }[];
};

const mockLawyer: LawyerProfile = {
  id: '1',
  nom: 'Dupont',
  prenom: 'Marie',
  ville: 'Paris',
  adresse: '123 Avenue des Champs-Élysées, 75008 Paris',
  specialites: ['Droit des affaires', 'Droit commercial', 'Droit des sociétés'],
  photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500',
  rating: 4.8,
  reviewCount: 24,
  description: 'Avocate spécialisée en droit des affaires avec plus de 10 ans d\'expérience. Je accompagne les entrepreneurs et les entreprises dans tous leurs projets juridiques, de la création à la cession, en passant par les contrats commerciaux et les litiges. Mon approche se veut pragmatique et orientée solutions.',
  experience: 10,
  barreau: 'Paris',
  consultationTypes: {
    cabinet: { 
      price: 150, 
      duration: 60, 
      description: 'Consultation en face à face dans mon cabinet parisien. Idéal pour les dossiers complexes nécessitant l\'analyse de documents.' 
    },
    visio: { 
      price: 120, 
      duration: 60, 
      description: 'Consultation par visioconférence sécurisée. Pratique et efficace pour un premier conseil ou un suivi de dossier.' 
    },
    telephone: { 
      price: 100, 
      duration: 30, 
      description: 'Consultation téléphonique rapide pour une question urgente ou un conseil ponctuel.' 
    }
  },
  acceptsLegalAid: true,
  languages: ['Français', 'Anglais', 'Espagnol'],
  nextAvailability: new Date(2024, 3, 15, 14, 0),
  formations: [
    'Master 2 Droit des Affaires - Université Paris 1 Panthéon-Sorbonne',
    'LLM Business Law - London School of Economics',
    'Certificat en Médiation Commerciale - CMAP'
  ],
  certifications: [
    'Avocat au Barreau de Paris depuis 2014',
    'Spécialisation en Droit des Sociétés (2018)',
    'Médiateur agréé CMAP'
  ],
  reviews: [
    {
      id: '1',
      rating: 5,
      comment: "Maître Dupont a été d'une aide précieuse pour la création de ma société. Très professionnelle, réactive et de bon conseil. Je recommande vivement !",
      date: new Date(2024, 2, 15),
      author: 'Client vérifié'
    },
    {
      id: '2',
      rating: 5,
      comment: "Excellente avocate ! Elle a su résoudre mon litige commercial rapidement et efficacement. Communication parfaite tout au long du dossier.",
      date: new Date(2024, 2, 10),
      author: 'Client vérifié'
    },
    {
      id: '3',
      rating: 4,
      comment: "Très compétente en droit des affaires. Explications claires et conseils pertinents. Seul bémol : délai de réponse parfois un peu long.",
      date: new Date(2024, 1, 28),
      author: 'Client vérifié'
    }
  ]
};

export default function LawyerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedConsultationType, setSelectedConsultationType] = useState<ConsultationType | null>(null);

  const lawyer = mockLawyer; // In real app, fetch by id

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getConsultationTypeIcon = (type: ConsultationType) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-6 w-6" />;
      case 'visio':
        return <Video className="h-6 w-6" />;
      case 'telephone':
        return <Phone className="h-6 w-6" />;
    }
  };

  const getConsultationTypeTitle = (type: ConsultationType) => {
    switch (type) {
      case 'cabinet':
        return 'Au cabinet';
      case 'visio':
        return 'Visioconférence';
      case 'telephone':
        return 'Téléphone';
    }
  };

  const handleBookConsultation = (type: ConsultationType) => {
    navigate(`/avocat/${lawyer.id}/reservation?type=${type}`);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux résultats
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start space-x-6">
                  <img
                    src={lawyer.photo}
                    alt={`${lawyer.prenom} ${lawyer.nom}`}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Me {lawyer.prenom} {lawyer.nom}
                    </h1>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-gray-600">{lawyer.ville}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="font-medium text-gray-900">{lawyer.rating}</span>
                        <span className="text-gray-500 ml-1">({lawyer.reviewCount} avis)</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-gray-600">{lawyer.experience} ans d'expérience</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {lawyer.specialites.map((specialite, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                        >
                          {specialite}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">À propos</h2>
                <p className="text-gray-600 leading-relaxed">{lawyer.description}</p>
              </div>

              {/* Formations & Certifications */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Formation et certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Formation</h3>
                    <ul className="space-y-2">
                      {lawyer.formations.map((formation, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{formation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Certifications</h3>
                    <ul className="space-y-2">
                      {lawyer.certifications.map((certification, index) => (
                        <li key={index} className="flex items-start">
                          <Scale className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{certification}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Avis clients ({lawyer.reviewCount})
                </h2>
                <div className="space-y-4">
                  {lawyer.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star
                                key={index}
                                className={`h-4 w-4 ${
                                  index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-600">{review.author}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Intl.DateTimeFormat('fr-FR').format(review.date)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Consultation Types */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Choisir une consultation</h2>
                <div className="space-y-4">
                  {Object.entries(lawyer.consultationTypes).map(([type, details]) => (
                    <div
                      key={type}
                      className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-orange-500 mt-1">
                          {getConsultationTypeIcon(type as ConsultationType)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-900">
                              {getConsultationTypeTitle(type as ConsultationType)}
                            </h3>
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-900">{details.price}€</div>
                              <div className="text-sm text-gray-500">{details.duration} min</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{details.description}</p>
                          <button
                            onClick={() => handleBookConsultation(type as ConsultationType)}
                            className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                          >
                            Réserver
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Disponibilité</h2>
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <div>
                    <div className="font-medium text-gray-900">Prochaine disponibilité</div>
                    <div className="text-gray-600">{formatDate(lawyer.nextAvailability)}</div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">Adresse</div>
                      <div className="text-gray-600">{lawyer.adresse}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Languages className="h-4 w-4 text-gray-400" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">Langues</div>
                      <div className="text-gray-600">{lawyer.languages.join(', ')}</div>
                    </div>
                  </div>
                  {lawyer.acceptsLegalAid && (
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">Aide juridictionnelle</div>
                        <div className="text-gray-600">Acceptée</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-orange-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <MessageSquare className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium text-gray-900">Une question ?</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Contactez Me {lawyer.nom} pour obtenir des informations supplémentaires.
                </p>
                <button className="w-full px-4 py-2 bg-white text-orange-500 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium">
                  Envoyer un message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}