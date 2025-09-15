import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Scale, User, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType: 'client' | 'lawyer') => {
    onClose();
    if (userType === 'client') {
      navigate('/client/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Scale className="h-6 w-6 text-orange-500 mr-2" />
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Connexion
              </Dialog.Title>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 text-center mb-6">
              Choisissez votre type de compte pour continuer
            </p>

            <button
              onClick={() => handleUserTypeSelection('client')}
              className="w-full flex items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Je suis un client</h3>
                <p className="text-sm text-gray-600">
                  Je cherche un avocat pour mes besoins juridiques
                </p>
              </div>
            </button>

            <button
              onClick={() => handleUserTypeSelection('lawyer')}
              className="w-full flex items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-200 transition-colors">
                  <Briefcase className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Je suis un avocat</h3>
                <p className="text-sm text-gray-600">
                  Je souhaite rejoindre la plateforme
                </p>
              </div>
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}