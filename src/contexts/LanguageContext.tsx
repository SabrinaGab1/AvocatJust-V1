import React, { createContext, useContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const translations = {
  fr: {
    // Navigation
    'find_lawyer': 'Trouver un avocat',
    'emergency_lawyer': 'Urgence Avocat',
    'login': 'Connexion',
    'create_account': 'Vous êtes un avocat ?',
    
    // Home
    'find_your': 'Trouvez votre',
    'trusted_lawyer': 'avocat de confiance',
    'platform_description': 'La plateforme qui vous met en relation avec les avocats justes',
    'search_placeholder': 'Décrivez votre problématique (ex: licenciement, divorce, création d\'entreprise, etc)',
    'find_lawyer_online': 'TROUVEZ UN AVOCAT EN LIGNE AUTOUR DE VOUS',
    'not_just_lawyers_1': 'Sur',
    'not_just_lawyers_2': ', ce ne sont pas juste des avocats.',
    'just_lawyers': 'Ce sont des avocats justes pour vos droits !',

    // Footer
    'all_rights_reserved': 'Tous droits réservés',
    'legal_notice': 'Mentions légales',
    'terms': 'CGV',
    'cookies': 'Cookies',
  },
  en: {
    // Navigation
    'find_lawyer': 'Find a lawyer',
    'emergency_lawyer': 'Emergency Lawyer',
    'login': 'Login',
    'create_account': 'Create account',
    
    // Home
    'find_your': 'Find your',
    'trusted_lawyer': 'trusted lawyer',
    'platform_description': 'The platform that connects you with the right lawyers',
    'search_placeholder': 'Describe your issue (e.g., dismissal, divorce, business creation, etc)',
    'find_lawyer_online': 'FIND A LAWYER ONLINE NEAR YOU',
    'not_just_lawyers_1': 'On',
    'not_just_lawyers_2': ', they\'re not just lawyers.',
    'just_lawyers': 'They\'re just lawyers for your rights!',

    // Footer
    'all_rights_reserved': 'All rights reserved',
    'legal_notice': 'Legal Notice',
    'terms': 'Terms',
    'cookies': 'Cookies',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('fr');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}