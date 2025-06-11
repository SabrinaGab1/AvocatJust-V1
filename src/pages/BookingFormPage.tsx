import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, Building2, User, Mail, MapPin, FileText, CreditCard, Lock, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';

type ConsultationType = 'cabinet' | 'visio' | 'telephone';

const bookingSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Numéro de téléphone invalide'),
  address: z.string().min(10, 'Adresse complète requise'),
  city: z.string().min(2, 'Ville requise'),
  postalCode: z.string().regex(/^\d{5}$/, 'Code postal invalide'),
  problemDescription: z.string().min(20, 'Veuillez décrire votre problématique (minimum 20 caractères)'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Numéro de carte invalide'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Date d\'expiration invalide (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV invalide'),
  cardName: z.string().min(2, 'Nom sur la carte requis'),
  acceptTerms: z.boolean().refine(val => val === true, 'Vous devez accepter les conditions')
});

type BookingFormData = z.infer<typeof bookingSchema>;

const consultationDetails = {
  cabinet: {
    icon: Building2,
    title: 'Consultation au cabinet',
    duration: 60,
    price: 150,
    description: 'Rendez-vous en personne dans le cabinet de l\'avocat'
  },
  visio: {
    icon: Video,
    title: 'Consultation en visioconférence',
    duration: 60,
    price: 120,
    description: 'Consultation par vidéo sécurisée depuis chez vous'
  },
  telephone: {
    icon: Phone,
    title: 'Consultation téléphonique',
    duration: 30,
    price: 100,
    description: 'Appel téléphonique pour un conseil rapide'
  }
};

export default function BookingFormPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const consultationType = searchParams.get('type') as ConsultationType;
  const dateParam = searchParams.get('date');
  const timeParam = searchParams.get('time');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Info, 2: Problem, 3: Payment

  const selectedDate = dateParam ? new Date(dateParam) : null;
  const selectedTime = timeParam || '';
  const consultation = consultationDetails[consultationType];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      acceptTerms: false
    }
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setValue('cardNumber', formatted.replace(/\s/g, ''));
    e.target.value = formatted;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
    setValue('expiryDate', value);
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    navigate('/');
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  if (!selectedDate || !selectedTime || !consultation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Informations manquantes</h2>
          <p className="text-gray-600 mb-4">Veuillez sélectionner une date et un horaire</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

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
              Retour à l'agenda
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {[
                { step: 1, title: 'Informations', icon: User },
                { step: 2, title: 'Problématique', icon: FileText },
                { step: 3, title: 'Paiement', icon: CreditCard }
              ].map(({ step, title, icon: Icon }) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {currentStep > step ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step ? 'text-orange-500' : 'text-gray-500'
                  }`}>
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Vos informations personnelles</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          {...register('firstName')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Votre prénom"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          {...register('lastName')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Votre nom"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="votre@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          {...register('phone')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="06 12 34 56 78"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse complète *
                        </label>
                        <input
                          type="text"
                          {...register('address')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="123 rue de la République"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          {...register('city')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Paris"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code postal *
                        </label>
                        <input
                          type="text"
                          {...register('postalCode')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="75001"
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Continuer
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Problem Description */}
                {currentStep === 2 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Décrivez votre problématique</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description détaillée de votre situation *
                      </label>
                      <textarea
                        {...register('problemDescription')}
                        rows={8}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Décrivez en détail votre situation juridique, les faits importants, vos questions et ce que vous attendez de cette consultation..."
                      />
                      {errors.problemDescription && (
                        <p className="mt-1 text-sm text-red-600">{errors.problemDescription.message}</p>
                      )}
                      <p className="mt-2 text-sm text-gray-500">
                        Plus votre description sera précise, plus l'avocat pourra vous donner des conseils adaptés lors de votre consultation.
                      </p>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Retour
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Continuer
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <Lock className="h-5 w-5 text-green-500" />
                      <h2 className="text-xl font-semibold text-gray-900">Paiement sécurisé</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Numéro de carte *
                        </label>
                        <input
                          type="text"
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date d'expiration *
                          </label>
                          <input
                            type="text"
                            onChange={handleExpiryChange}
                            maxLength={5}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="MM/YY"
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            {...register('cvv')}
                            maxLength={4}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="123"
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom sur la carte *
                        </label>
                        <input
                          type="text"
                          {...register('cardName')}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Jean Dupont"
                        />
                        {errors.cardName && (
                          <p className="mt-1 text-sm text-red-600">{errors.cardName.message}</p>
                        )}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            {...register('acceptTerms')}
                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            J'accepte les{' '}
                            <a href="#" className="text-orange-500 hover:text-orange-600">
                              conditions générales
                            </a>{' '}
                            et la{' '}
                            <a href="#" className="text-orange-500 hover:text-orange-600">
                              politique de confidentialité
                            </a>
                          </label>
                        </div>
                        {errors.acceptTerms && (
                          <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Retour
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Traitement en cours...
                          </>
                        ) : (
                          `Confirmer et payer ${consultation.price}€`
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              {/* Consultation Summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <consultation.icon className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-gray-900">{consultation.title}</div>
                      <div className="text-sm text-gray-600">{consultation.duration} minutes</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{formatDate(selectedDate)}</div>
                      <div className="text-sm text-gray-600">à {selectedTime}</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">{consultation.price}€</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Lock className="h-5 w-5 text-green-500" />
                  <h4 className="font-medium text-green-900">Paiement sécurisé</h4>
                </div>
                <p className="text-sm text-green-700">
                  Vos informations de paiement sont protégées par un cryptage SSL 256 bits.
                </p>
              </div>

              {/* Lawyer Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h4 className="font-medium text-gray-900 mb-3">Votre avocat</h4>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=60"
                    alt="Me Marie Dupont"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Me Marie Dupont</div>
                    <div className="text-sm text-gray-600">Droit des affaires</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <Dialog
          open={isConfirmationOpen}
          onClose={() => {}}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                
                <Dialog.Title className="text-xl font-semibold text-gray-900 mb-2">
                  Rendez-vous confirmé !
                </Dialog.Title>
                
                <p className="text-gray-600 mb-6">
                  Votre consultation avec Me Marie Dupont est confirmée pour le{' '}
                  <strong>{formatDate(selectedDate)} à {selectedTime}</strong>.
                </p>

                <div className="bg-orange-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-orange-900 mb-2">Prochaines étapes :</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Vous recevrez un email de confirmation</li>
                    <li>• Un rappel vous sera envoyé 24h avant</li>
                    <li>• L'événement peut être ajouté à votre agenda</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      // Add to calendar functionality would go here
                      alert('Fonctionnalité d\'ajout au calendrier à implémenter');
                    }}
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Ajouter à mon agenda
                  </button>
                  
                  <button
                    onClick={handleConfirmationClose}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Retour à l'accueil
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