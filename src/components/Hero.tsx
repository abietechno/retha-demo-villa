import React, { useState } from 'react';
import { LanguageCode, VillaCategory } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import {
  Calendar,
  Users,
  Search,
  Sparkles,
  Shield,
  Award,
  ChevronRight,
  Compass,
} from 'lucide-react';

interface HeroProps {
  currentLanguage: LanguageCode;
  onSearch: (category: VillaCategory, guests: number, query: string) => void;
  onExploreClick: () => void;
  onOwnerClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLanguage,
  onSearch,
  onExploreClick,
  onOwnerClick,
}) => {
  const t = TRANSLATIONS[currentLanguage].hero;

  const [selectedCategory, setSelectedCategory] = useState<VillaCategory>('all');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<string>('2026-10-01');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-10-08');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCategory, guestsCount, searchQuery);
    onExploreClick();
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#0C0E11]">
      {/* Editorial Luxury Image Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2200&q=90"
          alt="Luxury Bali clifftop villa estate"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.08] transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E11] via-[#0C0E11]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0E11]/90 via-[#0C0E11]/40 to-[#0C0E11]/80" />
      </div>

      {/* Subtle Hairline Frame Lines */}
      <div className="absolute inset-x-8 top-6 bottom-6 border border-[#D4AF37]/15 pointer-events-none hidden md:block" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 flex-1 flex flex-col justify-center">
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm bg-[#16181F]/80 border border-[#D4AF37]/35 w-fit mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.26em] text-[#E8D39A] font-sans-modern font-semibold">
            {t.tagline}
          </span>
        </div>

        {/* Hero Headline */}
        <div className="max-w-4xl space-y-3">
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F7F5F0] leading-[1.08]">
            {t.titleLine1}{' '}
            <span className="italic font-normal text-[#E8D39A] underline decoration-[#D4AF37]/40 decoration-1 underline-offset-8">
              {t.titleLine2}
            </span>
          </h1>

          <p className="max-w-2xl text-[#CCC8BE] text-base sm:text-lg font-light leading-relaxed font-sans-modern pt-3">
            {t.description}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-8">
          <button
            id="hero-explore-portfolio-btn"
            onClick={onExploreClick}
            className="px-7 py-3.5 rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#A38029] text-[#0C0E11] font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/25 hover:brightness-110 flex items-center gap-2"
          >
            <span>{t.exploreBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            id="hero-owner-inquiry-btn"
            onClick={onOwnerClick}
            className="px-7 py-3.5 rounded-sm bg-[#15181E]/90 border border-[#D4AF37]/40 text-[#EAE6DF] hover:text-[#E8D39A] hover:border-[#D4AF37] text-xs uppercase tracking-[0.2em] font-medium transition-all backdrop-blur-sm flex items-center gap-2"
          >
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{t.ownerInquiry}</span>
          </button>
        </div>

        {/* Floating Reservation Search Console */}
        <div className="mt-14 w-full max-w-5xl rounded-sm bg-[#121419]/95 border border-[#D4AF37]/35 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search query / location */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-[#A8A49C] font-semibold flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#D4AF37]" />
                {t.searchVilla}
              </label>
              <input
                type="text"
                placeholder="Uluwatu, Canggu, Ubud..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1D24] border border-[#2B303C] focus:border-[#D4AF37] text-[#EAE6DF] text-xs rounded-sm px-3 py-2.5 outline-none transition-colors"
              />
            </div>

            {/* Check-in */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-[#A8A49C] font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D4AF37]" />
                {t.checkIn}
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-[#1A1D24] border border-[#2B303C] focus:border-[#D4AF37] text-[#EAE6DF] text-xs rounded-sm px-3 py-2.5 outline-none transition-colors"
              />
            </div>

            {/* Check-out */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-[#A8A49C] font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D4AF37]" />
                {t.checkOut}
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full bg-[#1A1D24] border border-[#2B303C] focus:border-[#D4AF37] text-[#EAE6DF] text-xs rounded-sm px-3 py-2.5 outline-none transition-colors"
              />
            </div>

            {/* Guests */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-[#A8A49C] font-semibold flex items-center gap-1">
                <Users className="w-3 h-3 text-[#D4AF37]" />
                {t.guests}
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full bg-[#1A1D24] border border-[#2B303C] focus:border-[#D4AF37] text-[#EAE6DF] text-xs rounded-sm px-3 py-2.5 outline-none transition-colors"
              >
                <option value={2}>2 Guests (Couple Suite)</option>
                <option value={4}>4 Guests (Family / Friends)</option>
                <option value={6}>6 Guests (Private Estate)</option>
                <option value={8}>8 Guests (Grand Villa)</option>
                <option value={12}>10+ Guests (Full Compound)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                id="search-availability-submit-btn"
                className="w-full bg-[#D4AF37] hover:bg-[#E2C052] text-[#0C0E11] font-semibold text-xs uppercase tracking-wider py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.searchBtn}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Trust Telemetry */}
      <div className="relative z-10 w-full border-t border-[#D4AF37]/15 bg-[#0A0B0E]/85 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif-luxury text-xl sm:text-2xl text-[#E8D39A]">$140M+</span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9E9A90]">
              Private Assets Managed
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif-luxury text-xl sm:text-2xl text-[#E8D39A]">4.98 / 5.0</span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9E9A90]">
              Global Guest Satisfaction
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif-luxury text-xl sm:text-2xl text-[#E8D39A]">+28.4%</span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9E9A90]">
              Average Owner ADR Uplift
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif-luxury text-xl sm:text-2xl text-[#E8D39A]">24/7</span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#9E9A90]">
              Discreet Private Concierge
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
