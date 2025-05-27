import React, { useState } from 'react';
import { Bell, Moon, Sun, Globe, Lock, CreditCard, Shield, AlertCircle, Calendar, X } from 'lucide-react';
import { Switch, Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';

type SubscriptionStatus = 'active' | 'suspended' | 'cancelled';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    desktop: true,
    marketing: false
  });

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('active');
  const [suspensionEndDate, setSuspensionEndDate] = useState('');
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');

  const handleSuspendSubscription = () => {
    if (!suspensionEndDate) return;
    setSubscriptionStatus('suspended');
    setIsSuspendModalOpen(false);
  };

  const handleCancelSubscription = () => {
    setSubscriptionStatus('cancelled');
    setIsCancelModalOpen(false);
  };

  const handleResetPassword = () => {
    // Here you would typically call your password reset API
    console.log('Password reset requested for:', resetPasswordEmail);
    setIsResetPasswordModalOpen(false);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Paramètres</h1>

          <div className="space-y-6">
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
                    <h3 className="text-sm font-medium text-gray-900">Notifications bureau</h3>
                    <p className="text-sm text-gray-500">Recevez des notifications sur votre bureau</p>
                  </div>
                  <Switch
                    checked={notifications.desktop}
                    onChange={(checked) => setNotifications({ ...notifications, desktop: checked })}
                    className={`${
                      notifications.desktop ? 'bg-orange-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notifications.desktop ? 'translate-x-6' : 'translate-x-1'
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

            {/* Appearance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                {darkMode ? (
                  <Moon className="h-6 w-6 text-orange-500" />
                ) : (
                  <Sun className="h-6 w-6 text-orange-500" />
                )}
                <h2 className="text-lg font-semibold text-gray-900">Apparence</h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Mode sombre</h3>
                  <p className="text-sm text-gray-500">Activer le thème sombre</p>
                </div>
                <Switch
                  checked={darkMode}
                  onChange={setDarkMode}
                  className={`${
                    darkMode ? 'bg-orange-500' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </div>

            {/* Language */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-6 w-6 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Langue</h2>
              </div>

              <div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-6 w-6 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Sécurité</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h3>
                    <p className="text-sm text-gray-500">Ajouter une couche de sécurité supplémentaire</p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onChange={setTwoFactorEnabled}
                    className={`${
                      twoFactorEnabled ? 'bg-orange-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <button 
                  onClick={() => setIsResetPasswordModalOpen(true)}
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            </div>

            {/* Subscription */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="h-6 w-6 text-orange-500" />
                <h2 className="text-lg font-semibold text-gray-900">Abonnement</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Abonnement actuel</h3>
                    <p className="text-sm text-gray-500">Plan Premium - Sans engagement - 69€/mois</p>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' :
                        subscriptionStatus === 'suspended' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {subscriptionStatus === 'active' ? 'Actif' :
                         subscriptionStatus === 'suspended' ? 'Suspendu' :
                         'Résilié'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {subscriptionStatus === 'active' && (
                      <>
                        <button
                          onClick={() => setIsSuspendModalOpen(true)}
                          className="block w-full text-sm text-orange-500 hover:text-orange-600"
                        >
                          Suspendre
                        </button>
                        <button
                          onClick={() => setIsCancelModalOpen(true)}
                          className="block w-full text-sm text-red-500 hover:text-red-600"
                        >
                          Résilier
                        </button>
                      </>
                    )}
                    {subscriptionStatus === 'suspended' && (
                      <button
                        onClick={() => setSubscriptionStatus('active')}
                        className="block w-full text-sm text-green-500 hover:text-green-600"
                      >
                        Réactiver
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Méthode de paiement</h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-8 w-12 bg-gray-200 rounded"></div>
                      <span className="ml-3 text-sm text-gray-600">•••• •••• •••• 4242</span>
                    </div>
                    <button className="text-sm text-orange-500 hover:text-orange-600">
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">Zone de danger</h2>
              </div>

              <div className="space-y-4">
                <button className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                  Supprimer mon compte
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suspend Subscription Modal */}
        <Dialog
          open={isSuspendModalOpen}
          onClose={() => setIsSuspendModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Suspendre l'abonnement
                </Dialog.Title>
                <button
                  onClick={() => setIsSuspendModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date de reprise
                </label>
                <input
                  type="date"
                  value={suspensionEndDate}
                  onChange={(e) => setSuspensionEndDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsSuspendModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSuspendSubscription}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                >
                  Confirmer
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Cancel Subscription Modal */}
        <Dialog
          open={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Résilier l'abonnement
                </Dialog.Title>
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600">
                Êtes-vous sûr de vouloir résilier votre abonnement ? Cette action est irréversible.
              </p>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsCancelModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Résilier
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Reset Password Modal */}
        <Dialog
          open={isResetPasswordModalOpen}
          onClose={() => setIsResetPasswordModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Réinitialiser le mot de passe
                </Dialog.Title>
                <button
                  onClick={() => setIsResetPasswordModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Entrez votre adresse email pour recevoir un lien de réinitialisation.
              </p>

              <input
                type="email"
                value={resetPasswordEmail}
                onChange={(e) => setResetPasswordEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setIsResetPasswordModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleResetPassword}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                >
                  Envoyer
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}