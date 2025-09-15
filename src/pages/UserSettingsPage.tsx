import React, { useState } from 'react';
import { Bell, Lock, CreditCard, User, Mail, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import { Switch } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';

export default function UserSettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    appointments: true,
    marketing: false
  });

  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@email.com',
    phone: '06 12 34 56 78',
    address: '123 rue de Paris, 75001 Paris'
  });

  const handleInfoChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Paramètres</h1>

          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Afficher mes informations</h3>
                    <p className="text-sm text-gray-500">Contrôlez la visibilité de vos données personnelles</p>
                  </div>
                  <button
                    onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                    className="flex items-center text-orange-500 hover:text-orange-600"
                  >
                    {showPersonalInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {showPersonalInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input
                        type="text"
                        value={userInfo.firstName}
                        onChange={(e) => handleInfoChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={userInfo.lastName}
                        onChange={(e) => handleInfoChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => handleInfoChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                      <input
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => handleInfoChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                      <input
                        type="text"
                        value={userInfo.address}
                        onChange={(e) => handleInfoChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                        Enregistrer les modifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="h-6 w-6 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Notifications par email</h3>
                    <p className="text-sm text-gray-500">Recevez des notifications par email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    className={`${
                      notifications.email ? 'bg-orange-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Notifications SMS</h3>
                    <p className="text-sm text-gray-500">Recevez des notifications par SMS</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    className={`${
                      notifications.sms ? 'bg-orange-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Rappels de rendez-vous</h3>
                    <p className="text-sm text-gray-500">Recevez des rappels avant vos consultations</p>
                  </div>
                  <Switch
                    checked={notifications.appointments}
                    onChange={(checked) => setNotifications({ ...notifications, appointments: checked })}
                    className={`${
                      notifications.appointments ? 'bg-orange-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notifications.appointments ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Communications marketing</h3>
                    <p className="text-sm text-gray-500">Recevez des actualités et offres</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                    className={`${
                      notifications.marketing ? 'bg-orange-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="h-6 w-6 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Sécurité</h2>
              </div>

              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Changer le mot de passe</h3>
                  <p className="text-sm text-gray-500 mt-1">Modifiez votre mot de passe de connexion</p>
                </button>

                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h3>
                  <p className="text-sm text-gray-500 mt-1">Ajoutez une couche de sécurité supplémentaire</p>
                </button>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-6 w-6 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Paiement</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-12 bg-gray-200 rounded"></div>
                      <span className="ml-3 text-sm text-gray-600">•••• •••• •••• 4242</span>
                    </div>
                    <button className="text-sm text-orange-500 hover:text-orange-600">
                      Modifier
                    </button>
                  </div>
                </div>

                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Ajouter une méthode de paiement</h3>
                  <p className="text-sm text-gray-500 mt-1">Ajoutez une nouvelle carte bancaire</p>
                </button>

                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Historique des paiements</h3>
                  <p className="text-sm text-gray-500 mt-1">Consultez vos factures et paiements</p>
                </button>
              </div>
            </div>

            {/* Account Management */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Gestion du compte</h2>

              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Exporter mes données</h3>
                  <p className="text-sm text-gray-500 mt-1">Téléchargez une copie de vos données</p>
                </button>

                <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                  <h3 className="text-sm font-medium">Supprimer mon compte</h3>
                  <p className="text-sm text-red-500 mt-1">Supprimez définitivement votre compte</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}