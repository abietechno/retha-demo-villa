import React from 'react';
import { Villa, CurrencyCode, LanguageCode } from '../types';
import { formatPrice } from '../utils/currency';
import { TRANSLATIONS } from '../utils/translations';
import {
  X,
  Bed,
  Bath,
  Users,
  Maximize2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Calendar,
  Eye,
  ArrowRight,
  MapPin,
} from 'lucide-react';

interface VillaDetailModalProps {
  villa: Villa | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (villa: Villa) => void;
  onOpenGallery: (villa: Villa, index: number) => void;
  currentCurrency: CurrencyCode;
  currentLanguage: LanguageCode;
}

export const VillaDetailModal: React.FC<VillaDetailModalProps> = ({
  villa,
  isOpen,
  onClose,
  onBook,
  onOpenGallery,
  currentCurrency,
  currentLanguage,
}) => {
  if (!isOpen || !villa) return null;

  const t = TRANSLATIONS[currentLanguage].details;
  const tCard = TRANSLATIONS[currentLanguage].villaCard;

  return (
    <div className="fixed inset-0 z-50 bg-[#07080A]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-sm bg-[#111318] border border-[#D4AF37]/35 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20 bg-[#14171F]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              {villa.category.toUpperCase()} ESTATE
            </span>
            <span className="text-[#555]">•</span>
            <span className="text-xs text-[#A8A49C] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              {villa.location}
            </span>
          </div>

          <button
            id="close-villa-details-btn"
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#A8A49C] hover:text-[#E8D39A] hover:bg-[#1E222C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 no-scrollbar flex-1">
          {/* Hero Banner with Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div
              onClick={() => onOpenGallery(villa, 0)}
              className="md:col-span-2 aspect-[16/10] rounded-sm overflow-hidden border border-[#D4AF37]/20 relative group cursor-pointer"
            >
              <img
                src={villa.heroImage}
                alt={villa.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E11]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F2EB]">{villa.name}</h2>
                  <p className="text-xs text-[#D1CEC7] mt-1">{villa.tagline}</p>
                </div>
                <span className="px-3 py-1.5 rounded-sm bg-[#0C0E11]/90 border border-[#D4AF37]/40 text-xs text-[#E8D39A] flex items-center gap-1.5 backdrop-blur-md">
                  <Eye className="w-3.5 h-3.5" />
                  {t.viewGallery}
                </span>
              </div>
            </div>

            {/* Right Stacked Gallery Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {villa.galleryImages.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenGallery(villa, idx + 1)}
                  className="aspect-[16/10] rounded-sm overflow-hidden border border-[#D4AF37]/20 relative group cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#0C0E11]/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-sm bg-[#161820] border border-[#2B303C]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#1E222B] text-[#D4AF37]">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#8E8A82] block">{tCard.bedrooms}</span>
                <span className="text-sm font-semibold text-[#EAE6DF]">{villa.bedrooms} Master Suites</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#1E222B] text-[#D4AF37]">
                <Bath className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#8E8A82] block">{tCard.bathrooms}</span>
                <span className="text-sm font-semibold text-[#EAE6DF]">{villa.bathrooms} Luxury Baths</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#1E222B] text-[#D4AF37]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#8E8A82] block">{tCard.guests}</span>
                <span className="text-sm font-semibold text-[#EAE6DF]">Max {villa.maxGuests} Guests</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-sm bg-[#1E222B] text-[#D4AF37]">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#8E8A82] block">Estate Area</span>
                <span className="text-sm font-semibold text-[#EAE6DF]">{villa.sqm} m² Built Area</span>
              </div>
            </div>
          </div>

          {/* Narrative Overview */}
          <div className="space-y-3">
            <h3 className="font-serif-luxury text-xl text-[#E8D39A] border-b border-[#282D39] pb-2">
              {t.overview}
            </h3>
            <p className="text-sm text-[#CCC8BE] leading-relaxed font-sans-modern">
              {villa.description}
            </p>
          </div>

          {/* Architectural Specifications & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-lg text-[#E8D39A] border-b border-[#282D39] pb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                {t.architecturalDetails}
              </h3>
              <ul className="space-y-2">
                {villa.architecturalHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#D1CEC7]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif-luxury text-lg text-[#E8D39A] border-b border-[#282D39] pb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                {t.amenities}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {villa.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#D1CEC7]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Estate Management & Dedicated Butler Info */}
          <div className="p-4 rounded-sm bg-[#161922] border border-[#D4AF37]/25 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#202532] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A8A49C] block">
                  {t.managedBy}
                </span>
                <span className="text-sm font-semibold text-[#F0EDE6]">
                  {villa.butlerName} (Estate Director)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#A8A49C] block">
                  {t.housekeepingStatus}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {villa.housekeepingStatus}
                </span>
              </div>

              <div className="text-right pl-4 border-l border-[#2B303C]">
                <span className="text-[10px] uppercase tracking-wider text-[#A8A49C] block">
                  Next Available
                </span>
                <span className="text-xs font-semibold text-[#EAE6DF]">
                  {villa.nextAvailableDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-5 border-t border-[#D4AF37]/25 bg-[#14171F] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8E8A82] block">
              Investment / Tariff
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif-luxury text-3xl font-medium text-[#F7F4EC]">
                {formatPrice(villa.pricePerNightUSD, currentCurrency)}
              </span>
              <span className="text-xs text-[#A8A49C]">/ {tCard.perNight}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-sm bg-[#1E222B] text-xs uppercase tracking-wider text-[#CCC8BE] hover:text-white transition-colors"
            >
              {t.close}
            </button>

            <button
              id="detail-modal-reserve-btn"
              onClick={() => {
                onClose();
                onBook(villa);
              }}
              className="px-7 py-2.5 rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#A38029] text-[#0C0E11] text-xs font-semibold uppercase tracking-[0.16em] hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all flex items-center gap-2"
            >
              <span>{t.reserveThisSanctuary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
