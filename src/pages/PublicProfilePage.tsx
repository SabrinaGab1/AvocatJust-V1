import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Linkedin, Twitter, Plus, X, Instagram, Youtube, Star, Share2, Building2, Video, Reply, Play, Eye, EyeOff, Camera, Upload, Trash2 } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';

type Expertise = {
  id: string;
  name: string;
  description: string;
};

type Formation = {
  id: string;
  institution: string;
  diplome: string;
  annee: string;
};

type Publication = {
  id: string;
  titre: string;
  date: Date;
  url?: string;
};

type ConsultationType = 'cabinet' | 'visio' | 'telephone';

type Review = {
  id: string;
  rating: number;
  comment: string;
  date: Date;
  author: string;
  response?: string;
};

type Media = {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
};

export default function PublicProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');
  const [profileColor, setProfileColor] = useState('#f97316'); // orange-500
  const [bannerImage, setBannerImage] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000&h=600');
  const [hasAccess, setHasAccess] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200');
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<'header' | 'profile' | 'gallery' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [consultationTypes] = useState<{ type: ConsultationType; price: number }[]>([
    { type: 'cabinet', price: 150 },
    { type: 'visio', price: 120 },
    { type: 'telephone', price: 100 }
  ]);

  const [socialLinks] = useState({
    website: 'https://www.cabinet-dupont.fr',
    linkedin: 'https://linkedin.com/in/marie-dupont',
    youtube: 'https://youtube.com/@mariedupont',
    instagram: 'https://instagram.com/avocate.dupont',
    twitter: 'https://twitter.com/mariedupont'
  });

  const [reviews] = useState<Review[]>([
    {
      id: '1',
      rating: 5,
      comment: "Maître Dupont a été d'une aide précieuse dans mon dossier. Très professionnelle et à l'écoute.",
      date: new Date(2024, 1, 15),
      author: 'Client vérifié',
      response: "Merci pour votre confiance ! Je suis ravie d'avoir pu vous aider."
    },
    {
      id: '2',
      rating: 4,
      comment: "Excellente avocate, très réactive et compétente.",
      date: new Date(2024, 1, 10),
      author: 'Client vérifié'
    }
  ]);

  const [media, setMedia] = useState<Media[]>([
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: '2',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=example',
      thumbnail: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=200'
    }
  ]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Me Marie Dupont - Avocate',
        text: 'Découvrez le profil de Me Marie Dupont, avocate au Barreau de Paris',
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getConsultationTypeIcon = (type: ConsultationType) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-5 w-5" />;
      case 'visio':
        return <Video className="h-5 w-5" />;
      case 'telephone':
        return <Phone className="h-5 w-5" />;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      switch (editingMedia) {
        case 'header':
          setBannerImage(reader.result as string);
          break;
        case 'profile':
          setProfilePhoto(reader.result as string);
          break;
        case 'gallery':
          setMedia(prev => [...prev, {
            id: Math.random().toString(),
            type: file.type.startsWith('video/') ? 'video' : 'image',
            url: reader.result as string,
            thumbnail: reader.result as string
          }]);
          break;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveMedia = (id: string) => {
    setMedia(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        {/* Banner */}
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${bannerImage})`,
            backgroundColor: profileColor
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => {
                setEditingMedia('header');
                setIsMediaModalOpen(true);
              }}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <Camera className="h-5 w-5" />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Profile Header */}
            <div className="p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex sm:space-x-5">
                  <div className="relative">
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover"
                    />
                    <button
                      onClick={() => {
                        setEditingMedia('profile');
                        setIsMediaModalOpen(true);
                      }}
                      className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                    >
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="mt-4 sm:mt-0 text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-900">Me Marie Dupont</h2>
                    <p className="text-gray-600">Avocate au Barreau de Paris</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Droit des affaires
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Droit commercial
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-xl font-bold text-gray-900">{getAverageRating()}</span>
                    </div>
                    <p className="text-sm text-gray-500">{reviews.length} avis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Gallery */}
            <div className="border-t border-gray-200 px-6 py-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Galerie média</h3>
                <button
                  onClick={() => {
                    setEditingMedia('gallery');
                    setIsMediaModalOpen(true);
                  }}
                  className="flex items-center px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {media.map((item) => (
                  <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img
                      src={item.thumbnail || item.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <button
                      onClick={() => handleRemoveMedia(item.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-200 px-6 py-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Avis clients</h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-5 w-5 ${
                                index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">{review.author}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                    {review.response && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-200">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Réponse de Me Dupont:</span> {review.response}
                        </p>
                      </div>
                    )}
                    {!review.response && (
                      <button
                        onClick={() => {
                          setSelectedReview(review);
                          setIsReplyModalOpen(true);
                        }}
                        className="mt-2 text-sm text-orange-500 hover:text-orange-600 flex items-center"
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Répondre
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Lawyer Presentation */}
            <div className="border-t border-gray-200 px-6 py-8">
              <div className="max-w-3xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">À propos</h3>
                <div className="prose prose-orange">
                  <p className="text-gray-600 mb-4">
                    Avocate au Barreau de Paris depuis 2015, je mets mon expertise au service de mes clients dans les domaines du droit des affaires et du droit commercial. Mon parcours m'a permis d'acquérir une solide expérience dans l'accompagnement des entrepreneurs et des entreprises.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Titulaire d'un Master 2 en Droit des Affaires de l'Université Paris 1 Panthéon-Sorbonne et d'un LLM de la London School of Economics, je propose une approche à la fois rigoureuse et pragmatique du droit, adaptée aux enjeux contemporains du monde des affaires.
                  </p>
                  <div className="bg-orange-50 rounded-lg p-6 mb-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-2">Domaines d'expertise</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Droit des sociétés et création d'entreprise</li>
                      <li>Contrats commerciaux et négociations</li>
                      <li>Fusions-acquisitions et restructurations</li>
                      <li>Contentieux des affaires</li>
                      <li>Droit du travail et relations sociales</li>
                    </ul>
                  </div>
                  <p className="text-gray-600">
                    Je m'engage à fournir un accompagnement personnalisé et des solutions sur mesure, en privilégiant une approche préventive et la recherche de solutions amiables lorsque cela est possible. Ma pratique est fondée sur l'écoute, la réactivité et la transparence.
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Types */}
            <div className="border-t border-gray-200 px-6 py-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Types de consultation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {consultationTypes.map(({ type, price }) => (
                  <div key={type} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      {getConsultationTypeIcon(type)}
                      <span className="ml-2 font-medium text-gray-900 capitalize">{type}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{price}€</div>
                    <p className="text-sm text-gray-500">par consultation</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 text-orange-500 mr-1" />
                <span>Accepte l'aide juridictionnelle</span>
              </div>
            </div>

            {/* Contact Information Toggle Button */}
            {!hasAccess && (
              <div className="px-6 py-4 bg-gray-50 border-t border-b border-gray-200">
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="flex items-center justify-center w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {showContact ? (
                    <>
                      <EyeOff className="h-5 w-5 mr-2" />
                      Masquer les coordonnées
                    </>
                  ) : (
                    <>
                      <Eye className="h-5 w-5 mr-2" />
                      Afficher les coordonnées
                    </>
                  )}
                </button>
                {showContact && (
                  <p className="mt-2 text-sm text-center text-gray-500">
                    Pour contacter directement l'avocat, vous devez d'abord prendre rendez-vous
                  </p>
                )}
              </div>
            )}

            {/* Contact Information - Only visible after payment or when toggled */}
            {(hasAccess || showContact) && (
              <div className="border-t border-gray-200 px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a href={`tel:0612345678`} className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                    <Phone className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Téléphone</div>
                      <span>06 12 34 56 78</span>
                    </div>
                  </a>
                  <a href={`mailto:marie.dupont@cabinet-avocat.fr`} className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
                    <Mail className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <span>marie.dupont@cabinet-avocat.fr</span>
                    </div>
                  </a>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Adresse</div>
                      <span>123 Avenue des Champs-Élysées, 75008 Paris</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 flex items-center space-x-4">
                  {socialLinks.website && (
                    <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                      <Youtube className="h-5 w-5" />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reply to Review Modal */}
        <Dialog
          open={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Répondre à l'avis
                </Dialog.Title>
                <button
                  onClick={() => setIsReplyModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < (selectedReview?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-gray-600">{selectedReview?.comment}</p>
              </div>

              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Votre réponse..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
              />

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setIsReplyModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    // Handle reply submission
                    setIsReplyModalOpen(false);
                    setReplyText('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                >
                  Répondre
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Media Edit Modal */}
        <Dialog
          open={isMediaModalOpen}
          onClose={() => setIsMediaModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  {editingMedia === 'header' ? 'Modifier la photo de couverture' :
                   editingMedia === 'profile' ? 'Modifier la photo de profil' :
                   'Ajouter à la galerie'}
                </Dialog.Title>
                <button
                  onClick={() => setIsMediaModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center w-full">
                  <label
                    htmlFor="media-upload"
                    className="w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Cliquez pour {editingMedia === 'gallery' ? 'ajouter des médias' : 'changer la photo'}
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF {editingMedia === 'gallery' ? 'ou MP4' : ''} jusqu'à 10MB
                    </p>
                  </label>
                  <input
                    ref={fileInputRef}
                    id="media-upload"
                    type="file"
                    className="hidden"
                    accept={editingMedia === 'gallery' ? "image/*,video/*" : "image/*"}
                    onChange={handleFileSelect}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsMediaModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setIsMediaModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}