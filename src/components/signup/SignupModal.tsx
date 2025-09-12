import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment } from 'react';
import SubscriptionStep from './steps/SubscriptionStep';
import AccountStep from './steps/AccountStep';
import ValidationStep from './steps/ValidationStep';
import PaymentStep from './steps/PaymentStep'; // Add this import

export type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const steps = [  
  { id: 'account', title: 'Compte' },
  { id: 'validation', title: 'Validation' },
  { id: 'subscription', title: 'Abonnement' },
  { id: 'payment', title: 'Paiement' }
];

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
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
        return <AccountStep onNext={handleNext} onBack={handleBack} />;
      case 1:
        return <ValidationStep onBack={handleBack} onClose={onClose} />;
      case 2:
        return <SubscriptionStep onNext={handleNext} />;
      case 3:
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-2xl font-semibold text-gray-900">
                    Inscription Avocat
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex-1 ${
                          index !== steps.length - 1 ? 'relative' : ''
                        }`}
                      >
                        <div
                          className={`flex items-center ${
                            index !== 0 ? 'ml-8' : ''
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index <= currentStep
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span
                            className={`ml-3 text-sm font-medium ${
                              index <= currentStep
                                ? 'text-orange-500'
                                : 'text-gray-500'
                            }`}
                          >
                            {step.title}
                          </span>
                        </div>
                        {index !== steps.length - 1 && (
                          <div
                            className={`absolute top-4 w-full h-0.5 ${
                              index < currentStep
                                ? 'bg-orange-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {renderStep()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}