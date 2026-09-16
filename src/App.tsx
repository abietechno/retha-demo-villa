import React, { useState } from 'react';
import {
  Villa,
  Booking,
  ManagementTask,
  OwnerMetrics,
  CurrencyCode,
  LanguageCode,
  VillaCategory,
} from './types';
import {
  LUXURY_VILLAS,
  INITIAL_BOOKINGS,
  INITIAL_TASKS,
  INITIAL_METRICS,
} from './data/villasData';
import { TRANSLATIONS } from './utils/translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VillaCard } from './components/VillaCard';
import { VillaDetailModal } from './components/VillaDetailModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { ReservationModal } from './components/ReservationModal';
import { OwnerServicesSection } from './components/OwnerServicesSection';
import { ManagementDashboard } from './components/ManagementDashboard';
import { Footer } from './components/Footer';
import {
  Sparkles,
  SlidersHorizontal,
  Compass,
  CheckCircle,
  Building2,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  // Global App State
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('USD');
  const [activeView, setActiveView] = useState<'guest' | 'dashboard'>('guest');

  // Real-time Estate & Operational State
  const [villas, setVillas] = useState<Villa[]>(LUXURY_VILLAS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [tasks, setTasks] = useState<ManagementTask[]>(INITIAL_TASKS);
  const [metrics, setMetrics] = useState<OwnerMetrics>(INITIAL_METRICS);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<VillaCategory>('all');
  const [minGuests, setMinGuests] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals State
  const [detailModalVilla, setDetailModalVilla] = useState<Villa | null>(null);
  const [bookingModalVilla, setBookingModalVilla] = useState<Villa | null>(null);

  // Lightbox State
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    villa: Villa | null;
    activeIndex: number;
  }>({
    isOpen: false,
    villa: null,
    activeIndex: 0,
  });

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    actionLabel?: string;
    action?: () => void;
  } | null>(null);

  const showToast = (text: string, actionLabel?: string, action?: () => void) => {
    setToastMessage({ text, actionLabel, action });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === text ? null : prev));
    }, 5500);
  };

  const t = TRANSLATIONS[currentLanguage];

  // Filter Villas
  const filteredVillas = villas.filter((villa) => {
    const matchesCategory =
      selectedCategory === 'all' || villa.category === selectedCategory;
    const matchesGuests = villa.maxGuests >= minGuests;
    const matchesQuery =
      searchQuery === '' ||
      villa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      villa.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      villa.region.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesGuests && matchesQuery;
  });

  // Handlers
  const handleLanguageChange = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    showToast(`Language switched to ${lang.toUpperCase()}`);
  };

  const handleCurrencyChange = (curr: CurrencyCode) => {
    setCurrentCurrency(curr);
    showToast(`Live Currency updated to ${curr}`);
  };

  const handleSearchFromHero = (category: VillaCategory, guests: number, query: string) => {
    setSelectedCategory(category);
    setMinGuests(guests);
    setSearchQuery(query);
  };

  const handleOpenGallery = (villa: Villa, startIndex: number = 0) => {
    setLightboxState({
      isOpen: true,
      villa,
      activeIndex: startIndex,
    });
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);

    // Update real-time metrics
    setMetrics((prev) => ({
      ...prev,
      totalRevenueUSD: prev.totalRevenueUSD + newBooking.totalUSD,
      checkedInGuests: prev.checkedInGuests + newBooking.guestsCount,
      portfolioOccupancy: Math.min(96.8, prev.portfolioOccupancy + 1.2),
    }));

    // Update villa occupancy status
    setVillas((prev) =>
      prev.map((v) =>
        v.id === newBooking.villaId
          ? {
              ...v,
              currentOccupancy: 'Reserved',
              housekeepingStatus: 'Ready',
            }
          : v
      )
    );

    showToast(
      `Reservation ${newBooking.id} secured! Synced to Management Portal.`,
      'View in Portal',
      () => setActiveView('dashboard')
    );
  };

  const handleUpdateVillaStatus = (
    villaId: string,
    newStatus: Villa['housekeepingStatus']
  ) => {
    setVillas((prev) =>
      prev.map((v) => (v.id === villaId ? { ...v, housekeepingStatus: newStatus } : v))
    );
    showToast(`Villa readiness updated to "${newStatus}" in real-time.`);
  };

  const handleToggleTaskCompleted = (taskId: string) => {
    setTasks((prev) =>
      prev.map((tk) => (tk.id === taskId ? { ...tk, completed: !tk.completed } : tk))
    );
  };

  const handleAddDirectBooking = (booking: Booking) => {
    handleBookingConfirmed(booking);
    showToast(`Direct walk-in reservation ${booking.id} issued successfully.`);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0E11] text-[#E6E4DF] flex flex-col font-sans-modern antialiased selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        currentCurrency={currentCurrency}
        onCurrencyChange={handleCurrencyChange}
        activeView={activeView}
        onToggleView={setActiveView}
        onScrollTo={scrollToSection}
      />

      {/* Main View Router */}
      {activeView === 'guest' ? (
        <main className="flex-1">
          {/* Editorial Hero */}
          <Hero
            currentLanguage={currentLanguage}
            onSearch={handleSearchFromHero}
            onExploreClick={() => scrollToSection('sanctuaries-section')}
            onOwnerClick={() => scrollToSection('services-section')}
          />

          {/* Curated Sanctuaries Section */}
          <section
            id="sanctuaries-section"
            className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12"
          >
            {/* Header and Style Filter Pill Nav */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D4AF37]/20 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>THE PRIVATE PORTFOLIO</span>
                </div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#F7F5F0]">
                  Architectural Sanctuaries
                </h2>
                <p className="text-xs text-[#9E9A92] max-w-md font-light">
                  Hand-selected private residences with dedicated estate directors, bespoke culinary teams, and guaranteed exclusivity.
                </p>
              </div>

              {/* Architectural Category Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {(['all', 'clifftop', 'beachfront', 'jungle', 'architectural'] as VillaCategory[]).map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-sm text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#D4AF37] text-[#0C0E11] font-semibold shadow-md shadow-[#D4AF37]/20'
                          : 'bg-[#151820] text-[#8E8A82] hover:text-[#CCC8BE] border border-[#2B303C]'
                      }`}
                    >
                      {t.filters[cat]}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Active search query feedback */}
            {(searchQuery || minGuests > 1 || selectedCategory !== 'all') && (
              <div className="flex items-center justify-between text-xs text-[#8E8A82] bg-[#12141A] px-4 py-2 rounded border border-[#262B37]">
                <span>
                  Showing {filteredVillas.length} of {villas.length} sanctuaries matching your preferences
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setMinGuests(1);
                    setSearchQuery('');
                  }}
                  className="text-[#D4AF37] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Villa Grid Presentation */}
            {filteredVillas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVillas.map((villa) => (
                  <VillaCard
                    key={villa.id}
                    villa={villa}
                    currentCurrency={currentCurrency}
                    currentLanguage={currentLanguage}
                    onSelectVilla={(v) => setDetailModalVilla(v)}
                    onBookVilla={(v) => setBookingModalVilla(v)}
                    onOpenGallery={handleOpenGallery}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-4 border border-[#262B37] rounded-sm bg-[#121419]">
                <h3 className="font-serif-luxury text-2xl text-[#EAE6DF]">No sanctuaries match your criteria</h3>
                <p className="text-xs text-[#8E8A82]">
                  Try adjusting your architectural style filter or party size requirement.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setMinGuests(1);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#D4AF37] text-[#0C0E11] text-xs font-semibold rounded-sm"
                >
                  Reset Portfolio Filter
                </button>
              </div>
            )}
          </section>

          {/* Turnkey Owner Asset Management & Yield Calculator */}
          <OwnerServicesSection
            currentCurrency={currentCurrency}
            currentLanguage={currentLanguage}
            onOpenDashboard={() => setActiveView('dashboard')}
          />
        </main>
      ) : (
        /* Real-Time Management Dashboard */
        <ManagementDashboard
          villas={villas}
          bookings={bookings}
          tasks={tasks}
          metrics={metrics}
          currentCurrency={currentCurrency}
          currentLanguage={currentLanguage}
          onUpdateVillaStatus={handleUpdateVillaStatus}
          onToggleTaskCompleted={handleToggleTaskCompleted}
          onAddDirectBooking={handleAddDirectBooking}
          onReturnToGuestView={() => setActiveView('guest')}
        />
      )}

      {/* Universal Footer */}
      <Footer
        currentLanguage={currentLanguage}
        currentCurrency={currentCurrency}
        onOpenOwnerSection={() => {
          setActiveView('guest');
          scrollToSection('services-section');
        }}
        onOpenDashboard={() => setActiveView('dashboard')}
      />

      {/* Villa Narrative Details Modal */}
      <VillaDetailModal
        villa={detailModalVilla}
        isOpen={Boolean(detailModalVilla)}
        onClose={() => setDetailModalVilla(null)}
        onBook={(villa) => {
          setDetailModalVilla(null);
          setBookingModalVilla(villa);
        }}
        onOpenGallery={(villa, idx) => handleOpenGallery(villa, idx)}
        currentCurrency={currentCurrency}
        currentLanguage={currentLanguage}
      />

      {/* Online Reservation & International Payment Gateway Modal */}
      <ReservationModal
        villa={bookingModalVilla}
        isOpen={Boolean(bookingModalVilla)}
        onClose={() => setBookingModalVilla(null)}
        onBookingConfirmed={handleBookingConfirmed}
        currentCurrency={currentCurrency}
        currentLanguage={currentLanguage}
      />

      {/* High-Resolution Photo Gallery Lightbox */}
      <GalleryLightbox
        villa={lightboxState.villa}
        activeImageIndex={lightboxState.activeIndex}
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState({ isOpen: false, villa: null, activeIndex: 0 })}
        onNext={() => {
          if (!lightboxState.villa) return;
          const len = lightboxState.villa.galleryImages.length;
          setLightboxState((prev) => ({
            ...prev,
            activeIndex: (prev.activeIndex + 1) % len,
          }));
        }}
        onPrev={() => {
          if (!lightboxState.villa) return;
          const len = lightboxState.villa.galleryImages.length;
          setLightboxState((prev) => ({
            ...prev,
            activeIndex: (prev.activeIndex - 1 + len) % len,
          }));
        }}
        onSelectIndex={(idx) =>
          setLightboxState((prev) => ({ ...prev, activeIndex: idx }))
        }
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-sm bg-[#141720] border border-[#D4AF37]/50 shadow-2xl p-4 flex items-center gap-3 animate-slideUp text-xs max-w-md">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[#F5F2EB] flex-1">{toastMessage.text}</span>
          {toastMessage.actionLabel && toastMessage.action && (
            <button
              onClick={() => {
                toastMessage.action!();
                setToastMessage(null);
              }}
              className="px-2.5 py-1 rounded bg-[#D4AF37] text-[#0C0E11] font-semibold text-[11px] hover:bg-[#E2C052] transition-colors"
            >
              {toastMessage.actionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
