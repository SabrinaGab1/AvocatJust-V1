import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Phone, Video, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

type ConsultationType = 'cabinet' | 'visio' | 'telephone';

type TimeSlot = {
  time: string;
  available: boolean;
};

type DaySchedule = {
  date: Date;
  slots: TimeSlot[];
};

const consultationDetails = {
  cabinet: {
    icon: Building2,
    title: 'Consultation au cabinet',
    duration: 60,
    price: 150,
    description: 'Rendez-vous en personne dans le cabinet de l\'avocat'
  },
  visio: {
    icon: Video,
    title: 'Consultation en visioconférence',
    duration: 60,
    price: 120,
    description: 'Consultation par vidéo sécurisée depuis chez vous'
  },
  telephone: {
    icon: Phone,
    title: 'Consultation téléphonique',
    duration: 30,
    price: 100,
    description: 'Appel téléphonique pour un conseil rapide'
  }
};

// Mock data for lawyer schedule
const generateSchedule = (startDate: Date, days: number): DaySchedule[] => {
  const schedule: DaySchedule[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    }
    
    const slots: TimeSlot[] = [];
    const morningSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
    const afternoonSlots = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
    
    [...morningSlots, ...afternoonSlots].forEach(time => {
      // Randomly make some slots unavailable for demo
      const available = Math.random() > 0.3;
      slots.push({ time, available });
    });
    
    schedule.push({ date, slots });
  }
  
  return schedule;
};

export default function LawyerBookingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const consultationType = searchParams.get('type') as ConsultationType;
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);

  useEffect(() => {
    // Generate schedule starting from today
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + (currentWeek * 7));
    
    const weekSchedule = generateSchedule(weekStart, 14); // 2 weeks
    setSchedule(weekSchedule);
  }, [currentWeek]);

  const consultation = consultationDetails[consultationType];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const formatDateShort = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      const params = new URLSearchParams({
        type: consultationType,
        date: selectedDate.toISOString(),
        time: selectedTime
      });
      navigate(`/avocat/${id}/formulaire?${params.toString()}`);
    }
  };

  const getWeekDays = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + (currentWeek * 7));
    
    return schedule.slice(0, 7);
  };

  const selectedDaySchedule = selectedDate 
    ? schedule.find(day => isSameDay(day.date, selectedDate))
    : null;

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour au profil
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Consultation Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <consultation.icon className="h-6 w-6 text-orange-500" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-gray-900">{consultation.title}</h1>
                <p className="text-gray-600">{consultation.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{consultation.price}€</div>
                <div className="text-sm text-gray-500">{consultation.duration} minutes</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Choisir une date</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                    disabled={currentWeek === 0}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentWeek(currentWeek + 1)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {getWeekDays().map((day, index) => {
                  const isSelected = selectedDate && isSameDay(day.date, selectedDate);
                  const hasAvailableSlots = day.slots.some(slot => slot.available);
                  const isPast = day.date < new Date() && !isSameDay(day.date, new Date());
                  
                  return (
                    <button
                      key={index}
                      onClick={() => hasAvailableSlots && !isPast ? handleDateSelect(day.date) : null}
                      disabled={!hasAvailableSlots || isPast}
                      className={`p-4 rounded-lg text-left transition-colors ${
                        isSelected
                          ? 'bg-orange-500 text-white'
                          : hasAvailableSlots && !isPast
                          ? 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="font-medium">{formatDate(day.date)}</div>
                      <div className="text-sm mt-1">
                        {isPast 
                          ? 'Passé'
                          : hasAvailableSlots 
                          ? `${day.slots.filter(slot => slot.available).length} créneaux disponibles`
                          : 'Aucun créneau disponible'
                        }
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {selectedDate ? `Créneaux pour le ${formatDateShort(selectedDate)}` : 'Choisir un horaire'}
              </h2>

              {!selectedDate ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Sélectionnez d'abord une date</p>
                </div>
              ) : selectedDaySchedule ? (
                <div className="space-y-6">
                  {/* Morning slots */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Matin</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedDaySchedule.slots
                        .filter(slot => parseInt(slot.time.split(':')[0]) < 12)
                        .map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => slot.available ? handleTimeSelect(slot.time) : null}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                              selectedTime === slot.time
                                ? 'bg-orange-500 text-white'
                                : slot.available
                                ? 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Afternoon slots */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Après-midi</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedDaySchedule.slots
                        .filter(slot => parseInt(slot.time.split(':')[0]) >= 12)
                        .map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => slot.available ? handleTimeSelect(slot.time) : null}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                              selectedTime === slot.time
                                ? 'bg-orange-500 text-white'
                                : slot.available
                                ? 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun créneau disponible pour cette date</p>
                </div>
              )}
            </div>
          </div>

          {/* Summary and Continue */}
          {selectedDate && selectedTime && (
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h3>
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{consultation.title}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatDate(selectedDate)} à {selectedTime}
                    </div>
                    <div className="text-sm text-gray-600">
                      Durée : {consultation.duration} minutes
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{consultation.price}€</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleContinue}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Continuer vers le formulaire
              </button>
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}