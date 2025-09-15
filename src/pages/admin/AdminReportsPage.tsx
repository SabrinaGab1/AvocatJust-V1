import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Euro, Calendar, Download, Filter } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';

export default function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = [
    {
      title: 'Revenus totaux',
      value: '€127,450',
      change: '+23.1%',
      period: 'ce mois'
    },
    {
      title: 'Nouveaux utilisateurs',
      value: '342',
      change: '+12.5%',
      period: 'ce mois'
    },
    {
      title: 'Consultations',
      value: '1,234',
      change: '+15.3%',
      period: 'ce mois'
    },
    {
      title: 'Taux de satisfaction',
      value: '4.8/5',
      change: '+0.2',
      period: 'moyenne'
    }
  ];

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Rapports et analyses</h1>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="quarter">Ce trimestre</option>
                <option value="year">Cette année</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-full">
                    <TrendingUp className="h-6 w-6 text-red-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-green-600">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-2">{stat.period}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Évolution des revenus</h2>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Graphique des revenus</p>
                </div>
              </div>
            </div>

            {/* User Growth */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Croissance des utilisateurs</h2>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Graphique des utilisateurs</p>
                </div>
              </div>
            </div>

            {/* Top Lawyers */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Top avocats</h2>
              <div className="space-y-4">
                {[
                  { name: 'Me Marie Dupont', consultations: 24, revenue: '€3,600' },
                  { name: 'Me Thomas Martin', consultations: 18, revenue: '€2,700' },
                  { name: 'Me Sophie Laurent', consultations: 15, revenue: '€2,250' }
                ].map((lawyer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{lawyer.name}</p>
                      <p className="text-sm text-gray-500">{lawyer.consultations} consultations</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{lawyer.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Activité récente</h2>
              <div className="space-y-4">
                {[
                  { action: 'Nouvelle inscription', user: 'Sophie Martin', time: '2 min' },
                  { action: 'Consultation terminée', user: 'Me Dupont', time: '15 min' },
                  { action: 'Paiement reçu', user: 'Pierre Dubois', time: '1h' },
                  { action: 'Nouvel avocat', user: 'Me Bernard', time: '2h' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-400">Il y a {activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}