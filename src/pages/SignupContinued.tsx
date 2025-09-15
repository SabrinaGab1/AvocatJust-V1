import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubscriptionStep from '../components/signup/steps/SubscriptionStep';
import AccountDetailsStep from '../components/signup/steps/AccountDetailsStep';
import ValidationStep from '../components/signup/steps/ValidationStep';
import PaymentStep from '../components/signup/steps/PaymentStep';
import AnimatedPage from '../components/AnimatedPage';
import LoginStep from '../components/signup/steps/LoginStep';
import RdvStep from '../components/signup/steps/RdvStep';

const steps = [
  { id: 'account details', title: 'Détails du compte' },
  { id: 'subscription', title: 'Abonnement'},
  { id: 'payment', title: 'Paiement' },
];

export default function SignupContinuedPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    subscription: null,
    email: '',
    password: '',
    phone: '',
  });

  const handleNext = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AccountDetailsStep onNext={handleNext}/>;
      case 1:
        return <SubscriptionStep onNext={handleNext} onBack={handleBack}/>;
      case 2:
        return (
          <PaymentStep
            subscription={formData.subscription}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen">
        <nav className="bg-white/80 shadow-sm sticky top-0 z-50 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center">
                <Scale className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
              </Link>
            </div>
          </div>
        </nav>

        <div 
          className="relative bg-cover bg-center py-24"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000&h=600)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Développez votre cabinet avec AvocaJust
              </h1>
              <p className="mt-6 text-xl text-gray-300">
                Rejoignez la première communauté d'avocats engagés pour une justice accessible et équitable.
              </p>
            </div>
          </div>
        </div>

        <div className="relative -mt-16 max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-between mb-12">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex-1"
                >
                  <div
                    className={`flex items-center ${
                      index !== 0 ? 'ml-8' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        index <= currentStep
                          ? 'bg-orange-500 text-white ring-4 ring-orange-100'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <span
                        className={`block text-sm font-medium ${
                          index <= currentStep
                            ? 'text-orange-500'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </span>
                      <span className="block text-xs text-gray-400 mt-0.5">
                        {index === 0 && 'Entrez les détails de votre compte'}
                        {index === 1 && 'Choisissez votre formule'}
                        {index === 2 && 'Procédez au paiement'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              {renderStep()}
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              En vous inscrivant, vous acceptez nos{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600">
                conditions d'utilisation
              </a>{' '}
              et notre{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600">
                politique de confidentialité
              </a>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Plus de clients</h3>
                <p className="mt-2 text-gray-500">Développez votre clientèle grâce à notre plateforme de mise en relation.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Visibilité accrue</h3>
                <p className="mt-2 text-gray-500">Augmentez votre présence en ligne et votre notoriété professionnelle.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Gestion simplifiée</h3>
                <p className="mt-2 text-gray-500">Optimisez votre temps avec nos outils de gestion intégrés.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}