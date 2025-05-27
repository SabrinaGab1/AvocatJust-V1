import React from 'react';
import { CheckCircle2, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ValidationStepProps = {
  onBack: () => void;
};

export default function ValidationStep({ onBack }: ValidationStepProps) {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <Mail className="h-16 w-16 text-orange-500" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Vérifiez votre boîte mail
      </h3>
      <p className="text-gray-600 mb-8">
        Nous vous avons envoyé un email de confirmation.
        <br />
        Cliquez sur le lien dans l'email pour valider votre compte.
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Email de confirmation envoyé</span>
        </div>
      </div>

      <div className="mt-8 space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Retour
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
        >
          Retourner à l'accueil
        </button>
      </div>
    </div>
  );
}