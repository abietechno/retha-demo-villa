export type CurrencyCode = 'USD' | 'EUR' | 'AUD' | 'GBP' | 'IDR';

export type LanguageCode = 'en' | 'fr' | 'de' | 'id';

export type VillaCategory = 'all' | 'clifftop' | 'beachfront' | 'jungle' | 'architectural';

export interface Villa {
  id: string;
  name: string;
  tagline: string;
  location: string;
  region: string;
  category: 'clifftop' | 'beachfront' | 'jungle' | 'architectural';
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  sqm: number;
  pricePerNightUSD: number;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
  architecturalHighlights: string[];
  description: string;
  housekeepingStatus: 'Ready' | 'In Cleaning' | 'Inspection Pending' | 'Scheduled Maintenance';
  currentOccupancy: 'Vacant' | 'Occupied' | 'Reserved';
  managedSince: string;
  occupancyRatePercent: number;
  monthlyRevenueUSD: number;
  nextAvailableDate: string;
  butlerName: string;
}

export interface AddOnService {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  unit: string;
  category: 'culinary' | 'transport' | 'wellness' | 'excursion';
  icon: string;
}

export interface Booking {
  id: string;
  villaId: string;
  villaName: string;
  villaImage: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry: string;
  guestCountryCode: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  nights: number;
  baseRateUSD: number;
  totalUSD: number;
  currency: CurrencyCode;
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'Google Pay' | 'SWIFT Wire';
  paymentStatus: 'Paid' | 'Authorized' | 'Pending';
  bookingStatus: 'Confirmed' | 'Checked In' | 'Checked Out' | 'Upcoming';
  specialRequests?: string;
  selectedAddOns: string[];
  createdAt: string;
}

export interface ManagementTask {
  id: string;
  villaId: string;
  villaName: string;
  title: string;
  priority: 'urgent' | 'high' | 'normal';
  category: 'housekeeping' | 'pool & garden' | 'engineering' | 'guest concierge';
  assignee: string;
  dueTime: string;
  completed: boolean;
}

export interface OwnerMetrics {
  totalVillas: number;
  totalRevenueUSD: number;
  portfolioOccupancy: number;
  averageDailyRateUSD: number;
  revPARUSD: number;
  checkedInGuests: number;
  housekeepingReadyPercent: number;
}
