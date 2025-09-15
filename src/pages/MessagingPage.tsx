import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Phone, Video, Paperclip, Send, MoreVertical, Image as ImageIcon, File, MapPin, X, Mic, AlertCircle, Archive, Ban, Flag, Trash2, Download } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import AnimatedPage from '../components/AnimatedPage';

type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    photo: string;
    isLawyer?: boolean;
  };
  timestamp: Date;
  attachments?: {
    type: 'image' | 'file' | 'location' | 'voice';
    url?: string;
    name?: string;
    preview?: string;
    duration?: number; // For voice messages
  }[];
  status?: 'sent' | 'delivered' | 'read';
  systemMessage?: boolean;
};

type Conversation = {
  id: string;
  participants: {
    id: string;
    name: string;
    photo: string;
    isLawyer?: boolean;
    lastSeen?: Date;
  }[];
  lastMessage?: {
    content: string;
    timestamp: Date;
    unread?: boolean;
  };
  appointmentDate?: Date;
  idVerified?: boolean;
  paymentStatus?: 'pending' | 'completed';
  appointmentType?: 'cabinet' | 'visio' | 'telephone';
};

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [{
      id: '2',
      name: 'Sophie Martin',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
      isLawyer: false
    }],
    lastMessage: {
      content: 'Je vous envoie les documents demandés',
      timestamp: new Date(2024, 2, 20, 14, 30),
      unread: true
    },
    appointmentDate: new Date(2024, 3, 1, 14, 0),
    idVerified: true,
    paymentStatus: 'completed',
    appointmentType: 'visio'
  },
  {
    id: '2',
    participants: [{
      id: '3',
      name: 'Pierre Dubois',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      isLawyer: false
    }],
    lastMessage: {
      content: 'Merci pour votre réponse',
      timestamp: new Date(2024, 2, 20, 11, 45)
    },
    appointmentDate: new Date(2024, 3, 5, 10, 0),
    idVerified: false,
    paymentStatus: 'pending',
    appointmentType: 'cabinet'
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Bonjour Maître, j\'aurais besoin de vos conseils concernant mon dossier.',
    sender: {
      id: '2',
      name: 'Sophie Martin',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
    },
    timestamp: new Date(2024, 2, 20, 14, 0),
    status: 'read'
  },
  {
    id: '2',
    content: 'Bien sûr, je suis à votre disposition. Pouvez-vous me préciser la nature de votre question ?',
    sender: {
      id: '1',
      name: 'Marie Dupont',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
      isLawyer: true
    },
    timestamp: new Date(2024, 2, 20, 14, 5),
    status: 'read'
  },
  {
    id: 'system-1',
    content: 'Votre rendez-vous est confirmé et payé. Merci de bien vouloir télécharger votre pièce d\'identité avant le rendez-vous.',
    sender: {
      id: 'system',
      name: 'Système',
      photo: ''
    },
    timestamp: new Date(2024, 2, 20, 14, 10),
    systemMessage: true
  },
  {
    id: '3',
    content: 'Je vous envoie ma carte d\'identité.',
    sender: {
      id: '2',
      name: 'Sophie Martin',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
    },
    timestamp: new Date(2024, 2, 20, 14, 15),
    attachments: [
      {
        type: 'file',
        name: 'CNI.pdf',
        url: '#'
      }
    ],
    status: 'read'
  },
  {
    id: '4',
    content: 'Voici votre note d\'honoraires pour la consultation.',
    sender: {
      id: '1',
      name: 'Marie Dupont',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
      isLawyer: true
    },
    timestamp: new Date(2024, 2, 20, 15, 30),
    attachments: [
      {
        type: 'file',
        name: 'Note_Honoraires.pdf',
        url: '#'
      }
    ],
    status: 'delivered'
  },
  {
    id: '5',
    content: '',
    sender: {
      id: '1',
      name: 'Marie Dupont',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
      isLawyer: true
    },
    timestamp: new Date(2024, 2, 20, 15, 45),
    attachments: [
      {
        type: 'voice',
        url: '#',
        duration: 45
      }
    ],
    status: 'sent'
  }
];

export default function MessagingPage() {
  const [isLocked, setIsLocked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callType, setCallType] = useState<'audio' | 'video' | null>(null);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  const recordingInterval = useRef<NodeJS.Timeout>();

  const access_token = sessionStorage.getItem("access_token");
  useEffect(() => {
    async function verifyKeys() {
      const response = await fetch("http://localhost:8000/lawyer/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      const publicKey = data.public_key;
      const privateKey = localStorage.getItem("private_key");
      if (!publicKey || !privateKey) {
        setIsLocked(true);
      }
    }
    verifyKeys();

    if (isRecording) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) {
        setShowOptionsMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatLastSeen = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleStartCall = (type: 'audio' | 'video') => {
    setCallType(type);
    setIsCallModalOpen(true);
  };

  const handleFileUpload = (type: 'id' | 'invoice') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log(`Uploading ${type}:`, file);
      }
    };
    input.click();
  };

  const handleArchiveConversation = () => {
    console.log('Archiving conversation');
    setShowOptionsMenu(false);
  };

  const handleBlockUser = () => {
    console.log('Blocking user');
    setShowOptionsMenu(false);
  };

  const handleReport = () => {
    console.log('Reporting conversation');
    setShowOptionsMenu(false);
  };

  const handleDeleteConversation = () => {
    console.log('Deleting conversation');
    setShowOptionsMenu(false);
  };

  const handleExportChat = () => {
    console.log('Exporting chat history');
    setShowOptionsMenu(false);
  };

  if (isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-orange-500">
            {/* You can use a lock icon here */}
            <AlertCircle className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Accès verrouillé</h2>
          <p className="text-gray-600 mb-4">
            Veuillez configurer vos clés publiques et privées pour accéder à la messagerie.
          </p>
          {/* Optionally, add a button to redirect to the setup page */}
          <button
            onClick={() => window.location.href = '/dashboard/cles'}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg"
          >
            Configurer mes clés
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Conversations List */}
          <div className="w-80 bg-white border-r border-gray-200">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-full pb-4">
              {mockConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-orange-50' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conversation.participants[0].photo}
                      alt={conversation.participants[0].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.participants[0].name}
                      </h3>
                      {conversation.lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    {conversation.lastMessage && (
                      <p className="mt-1 text-sm text-gray-600 truncate">
                        {conversation.lastMessage.content}
                      </p>
                    )}
                    {conversation.appointmentDate && (
                      <div className="mt-1 flex items-center">
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                          RDV le {formatTime(conversation.appointmentDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col bg-white">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={selectedConversation.participants[0].photo}
                        alt={selectedConversation.participants[0].name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-gray-900">
                        {selectedConversation.participants[0].name}
                      </h2>
                      <div className="flex items-center space-x-2">
                        {selectedConversation.appointmentType && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {selectedConversation.appointmentType === 'cabinet' ? 'Cabinet' :
                             selectedConversation.appointmentType === 'visio' ? 'Visioconférence' : 'Téléphone'}
                          </span>
                        )}
                        {selectedConversation.idVerified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            ID Vérifié
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleStartCall('audio')}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleStartCall('video')}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <Video className="h-5 w-5" />
                    </button>
                    <div className="relative" ref={optionsMenuRef}>
                      <button
                        onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {showOptionsMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                          <button
                            onClick={handleArchiveConversation}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                          >
                            <Archive className="h-4 w-4 mr-2" />
                            <span>Archiver</span>
                          </button>
                          <button
                            onClick={handleBlockUser}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            <span>Bloquer</span>
                          </button>
                          <button
                            onClick={handleReport}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                          >
                            <Flag className="h-4 w-4 mr-2" />
                            <span>Signaler</span>
                          </button>
                          <button
                            onClick={handleExportChat}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            <span>Exporter la conversation</span>
                          </button>
                          <button
                            onClick={handleDeleteConversation}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender.isLawyer ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.systemMessage ? (
                      <div className="w-full bg-orange-50 p-3 rounded-lg text-center text-sm text-orange-800">
                        {message.content}
                      </div>
                    ) : (
                      <div className={`flex ${message.sender.isLawyer ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                        {!message.sender.isLawyer && (
                          <img
                            src={message.sender.photo}
                            alt={message.sender.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div
                          className={`max-w-lg ${
                            message.sender.isLawyer
                              ? 'bg-orange-500 text-white rounded-l-lg rounded-tr-lg'
                              : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
                          } p-3 space-y-1`}
                        >
                          {message.content && <p className="text-sm">{message.content}</p>}
                          {message.attachments && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div key={index} className="rounded-lg overflow-hidden">
                                  {attachment.type === 'image' && (
                                    <img
                                      src={attachment.preview}
                                      alt="Attachment"
                                      className="w-full h-32 object-cover rounded-lg"
                                    />
                                  )}
                                  {attachment.type === 'file' && (
                                    <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
                                      <File className="h-5 w-5" />
                                      <span className="text-sm">{attachment.name}</span>
                                    </div>
                                  )}
                                  {attachment.type === 'location' && (
                                    <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
                                      <MapPin className="h-5 w-5" />
                                      <span className="text-sm">Localisation partagée</span>
                                    </div>
                                  )}
                                  {attachment.type === 'voice' && (
                                    <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg">
                                      <Mic className="h-5 w-5" />
                                      <span className="text-sm">Message vocal ({attachment.duration}s)</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className={`text-xs ${message.sender.isLawyer ? 'text-white/80' : 'text-gray-500'}`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <Paperclip className="h-5 w-5" />
                    </button>
                    {showAttachMenu && (
                      <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        <button
                          type="button"
                          onClick={() => handleFileUpload('id')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          <span>Pièce d'identité</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleFileUpload('invoice')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <File className="h-4 w-4 mr-2" />
                          <span>Note d'honoraires</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {isRecording ? (
                    <div className="flex-1 flex items-center space-x-4 bg-red-50 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-500">{formatRecordingTime(recordingTime)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsRecording(false)}
                        className="text-red-500"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Écrivez votre message..."
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {selectedConversation.participants[0].isLawyer && !isRecording && (
                    <button
                      type="button"
                      onClick={() => setIsRecording(true)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <Mic className="h-5 w-5" />
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={(!newMessage.trim() && !isRecording)}
                    className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Sélectionnez une conversation</h3>
                <p className="mt-1 text-sm text-gray-500">Choisissez une conversation pour commencer à discuter</p>
              </div>
            </div>
          )}
        </div>

        {/* Call Modal */}
        <Dialog
          open={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
              <div className="mb-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                  <img
                    src={selectedConversation?.participants[0].photo}
                    alt={selectedConversation?.participants[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  {callType === 'audio' ? 'Appel audio' : 'Appel vidéo'} avec {selectedConversation?.participants[0].name}
                </h3>
                <p className="text-sm text-gray-500">En cours de connexion...</p>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsCallModalOpen(false)}
                  className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <Phone className="h-6 w-6" />
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </AnimatedPage>
  );
}