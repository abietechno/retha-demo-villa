import React from 'react';
import { Villa, CurrencyCode, LanguageCode } from '../types';
import { formatPrice } from '../utils/currency';
import { TRANSLATIONS } from '../utils/translations';
import {
  Bed,
  Bath,
  Users,
  Maximize2,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface VillaCardProps {
  villa: Villa;
  currentCurrency: CurrencyCode;
  currentLanguage: LanguageCode;
  onSelectVilla: (villa: Villa) => void;
  onBookVilla: (villa: Villa) => void;
  onOpenGallery: (villa: Villa, startIndex?: number) => void;
}

export const VillaCard: React.FC<VillaCardProps> = ({
  villa,
  currentCurrency,
  currentLanguage,
  onSelectVilla,
  onBookVilla,
  onOpenGallery,
}) => {
  const t = TRANSLATIONS[currentLanguage].villaCard;

  return (
    <div
      id={`villa-card-${villa.id}`}
      className="group relative rounded-sm bg-[#121419] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-500 overflow-hidden flex flex-col shadow-xl"
    >
      {/* Visual Presentation Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1D24]">
        <img
          src={villa.heroImage}
          alt={villa.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-sm bg-[#0C0E11]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[10px] uppercase tracking-wider text-[#E8D39A] font-semibold">
            {villa.region}
          </span>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#0C0E11]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[11px] text-[#F5F2EC]">
            <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span className="font-semibold">{villa.rating.toFixed(2)}</span>
            <span className="text-[#8E8A82]">({villa.reviewsCount})</span>
          </div>
        </div>

        {/* Floating Quick Gallery Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenGallery(villa, 0);
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-sm bg-[#0C0E11]/85 hover:bg-[#1B1E26] backdrop-blur-md border border-[#D4AF37]/30 text-[11px] text-[#E8D39A] flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity"
          title="Open high-resolution gallery"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{villa.galleryImages.length} High-Res Photos</span>
        </button>

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#121419] to-transparent pointer-events-none" />
      </div>

      {/* Narrative & Details Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location & Title */}
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-sans-modern font-medium">
              {villa.location}
            </span>
            <h3
              onClick={() => onSelectVilla(villa)}
              className="font-serif-luxury text-2xl text-[#F5F2EB] group-hover:text-[#E8D39A] transition-colors cursor-pointer leading-tight"
            >
              {villa.name}
            </h3>
          </div>

          {/* Tagline */}
          <p className="text-xs text-[#A8A49C] line-clamp-2 mt-2 leading-relaxed">
            {villa.tagline}
          </p>

          {/* Key Architectural Specifications */}
          <div className="grid grid-cols-4 gap-2 pt-4 pb-2 border-y border-[#20242E] my-3 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[11px] text-[#D1CEC7] font-medium flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-[#D4AF37]" />
                {villa.bedrooms}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#7E7A72]">{t.bedrooms}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-[11px] text-[#D1CEC7] font-medium flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-[#D4AF37]" />
                {villa.bathrooms}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#7E7A72]">{t.bathrooms}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-[11px] text-[#D1CEC7] font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                {villa.maxGuests}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#7E7A72]">{t.guests}</span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="text-[11px] text-[#D1CEC7] font-medium flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                {villa.sqm}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#7E7A72]">m²</span>
            </div>
          </div>

          {/* Signature Inclusions */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[#1A1D24] text-[10px] text-[#CCC8BE] border border-[#2B303C]">
              <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
              {t.butlerIncluded}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[#1A1D24] text-[10px] text-[#CCC8BE] border border-[#2B303C]">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
              {t.instantConfirmation}
            </span>
          </div>
        </div>

        {/* Pricing and CTAs */}
        <div className="pt-3 border-t border-[#20242E] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#7E7A72] block">
              Tariff
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif-luxury text-2xl font-medium text-[#F7F4EC]">
                {formatPrice(villa.pricePerNightUSD, currentCurrency)}
              </span>
              <span className="text-[11px] text-[#8E8A82]">/ {t.perNight}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectVilla(villa)}
              className="px-3 py-2 rounded-sm bg-[#181B22] hover:bg-[#222731] border border-[#2E3341] text-[11px] uppercase tracking-wider text-[#D1CEC7] font-medium transition-colors"
              title={t.viewDetails}
            >
              {t.viewDetails}
            </button>

            <button
              id={`reserve-villa-btn-${villa.id}`}
              onClick={() => onBookVilla(villa)}
              className="px-4 py-2 rounded-sm bg-gradient-to-r from-[#D4AF37] to-[#B8962E] hover:from-[#E2C052] hover:to-[#C6A238] text-[#0C0E11] text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-md shadow-[#D4AF37]/15 flex items-center gap-1.5"
            >
              <span>{t.reserve}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
