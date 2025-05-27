import React, { useState } from 'react';
import { Search, ChevronDown, MessageSquare, Book, HelpCircle, Phone, Mail } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

type FAQ = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQ[] = [
  {
    question: "Comment modifier mes informations de profil ?",
    answer: "Pour modifier vos informations de profil, accédez à la section 'Profil' dans le menu de gauche. Cliquez sur le bouton 'Modifier le profil' en haut à droite pour mettre à jour vos informations personnelles et professionnelles.",
    category: "Profil"
  },
  {
    question: "Comment gérer mes disponibilités ?",
    answer: "Dans la section 'Agenda', cliquez sur le bouton 'Disponibilités' pour définir vos horaires de consultation et vos périodes d'indisponibilité. Vous pouvez également spécifier les types de rendez-vous que vous acceptez.",
    category: "Agenda"
  },
  {
    question: "Comment accéder à mes documents ?",
    answer: "Tous vos documents sont accessibles depuis votre tableau de bord. Vous pouvez les organiser par dossier, les télécharger ou en ajouter de nouveaux en utilisant le bouton 'Ajouter un document'.",
    category: "Documents"
  },
  {
    question: "Comment contacter le support technique ?",
    answer: "Notre équipe de support est disponible par email à support@avocajust.fr ou par téléphone au 01 23 45 67 89 du lundi au vendredi de 9h à 18h.",
    category: "Support"
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Centre d'aide</h1>
            <p className="mt-4 text-lg text-gray-600">
              Comment pouvons-nous vous aider aujourd'hui ?
            </p>

            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                <Book className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600">
                Consultez notre documentation détaillée
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                <MessageSquare className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat en direct</h3>
              <p className="text-gray-600">
                Discutez avec notre équipe support
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                <HelpCircle className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">FAQ</h3>
              <p className="text-gray-600">
                Trouvez rapidement des réponses
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Questions fréquentes</h2>
            </div>

            <div className="p-6">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    !selectedCategory
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tout
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedCategory === category
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedQuestion(
                        expandedQuestion === faq.question ? null : faq.question
                      )}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          expandedQuestion === faq.question ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedQuestion === faq.question && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-orange-50 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Besoin d'aide supplémentaire ?
            </h2>
            <p className="text-gray-600 mb-6">
              Notre équipe de support est là pour vous aider. N'hésitez pas à nous contacter.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-gray-600">01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-gray-600">support@avocajust.fr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}