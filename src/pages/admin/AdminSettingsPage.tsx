import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Mail, Globe, CreditCard, Users } from 'lucide-react';
import { Switch } from '@headlessui/react';
import AnimatedPage from '../../components/AnimatedPage';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    newRegistrations: true,
    autoApproval: false,
    backupEnabled: true,
    analyticsEnabled: true
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Paramètres système</h1>

          <div className="space-y-6">
            {/* General Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Settings className="h-6 w-6 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">Paramètres généraux</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Mode maintenance</h3>
                    <p className="text-sm text-gray-500">Activer le mode maintenance pour la plateforme</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                    className={`${
                      settings.maintenanceMode ? 'bg-red-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Nouvelles inscriptions</h3>
                    <p className="text-sm text-gray-500">Autoriser les nouvelles inscriptions</p>
                  </div>
                  <Switch
                    checked={settings.newRegistrations}
                    onChange={(checked) => handleSettingChange('newRegistrations', checked)}
                    className={`${
                      settings.newRegistrations ? 'bg-red-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.newRegistrations ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Approbation automatique</h3>
                    <p className="text-sm text-gray-500">Approuver automatiquement les nouveaux avocats</p>
                  </div>
                  <Switch
                    checked={settings.autoApproval}
                    onChange={(checked) => handleSettingChange('autoApproval', checked)}
                    className={`${
                      settings.autoApproval ? 'bg-red-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.autoApproval ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="h-6 w-6 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Notifications email</h3>
                    <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    className={`${
                      settings.emailNotifications ? 'bg-red-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Notifications SMS</h3>
                    <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onChange={(checked) => handleSettingChange('smsNotifications', checked)}
                    className={`${
                      settings.smsNotifications ? 'bg-red-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-6 w-6 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">Sécurité</h2>
              </div>

              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Changer le mot de passe admin</h3>
                  <p className="text-sm text-gray-500 mt-1">Modifier le mot de passe administrateur</p>
                </button>

                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Logs de sécurité</h3>
                  <p className="text-sm text-gray-500 mt-1">Consulter les logs de connexion</p>
                </button>

                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h3>
                  <p className="text-sm text-gray-500 mt-1">Configurer la 2FA pour les admins</p>
                </button>
              </div>
            </div>

            {/* Database */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Database className="h-6 w-6 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">Base de données</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Sauvegardes automatiques</h3>
                    <p className="text-sm text-gray-500">Effectuer des sauvegardes quotidiennes</p>
                  </div>
                  <Switch
                    checked={settings.backupEnabled}
                    onChange={(checked) => handleSettingChange('backupEnabled', checked)}
                    className={`${
                      settings.backupEnabled ? 'bg-red-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.backupEnabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Créer une sauvegarde</h3>
                  <p className="text-sm text-gray-500 mt-1">Effectuer une sauvegarde manuelle</p>
                </button>

                <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="text-sm font-medium text-gray-900">Optimiser la base</h3>
                  <p className="text-sm text-gray-500 mt-1">Optimiser les performances</p>
                </button>
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="h-6 w-6 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">Analytics</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Collecte de données</h3>
                    <p className="text-sm text-gray-500">Activer la collecte de données analytiques</p>
                  </div>
                  <Switch
                    checked={settings.analyticsEnabled}
                    onChange={(checked) => handleSettingChange('analyticsEnabled', checked)}
                    className={`${
                      settings.analyticsEnabled ? 'bg-red-500' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        settings.analyticsEnabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}