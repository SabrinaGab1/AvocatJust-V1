import React, { useState, useRef, useEffect } from 'react';
import { Scale, User, Users, FileText, Settings, HelpCircle, LogOut, Bell, Search, ChevronDown, BarChart3, Shield, AlertTriangle, CheckCircle, XCircle, Clock, Euro, Calendar, MessageSquare, Eye, Edit, Trash2, Plus, Filter } from 'lucide-react';
import { Link, Routes, Route } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';
import AdminUsersPage from './admin/AdminUsersPage';
import AdminLawyersPage from './admin/AdminLawyersPage';
import AdminConsultationsPage from './admin/AdminConsultationsPage';
import AdminReportsPage from './admin/AdminReportsPage';
import AdminSettingsPage from './admin/AdminSettingsPage';
import AdminOverviewPage from './admin/AdminOverviewPage';

export default function AdminDashboardPage() {
  const [profilePhoto] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200");
  const [adminName] = useState({ firstName: 'Admin', lastName: 'AvocaJust' });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b-2 border-red-500">
          <div className="max-w-full px-4 sm:px-6">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center">
                <Scale className="h-8 w-8 text-red-500" />
                <span className="ml-2 text-xl font-semibold text-gray-900">AvocaJust Admin</span>
              </Link>

              <div className="flex items-center">
                <div className="relative mr-4">
                  <Bell className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>

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
                      <p className="font-medium text-gray-900">{adminName.firstName} {adminName.lastName}</p>
                      <p className="text-gray-500">Administrateur</p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100">
                      <div className="py-1">
                        <Link
                          to="/admin-dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-3" />
                            Mon profil
                          </div>
                        </Link>
                        <Link
                          to="/admin-dashboard/parametres"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 mr-3" />
                            Paramètres
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
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <nav className="mt-2 px-4 space-y-1">
              <Link
                to="/admin-dashboard"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <BarChart3 className="h-5 w-5" />
                <span>Vue d'ensemble</span>
              </Link>
              <Link
                to="/admin-dashboard/utilisateurs"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Users className="h-5 w-5" />
                <span>Utilisateurs</span>
              </Link>
              <Link
                to="/admin-dashboard/avocats"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Shield className="h-5 w-5" />
                <span>Avocats</span>
              </Link>
              <Link
                to="/admin-dashboard/consultations"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Calendar className="h-5 w-5" />
                <span>Consultations</span>
              </Link>
              <Link
                to="/admin-dashboard/rapports"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <FileText className="h-5 w-5" />
                <span>Rapports</span>
              </Link>
              <Link
                to="/admin-dashboard/parametres"
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium"
              >
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </Link>
              
              <div className="pt-4 mt-4 border-t">
                <Link
                  to="/"
                  className="group relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 rounded-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-white/40 rounded-xl"></div>
                  <div className="relative flex items-center">
                    <LogOut className="h-5 w-5 text-red-600 group-hover:text-orange-600 transition-colors" />
                    <span className="ml-3 font-medium bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                      Déconnexion
                    </span>
                  </div>
                </Link>
              </div>
            </nav>
          </div>

          <div className="flex-1">
            <Routes>
              <Route index element={<AdminOverviewPage />} />
              <Route path="utilisateurs" element={<AdminUsersPage />} />
              <Route path="avocats" element={<AdminLawyersPage />} />
              <Route path="consultations" element={<AdminConsultationsPage />} />
              <Route path="rapports" element={<AdminReportsPage />} />
              <Route path="parametres" element={<AdminSettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}