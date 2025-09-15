import React from 'react';
import { CheckCircle2, CalendarFold } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type RdvStepProps = {
  onBack: () => void;
};

export default function RdvStep({ onBack }: RdvStepProps) {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <CalendarFold className="h-16 w-16 text-orange-500" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        Merci de prendre rendez-vous avec Me Sabrina GABTENI afin de vérifier votre identité.
      </h3>
      <p className="text-gray-600 mb-8">
        <br />
          <a
						href="https://tidycal.com/sabrinagabteni/entretienavocajust"
						className="text-orange-600 hover:underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						Cliquez sur ce lien pour choisir un créneau.
					</a>
      </p>

      <div className="mt-8 space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Retour
        </button>
      </div>
    </div>
  );
}