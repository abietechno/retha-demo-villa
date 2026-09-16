import React, { useEffect, useCallback } from 'react';
import { Villa } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize, Camera } from 'lucide-react';

interface GalleryLightboxProps {
  villa: Villa | null;
  activeImageIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  villa,
  activeImageIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onSelectIndex,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !villa) return null;

  const images = villa.galleryImages.length > 0 ? villa.galleryImages : [villa.heroImage];
  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#07080A]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10 border-b border-[#D4AF37]/20 pb-4">
        <div className="flex items-center gap-3">
          <Camera className="w-4 h-4 text-[#D4AF37]" />
          <div>
            <h3 className="font-serif-luxury text-lg text-[#F5F2EB]">{villa.name}</h3>
            <p className="text-xs text-[#A8A49C]">
              {villa.location} • High-Resolution Architectural Photography
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest">
            {activeImageIndex + 1} / {images.length}
          </span>
          <button
            id="close-lightbox-btn"
            onClick={onClose}
            className="p-2 rounded-sm bg-[#161920] border border-[#D4AF37]/30 text-[#EAE6DF] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        <button
          id="lightbox-prev-btn"
          onClick={onPrev}
          className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-[#121419]/80 border border-[#D4AF37]/40 text-[#EAE6DF] hover:text-[#D4AF37] hover:scale-110 transition-all backdrop-blur-md"
          title="Previous Image (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Current Image */}
        <div className="max-w-5xl max-h-[72vh] rounded-sm overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#0F1116] flex items-center justify-center">
          <img
            src={currentImage}
            alt={`${villa.name} detail view ${activeImageIndex + 1}`}
            className="max-h-[72vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Next Button */}
        <button
          id="lightbox-next-btn"
          onClick={onNext}
          className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-[#121419]/80 border border-[#D4AF37]/40 text-[#EAE6DF] hover:text-[#D4AF37] hover:scale-110 transition-all backdrop-blur-md"
          title="Next Image (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="border-t border-[#D4AF37]/20 pt-4 flex items-center justify-center gap-3 overflow-x-auto no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onSelectIndex(idx)}
            className={`relative w-20 h-14 rounded-sm overflow-hidden border transition-all flex-shrink-0 ${
              activeImageIndex === idx
                ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 scale-105 opacity-100'
                : 'border-[#262B37] opacity-50 hover:opacity-80'
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
