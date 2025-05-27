import React from 'react';
import { CreditCard, Clock } from 'lucide-react';

type SubscriptionStepProps = {
  onNext: (data: { subscription: 'engagement' | 'sans-engagement' }) => void;
};

export default function SubscriptionStep({ onNext }: SubscriptionStepProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => onNext({ subscription: 'engagement' })}
          className="relative rounded-2xl border-2 border-orange-200 p-6 cursor-pointer hover:border-orange-500 transition-colors group"
        >
          <div className="absolute -top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
            Recommandé
          </div>
          <div className="flex items-center mb-4">
            <CreditCard className="h-8 w-8 text-orange-500" />
            <h3 className="text-xl font-semibold ml-3">Avec engagement</h3>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Tarif préférentiel
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Visibilité prioritaire
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Support dédié
            </li>
          </ul>
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold text-gray-900">49€ <span className="text-sm font-normal text-gray-500">/mois</span></div>
            <div className="text-sm text-gray-500">Engagement 12 mois</div>
          </div>
        </div>

        <div
          onClick={() => onNext({ subscription: 'sans-engagement' })}
          className="rounded-2xl border-2 border-gray-200 p-6 cursor-pointer hover:border-orange-500 transition-colors"
        >
          <div className="flex items-center mb-4">
            <Clock className="h-8 w-8 text-gray-500" />
            <h3 className="text-xl font-semibold ml-3">Sans engagement</h3>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Flexibilité maximale
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Accès standard
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Support par email
            </li>
          </ul>
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold text-gray-900">69€ <span className="text-sm font-normal text-gray-500">/mois</span></div>
            <div className="text-sm text-gray-500">Sans engagement</div>
          </div>
        </div>
      </div>
    </div>
  );
}