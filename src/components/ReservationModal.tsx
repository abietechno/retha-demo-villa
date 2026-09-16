import React, { useState, useMemo } from 'react';
import { Villa, Booking, CurrencyCode, LanguageCode, AddOnService } from '../types';
import { BESPOKE_ADDONS } from '../data/villasData';
import { formatPrice } from '../utils/currency';
import { TRANSLATIONS } from '../utils/translations';
import {
  X,
  Calendar,
  Users,
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Lock,
  Printer,
  FileCheck,
  ArrowRight,
  DollarSign,
  Utensils,
  Plane,
  Car,
  Compass,
} from 'lucide-react';

interface ReservationModalProps {
  villa: Villa | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (newBooking: Booking) => void;
  currentCurrency: CurrencyCode;
  currentLanguage: LanguageCode;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  villa,
  isOpen,
  onClose,
  onBookingConfirmed,
  currentCurrency,
  currentLanguage,
}) => {
  if (!isOpen || !villa) return null;

  const t = TRANSLATIONS[currentLanguage].booking;

  const [step, setStep] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<string>('2026-10-10');
  const [checkOut, setCheckOut] = useState<string>('2026-10-17');
  const [guestsCount, setGuestsCount] = useState<number>(Math.min(4, villa.maxGuests));
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([
    'private-michelin-chef',
    'helicopter-tarmac-transfer',
  ]);

  // Guest Details
  const [fullName, setFullName] = useState<string>('Lord Alexander Campbell');
  const [email, setEmail] = useState<string>('alexander.campbell@highland-capital.com');
  const [phone, setPhone] = useState<string>('+44 7700 900382');
  const [country, setCountry] = useState<string>('United Kingdom');
  const [specialRequests, setSpecialRequests] = useState<string>(
    'Prefer vintage champagne upon arrival. Late night arrival approx 23:30.'
  );

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'wire'>('card');
  const [cardNumber, setCardNumber] = useState<string>('4242 •••• •••• 9812');
  const [cardExpiry, setCardExpiry] = useState<string>('08/29');
  const [cardCvc, setCardCvc] = useState<string>('842');
  const [cardHolder, setCardHolder] = useState<string>('ALEXANDER CAMPBELL');

  // Processing & Confirmation state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Calculate nights
  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 7;
  }, [checkIn, checkOut]);

  // Financial Breakdown
  const accommodationSubtotalUSD = villa.pricePerNightUSD * nights;

  const addonsSubtotalUSD = useMemo(() => {
    return selectedAddOnIds.reduce((total, id) => {
      const addon = BESPOKE_ADDONS.find((a) => a.id === id);
      if (!addon) return total;
      if (addon.unit.includes('per guest')) {
        return total + addon.priceUSD * guestsCount;
      }
      return total + addon.priceUSD;
    }, 0);
  }, [selectedAddOnIds, guestsCount]);

  const luxuryTaxUSD = Math.round((accommodationSubtotalUSD + addonsSubtotalUSD) * 0.1);
  const greenFeeUSD = 75;
  const grandTotalUSD = accommodationSubtotalUSD + addonsSubtotalUSD + luxuryTaxUSD + greenFeeUSD;

  const toggleAddOn = (id: string) => {
    if (selectedAddOnIds.includes(id)) {
      setSelectedAddOnIds(selectedAddOnIds.filter((item) => item !== id));
    } else {
      setSelectedAddOnIds([...selectedAddOnIds, id]);
    }
  };

  const getAddOnIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-[#D4AF37]" />;
      case 'Plane':
        return <Plane className="w-4 h-4 text-[#D4AF37]" />;
      case 'Car':
        return <Car className="w-4 h-4 text-[#D4AF37]" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#D4AF37]" />;
      default:
        return <Compass className="w-4 h-4 text-[#D4AF37]" />;
    }
  };

  const handleAuthorizePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const referenceId = `VL-${Math.floor(1000 + Math.random() * 9000)}-${country.slice(0, 3).toUpperCase()}`;
      const newBooking: Booking = {
        id: referenceId,
        villaId: villa.id,
        villaName: villa.name,
        villaImage: villa.heroImage,
        guestName: fullName,
        guestEmail: email,
        guestPhone: phone,
        guestCountry: country,
        guestCountryCode: country.slice(0, 2).toUpperCase(),
        checkIn,
        checkOut,
        guestsCount,
        nights,
        baseRateUSD: villa.pricePerNightUSD,
        totalUSD: grandTotalUSD,
        currency: currentCurrency,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card'
            : paymentMethod === 'apple_pay'
            ? 'Apple Pay'
            : paymentMethod === 'google_pay'
            ? 'Google Pay'
            : 'SWIFT Wire',
        paymentStatus: 'Paid',
        bookingStatus: 'Confirmed',
        specialRequests,
        selectedAddOns: selectedAddOnIds
          .map((id) => BESPOKE_ADDONS.find((a) => a.id === id)?.name || '')
          .filter(Boolean),
        createdAt: new Date().toISOString().split('T')[0],
      };

      setConfirmedBooking(newBooking);
      onBookingConfirmed(newBooking);
      setIsProcessing(false);
      setStep(5); // Confirmation Screen
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07080A]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-sm bg-[#111318] border border-[#D4AF37]/35 shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20 bg-[#14171F]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              VILLAKU MANAGEMENT RESERVATION
            </span>
            <span className="text-[#555] hidden sm:inline">•</span>
            <span className="text-xs text-[#A8A49C] hidden sm:inline">{villa.name}</span>
          </div>

          <button
            id="close-reservation-btn"
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#A8A49C] hover:text-[#E8D39A] hover:bg-[#1E222C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress (Steps 1 to 4) */}
        {step <= 4 && (
          <div className="px-6 py-3 bg-[#0F1116] border-b border-[#202532] flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-6 text-xs">
              <span
                onClick={() => setStep(1)}
                className={`cursor-pointer transition-colors ${
                  step === 1 ? 'text-[#D4AF37] font-semibold' : 'text-[#7E7A72]'
                }`}
              >
                {t.stepDates}
              </span>
              <span className="text-[#333]">&gt;</span>
              <span
                onClick={() => setStep(2)}
                className={`cursor-pointer transition-colors ${
                  step === 2 ? 'text-[#D4AF37] font-semibold' : 'text-[#7E7A72]'
                }`}
              >
                {t.stepConcierge}
              </span>
              <span className="text-[#333]">&gt;</span>
              <span
                onClick={() => setStep(3)}
                className={`cursor-pointer transition-colors ${
                  step === 3 ? 'text-[#D4AF37] font-semibold' : 'text-[#7E7A72]'
                }`}
              >
                {t.stepGuest}
              </span>
              <span className="text-[#333]">&gt;</span>
              <span
                onClick={() => setStep(4)}
                className={`cursor-pointer transition-colors ${
                  step === 4 ? 'text-[#D4AF37] font-semibold' : 'text-[#7E7A72]'
                }`}
              >
                {t.stepPayment}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#8E8A82]">
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              <span>256-bit Encrypted</span>
            </div>
          </div>
        )}

        {/* Modal Main Body */}
        <div className="overflow-y-auto p-6 flex-1 no-scrollbar space-y-6">
          {/* STEP 1: DATES & PARTY SIZE */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-2xl text-[#F5F2EB]">{t.selectDates}</h3>
                <p className="text-xs text-[#A8A49C]">
                  Configure your itinerary at {villa.name}. Minimum duration: 3 nights.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#181B22] border border-[#2F3443] focus:border-[#D4AF37] text-[#EAE6DF] text-sm rounded-sm px-3.5 py-3 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#181B22] border border-[#2F3443] focus:border-[#D4AF37] text-[#EAE6DF] text-sm rounded-sm px-3.5 py-3 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Party Size (Guests)
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-[#181B22] border border-[#2F3443] focus:border-[#D4AF37] text-[#EAE6DF] text-sm rounded-sm px-3.5 py-3 outline-none"
                  >
                    {Array.from({ length: villa.maxGuests }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'} (Max {villa.maxGuests})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Villa Stay Summary Card */}
              <div className="p-4 rounded-sm bg-[#161820] border border-[#D4AF37]/25 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={villa.heroImage}
                    alt={villa.name}
                    className="w-16 h-12 object-cover rounded-sm border border-[#2E3341]"
                  />
                  <div>
                    <h4 className="font-serif-luxury text-lg text-[#F5F2EB]">{villa.name}</h4>
                    <span className="text-xs text-[#8E8A82]">
                      {nights} Nights • {guestsCount} Guests
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#8E8A82] block">Accommodation Subtotal</span>
                  <span className="font-serif-luxury text-xl text-[#E8D39A] font-semibold">
                    {formatPrice(accommodationSubtotalUSD, currentCurrency)}
                  </span>
                </div>
              </div>

              {/* Complimentary Inclusions */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {t.includedWithStay}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#CCC8BE]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dedicated 24/7 Butler & Housekeeping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Daily Gourmet A La Carte Breakfast for All Guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Welcome Vintage Champagne & Chilled Towels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>High-Speed Starlink Satellite WiFi</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BESPOKE CONCIERGE ADDONS */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-2xl text-[#F5F2EB]">{t.bespokeAddons}</h3>
                <p className="text-xs text-[#A8A49C]">
                  Curate extraordinary moments prior to arrival. All services orchestrated by our Private Concierge.
                </p>
              </div>

              <div className="space-y-3">
                {BESPOKE_ADDONS.map((addon) => {
                  const isSelected = selectedAddOnIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-4 rounded-sm border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                        isSelected
                          ? 'bg-[#181B24] border-[#D4AF37] ring-1 ring-[#D4AF37]/30'
                          : 'bg-[#14161E] border-[#262B37] hover:border-[#D4AF37]/40'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-sm bg-[#1E222D] border border-[#2E3341] flex-shrink-0">
                          {getAddOnIcon(addon.icon)}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-[#F5F2EB]">{addon.name}</h4>
                          <p className="text-xs text-[#9E9A92] leading-relaxed">{addon.description}</p>
                          <span className="text-[11px] text-[#D4AF37] font-medium block pt-0.5">
                            {formatPrice(addon.priceUSD, currentCurrency)} {addon.unit}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center pt-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-5 h-5 accent-[#D4AF37] cursor-pointer"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: LEAD GUEST INFORMATION */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-2xl text-[#F5F2EB]">{t.personalDetails}</h3>
                <p className="text-xs text-[#A8A49C]">
                  Please enter your credentials for official reservation registration and customs coordination.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#181B22] border border-[#2F3443] focus:border-[#D4AF37] text-[#EAE6DF] text-sm rounded-sm px-3.5 py-2.5 outline-none"
                    placeholder="e.g. Julian Von Berg"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181B22] border border-[#2F3443] focus:border-[#D4AF37] text-[#EAE6DF] text-sm rounded-sm px-3.5 py-2.5 outline-none"
                    placeholder="julian@holding.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold">
                    {t.phone}
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#181B22] border border-[#2F3443] focus:border-[#D4AF37] text-[#EAE6DF] text-sm rounded-sm px-3.5 py-2.5 outline-none"
                    placeholder="+44 7700 900382"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold">
                    {t.country}
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#181B22] border border-[#2F3443] focus:border-[#D4AF37] text-[#EAE6DF] text-sm rounded-sm px-3.5 py-2.5 outline-none"
                    placeholder="United Kingdom / United States / Germany"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold">
                  {t.specialRequests}
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#181B22] border border-[#2F3443] focus:border-[#D4AF37] text-[#EAE6DF] text-xs rounded-sm p-3 outline-none"
                  placeholder={t.specialRequestsPlaceholder}
                />
              </div>
            </div>
          )}

          {/* STEP 4: INTERNATIONAL PAYMENT GATEWAY */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-2xl text-[#F5F2EB]">{t.paymentMethod}</h3>
                <p className="text-xs text-[#A8A49C]">
                  Select your preferred international payment gateway. All transactions protected with PCI DSS Level 1 encryption.
                </p>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-sm border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#1C202B] border-[#D4AF37] text-[#E8D39A]'
                      : 'bg-[#151820] border-[#2A2F3D] text-[#8E8A82] hover:text-[#CCC8BE]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card (Stripe)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-sm border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-[#1C202B] border-[#D4AF37] text-[#E8D39A]'
                      : 'bg-[#151820] border-[#2A2F3D] text-[#8E8A82] hover:text-[#CCC8BE]'
                  }`}
                >
                  <span className="text-sm"></span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_pay')}
                  className={`p-3 rounded-sm border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'google_pay'
                      ? 'bg-[#1C202B] border-[#D4AF37] text-[#E8D39A]'
                      : 'bg-[#151820] border-[#2A2F3D] text-[#8E8A82] hover:text-[#CCC8BE]'
                  }`}
                >
                  <span className="text-xs font-bold font-sans">G Pay</span>
                  <span>Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-3 rounded-sm border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'wire'
                      ? 'bg-[#1C202B] border-[#D4AF37] text-[#E8D39A]'
                      : 'bg-[#151820] border-[#2A2F3D] text-[#8E8A82] hover:text-[#CCC8BE]'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>SWIFT Wire</span>
                </button>
              </div>

              {/* Credit Card Input Form (Stripe Global Style) */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-sm bg-[#161922] border border-[#D4AF37]/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#2A2E3B] pb-3">
                    <span className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      Stripe Global Direct Processing
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-[#A8A49C]">
                      <span className="px-1.5 py-0.5 rounded bg-[#222734] font-mono">VISA</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#222734] font-mono">MC</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#222734] font-mono">AMEX</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full bg-[#1D212B] border border-[#313747] text-[#EAE6DF] text-xs rounded-sm px-3 py-2 outline-none uppercase font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#1D212B] border border-[#313747] text-[#EAE6DF] text-xs rounded-sm px-3 py-2 outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-[#1D212B] border border-[#313747] text-[#EAE6DF] text-xs rounded-sm px-3 py-2 outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-[#8E8A82] uppercase tracking-wider block mb-1">
                          Security Code (CVC)
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-[#1D212B] border border-[#313747] text-[#EAE6DF] text-xs rounded-sm px-3 py-2 outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Apple Pay / Google Pay / Wire Alternative States */}
              {paymentMethod === 'apple_pay' && (
                <div className="p-5 rounded-sm bg-[#161922] border border-[#D4AF37]/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#202532] text-white text-2xl mx-auto flex items-center justify-center font-serif">
                    
                  </div>
                  <h4 className="text-sm font-semibold text-[#F5F2EB]">Apple Pay VIP Instant Authorization</h4>
                  <p className="text-xs text-[#8E8A82] max-w-sm mx-auto">
                    Authenticate securely using Face ID or Touch ID from your Apple device.
                  </p>
                </div>
              )}

              {paymentMethod === 'google_pay' && (
                <div className="p-5 rounded-sm bg-[#161922] border border-[#D4AF37]/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#202532] text-[#D4AF37] text-lg font-bold mx-auto flex items-center justify-center">
                    G Pay
                  </div>
                  <h4 className="text-sm font-semibold text-[#F5F2EB]">Google Pay Express Checkout</h4>
                  <p className="text-xs text-[#8E8A82] max-w-sm mx-auto">
                    Click Authorize below to complete instant settlement via your Google account credentials.
                  </p>
                </div>
              )}

              {paymentMethod === 'wire' && (
                <div className="p-4 rounded-sm bg-[#161922] border border-[#D4AF37]/30 space-y-2 text-xs text-[#CCC8BE]">
                  <h4 className="font-semibold text-[#E8D39A] uppercase tracking-wider">
                    SWIFT International Escrow Wire Instructions
                  </h4>
                  <p className="text-[#8E8A82]">
                    High-value reservations may be settled via direct wire transfer into VillaKu Management Escrow (BCA / DBS Singapore / Barclays London).
                  </p>
                  <div className="p-2.5 rounded bg-[#1D212B] font-mono text-[11px] text-[#EAE6DF] space-y-1">
                    <div>Bank: DBS Bank Ltd (Singapore Private Banking) / BCA Prioritas (Indonesia)</div>
                    <div>Account Name: PT VILLAKU MANAGEMENT EXCLUSIVE LIVING</div>
                    <div>SWIFT / BIC: DBSSSGSG / CENAIDJA</div>
                  </div>
                </div>
              )}

              {/* Live Invoice Breakdown Table */}
              <div className="p-4 rounded-sm bg-[#161920] border border-[#2B303C] space-y-2 text-xs">
                <h4 className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold border-b border-[#262B37] pb-1.5">
                  {t.breakdown}
                </h4>

                <div className="flex justify-between text-[#B5B1A8]">
                  <span>{t.staySubtotal} ({nights} nights)</span>
                  <span>{formatPrice(accommodationSubtotalUSD, currentCurrency)}</span>
                </div>

                {addonsSubtotalUSD > 0 && (
                  <div className="flex justify-between text-[#B5B1A8]">
                    <span>{t.addonsSubtotal} ({selectedAddOnIds.length} VIP services)</span>
                    <span>{formatPrice(addonsSubtotalUSD, currentCurrency)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#B5B1A8]">
                  <span>{t.luxuryServiceTax}</span>
                  <span>{formatPrice(luxuryTaxUSD, currentCurrency)}</span>
                </div>

                <div className="flex justify-between text-[#B5B1A8]">
                  <span>{t.greenTourismFee}</span>
                  <span>{formatPrice(greenFeeUSD, currentCurrency)}</span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-[#F7F4EC] border-t border-[#2F3544] pt-2">
                  <span>{t.grandTotal}</span>
                  <span className="font-serif-luxury text-lg text-[#E8D39A]">
                    {formatPrice(grandTotalUSD, currentCurrency)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: BOOKING CONFIRMATION & OFFICIAL VOUCHER */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-4 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif-luxury text-3xl text-[#F7F4EC]">{t.confirmedTitle}</h3>
                <p className="text-xs text-[#A8A49C] max-w-md mx-auto">{t.confirmedDesc}</p>
              </div>

              {/* Official Printable Voucher Card */}
              <div
                id="booking-voucher"
                className="max-w-xl mx-auto rounded-sm bg-[#161922] border border-[#D4AF37]/40 p-6 text-left space-y-4 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-4 py-1 bg-[#D4AF37] text-[#0C0E11] text-[10px] font-bold uppercase tracking-widest">
                  VIP CONFIRMED
                </div>

                <div className="flex items-center gap-3 border-b border-[#2A2F3D] pb-3">
                  <div className="w-8 h-8 rounded bg-[#D4AF37] text-[#0C0E11] font-serif-luxury font-bold text-xs flex items-center justify-center tracking-wider">
                    VM
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase block font-semibold">
                      VILLAKU MANAGEMENT
                    </span>
                    <span className="text-xs text-[#8E8A82]">Villa & Exclusive Living Property Management</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-[#7E7A72] block">{t.bookingRef}</span>
                    <span className="font-mono text-sm font-semibold text-[#E8D39A]">
                      {confirmedBooking.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-[#7E7A72] block">Estate Sanctuary</span>
                    <span className="text-sm font-semibold text-[#F5F2EB]">{villa.name}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-[#7E7A72] block">Lead Guest</span>
                    <span className="text-xs font-semibold text-[#EAE6DF]">{confirmedBooking.guestName}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-[#7E7A72] block">Party Size</span>
                    <span className="text-xs text-[#EAE6DF]">
                      {confirmedBooking.guestsCount} Guests ({confirmedBooking.nights} Nights)
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-[#7E7A72] block">Check-in</span>
                    <span className="text-xs text-emerald-400 font-medium">{confirmedBooking.checkIn} (from 15:00)</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-[#7E7A72] block">Check-out</span>
                    <span className="text-xs text-[#EAE6DF]">{confirmedBooking.checkOut} (until 12:00)</span>
                  </div>
                </div>

                <div className="border-t border-[#2A2F3D] pt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-[#7E7A72] block">Settlement Status</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Paid via {confirmedBooking.paymentMethod}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#7E7A72] block">Total Amount</span>
                    <span className="font-serif-luxury text-base font-semibold text-[#E8D39A]">
                      {formatPrice(confirmedBooking.totalUSD, currentCurrency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Voucher Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 rounded-sm bg-[#1E222D] hover:bg-[#282E3C] border border-[#2E3341] text-xs text-[#EAE6DF] flex items-center gap-2 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.downloadVoucher}</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-sm bg-[#D4AF37] hover:bg-[#E2C052] text-[#0C0E11] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {t.done}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Controls (Steps 1-4) */}
        {step <= 4 && (
          <div className="px-6 py-4 border-t border-[#D4AF37]/20 bg-[#14171F] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-sm bg-[#181B22] border border-[#2F3443] text-xs text-[#CCC8BE] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {step < 4 ? (
                <button
                  type="button"
                  id={`reservation-step-next-${step}`}
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-sm bg-gradient-to-r from-[#D4AF37] to-[#B8962E] hover:from-[#E2C052] hover:to-[#C6A238] text-[#0C0E11] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  id="authorize-payment-btn"
                  onClick={handleAuthorizePayment}
                  disabled={isProcessing}
                  className="px-7 py-2.5 rounded-sm bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#A38029] text-[#0C0E11] text-xs font-semibold uppercase tracking-[0.16em] hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#0C0E11] border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>{t.paySecurely}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
