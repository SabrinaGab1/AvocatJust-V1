import React, { useState, useRef } from 'react';
import { MapPin, Phone, Mail, Building, Briefcase, Upload, X, Camera, AlertCircle, FileText, Users, Euro, Building2, Video, Star, Calendar } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';

type AppointmentType = 'cabinet' | 'visio' | 'telephone';

type AppointmentPreference = {
  type: AppointmentType;
  enabled: boolean;
  price: number;
};

export default function PersonalProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAdminRequestModalOpen, setIsAdminRequestModalOpen] = useState(false);
  const [adminRequestField, setAdminRequestField] = useState('');
  const [adminRequestMessage, setAdminRequestMessage] = useState('');
  const [documents, setDocuments] = useState<{ name: string; type: string; status?: 'pending' | 'approved' }[]>([]);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ name: string; type: string } | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState("https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200");
  const [formData, setFormData] = useState({
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@cabinet-avocat.fr',
    telephone: '06 12 34 56 78',
    barreau: 'Paris',
    cabinet: 'Cabinet Dupont & Associés',
    siret: '123 456 789 00012',
    adresse: '123 Avenue des Champs-Élysées, 75008 Paris'
  });

  const [appointmentPreferences, setAppointmentPreferences] = useState<AppointmentPreference[]>([
    { type: 'cabinet', enabled: true, price: 150 },
    { type: 'visio', enabled: true, price: 120 },
    { type: 'telephone', enabled: true, price: 100 }
  ]);
  const [acceptsLegalAid, setAcceptsLegalAid] = useState(false);
  const [offersInstallments, setOffersInstallments] = useState(false);
  const [isAppointmentPrefsModalOpen, setIsAppointmentPrefsModalOpen] = useState(false);

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const isValid = await verifyDocument(file, type);
      
      if (!isValid) {
        alert(`Le document fourni ne semble pas être un(e) ${type} valide. Veuillez réessayer.`);
        return;
      }

      setSelectedDocument({ name: file.name, type });
      setIsDocumentModalOpen(true);
    } catch (error) {
      alert("Une erreur est survenue lors de la vérification du document.");
    }
  };

  const verifyDocument = async (file: File, type: string): Promise<boolean> => {
    // Simulate document verification
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        // Basic verification logic
        if (type === 'Carte d\'identité') {
          // Check if the document contains common CNI markers
          const isCNI = content.toLowerCase().includes('république française') ||
                       content.toLowerCase().includes('carte nationale') ||
                       content.toLowerCase().includes('identité');
          resolve(isCNI);
        } else if (type === 'Carte du barreau') {
          // Check if the document contains professional card markers
          const isBarreauCard = content.toLowerCase().includes('avocat') ||
                               content.toLowerCase().includes('barreau') ||
                               content.toLowerCase().includes('ordre des avocats');
          resolve(isBarreauCard);
        } else {
          resolve(true);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDocument) {
      setDocuments(prev => [...prev, { ...selectedDocument, status: 'pending' }]);
      setIsDocumentModalOpen(false);
      setSelectedDocument(null);
      setAdminRequestMessage('');
    }
  };

  const handleRemoveDocument = (name: string) => {
    setDocuments(prev => prev.filter(doc => doc.name !== name));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdminRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin request sent:', {
      field: adminRequestField,
      message: adminRequestMessage
    });
    setIsAdminRequestModalOpen(false);
    setAdminRequestMessage('');
  };

  const handleAppointmentPrefsSubmit = () => {
    setIsAppointmentPrefsModalOpen(false);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Espace personnel</h1>
            <p className="mt-1 text-gray-500">Gérez votre profil et suivez votre activité</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
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
                      <button
                        onClick={() => photoInputRef.current?.click()}
                        className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                      >
                        <Camera className="h-4 w-4 text-gray-600" />
                      </button>
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePhotoChange}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Nom</label>
                          <p className="mt-1 text-lg text-gray-900">{formData.nom}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Prénom</label>
                          <p className="mt-1 text-lg text-gray-900">{formData.prenom}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Email</label>
                          <p className="mt-1 text-lg text-gray-900">{formData.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Téléphone</label>
                          <p className="mt-1 text-lg text-gray-900">{formData.telephone}</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-500">Barreau</label>
                        <p className="mt-1 text-lg text-gray-900">{formData.barreau}</p>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-500">Cabinet</label>
                        <p className="mt-1 text-lg text-gray-900">{formData.cabinet}</p>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-500">SIRET</label>
                        <p className="mt-1 text-lg text-gray-900">{formData.siret}</p>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-500">Adresse</label>
                        <p className="mt-1 text-lg text-gray-900">{formData.adresse}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Documents administratifs</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="ml-2 text-sm font-medium text-gray-900">{doc.name}</span>
                          {doc.status === 'pending' && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              En attente
                            </span>
                          )}
                          {doc.status === 'approved' && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Approuvé
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveDocument(doc.name)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => document.getElementById('carte-identite')?.click()}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Carte d'identité
                      </button>
                      <button
                        onClick={() => document.getElementById('carte-barreau')?.click()}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Carte du barreau
                      </button>
                      <button
                        onClick={() => document.getElementById('attestation-rcp')?.click()}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Attestation RCP
                      </button>
                    </div>

                    <input
                      id="carte-identite"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleDocumentUpload(e, 'Carte d\'identité')}
                    />
                    <input
                      id="carte-barreau"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleDocumentUpload(e, 'Carte du barreau')}
                    />
                    <input
                      id="attestation-rcp"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => handleDocumentUpload(e, 'Attestation RCP')}
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Preferences Section */}
              <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Préférences de consultation</h2>
                    <button
                      onClick={() => setIsAppointmentPrefsModalOpen(true)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {appointmentPreferences.map(pref => (
                      pref.enabled && (
                        <div key={pref.type} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            {pref.type === 'cabinet' && <Building2 className="h-5 w-5 text-gray-600" />}
                            {pref.type === 'visio' && <Video className="h-5 w-5 text-gray-600" />}
                            {pref.type === 'telephone' && <Phone className="h-5 w-5 text-gray-600" />}
                            <span className="ml-2 font-medium text-gray-900 capitalize">{pref.type}</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{pref.price}€</div>
                          <p className="text-sm text-gray-500">par consultation</p>
                        </div>
                      )
                    ))}
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-orange-500 mr-2" />
                      <span className="text-gray-900">
                        {acceptsLegalAid ? 'Accepte' : 'N\'accepte pas'} l'aide juridictionnelle
                      </span>
                    </div>

                    <div className="flex items-center">
                      <Euro className="h-5 w-5 text-orange-500 mr-2" />
                      <span className="text-gray-900">
                        {offersInstallments ? 'Propose' : 'Ne propose pas'} le paiement en plusieurs fois
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Admin Request Section */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Demande de modification</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Pour modifier certaines informations, une vérification par notre équipe est nécessaire.
                  </p>
                  <button
                    onClick={() => setIsAdminRequestModalOpen(true)}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Faire une demande
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Dialog
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Modifier le profil
                </Dialog.Title>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleFormChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Admin Request Modal */}
        <Dialog
          open={isAdminRequestModalOpen}
          onClose={() => setIsAdminRequestModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Demande de modification
                </Dialog.Title>
                <button
                  onClick={() => setIsAdminRequestModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAdminRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Champ à modifier
                  </label>
                  <select
                    value={adminRequestField}
                    onChange={(e) => setAdminRequestField(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  >
                    <option value="">Sélectionnez un champ</option>
                    <option value="barreau">Barreau</option>
                    <option value="cabinet">Cabinet</option>
                    <option value="siret">SIRET</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    value={adminRequestMessage}
                    onChange={(e) => setAdminRequestMessage(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Expliquez votre demande..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAdminRequestModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Document Upload Modal */}
        <Dialog
          open={isDocumentModalOpen}
          onClose={() => setIsDocumentModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Confirmer l'envoi
                </Dialog.Title>
                <button
                  onClick={() => setIsDocumentModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <p className="ml-3 text-sm text-orange-700">
                    Ce document sera examiné par notre équipe avant d'être validé.
                  </p>
                </div>
              </div>

              {selectedDocument && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Document : <span className="font-medium">{selectedDocument.name}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Type : <span className="font-medium">{selectedDocument.type}</span>
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDocumentModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDocumentSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                >
                  Envoyer
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Appointment Preferences Modal */}
        <Dialog
          open={isAppointmentPrefsModalOpen}
          onClose={() => setIsAppointmentPrefsModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Préférences de consultation
                </Dialog.Title>
                <button
                  onClick={() => setIsAppointmentPrefsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {appointmentPreferences.map((pref, index) => (
                  <div key={pref.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={pref.enabled}
                          onChange={(e) => {
                            const newPrefs = [...appointmentPreferences];
                            newPrefs[index].enabled = e.target.checked;
                            setAppointmentPreferences(newPrefs);
                          }}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="ml-2 text-gray-900 capitalize">{pref.type}</span>
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={pref.price}
                          onChange={(e) => {
                            const newPrefs = [...appointmentPreferences];
                            newPrefs[index].price = parseInt(e.target.value);
                            setAppointmentPreferences(newPrefs);
                          }}
                          className="w-24 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                          disabled={!pref.enabled}
                        />
                        <span className="text-gray-500">€</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={acceptsLegalAid}
                      onChange={(e) => setAcceptsLegalAid(e.target.checked)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-gray-900">Accepter l'aide juridictionnelle</span>
                  </label>
                </div>

                <div className="border-t pt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={offersInstallments}
                      onChange={(e) => setOffersInstallments(e.target.checked)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-gray-900">Proposer le paiement en 2/3 fois sans frais</span>
                  </label>
                  {offersInstallments && (
                    <p className="mt-2 text-sm text-gray-500">
                      Les frais de ce service seront à votre charge
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    onClick={() => setIsAppointmentPrefsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleAppointmentPrefsSubmit}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}