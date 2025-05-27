import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight, X, Building2, Video, Phone, Filter, Clock, Camera, AlertCircle, FileText, Users, MessageSquare, Globe, Euro, Calendar, Plus, Upload, Mail, MapPin, RefreshCw } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { format, addDays, isWithinInterval, parseISO, setHours, setMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';
import AnimatedPage from '../components/AnimatedPage';

type ViewType = 'day' | 'week' | 'month';
type ConsultationType = 'cabinet' | 'visio' | 'telephone';
type AvailabilityType = 'available' | 'unavailable';
type MeetingType = 'client' | 'personal' | 'court' | 'mediation';

type Availability = {
  id: string;
  type: AvailabilityType;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  recurring: boolean;
  consultationType: ConsultationType;
  meetingType: MeetingType;
  duration: number;
  maxBookings?: number;
  breakTime?: number;
};

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
};

type Document = {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
};

type Appointment = {
  id: string;
  clientId: string;
  date: Date;
  time: string;
  duration: number;
  type: ConsultationType;
  notes?: string;
  documents: Document[];
};

type CalendarProvider = 'google' | 'outlook' | 'apple';

type ConnectedCalendar = {
  id: string;
  provider: CalendarProvider;
  name: string;
  email: string;
  lastSync?: Date;
  connected: boolean;
};

const daysInWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const hours = Array.from({ length: 24 }, (_, i) => i);

const consultationTypes: { type: ConsultationType; label: string; icon: typeof Building2 }[] = [
  { type: 'cabinet', label: 'Cabinet', icon: Building2 },
  { type: 'visio', label: 'Visioconférence', icon: Video },
  { type: 'telephone', label: 'Téléphone', icon: Phone }
];

const durations = [
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 heure' },
  { value: 90, label: '1 heure 30' },
  { value: 120, label: '2 heures' }
];

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>('week');
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [availabilityType, setAvailabilityType] = useState<AvailabilityType>('available');
  const [newAvailability, setNewAvailability] = useState<Availability>({
    id: Math.random().toString(36).substr(2, 9),
    type: 'available',
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    startTime: '09:00',
    endTime: '18:00',
    recurring: true,
    consultationType: 'cabinet',
    meetingType: 'client',
    duration: 60,
    maxBookings: 1,
    breakTime: 15
  });
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [appointmentDate, setAppointmentDate] = useState<Date>(new Date());
  const [appointmentTime, setAppointmentTime] = useState('09:00');
  const [appointmentType, setAppointmentType] = useState<ConsultationType>('cabinet');
  const [appointmentDuration, setAppointmentDuration] = useState(60);
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [appointmentDocuments, setAppointmentDocuments] = useState<Document[]>([]);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [selectedDayAppointments] = useState<Appointment[]>([
    {
      id: '1',
      clientId: '1',
      date: new Date(),
      time: '09:00',
      duration: 60,
      type: 'cabinet',
      notes: 'Consultation initiale',
      documents: []
    },
    {
      id: '2',
      clientId: '2',
      date: new Date(),
      time: '14:00',
      duration: 45,
      type: 'visio',
      notes: 'Suivi dossier',
      documents: []
    }
  ]);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [connectedCalendars, setConnectedCalendars] = useState<ConnectedCalendar[]>([
    {
      id: '1',
      provider: 'google',
      name: 'Gmail Professionnel',
      email: 'marie.dupont@gmail.com',
      lastSync: new Date(),
      connected: true
    }
  ]);

  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      phone: '06 12 34 56 78',
      address: '123 rue de Paris, 75001 Paris',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: '2',
      name: 'Pierre Dubois',
      email: 'pierre.dubois@email.com',
      phone: '06 23 45 67 89',
      address: '456 avenue des Champs-Élysées, 75008 Paris',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
    }
  ];

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    client.email.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const handleTimeSlotClick = (date: Date, hour: number) => {
    const selectedDateTime = setHours(date, hour);
    setAppointmentDate(selectedDateTime);
    setAppointmentTime(`${hour.toString().padStart(2, '0')}:00`);
    setIsNewAppointmentModalOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setAppointmentDate(date);
    setIsDayModalOpen(true);
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. La taille maximum est de 10MB.');
        return;
      }

      const newDoc: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date()
      };

      setAppointmentDocuments(prev => [...prev, newDoc]);
    });

    event.target.value = '';
  };

  const handleRemoveDocument = (docId: string) => {
    setAppointmentDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const handleCreateAppointment = () => {
    if (!selectedClient) return;

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      clientId: selectedClient.id,
      date: appointmentDate,
      time: appointmentTime,
      duration: appointmentDuration,
      type: appointmentType,
      notes: appointmentNotes,
      documents: appointmentDocuments
    };

    console.log('New appointment:', newAppointment);
    
    setIsNewAppointmentModalOpen(false);
    resetAppointmentForm();
  };

  const resetAppointmentForm = () => {
    setSelectedClient(null);
    setClientSearch('');
    setAppointmentDate(new Date());
    setAppointmentTime('09:00');
    setAppointmentType('cabinet');
    setAppointmentDuration(60);
    setAppointmentNotes('');
    setAppointmentDocuments([]);
  };

  const handleAvailabilityTypeChange = (type: AvailabilityType) => {
    setAvailabilityType(type);
    setNewAvailability(prev => ({
      ...prev,
      type,
      id: Math.random().toString(36).substr(2, 9)
    }));
  };

  const handleAddAvailability = () => {
    if (!validateAvailability()) return;
    
    setAvailabilities(prev => [...prev, newAvailability]);
    setNewAvailability({
      id: Math.random().toString(36).substr(2, 9),
      type: availabilityType,
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      startTime: '09:00',
      endTime: '18:00',
      recurring: true,
      consultationType: 'cabinet',
      meetingType: 'client',
      duration: 60,
      maxBookings: 1,
      breakTime: 15
    });
  };

  const validateAvailability = () => {
    const start = new Date(`1970-01-01T${newAvailability.startTime}`);
    const end = new Date(`1970-01-01T${newAvailability.endTime}`);
    return start < end && newAvailability.startDate <= newAvailability.endDate;
  };

  const removeAvailability = (id: string) => {
    setAvailabilities(prev => prev.filter(a => a.id !== id));
  };

  const getMonday = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const getDatesForView = () => {
    if (currentView === 'day') {
      return [currentDate];
    } else if (currentView === 'week') {
      const monday = getMonday(new Date(currentDate));
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        return date;
      });
    } else {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const days = [];
      
      const firstDayOfWeek = firstDay.getDay() || 7;
      for (let i = 1; i < firstDayOfWeek; i++) {
        const date = new Date(year, month, 1 - i);
        days.unshift(date);
      }
      
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(year, month, i));
      }
      
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
      
      return days;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long'
    }).format(date);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (currentView === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getAppointmentTypeIcon = (type: ConsultationType) => {
    switch (type) {
      case 'cabinet':
        return <Building2 className="h-5 w-5 text-gray-500" />;
      case 'visio':
        return <Video className="h-5 w-5 text-purple-500" />;
      case 'telephone':
        return <Phone className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleConnectCalendar = (provider: CalendarProvider) => {
    console.log('Connecting to', provider);
  };

  const handleDisconnectCalendar = (id: string) => {
    setConnectedCalendars(prev => 
      prev.map(cal => 
        cal.id === id ? { ...cal, connected: false } : cal
      )
    );
  };

  const handleSyncCalendar = (id: string) => {
    setConnectedCalendars(prev => 
      prev.map(cal => 
        cal.id === id ? { ...cal, lastSync: new Date() } : cal
      )
    );
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsAvailabilityModalOpen(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
              >
                <Clock className="h-5 w-5 mr-2" />
                Disponibilités
              </button>

              <button 
                onClick={() => setIsSyncModalOpen(true)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Synchroniser
              </button>

              <span className="text-lg font-semibold text-gray-900">
                {formatDate(currentDate)}
              </span>

              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleNavigate('prev')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm font-medium hover:bg-gray-100 rounded"
                >
                  Aujourd'hui
                </button>
                <button 
                  onClick={() => handleNavigate('next')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setCurrentView('day')}
                  className={`px-4 py-1 text-sm font-medium rounded ${
                    currentView === 'day'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Jour
                </button>
                <button
                  onClick={() => setCurrentView('week')}
                  className={`px-4 py-1 text-sm font-medium rounded ${
                    currentView === 'week'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Semaine
                </button>
                <button
                  onClick={() => setCurrentView('month')}
                  className={`px-4 py-1 text-sm font-medium rounded ${
                    currentView === 'month'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Mois
                </button>
              </div>

              <button 
                onClick={() => setIsNewAppointmentModalOpen(true)}
                className="ml-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nouveau rendez-vous
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {currentView !== 'month' && (
            <div className="w-20 border-r border-gray-200">
              <div className="h-12 border-b border-gray-200"></div>
              {Array.from({ length: 24 }, (_, hour) => (
                <div key={hour} className="h-12 border-b border-gray-200 text-right pr-2">
                  <span className="text-sm text-gray-500">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex-1">
            {currentView === 'month' ? (
              <div className="grid grid-cols-7 h-full">
                {daysInWeek.map((day, index) => (
                  <div 
                    key={day}
                    className="h-12 border-b border-gray-200 flex items-center justify-center"
                  >
                    <span className="text-sm font-medium text-gray-500">{day}</span>
                  </div>
                ))}

                {getDatesForView().map((date, index) => (
                  <div
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`border border-gray-200 min-h-[100px] p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                      date.getMonth() !== currentDate.getMonth()
                        ? 'bg-gray-50'
                        : ''
                    }`}
                  >
                    <span className={`text-sm font-medium ${
                      date.toDateString() === new Date().toDateString()
                        ? 'text-orange-500'
                        : date.getMonth() !== currentDate.getMonth()
                        ? 'text-gray-400'
                        : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 grid" style={{ gridTemplateColumns: currentView === 'day' ? '1fr' : 'repeat(7, 1fr)' }}>
                {getDatesForView().map((date, index) => (
                  <div key={index} className="h-12 border-b border-gray-200 flex flex-col items-center justify-center">
                    <div className="text-sm text-gray-500">{format(date, 'EEE', { locale: fr })}</div>
                    <div className={`text-sm font-semibold ${
                      date.toDateString() === new Date().toDateString() 
                        ? 'text-orange-500' 
                        : 'text-gray-900'
                    }`}>
                      {date.getDate()}
                    </div>
                  </div>
                ))}

                {Array.from({ length: 24 }, (_, hour) => (
                  <React.Fragment key={hour}>
                    {Array.from({ length: currentView === 'day' ? 1 : 7 }, (_, dayIndex) => {
                      const currentDate = getDatesForView()[dayIndex];
                      return (
                        <div 
                          key={`${hour}-${dayIndex}`}
                          className="h-12 border-b border-r border-gray-200 relative group cursor-pointer"
                          onClick={() => handleTimeSlotClick(currentDate, hour)}
                        >
                          <div className="absolute inset-0 group-hover:bg-orange-50 transition-colors"></div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Availability Modal */}
        <Dialog
          open={isAvailabilityModalOpen}
          onClose={() => setIsAvailabilityModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
              <div className="border-b border-gray-200">
                <div className="flex items-center justify-between p-6">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Gérer les disponibilités
                  </Dialog.Title>
                  <button
                    onClick={() => setIsAvailabilityModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="flex rounded-lg border border-gray-200 p-1">
                    <button
                      onClick={() => handleAvailabilityTypeChange('available')}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded ${
                        availabilityType === 'available'
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Disponibilités
                    </button>
                    <button
                      onClick={() => handleAvailabilityTypeChange('unavailable')}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded ${
                        availabilityType === 'unavailable'
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Indisponibilités
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date de début
                      </label>
                      <input
                        type="date"
                        value={format(newAvailability.startDate, 'yyyy-MM-dd')}
                        onChange={(e) => setNewAvailability({
                          ...newAvailability,
                          startDate: parseISO(e.target.value)
                        })}
                        className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date de fin
                      </label>
                      <input
                        type="date"
                        value={format(newAvailability.endDate, 'yyyy-MM-dd')}
                        onChange={(e) => setNewAvailability({
                          ...newAvailability,
                          endDate: parseISO(e.target.value)
                        })}
                        className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type de réunion
                    </label>
                    <select
                      value={newAvailability.meetingType}
                      onChange={(e) => setNewAvailability({
                        ...newAvailability,
                        meetingType: e.target.value as MeetingType
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                      <option value="client">Rendez-vous client</option>
                      <option value="personal">Rendez-vous personnel</option>
                      <option value="court">Audience tribunal</option>
                      <option value="mediation">Médiation</option>
                    </select>
                  </div>

                  {availabilityType === 'available' && (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Type de consultation</label>
                          <select
                            value={newAvailability.consultationType}
                            onChange={(e) => setNewAvailability({
                              ...newAvailability,
                              consultationType: e.target.value as ConsultationType
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          >
                            <option value="cabinet">Cabinet</option>
                            <option value="visio">Visioconférence</option>
                            <option value="telephone">Téléphone</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Durée de consultation</label>
                          <select
                            value={newAvailability.duration}
                            onChange={(e) => setNewAvailability({
                              ...newAvailability,
                              duration: parseInt(e.target.value)
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          >
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 heure</option>
                            <option value="90">1 heure 30</option>
                            <option value="120">2 heures</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Début</label>
                          <input
                            type="time"
                            value={newAvailability.startTime}
                            onChange={(e) => setNewAvailability({
                              ...newAvailability,
                              startTime: e.target.value
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Fin</label>
                          <input
                            type="time"
                            value={newAvailability.endTime}
                            onChange={(e) => setNewAvailability({
                              ...newAvailability,
                              endTime: e.target.value
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Pause entre rendez-vous
                        </label>
                        <select
                          value={newAvailability.breakTime}
                          onChange={(e) => setNewAvailability({
                            ...newAvailability,
                            breakTime: parseInt(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        >
                          <option value={0}>Pas de pause</option>
                          <option value={5}>5 minutes</option>
                          <option value={10}>10 minutes</option>
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Rendez-vous simultanés maximum
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={newAvailability.maxBookings}
                          onChange={(e) => setNewAvailability({
                            ...newAvailability,
                            maxBookings: parseInt(e.target.value)
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={newAvailability.recurring}
                      onChange={(e) => setNewAvailability({
                        ...newAvailability,
                        recurring: e.target.checked
                      })}
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
                      Récurrent chaque semaine
                    </label>
                  </div>

                  {!validateAvailability() && (
                    <div className="flex items-center text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Les dates et heures sélectionnées ne sont pas valides
                    </div>
                  )}

                  {availabilities.length > 0 && (
                    <div className="border-t pt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">
                        {availabilityType === 'available' ? 'Disponibilités actuelles' : 'Indisponibilités actuelles'}
                      </h4>
                      <div className="space-y-3">
                        {availabilities
                          .filter(a => a.type === availabilityType)
                          .map((availability) => (
                            <div
                              key={availability.id}
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                availability.type === 'available' ? 'bg-green-50' : 'bg-red-50'
                              }`}
                            >
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {format(availability.startDate, 'dd/MM/yyyy')} - {format(availability.endDate, 'dd/MM/yyyy')}
                                </p>
                                {availability.type === 'available' && (
                                  <p className="text-sm text-gray-500">
                                    {availability.startTime} - {availability.endTime}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => removeAvailability(availability.id)}
                                className="p-1 text-gray-400 hover:text-gray-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAvailabilityModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={handleAddAvailability}
                    disabled={!validateAvailability()}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* New Appointment Modal */}
        <Dialog
          open={isNewAppointmentModalOpen}
          onClose={() => setIsNewAppointmentModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
              <div className="border-b border-gray-200">
                <div className="flex items-center justify-between p-6">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Nouveau rendez-vous
                  </Dialog.Title>
                  <button
                    onClick={() => setIsNewAppointmentModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Client
                    </label>
                    {!selectedClient ? (
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Rechercher un client..."
                            value={clientSearch}
                            onChange={(e) => setClientSearch(e.target.value)}
                            className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          {filteredClients.map(client => (
                            <button
                              key={client.id}
                              onClick={() => setSelectedClient(client)}
                              className="w-full flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              <img
                                src={client.photo}
                                alt={client.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="ml-3 text-left">
                                <div className="font-medium text-gray-900">{client.name}</div>
                                <div className="text-sm text-gray-500">{client.email}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start">
                          <img
                            src={selectedClient.photo}
                            alt={selectedClient.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{selectedClient.name}</div>
                            <div className="mt-1 space-y-1 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                {selectedClient.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {selectedClient.phone}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {selectedClient.address}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedClient(null)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={appointmentDate.toISOString().split('T')[0]}
                        onChange={(e) => setAppointmentDate(new Date(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Heure
                      </label>
                      <input
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type de consultation
                      </label>
                      <select
                        value={appointmentType}
                        onChange={(e) => setAppointmentType(e.target.value as ConsultationType)}
                        className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {consultationTypes.map(type => (
                          <option key={type.type} value={type.type}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Durée
                      </label>
                      <select
                        value={appointmentDuration}
                        onChange={(e) => setAppointmentDuration(parseInt(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {durations.map(duration => (
                          <option key={duration.value} value={duration.value}>
                            {duration.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={appointmentNotes}
                      onChange={(e) => setAppointmentNotes(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ajoutez des notes concernant le rendez-vous..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Documents
                    </label>
                    <div className="space-y-3">
                      {appointmentDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                              <p className="text-xs text-gray-500">
                                {(doc.size / 1024 / 1024).toFixed(2)} MB • {new Date(doc.uploadDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveDocument(doc.id)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="document-upload"
                          className="w-full flex flex-col items-center justify-center px-4 py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <Upload className="h-8 w-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Cliquez pour ajouter des documents
                          </p>
                          <p className="text-xs text-gray-400">
                            PDF, Word, Images jusqu'à 10MB
                          </p>
                          <input
                            id="document-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            onChange={handleDocumentUpload}
                            multiple
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsNewAppointmentModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreateAppointment}
                    disabled={!selectedClient}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Créer le rendez-vous
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Day Appointments Modal */}
        <Dialog
          open={isDayModalOpen}
          onClose={() => setIsDayModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
              <div className="border-b border-gray-200">
                <div className="flex items-center justify-between p-6">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Rendez-vous du {format(appointmentDate, 'dd MMMM yyyy', { locale: fr })}
                  </Dialog.Title>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setIsDayModalOpen(false);
                        setIsNewAppointmentModalOpen(true);
                      }}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau RDV
                    </button>
                    <button
                      onClick={() => setIsDayModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {selectedDayAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Aucun rendez-vous prévu pour cette journée</p>
                      <button
                        onClick={() => {
                          setIsDayModalOpen(false);
                          setIsNewAppointmentModalOpen(true);
                        }}
                        className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
                      >
                        Ajouter un rendez-vous
                      </button>
                    </div>
                  ) : (
                    selectedDayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          {getAppointmentTypeIcon(appointment.type)}
                          <div>
                            <p className="font-medium text-gray-900">
                              {appointment.time} - {mockClients.find(c => c.id === appointment.clientId)?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.duration} minutes • {appointment.type === 'cabinet' ? 'Cabinet' : appointment.type === 'visio' ? 'Visioconférence' : 'Téléphone'}
                            </p>
                            {appointment.notes && (
                              <p className="text-sm text-gray-500 mt-1">
                                {appointment.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {/* Handle edit */}}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-colors"
                          >
                            <FileText className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {/* Handle delete */}}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Calendar Sync Modal */}
        <Dialog
          open={isSyncModalOpen}
          onClose={() => setIsSyncModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
              <div className="border-b border-gray-200">
                <div className="flex items-center justify-between p-6">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Synchronisation des calendriers
                  </Dialog.Title>
                  <button
                    onClick={() => setIsSyncModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Calendriers connectés</h3>
                  <div className="space-y-4">
                    {connectedCalendars.map((calendar) => (
                      <div key={calendar.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{calendar.name}</p>
                          <p className="text-sm text-gray-500">{calendar.email}</p>
                          {calendar.lastSync && (
                            <p className="text-xs text-gray-400 mt-1">
                              Dernière synchronisation : {format(calendar.lastSync, 'dd/MM/yyyy HH:mm')}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {calendar.connected && (
                            <button
                              onClick={() => handleSyncCalendar(calendar.id)}
                              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                            >
                              <RefreshCw className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDisconnectCalendar(calendar.id)}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Ajouter un calendrier</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleConnectCalendar('google')}
                      className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <img 
                        src="https://www.gstatic.com/images/branding/product/1x/calendar_48dp.png"
                        alt="Google Calendar"
                        className="w-6 h-6 mr-2"
                      />
                      <span className="font-medium">Google Calendar</span>
                    </button>
                    <button
                      onClick={() => handleConnectCalendar('outlook')}
                      className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <img 
                        src="https://img.icons8.com/color/48/000000/microsoft-outlook-2019--v2.png"
                        alt="Outlook"
                        className="w-6 h-6 mr-2"
                      />
                      <span className="font-medium">Outlook</span>
                    </button>
                    <button
                      onClick={() => handleConnectCalendar('apple')}
                      className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <img 
                        src="https://img.icons8.com/ios-filled/50/000000/mac-os.png"
                        alt="Apple Calendar"
                        className="w-6 h-6 mr-2"
                      />
                      <span className="font-medium">Apple Calendar</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-orange-800">Synchronisation bidirectionnelle</h4>
                      <p className="mt-1 text-sm text-orange-700">
                        Les événements seront synchronisés dans les deux sens. Les modifications apportées dans l'un ou l'autre des calendriers seront reflétées automatiquement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}