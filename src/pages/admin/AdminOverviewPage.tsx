import React from 'react';
import { Users, Shield, Calendar, Euro, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';

const stats = [
  {
    id: 1,
    name: 'Utilisateurs totaux',
    value: '2,847',
    change: '+12.5%',
    changeType: 'increase',
    icon: Users
  },
  {
    id: 2,
    name: 'Avocats actifs',
    value: '342',
    change: '+8.2%',
    changeType: 'increase',
    icon: Shield
  },
  {
    id: 3,
    name: 'Consultations ce mois',
    value: '1,234',
    change: '+15.3%',
    changeType: 'increase',
    icon: Calendar
  },
  {
    id: 4,
    name: 'Chiffre d\'affaires',
    value: '€127,450',
    change: '+23.1%',
    changeType: 'increase',
    icon: Euro
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'user_registration',
    message: 'Nouvel utilisateur inscrit: Sophie Martin',
    time: '2 minutes',
    status: 'success'
  },
  {
    id: 2,
    type: 'lawyer_verification',
    message: 'Avocat en attente de vérification: Me Pierre Dubois',
    time: '15 minutes',
    status: 'pending'
  },
  {
    id: 3,
    type: 'consultation_completed',
    message: 'Consultation terminée: Me Marie Dupont - Client #1234',
    time: '1 heure',
    status: 'success'
  },
  {
    id: 4,
    type: 'payment_issue',
    message: 'Problème de paiement signalé: Consultation #5678',
    time: '2 heures',
    status: 'error'
  }
];

export default function AdminOverviewPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h1>
            <p className="mt-1 text-gray-500">Tableau de bord administrateur AvocaJust</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                      <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-full">
                      <Icon className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Activités récentes</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Actions rapides</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Users className="h-6 w-6 text-red-500 mb-2" />
                  <p className="font-medium text-gray-900">Gérer les utilisateurs</p>
                  <p className="text-sm text-gray-500">Voir tous les utilisateurs</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Shield className="h-6 w-6 text-red-500 mb-2" />
                  <p className="font-medium text-gray-900">Vérifier les avocats</p>
                  <p className="text-sm text-gray-500">Valider les inscriptions</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Calendar className="h-6 w-6 text-red-500 mb-2" />
                  <p className="font-medium text-gray-900">Consultations</p>
                  <p className="text-sm text-gray-500">Suivre les rendez-vous</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Euro className="h-6 w-6 text-red-500 mb-2" />
                  <p className="font-medium text-gray-900">Finances</p>
                  <p className="text-sm text-gray-500">Voir les rapports</p>
                </button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-yellow-800 ml-3">Alertes importantes</h3>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-yellow-700">• 5 avocats en attente de vérification</p>
              <p className="text-sm text-yellow-700">• 3 signalements utilisateurs à traiter</p>
              <p className="text-sm text-yellow-700">• Maintenance programmée ce weekend</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}