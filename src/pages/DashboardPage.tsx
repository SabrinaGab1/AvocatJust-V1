import React, { useState, useRef, useEffect } from 'react';
import { Scale, User, Calendar, Activity, Settings, HelpCircle, Key, LogOut, Bell, Search, ChevronDown, MapPin, Phone, Mail, Building, Briefcase, UserCircle, Upload, X, Camera, AlertCircle, FileText, Users, MessageSquare, Globe, Euro, Clock } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';
import AgendaPage from './AgendaPage';
import ActivitiesPage from './ActivitiesPage';
import MessagingPage from './MessagingPage';
import PublicProfilePage from './PublicProfilePage';
import PersonalProfilePage from './PersonalProfilePage';
import SettingsPage from './SettingsPage';
import HelpPage from './HelpPage';
import KeysPage from './KeysPage';
import { set } from 'date-fns';

export default function DashboardPage() {
  const [profilePhoto, setProfilePhoto] = useState("https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200");
  const [lawyerName, setLawyerName] = useState({ firstName: 'Marie', lastName: 'Dupont' });
  const [barreau, setBarreau] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    async function fetchLawyer() {
      const access_token = sessionStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/lawyer/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();

      setProfilePhoto(`http://localhost:8000${data.profile_picture}`);
      setLawyerName({
        firstName: data.name || '',
        lastName: data.lastname || ''
      });

      setBarreau(data.barreau || '');
    }
    fetchLawyer();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-full px-4 sm:px-6">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center">
                <Scale className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust</span>
              </Link>

              <div className="flex items-center">
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="bg-white pl-6 ml-6 flex items-center space-x-4 h-16 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Me {lawyerName.firstName} {lawyerName.lastName}</p>
                      <p className="text-gray-500">Avocat au Barreau de {barreau}</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100">
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-3" />
                            Mon profil
                          </div>
                        </Link>
                        <Link
                          to="/dashboard/public-profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-3" />
                            Profil public
                          </div>
                        </Link>
                        <Link
                          to="/dashboard/parametres"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-3" />
                            Paramètres
                          </div>
                        </Link>
                        <Link
                          to="/dashboard/aide"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <HelpCircle className="h-4 w-4 mr-3" />
                            Service client
                          </div>
                        </Link>
                      </div>

                      <div className="border-t border-gray-100">
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <LogOut className="h-4 w-4 mr-3" />
                            Déconnexion
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          <div className="w-64 bg-white min-h-[calc(100vh-4rem)] shadow-sm border-r">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <nav className="mt-2 px-4 space-y-1">
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <User className="h-5 w-5" />
                <span>Espace personnel</span>
              </Link>
              <Link
                to="/dashboard/public-profile"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Globe className="h-5 w-5" />
                <span>Profil public</span>
              </Link>
              <Link
                to="/dashboard/agenda"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Calendar className="h-5 w-5" />
                <span>Agenda</span>
              </Link>
              <Link
                to="/dashboard/cles"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Key className="h-5 w-5" />
                <span>Clés de chiffrement</span>
              </Link>
              <Link
                to="/dashboard/messagerie"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Messagerie</span>
              </Link>
              <Link
                to="/dashboard/activites"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Activity className="h-5 w-5" />
                <span>Activités</span>
              </Link>
              <Link
                to="/dashboard/parametres"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </Link>
              <Link
                to="/dashboard/aide"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Service client</span>
              </Link>
              
              <div className="pt-4 mt-4 border-t">
                <Link
                  to="/"
                  className="group relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 rounded-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/40 rounded-xl"></div>
                  <div className="relative flex items-center">
                    <LogOut className="h-5 w-5 text-orange-600 group-hover:text-red-600 transition-colors" />
                    <span className="ml-3 font-medium bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Déconnexion
                    </span>
                  </div>
                </Link>
              </div>
            </nav>
          </div>

          <div className="flex-1">
            <Routes>
              <Route index element={<PersonalProfilePage />} />
              <Route path="public-profile" element={<PublicProfilePage />} />
              <Route path="agenda" element={<AgendaPage />} />
              <Route path="cles" element={<KeysPage />} />
              <Route path="messagerie" element={<MessagingPage />} />
              <Route path="activites" element={<ActivitiesPage />} />
              <Route path="parametres" element={<SettingsPage />} />
              <Route path="aide" element={<HelpPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}