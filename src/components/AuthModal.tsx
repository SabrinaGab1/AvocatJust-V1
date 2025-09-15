import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, User, Scale } from 'lucide-react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

export type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();

  const handleClientLogin = () => {
    onClose();
    navigate('/client/login');
  };

  const handleLawyerLogin = () => {
    onClose();
    navigate('/login');
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-xl font-semibold text-gray-900">
                    Connexion
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleClientLogin}
                    className="w-full flex items-center justify-center px-6 py-4 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <User className="h-8 w-8 text-blue-500 mr-4" />
                    <div className="text-left">
                      <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                        Je suis un client
                      </div>
                      <div className="text-sm text-gray-500">
                        Je cherche un avocat
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={handleLawyerLogin}
                    className="w-full flex items-center justify-center px-6 py-4 border-2 border-orange-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
                  >
                    <Scale className="h-8 w-8 text-orange-500 mr-4" />
                    <div className="text-left">
                      <div className="text-lg font-semibold text-gray-900 group-hover:text-orange-600">
                        Je suis un avocat
                      </div>
                      <div className="text-sm text-gray-500">
                        J'ai un cabinet d'avocat
                      </div>
                    </div>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}