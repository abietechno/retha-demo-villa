import { LanguageCode } from '../types';

export const TRANSLATIONS: Record<LanguageCode, {
  nav: {
    sanctuaries: string;
    services: string;
    yieldCalculator: string;
    managementDashboard: string;
    switchGuestView: string;
    reserveNow: string;
  };
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    exploreBtn: string;
    ownerInquiry: string;
    searchVilla: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    searchBtn: string;
    anyCategory: string;
  };
  filters: {
    all: string;
    clifftop: string;
    beachfront: string;
    jungle: string;
    architectural: string;
  };
  villaCard: {
    perNight: string;
    bedrooms: string;
    bathrooms: string;
    guests: string;
    viewDetails: string;
    reserve: string;
    butlerIncluded: string;
    instantConfirmation: string;
  };
  details: {
    overview: string;
    amenities: string;
    architecturalDetails: string;
    gallery: string;
    viewGallery: string;
    housekeepingStatus: string;
    managedBy: string;
    reserveThisSanctuary: string;
    close: string;
  };
  booking: {
    title: string;
    stepDates: string;
    stepConcierge: string;
    stepGuest: string;
    stepPayment: string;
    selectDates: string;
    nightlyRate: string;
    totalNights: string;
    bespokeAddons: string;
    includedWithStay: string;
    personalDetails: string;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests: string;
    specialRequestsPlaceholder: string;
    paymentMethod: string;
    cardDetails: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    applePay: string;
    googlePay: string;
    bankTransfer: string;
    paySecurely: string;
    breakdown: string;
    staySubtotal: string;
    addonsSubtotal: string;
    luxuryServiceTax: string;
    greenTourismFee: string;
    grandTotal: string;
    confirmedTitle: string;
    confirmedDesc: string;
    bookingRef: string;
    downloadVoucher: string;
    done: string;
  };
  services: {
    badge: string;
    heading: string;
    subheading: string;
    yieldTitle: string;
    yieldDesc: string;
    turnkeyTitle: string;
    turnkeyDesc: string;
    distributionTitle: string;
    distributionDesc: string;
    conciergeTitle: string;
    conciergeDesc: string;
    calcTitle: string;
    calcSubtitle: string;
    bedroomsLabel: string;
    locationLabel: string;
    estGrossRev: string;
    managementFee: string;
    netOwnerPayout: string;
    projectedOccupancy: string;
    requestProposal: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    livePortfolio: string;
    grossRevenue: string;
    occupancy: string;
    adr: string;
    revPar: string;
    activeGuests: string;
    villasStatus: string;
    liveBookings: string;
    housekeepingTasks: string;
    ownerPayouts: string;
    filterAll: string;
    statusReady: string;
    statusCleaning: string;
    statusInspection: string;
    statusMaintenance: string;
    quickAction: string;
    guestName: string;
    dates: string;
    villa: string;
    payout: string;
    payment: string;
    taskTitle: string;
    assignee: string;
    markComplete: string;
    completed: string;
    addNewBooking: string;
  };
  footer: {
    tagline: string;
    privateOffice: string;
    locations: string;
    contactConcierge: string;
    rights: string;
    discretionAssurance: string;
  };
}> = {
  en: {
    nav: {
      sanctuaries: 'Private Sanctuaries',
      services: 'Asset Management',
      yieldCalculator: 'Owner Yield Calculator',
      managementDashboard: 'Management Portal',
      switchGuestView: 'Guest Perspective',
      reserveNow: 'Inquire & Reserve',
    },
    hero: {
      tagline: 'Villa & Exclusive Living Property Management',
      titleLine1: 'The Art of Extraordinary',
      titleLine2: 'Villa Living & Stewardship',
      description: 'Exclusive clifftop estates, beachfront pavilions, and emerald jungle sanctuaries. Seamless international reservations paired with discreet real-time property management for discerning owners.',
      exploreBtn: 'Explore The Portfolio',
      ownerInquiry: 'Villa Asset Management',
      searchVilla: 'Where would you like to stay?',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      searchBtn: 'Check Availability',
      anyCategory: 'All Architectural Styles',
    },
    filters: {
      all: 'All Estates',
      clifftop: 'Clifftop Sanctuaries',
      beachfront: 'Beachfront Pavilions',
      jungle: 'Forest & Valley Retreats',
      architectural: 'Modernist Masterpieces',
    },
    villaCard: {
      perNight: 'night',
      bedrooms: 'Suites',
      bathrooms: 'Baths',
      guests: 'Guests',
      viewDetails: 'Curated Overview',
      reserve: 'Instant Reserve',
      butlerIncluded: 'Private Butler Included',
      instantConfirmation: 'Instant VIP Confirmation',
    },
    details: {
      overview: 'Architectural Narrative',
      amenities: 'Signature Amenities',
      architecturalDetails: 'Estate Specifications',
      gallery: 'High-Resolution Visuals',
      viewGallery: 'Launch Fullscreen Gallery',
      housekeepingStatus: 'Sanctuary Readiness',
      managedBy: 'Dedicated Villa Director',
      reserveThisSanctuary: 'Reserve This Sanctuary',
      close: 'Return to Portfolio',
    },
    booking: {
      title: 'Direct Reservation & International Checkout',
      stepDates: '1. Itinerary',
      stepConcierge: '2. Curated Add-ons',
      stepGuest: '3. Guest Credentials',
      stepPayment: '4. International Gateway',
      selectDates: 'Select Dates & Party Size',
      nightlyRate: 'Tariff per night',
      totalNights: 'Duration of stay',
      bespokeAddons: 'Elevate Your Stay with Bespoke Concierge',
      includedWithStay: 'Complimentary Inclusions',
      personalDetails: 'Lead Guest Information',
      fullName: 'Primary Guest Full Name',
      email: 'Direct Email Address',
      phone: 'Mobile / WhatsApp (with country code)',
      country: 'Country of Residence',
      specialRequests: 'Special Requests & Dietary Preferences',
      specialRequestsPlaceholder: 'E.g., In-villa welcome champagne, late arrival at midnight, gluten-free dining...',
      paymentMethod: 'Select Payment Method',
      cardDetails: 'Card Payment (Stripe Global Checkout)',
      cardNumber: 'Card Number',
      cardExpiry: 'MM / YY',
      cardCvc: 'CVC / CVV',
      applePay: 'Apple Pay (1-Click VIP Authorization)',
      googlePay: 'Google Pay Express',
      bankTransfer: 'Direct SWIFT / International Wire Transfer',
      paySecurely: 'Authorize & Confirm Reservation',
      breakdown: 'Reservation Summary',
      staySubtotal: 'Accommodation Total',
      addonsSubtotal: 'Curated Add-ons',
      luxuryServiceTax: 'Luxury Estate Service (10%)',
      greenTourismFee: 'Environmental & Conservation Fund',
      grandTotal: 'Total Payable Amount',
      confirmedTitle: 'Reservation Confirmed & Guaranteed',
      confirmedDesc: 'Your luxury sanctuary is secured. A personalized itinerary and confirmation voucher have been dispatched to your email.',
      bookingRef: 'VIP Reference Code',
      downloadVoucher: 'Print / Save Official Voucher',
      done: 'Return to Sanctuary',
    },
    services: {
      badge: 'TURNKEY ASSET GOVERNANCE',
      heading: 'Bespoke Management for Premier Villa Owners',
      subheading: 'We protect your high-value asset, optimize global rental yields, and deliver effortless passive revenue with white-glove hospitality standards.',
      yieldTitle: 'Dynamic Yield Maximization',
      yieldDesc: 'Proprietary algorithmic pricing across prime international feeder markets (US, Europe, Australia, GCC) driving +28% higher ADR than conventional agents.',
      turnkeyTitle: '24/7 White-Glove Asset Care',
      turnkeyDesc: 'Dedicated on-site estate managers, preventive engineering audits, certified pool and landscape artisans, and immaculate housekeeping.',
      distributionTitle: 'Global Luxury Distribution',
      distributionDesc: 'Curated distribution on Marriott Homes & Villas, Airbnb Luxe, Virtuoso partner networks, and direct repeat VIP HNWI clientele.',
      conciergeTitle: 'Discreet Private Concierge',
      conciergeDesc: 'Full in-villa culinary teams, private sommeliers, luxury chauffeur fleets, and airport tarmac VIP customs clearance for all guests.',
      calcTitle: 'Owner Net Yield & Revenue Simulator',
      calcSubtitle: 'Estimate your estate’s annual earning potential under VillaKu Management asset stewardship.',
      bedroomsLabel: 'Number of Luxury Bedrooms',
      locationLabel: 'Prime Location',
      estGrossRev: 'Projected Annual Gross Revenue',
      managementFee: 'VillaKu Management Stewardship (15%)',
      netOwnerPayout: 'Net Annual Owner Payout',
      projectedOccupancy: 'Projected Annual Occupancy',
      requestProposal: 'Request Confidential Asset Audit',
    },
    dashboard: {
      title: 'Executive Property Governance Dashboard',
      subtitle: 'Real-time telemetry, guest reservation pipeline, dynamic rate control, and asset status across the portfolio.',
      livePortfolio: 'Real-Time Portfolio Telemetry',
      grossRevenue: 'Gross Revenue (MTD)',
      occupancy: 'Portfolio Occupancy',
      adr: 'Average Daily Rate (ADR)',
      revPar: 'Revenue Per Avail Room (RevPAR)',
      activeGuests: 'In-House VIP Guests',
      villasStatus: 'Estate Readiness & Turnaround',
      liveBookings: 'Live Reservation Ledger',
      housekeepingTasks: 'Engineering & Maintenance Queue',
      ownerPayouts: 'Owner Payouts & Yield Analytics',
      filterAll: 'All Sanctuaries',
      statusReady: 'Ready for VIP Arrival',
      statusCleaning: 'Turnover in Progress',
      statusInspection: 'Director Inspection Needed',
      statusMaintenance: 'Scheduled Maintenance',
      quickAction: 'Set Status',
      guestName: 'Guest & Origin',
      dates: 'Stay Dates',
      villa: 'Sanctuary',
      payout: 'Gross Amount',
      payment: 'Status',
      taskTitle: 'Task Detail',
      assignee: 'Staff Assignee',
      markComplete: 'Complete',
      completed: 'Completed',
      addNewBooking: '+ Direct VIP Reservation',
    },
    footer: {
      tagline: 'VillaKu Management - Villa & Exclusive Living Property Management',
      privateOffice: 'Global Private Offices',
      locations: 'Bali (Seminyak & Uluwatu) • Singapore • Côte d’Azur • London Mayfair',
      contactConcierge: 'Private Client Concierge & Owner Hotline: +62 812 3374 1899 | concierge@villaku-management.com',
      rights: 'All rights reserved. by Retha.',
      discretionAssurance: 'Member of International Luxury Hotel & Villa Asset Management Guild. & DUNS Number',
    },
  },
  fr: {
    nav: {
      sanctuaries: 'Sanctuaires Privés',
      services: 'Gestion d’Actifs',
      yieldCalculator: 'Calculateur de Rendement',
      managementDashboard: 'Portail Gestion',
      switchGuestView: 'Vue Voyageur',
      reserveNow: 'Réserver en Ligne',
    },
    hero: {
      tagline: 'Villa & Exclusive Living Property Management',
      titleLine1: 'L’Art de l’Excellence',
      titleLine2: 'Villas d’Exception & Gestion Hôtelière',
      description: 'Domaines privatifs en falaise, pavillons en bord de mer et retraites secrètes. Réservations internationales fluides et gouvernance immobilière en temps réel pour propriétaires exigeants.',
      exploreBtn: 'Explorer la Collection',
      ownerInquiry: 'Gestion pour Propriétaires',
      searchVilla: 'Où souhaitez-vous résider ?',
      checkIn: 'Arrivée',
      checkOut: 'Départ',
      guests: 'Voyageurs',
      searchBtn: 'Vérifier la Disponibilité',
      anyCategory: 'Tous les Styles Architecturaux',
    },
    filters: {
      all: 'Toutes les Villas',
      clifftop: 'Sanctuaires de Falaise',
      beachfront: 'Pavillons de Plage',
      jungle: 'Retraites Végétales',
      architectural: 'Chefs-d’œuvre Modernistes',
    },
    villaCard: {
      perNight: 'nuit',
      bedrooms: 'Suites',
      bathrooms: 'Bains',
      guests: 'Invités',
      viewDetails: 'Découvrir',
      reserve: 'Réserver',
      butlerIncluded: 'Majordome Privé Inclus',
      instantConfirmation: 'Confirmation VIP Immédiate',
    },
    details: {
      overview: 'Récit Architectural',
      amenities: 'Prestations d’Exception',
      architecturalDetails: 'Spécifications du Domaine',
      gallery: 'Photographies Haute Définition',
      viewGallery: 'Ouvrir la Galerie Plein Écran',
      housekeepingStatus: 'État de Préparation',
      managedBy: 'Directeur de Propriété Dédié',
      reserveThisSanctuary: 'Réserver ce Domaine',
      close: 'Fermer',
    },
    booking: {
      title: 'Réservation Directe & Paiement International',
      stepDates: '1. Séjour',
      stepConcierge: '2. Services Exclusifs',
      stepGuest: '3. Coordonnées',
      stepPayment: '4. Paiement Sécurisé',
      selectDates: 'Sélectionnez les dates et invités',
      nightlyRate: 'Tarif par nuit',
      totalNights: 'Durée du séjour',
      bespokeAddons: 'Sublimez votre séjour avec nos prestations sur mesure',
      includedWithStay: 'Inclusions d’Honneur',
      personalDetails: 'Informations Invité Principal',
      fullName: 'Nom Complet',
      email: 'Adresse Courriel',
      phone: 'Téléphone / WhatsApp',
      country: 'Pays de Résidence',
      specialRequests: 'Exigences Particulières & Régimes',
      specialRequestsPlaceholder: 'Ex: Champagne millésimé à l’arrivée, transfert tardif...',
      paymentMethod: 'Mode de Règlement',
      cardDetails: 'Carte Bancaire Internationale',
      cardNumber: 'Numéro de Carte',
      cardExpiry: 'MM / AA',
      cardCvc: 'CVC / CVV',
      applePay: 'Apple Pay (Paiement 1-Clic)',
      googlePay: 'Google Pay',
      bankTransfer: 'Virement Bancaire International SWIFT',
      paySecurely: 'Confirmer & Autoriser le Paiement',
      breakdown: 'Récapitulatif Financier',
      staySubtotal: 'Hébergement',
      addonsSubtotal: 'Prestations Exclusives',
      luxuryServiceTax: 'Service de Luxe (10%)',
      greenTourismFee: 'Contribution Éco-patrimoine',
      grandTotal: 'Montant Total',
      confirmedTitle: 'Réservation Confirmée & Garantie',
      confirmedDesc: 'Votre sanctuaire est réservé. Un voucher nominatif et votre itinéraire privé ont été expédiés.',
      bookingRef: 'Numéro de Référence VIP',
      downloadVoucher: 'Télécharger le Voucher',
      done: 'Terminer',
    },
    services: {
      badge: 'GOUVERNANCE PATRIMONIALE CLÉ EN MAIN',
      heading: 'Gestion d’Actifs pour Propriétaires Exclusifs',
      subheading: 'Nous valorisons votre propriété de prestige, maximisons le rendement locatif et garantissons une intégrité architecturale sans compromis.',
      yieldTitle: 'Tarification Dynamique & Revenus',
      yieldDesc: 'Rendements supérieurs de +28% grâce à un positionnement exclusif auprès des clientèles internationales fortunées.',
      turnkeyTitle: 'Intendance & Entretien d’Artisan',
      turnkeyDesc: 'Gouvernantes qualifiées, audits d’ingénierie et entretien préventif sans faille.',
      distributionTitle: 'Visibilité Ultra-Luxe',
      distributionDesc: 'Mise en avant sur les réseaux privés, conciergeries d’affaires et partenaires sélects.',
      conciergeTitle: 'Conciergerie Privée 24/7',
      conciergeDesc: 'Chefs étoilés, chauffeurs en berline d’exception et charters maritimes privés.',
      calcTitle: 'Simulateur de Rendement Net Propriétaire',
      calcSubtitle: 'Estimez vos revenus annuels avec la gestion VillaKu Management.',
      bedroomsLabel: 'Nombre de Chambres',
      locationLabel: 'Emplacement Clé',
      estGrossRev: 'Revenu Brut Annuel Estimé',
      managementFee: 'Honoraires de Gestion VillaKu (15%)',
      netOwnerPayout: 'Rendement Net Propriétaire',
      projectedOccupancy: 'Taux d’Occupation Projeté',
      requestProposal: 'Demander un Audit Confidentiel',
    },
    dashboard: {
      title: 'Tableau de Bord Exécutif de Gouvernance',
      subtitle: 'Télémétrie en temps réel, calendrier des réservations, gestion des tarifs et intendance des domaines.',
      livePortfolio: 'Télémétrie du Portefeuille',
      grossRevenue: 'Chiffre d’Affaires (Mois en cours)',
      occupancy: 'Taux d’Occupation',
      adr: 'Prix Moyen par Nuit (ADR)',
      revPar: 'Revenu par Chambre Disponible',
      activeGuests: 'Invités VIP Présents',
      villasStatus: 'État de Préparation des Villas',
      liveBookings: 'Registre des Réservations',
      housekeepingTasks: 'Tâches Techniques & Ménage',
      ownerPayouts: 'Revenus et Règlements Propriétaires',
      filterAll: 'Toutes les Propriétés',
      statusReady: 'Prête pour Arrivée VIP',
      statusCleaning: 'Ménage en Cours',
      statusInspection: 'Inspection Requise',
      statusMaintenance: 'Maintenance Programmée',
      quickAction: 'Modifier Statut',
      guestName: 'Invité & Pays',
      dates: 'Dates du Séjour',
      villa: 'Villa',
      payout: 'Montant Brut',
      payment: 'Statut',
      taskTitle: 'Description de la Tâche',
      assignee: 'Responsable',
      markComplete: 'Valider',
      completed: 'Complété',
      addNewBooking: '+ Nouvelle Réservation VIP',
    },
    footer: {
      tagline: 'VillaKu Management - Villa & Exclusive Living Property Management',
      privateOffice: 'Bureaux Privés',
      locations: 'Bali (Seminyak & Uluwatu) • Singapour • Côte d’Azur • Londres Mayfair',
      contactConcierge: 'Conciergerie Privée : +62 361 894 8888 | concierge@villaku-management.com',
      rights: 'Tous droits réservés. Confidentialité absolue.',
      discretionAssurance: 'Membre certifié de la Guilde Internationale de Gestion de Villas d’Exception.',
    },
  },
  de: {
    nav: {
      sanctuaries: 'Private Refugien',
      services: 'Asset Management',
      yieldCalculator: 'Renditerechner',
      managementDashboard: 'Management Portal',
      switchGuestView: 'Gäste-Ansicht',
      reserveNow: 'Online Reservieren',
    },
    hero: {
      tagline: 'Villa & Exclusive Living Property Management',
      titleLine1: 'Die Kunst des Exklusiven',
      titleLine2: 'Villenleben & Werterhalt',
      description: 'Erstklassige Klippenvillen, Strandresidenzen und Dschungel-Refugien. Nahtlose internationale Buchung und Echtzeit-Immobilienverwaltung für anspruchsvolle Eigentümer.',
      exploreBtn: 'Portfolio Erkunden',
      ownerInquiry: 'Villen-Management',
      searchVilla: 'Wo möchten Sie residieren?',
      checkIn: 'Anreise',
      checkOut: 'Abreise',
      guests: 'Gäste',
      searchBtn: 'Verfügbarkeit Prüfen',
      anyCategory: 'Alle Architekturstile',
    },
    filters: {
      all: 'Alle Villen',
      clifftop: 'Klippen-Residenzen',
      beachfront: 'Strand-Pavillons',
      jungle: 'Dschungel-Refugien',
      architectural: 'Moderne Meisterwerke',
    },
    villaCard: {
      perNight: 'Nacht',
      bedrooms: 'Suiten',
      bathrooms: 'Bäder',
      guests: 'Gäste',
      viewDetails: 'Details ansehen',
      reserve: 'Sofort Buchen',
      butlerIncluded: 'Privater Butler inklusive',
      instantConfirmation: 'Sofortige VIP-Bestätigung',
    },
    details: {
      overview: 'Architektur & Design',
      amenities: 'Signature Ausstattung',
      architecturalDetails: 'Objektspezifikationen',
      gallery: 'Hochauflösende Galerie',
      viewGallery: 'Vollbildgalerie öffnen',
      housekeepingStatus: 'Zustand der Residenz',
      managedBy: 'Dedizierter Villen-Direktor',
      reserveThisSanctuary: 'Diese Residenz Buchen',
      close: 'Schließen',
    },
    booking: {
      title: 'Direktbuchung & Internationaler Checkout',
      stepDates: '1. Reisedaten',
      stepConcierge: '2. Concierge-Upgrades',
      stepGuest: '3. Gastdaten',
      stepPayment: '4. Zahlungsportal',
      selectDates: 'Reisedaten und Personenanzahl wählen',
      nightlyRate: 'Preis pro Nacht',
      totalNights: 'Aufenthaltsdauer',
      bespokeAddons: 'Exklusive Zusatzservices hinzufügen',
      includedWithStay: 'Im Aufenthalt enthalten',
      personalDetails: 'Hauptgast-Informationen',
      fullName: 'Vollständiger Name',
      email: 'E-Mail-Adresse',
      phone: 'Telefon / WhatsApp',
      country: 'Wohnsitzland',
      specialRequests: 'Besondere Wünsche & Verpflegung',
      specialRequestsPlaceholder: 'Z.B. Champagner-Empfang, Mitternachts-Check-in...',
      paymentMethod: 'Zahlungsart wählen',
      cardDetails: 'Kreditkarte (Stripe Global)',
      cardNumber: 'Kartennummer',
      cardExpiry: 'MM / JJ',
      cardCvc: 'CVC / CVV',
      applePay: 'Apple Pay (1-Klick VIP-Autorisierung)',
      googlePay: 'Google Pay Express',
      bankTransfer: 'Direkte SWIFT-Auslandsüberweisung',
      paySecurely: 'Zahlung Autorisieren & Buchen',
      breakdown: 'Kostenaufstellung',
      staySubtotal: 'Übernachtungssumme',
      addonsSubtotal: 'Zusatzleistungen',
      luxuryServiceTax: 'Luxus-Servicegebühr (10%)',
      greenTourismFee: 'Nachhaltigkeitsbeitrag',
      grandTotal: 'Gesamtsumme',
      confirmedTitle: 'Buchung Garantiert & Bestätigt',
      confirmedDesc: 'Ihre Residenz ist gesichert. Der offizielle Voucher wurde an Ihre E-Mail gesendet.',
      bookingRef: 'VIP-Referenzcode',
      downloadVoucher: 'Voucher herunterladen / drucken',
      done: 'Fertig',
    },
    services: {
      badge: 'SCHLÜSSELFERTIGE ASSET-BETREUUNG',
      heading: 'Bespoke Management für Villenbesitzer',
      subheading: 'Wir schützen Ihr Luxusgut, maximieren Mieteinnahmen und bieten erstklassigen Hotelstandard.',
      yieldTitle: 'Dynamische Ertragsmaximierung',
      yieldDesc: 'Durchschnittlich +28% höhere Tagesraten durch gezielte Vermarktung an wohlhabende Reisende.',
      turnkeyTitle: '24/7 Premium-Instandhaltung',
      turnkeyDesc: 'Permanente Objektinspektionen, professionelle Gärtner, Pooltechniker und Concierge-Teams.',
      distributionTitle: 'Globale Luxusvermarktung',
      distributionDesc: 'Präsenz auf exklusiven Plattformen wie Marriott Homes & Villas und direkten VIP-Kanälen.',
      conciergeTitle: 'Diskreter VIP-Concierge',
      conciergeDesc: 'Spitzenköche, Privatfahrer und Helikopter-Transfers direkt zur Villa.',
      calcTitle: 'Eigentümer-Ertragsrechner',
      calcSubtitle: 'Berechnen Sie Ihr jährliches Netto-Einkommenspotenzial.',
      bedroomsLabel: 'Schlafzimmeranzahl',
      locationLabel: 'Lage der Villa',
      estGrossRev: 'Geschätzter Bruttojahresumsatz',
      managementFee: 'VillaKu Management Betreuung (15%)',
      netOwnerPayout: 'Netto-Auszahlung an Eigentümer',
      projectedOccupancy: 'Erwartete Belegungsquote',
      requestProposal: 'Vertrauliches Angebot anfordern',
    },
    dashboard: {
      title: 'Executive Property Management Dashboard',
      subtitle: 'Echtzeit-Telemetrie, Belegungspipeline, dynamische Preiskontrolle und Instandhaltungsstatus.',
      livePortfolio: 'Echtzeit-Portfolio-Daten',
      grossRevenue: 'Bruttoumsatz (Monat)',
      occupancy: 'Belegungsquote',
      adr: 'Durchschnittliche Tagesrate (ADR)',
      revPar: 'Umsatz pro verf. Zimmer (RevPAR)',
      activeGuests: 'Anwesende VIP-Gäste',
      villasStatus: 'Zustand & Verfügbarkeit',
      liveBookings: 'Aktuelle Buchungsliste',
      housekeepingTasks: 'Wartung & Housekeeping',
      ownerPayouts: 'Eigentümer-Abrechnungen',
      filterAll: 'Alle Residenzen',
      statusReady: 'Bereit für Anreise',
      statusCleaning: 'Reinigung läuft',
      statusInspection: 'Inspektion ausstehend',
      statusMaintenance: 'Wartungsarbeiten',
      quickAction: 'Status ändern',
      guestName: 'Gast & Herkunft',
      dates: 'Aufenthaltszeitraum',
      villa: 'Villa',
      payout: 'Bruttobetrag',
      payment: 'Status',
      taskTitle: 'Aufgabendetails',
      assignee: 'Zuständig',
      markComplete: 'Abschließen',
      completed: 'Erledigt',
      addNewBooking: '+ Direkte VIP-Buchung',
    },
    footer: {
      tagline: 'VillaKu Management - Villa & Exclusive Living Property Management',
      privateOffice: 'Private Büros',
      locations: 'Bali (Seminyak & Uluwatu) • Singapur • Côte d’Azur • London Mayfair',
      contactConcierge: 'VIP-Concierge Hotline: +62 361 894 8888 | concierge@villaku-management.com',
      rights: 'Alle Rechte vorbehalten. Höchste Diskretion garantiert.',
      discretionAssurance: 'Zertifiziertes Mitglied der Internationalen Luxus-Villenmanagement-Gilde.',
    },
  },
  id: {
    nav: {
      sanctuaries: 'Koleksi Vila Mewah',
      services: 'Manajemen Properti',
      yieldCalculator: 'Kalkulator Imbal Hasil',
      managementDashboard: 'Dashboard Manajemen',
      switchGuestView: 'Tampilan Tamu',
      reserveNow: 'Reservasi Online',
    },
    hero: {
      tagline: 'Villa & Exclusive Living Property Management',
      titleLine1: 'Kemewahan Abadi',
      titleLine2: 'Seni Pengelolaan Vila & Hunian Elit',
      description: 'Koleksi vila tebing eksklusif, paviliun tepi pantai, dan oasis tropis asri. Dilengkapi sistem reservasi internasional real-time dan dashboard tata kelola aset properti bagi pemilik berkelas dunia.',
      exploreBtn: 'Jelajahi Koleksi Vila',
      ownerInquiry: 'Manajemen Aset Pemilik',
      searchVilla: 'Di mana Anda ingin beristirahat?',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Tamu',
      searchBtn: 'Cek Ketersediaan',
      anyCategory: 'Semua Gaya Arsitektur',
    },
    filters: {
      all: 'Semua Vila',
      clifftop: 'Vila Tebing Samudra',
      beachfront: 'Paviliun Tepi Pantai',
      jungle: 'Oasis Hutan Tropis',
      architectural: 'Mahakarya Modernis',
    },
    villaCard: {
      perNight: 'malam',
      bedrooms: 'Kamar Tidur',
      bathrooms: 'Kamar Mandi',
      guests: 'Tamu',
      viewDetails: 'Lihat Detail',
      reserve: 'Reservasi Cepat',
      butlerIncluded: 'Pelayan Pribadi 24 Jam',
      instantConfirmation: 'Konfirmasi VIP Instan',
    },
    details: {
      overview: 'Narasi Arsitektur',
      amenities: 'Fasilitas Unggulan',
      architecturalDetails: 'Spesifikasi Properti',
      gallery: 'Galeri Foto Resolusi Tinggi',
      viewGallery: 'Buka Galeri Layar Penuh',
      housekeepingStatus: 'Kesiapan Hunian',
      managedBy: 'Direktur Vila Khusus',
      reserveThisSanctuary: 'Reservasi Vila Ini',
      close: 'Tutup',
    },
    booking: {
      title: 'Reservasi Langsung & Gateway Pembayaran Internasional',
      stepDates: '1. Jadwal Menginap',
      stepConcierge: '2. Layanan Tambahan VIP',
      stepGuest: '3. Data Tamu',
      stepPayment: '4. Pembayaran Internasional',
      selectDates: 'Pilih Tanggal & Jumlah Tamu',
      nightlyRate: 'Tarif per malam',
      totalNights: 'Durasi menginap',
      bespokeAddons: 'Tingkatkan Pengalaman dengan Layanan Concierge Khusus',
      includedWithStay: 'Fasilitas Gratis Termasuk',
      personalDetails: 'Informasi Tamu Utama',
      fullName: 'Nama Lengkap Tamu',
      email: 'Alamat Email',
      phone: 'Nomor Ponsel / WhatsApp',
      country: 'Negara Asal',
      specialRequests: 'Permintaan Khusus & Preferensi Makanan',
      specialRequestsPlaceholder: 'Contoh: Sambutan sampanye dingin, check-in larut malam, menu vegetarian...',
      paymentMethod: 'Pilih Metode Pembayaran',
      cardDetails: 'Kartu Kredit / Debit (Stripe Global)',
      cardNumber: 'Nomor Kartu',
      cardExpiry: 'BB / TT',
      cardCvc: 'CVC / CVV',
      applePay: 'Apple Pay (Otorisasi Instan)',
      googlePay: 'Google Pay Express',
      bankTransfer: 'Transfer Bank SWIFT Internasional',
      paySecurely: 'Otorisasi & Konfirmasi Reservasi',
      breakdown: 'Rincian Reservasi',
      staySubtotal: 'Biaya Menginap',
      addonsSubtotal: 'Layanan Tambahan',
      luxuryServiceTax: 'Pajak & Layanan Mewah (10%)',
      greenTourismFee: 'Dana Konservasi Lingkungan',
      grandTotal: 'Total Pembayaran',
      confirmedTitle: 'Reservasi Terkonfirmasi & Bergaransi',
      confirmedDesc: 'Vila mewah Anda telah terkunci. Voucher resmi dan rencana perjalanan VIP telah dikirimkan ke email Anda.',
      bookingRef: 'Kode Referensi VIP',
      downloadVoucher: 'Cetak / Unduh Voucher Resmi',
      done: 'Selesai',
    },
    services: {
      badge: 'TATA KELOLA ASET TERPADU',
      heading: 'Manajemen Lengkap untuk Pemilik Vila Mewah',
      subheading: 'Kami memelihara aset properti bernilai tinggi, mengoptimalkan yield sewa global, dan menyajikan standar perhotelan bintang lima tanpa repot bagi Anda.',
      yieldTitle: 'Optimalisasi Imbal Hasil Dinamis',
      yieldDesc: 'Pendapatan sewa +28% lebih tinggi berkat penetapan harga dinamis berbasis data ke pasar wisatawan mancanegara (AS, Eropa, Australia).',
      turnkeyTitle: 'Perawatan Total Berstandar Tinggi',
      turnkeyDesc: 'Manajer vila berpengalaman, tim housekeeping bersertifikat, inspeksi teknis preventif berkala, dan perawatan kolam serta taman prima.',
      distributionTitle: 'Distribusi Pasar Mewah Dunia',
      distributionDesc: 'Pemasaran eksklusif di jaringan Marriott Homes & Villas, Airbnb Luxe, dan basis klien VIP langganan kami.',
      conciergeTitle: 'Layanan Concierge Eksklusif 24/7',
      conciergeDesc: 'Koki pribadi berkelas internasional, armada mobil mewah dengan sopir, hingga helikopter carter pribadi untuk tamu.',
      calcTitle: 'Kalkulator Simulasi Pendapatan Pemilik Vila',
      calcSubtitle: 'Hitung potensi pendapatan bersih tahunan properti Anda bersama VillaKu Management.',
      bedroomsLabel: 'Jumlah Kamar Tidur',
      locationLabel: 'Lokasi Vila',
      estGrossRev: 'Proyeksi Pendapatan Kotor Tahunan',
      managementFee: 'Biaya Pengelolaan VillaKu Management (15%)',
      netOwnerPayout: 'Pendapatan Bersih Pemilik per Tahun',
      projectedOccupancy: 'Proyeksi Tingkat Okupansi',
      requestProposal: 'Ajukan Audit Properti Rahasia',
    },
    dashboard: {
      title: 'Dashboard Pengelolaan Properti Real-Time',
      subtitle: 'Telemetri portofolio langsung, antrean reservasi tamu, kendali tarif dinamis, serta status kesiapan operasional seluruh properti.',
      livePortfolio: 'Telemetri Portofolio Real-Time',
      grossRevenue: 'Pendapatan Kotor (Bulan Ini)',
      occupancy: 'Tingkat Okupansi',
      adr: 'Rata-rata Tarif Harian (ADR)',
      revPar: 'Pendapatan per Kamar (RevPAR)',
      activeGuests: 'Tamu VIP yang Sedang Menginap',
      villasStatus: 'Status Kesiapan & Pembersihan Vila',
      liveBookings: 'Buku Reservasi Tamu Aktif',
      housekeepingTasks: 'Daftar Tugas Housekeeping & Teknisi',
      ownerPayouts: 'Laporan Finansial & Pembayaran Pemilik',
      filterAll: 'Semua Koleksi',
      statusReady: 'Siap untuk Tamu VIP',
      statusCleaning: 'Sedang Dibersihkan',
      statusInspection: 'Menunggu Inspeksi Manajer',
      statusMaintenance: 'Perawatan Berkala',
      quickAction: 'Ubah Status',
      guestName: 'Tamu & Asal Negara',
      dates: 'Jadwal Menginap',
      villa: 'Nama Vila',
      payout: 'Nilai Transaksi',
      payment: 'Status Bayar',
      taskTitle: 'Rincian Pekerjaan',
      assignee: 'Petugas',
      markComplete: 'Selesaikan',
      completed: 'Selesai',
      addNewBooking: '+ Input Reservasi VIP Baru',
    },
    footer: {
      tagline: 'VillaKu Management - Villa & Exclusive Living Property Management',
      privateOffice: 'Kantor Perwakilan Global',
      locations: 'Bali (Seminyak & Uluwatu) • Singapura • Côte d’Azur • London Mayfair',
      contactConcierge: 'Hotline Tamu VIP & Pemilik Properti: +62 361 894 8888 | concierge@villaku-management.com',
      rights: 'Hak cipta dilindungi undang-undang. Kerahasiaan & enkripsi mutlak terjamin.',
      discretionAssurance: 'Anggota resmi Asosiasi Manajemen Aset Vila & Hotel Mewah Internasional.',
    },
  },
};
