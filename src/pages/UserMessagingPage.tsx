import React, { useState } from 'react';
import { Search, MessageSquare, Phone, Video, Send, Paperclip, MoreVertical } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    isUser: boolean;
  };
  timestamp: Date;
};

type Conversation = {
  id: string;
  lawyerName: string;
  lawyerPhoto: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  consultationDate?: Date;
};

const mockConversations: Conversation[] = [
  {
    id: '1',
    lawyerName: 'Me Marie Dupont',
    lawyerPhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    lastMessage: 'Je vous envoie les documents demandés',
    lastMessageTime: new Date(2024, 2, 20, 14, 30),
    unreadCount: 2,
    consultationDate: new Date(2024, 3, 1, 14, 0)
  },
  {
    id: '2',
    lawyerName: 'Me Pierre Bernard',
    lawyerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    lastMessage: 'Merci pour votre retour',
    lastMessageTime: new Date(2024, 2, 19, 11, 45),
    unreadCount: 0
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Bonjour, j\'ai bien reçu votre demande de consultation.',
    sender: { id: '2', name: 'Me Marie Dupont', isUser: false },
    timestamp: new Date(2024, 2, 20, 14, 0)
  },
  {
    id: '2',
    content: 'Parfait, merci ! Quand pouvons-nous programmer notre rendez-vous ?',
    sender: { id: '1', name: 'Sophie Martin', isUser: true },
    timestamp: new Date(2024, 2, 20, 14, 5)
  },
  {
    id: '3',
    content: 'Je vous propose le 1er avril à 14h en visioconférence. Cela vous convient-il ?',
    sender: { id: '2', name: 'Me Marie Dupont', isUser: false },
    timestamp: new Date(2024, 2, 20, 14, 10)
  },
  {
    id: '4',
    content: 'Parfait, c\'est noté ! À bientôt.',
    sender: { id: '1', name: 'Sophie Martin', isUser: true },
    timestamp: new Date(2024, 2, 20, 14, 15)
  }
];

export default function UserMessagingPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would typically send the message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Conversations List */}
          <div className="w-80 bg-white border-r border-gray-200">
            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-900 mb-4">Messagerie</h1>
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
                    selectedConversation.id === conversation.id ? 'bg-orange-50 border-r-2 border-orange-500' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conversation.lawyerPhoto}
                      alt={conversation.lawyerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.lawyerName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {formatDate(conversation.lastMessageTime)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.consultationDate && (
                      <div className="mt-1">
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                          RDV le {formatDate(conversation.consultationDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedConversation.lawyerPhoto}
                    alt={selectedConversation.lawyerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">
                      {selectedConversation.lawyerName}
                    </h2>
                    <p className="text-xs text-gray-500">En ligne</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg ${
                      message.sender.isUser
                        ? 'bg-orange-500 text-white rounded-l-lg rounded-tr-lg'
                        : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
                    } p-3`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className={`text-xs mt-1 ${message.sender.isUser ? 'text-white/80' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <Paperclip className="h-5 w-5" />
                </button>

                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez votre message..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    rows={1}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}