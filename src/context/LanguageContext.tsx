// 'use client'

// import { createContext, useContext, useState, ReactNode } from 'react'

// // Définir les types pour les traductions
// export type Language = 'fr' | 'en'

// interface Translations {
//   // Navbar
//   nav: {
//     home: string
//     about: string
//     services: string
//     gallery: string
//     documents: string
//     contact: string
//     quoteBtn: string
//     location: string
//   }
//   // Hero
//   hero: {
//     badge: string
//     title1: string
//     title2: string
//     title3: string
//     title4: string
//     description: string
//     highlights: string[]
//     servicesBtn: string
//     contactBtn: string
//     projectsDone: string
//     yearsExp: string
//     stats: string[]
//   }
// }

// // Traductions complètes
// const translationsData: Record<Language, Translations> = {
//   fr: {
//     nav: {
//       home: 'Accueil',
//       about: 'À Propos',
//       services: 'Services',
//       gallery: 'Galerie',
//       documents: 'Documents',
//       contact: 'Contact',
//       quoteBtn: 'Devis',
//       location: 'Lubumbashi, Haut-Katanga, RDC',
//     },
//     hero: {
//       badge: 'Basé à Lubumbashi, RDC',
//       title1: "L'Excellence en",
//       title2: 'Ingénierie',
//       title3: 'pour les Mines &',
//       title4: 'les Infrastructures',
//       description: 'Génie civil, expertise géotechnique et services industriels livrés selon les normes internationales à travers la République Démocratique du Congo.',
//       highlights: ['Ingénieurs Qualifiés', 'Sécurité Avant Tout', 'Qualité Garantie'],
//       servicesBtn: 'Nos Services',
//       contactBtn: 'Contactez-Nous',
//       projectsDone: 'Projets Réalisés',
//       yearsExp: "Ans d'Exp.",
//       stats: ["Ans d'Expérience", 'Projets Réalisés', "Membres d'Équipe", 'Satisfaction'],
//     },
//   },
//   en: {
//     nav: {
//       home: 'Home',
//       about: 'About',
//       services: 'Services',
//       gallery: 'Gallery',
//       documents: 'Documents',
//       contact: 'Contact',
//       quoteBtn: 'Get a Quote',
//       location: 'Lubumbashi, Haut-Katanga, DRC',
//     },
//     hero: {
//       badge: 'Based in Lubumbashi, DRC',
//       title1: 'Engineering',
//       title2: 'Excellence',
//       title3: 'for Mining &',
//       title4: 'Infrastructure',
//       description: 'Civil engineering, geotechnical expertise, and industrial services delivered with international standards across the Democratic Republic of Congo.',
//       highlights: ['Qualified Engineers', 'Safety First', 'Quality Assured'],
//       servicesBtn: 'Our Services',
//       contactBtn: 'Contact Us',
//       projectsDone: 'Projects Done',
//       yearsExp: 'Years Exp.',
//       stats: ['Years Experience', 'Projects Done', 'Team Members', 'Satisfaction'],
//     },
//   },
// }

// // Créer le contexte
// interface LanguageContextType {
//   language: Language
//   setLanguage: (lang: Language) => void
//   t: Translations
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// // Provider
// export function LanguageProvider({ children }: { children: ReactNode }) {
//   const [language, setLanguage] = useState<Language>('fr')

//   const value = {
//     language,
//     setLanguage,
//     t: translationsData[language],
//   }

//   return (
//     <LanguageContext.Provider value={value}>
//       {children}
//     </LanguageContext.Provider>
//   )
// }

// // Hook personnalisé
// export function useLanguage() {
//   const context = useContext(LanguageContext)
//   if (context === undefined) {
//     throw new Error('useLanguage must be used within a LanguageProvider')
//   }
//   return context
// }

'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'fr' | 'en'

interface Translations {
  nav: {
    home: string
    about: string
    services: string
    gallery: string
    documents: string
    contact: string
    quoteBtn: string
    location: string
  }
  hero: {
    badge: string
    title1: string
    title2: string
    title3: string
    title4: string
    description: string
    highlights: string[]
    servicesBtn: string
    contactBtn: string
    projectsDone: string
    yearsExp: string
    stats: string[]
  }
  about: {
    title: string
    description: string
    items: string[]
  }
  services: {
    title: string
    subtitle: string
    list: {
      title: string
      desc: string
    }[]
  }
  gallery: {
    title: string
    subtitle: string
    categories: string[]
    noImages: string
  }
  documents: {
    title: string
    subtitle: string
    searchPlaceholder: string
    categories: string[]
    noDocuments: string
  }
  stats: {
    badge: string
    title: string
    list: {
      label: string
      desc: string
    }[]
    bottomText: string
  }
}

const translationsData: Record<Language, Translations> = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      gallery: 'Galerie',
      documents: 'Documents',
      contact: 'Contact',
      quoteBtn: 'Devis',
      location: 'Lubumbashi, Haut-Katanga, RDC',
    },
    hero: {
      badge: 'Basé à Lubumbashi, RDC',
      title1: "L'Excellence en",
      title2: 'Ingénierie',
      title3: 'pour les Mines &',
      title4: 'les Infrastructures',
      description: 'Génie civil, expertise géotechnique et services industriels livrés selon les normes internationales à travers la République Démocratique du Congo.',
      highlights: ['Ingénieurs Qualifiés', 'Sécurité ', 'Qualité Garantie'],
      servicesBtn: 'Nos Services',
      contactBtn: 'Contactez-Nous',
      projectsDone: 'Projets Réalisés',
      yearsExp: "Ans d'Exp.",
      stats: ["Ans d'Expérience", 'Projets Réalisés', "Membres d'Équipe", 'Satisfaction'],
    },
    about: {
      title: 'À Propos de SYLWAK INVESTMENT',
      description: 'Fondée en 2023 à Lubumbashi, SYLWAK INVESTMENT SARL fournit des services de génie civil, des services miniers et des solutions industrielles de haute qualité à travers la République Démocratique du Congo.',
      items: [
        'Ingénieurs et personnel technique expérimentés',
        'Normes de qualité internationales',
        'Équipements et technologie modernes',
        'Approche sécurité avant tout',
        'Livraison des projets dans les délais',
      ],
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Services complets d\'ingénierie et industriels pour les projets miniers et d\'infrastructure.',
      list: [
        { title: 'Génie Civil', desc: 'Solutions complètes d\'infrastructure et structurelles' },
        { title: 'Construction Routière', desc: 'Routes, pistes minières, revêtement en asphalte' },
        { title: 'Services Miniers', desc: 'Préparation de site et installations de support' },
        { title: 'Laboratoire Géotechnique', desc: 'Tests de sol et analyse des matériaux' },
        { title: 'Services Industriels', desc: 'Nettoyage, maintenance, support technique' },
        { title: 'Électricité', desc: 'Éclairage de site et systèmes électriques' },
        { title: 'Fourniture de Matériaux', desc: 'Matériaux de construction et équipements' },
        { title: 'Transport', desc: 'Location de camions, bus, logistique' },
      ],
    },
    gallery: {
      title: 'Nos Réalisations',
      subtitle: 'Découvrez nos projets réalisés à travers la RDC.',
      categories: ['Tout', 'Construction', 'Minier', 'Électricité', 'Industriel', 'Laboratoire'],
      noImages: 'Aucune image dans cette catégorie',
    },
    documents: {
      title: 'Documents & Certifications',
      subtitle: 'Téléchargez nos documents d\'entreprise, certifications et capacités techniques.',
      searchPlaceholder: 'Rechercher des documents...',
      categories: ['Tout', 'Entreprise', 'Légal', 'Qualité', 'Sécurité', 'Technique'],
      noDocuments: 'Aucun document trouvé',
    },
    stats: {
      badge: 'En Chiffres',
      title: 'Notre Parcours',
      list: [
        { label: "Ans d'Expérience", desc: 'Au service depuis 2023' },
        { label: 'Projets Réalisés', desc: 'À travers la RDC' },
        { label: "Membres d'Équipe", desc: 'Personnel qualifié' },
        { label: 'Clients Satisfaits', desc: 'Partenaires de confiance' },
      ],
      bottomText: 'Toujours plus fort chaque année avec un engagement envers l\'excellence',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      gallery: 'Gallery',
      documents: 'Documents',
      contact: 'Contact',
      quoteBtn: 'Get a Quote',
      location: 'Lubumbashi, Haut-Katanga, DRC',
    },
    hero: {
      badge: 'Based in Lubumbashi, DRC',
      title1: 'Engineering',
      title2: 'Excellence',
      title3: 'for Mining &',
      title4: 'Infrastructure',
      description: 'Civil engineering, geotechnical expertise, and industrial services delivered with international standards across the Democratic Republic of Congo.',
      highlights: ['Qualified Engineers', 'Safety First', 'Quality Assured'],
      servicesBtn: 'Our Services',
      contactBtn: 'Contact Us',
      projectsDone: 'Projects Done',
      yearsExp: 'Years Exp.',
      stats: ['Years Experience', 'Projects Done', 'Team Members', 'Satisfaction'],
    },
    about: {
      title: 'About SYLWAK INVESTMENT',
      description: 'Founded in 2023 in Lubumbashi, SYLWAK INVESTMENT SARL delivers high-quality civil engineering, mining services, and industrial solutions across the Democratic Republic of Congo.',
      items: [
        'Experienced engineers and technical staff',
        'International quality standards',
        'Modern equipment and technology',
        'Safety-first approach',
        'On-time project delivery',
      ],
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive engineering and industrial services for mining and infrastructure projects.',
      list: [
        { title: 'Civil Engineering', desc: 'Complete infrastructure and structural solutions' },
        { title: 'Road Construction', desc: 'Highways, mining roads, asphalt paving' },
        { title: 'Mining Services', desc: 'Site preparation and support facilities' },
        { title: 'Geotechnical Lab', desc: 'Soil testing and material analysis' },
        { title: 'Industrial Services', desc: 'Cleaning, maintenance, technical support' },
        { title: 'Electrical', desc: 'Site lighting and power systems' },
        { title: 'Materials Supply', desc: 'Construction materials and equipment' },
        { title: 'Transport', desc: 'Truck rental, bus services, logistics' },
      ],
    },
    gallery: {
      title: 'Our Realizations',
      subtitle: 'Discover our completed projects across the DRC.',
      categories: ['All', 'Construction', 'Mining', 'Electrical', 'Industrial', 'Laboratory'],
      noImages: 'No images in this category',
    },
    documents: {
      title: 'Documents & Certifications',
      subtitle: 'Download our company documents, certifications, and technical capabilities.',
      searchPlaceholder: 'Search documents...',
      categories: ['All', 'Company', 'Legal', 'Quality', 'Safety', 'Technical'],
      noDocuments: 'No documents found',
    },
    stats: {
      badge: 'By the Numbers',
      title: 'Our Track Record',
      list: [
        { label: 'Years Experience', desc: 'Serving since 2023' },
        { label: 'Projects Done', desc: 'Across DRC' },
        { label: 'Team Members', desc: 'Qualified staff' },
        { label: 'Happy Clients', desc: 'Trusted partners' },
      ],
      bottomText: 'Growing stronger every year with commitment to excellence',
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')

  const value = {
    language,
    setLanguage,
    t: translationsData[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}