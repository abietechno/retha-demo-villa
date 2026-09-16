import React, { useState, useMemo } from 'react';
import { CurrencyCode, LanguageCode } from '../types';
import { formatPrice } from '../utils/currency';
import { TRANSLATIONS } from '../utils/translations';
import {
  TrendingUp,
  ShieldCheck,
  Globe2,
  Sparkles,
  Calculator,
  ArrowRight,
  CheckCircle2,
  Building,
  KeyRound,
  FileSpreadsheet,
} from 'lucide-react';

interface OwnerServicesSectionProps {
  currentCurrency: CurrencyCode;
  currentLanguage: LanguageCode;
  onOpenDashboard: () => void;
}

export const OwnerServicesSection: React.FC<OwnerServicesSectionProps> = ({
  currentCurrency,
  currentLanguage,
  onOpenDashboard,
}) => {
  const t = TRANSLATIONS[currentLanguage].services;

  const [bedrooms, setBedrooms] = useState<number>(4);
  const [locationMultiplier, setLocationMultiplier] = useState<number>(1.2); // 1.35 for Uluwatu, 1.15 for Canggu, etc.
  const [proposalSubmitted, setProposalSubmitted] = useState<boolean>(false);
  const [ownerEmail, setOwnerEmail] = useState<string>('');

  // Projected Calculations
  const calculations = useMemo(() => {
    // Base daily rate estimation based on bedrooms and location multiplier
    const baseDailyRateUSD = 280 * bedrooms * locationMultiplier;
    const projectedOccupancyDays = 365 * 0.88; // 88% average annual occupancy
    const grossAnnualUSD = Math.round(baseDailyRateUSD * projectedOccupancyDays);
    const managementFeeUSD = Math.round(grossAnnualUSD * 0.15); // 15% standard management commission
    const netOwnerPayoutUSD = grossAnnualUSD - managementFeeUSD;

    return {
      dailyRateUSD: baseDailyRateUSD,
      grossAnnualUSD,
      managementFeeUSD,
      netOwnerPayoutUSD,
      occupancyPercent: 88.5,
    };
  }, [bedrooms, locationMultiplier]);

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerEmail) return;
    setProposalSubmitted(true);
  };

  return (
    <section id="services-section" className="py-20 bg-[#0C0E11] border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#D4AF37]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#161922] border border-[#D4AF37]/30 text-[10px] uppercase tracking-[0.24em] text-[#E8D39A] font-semibold">
            <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
            {t.badge}
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#F7F5F0]">
            {t.heading}
          </h2>

          <p className="text-sm sm:text-base text-[#B8B4AA] font-sans-modern font-light leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* 4 Pillars of VÉLORA Governance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-sm bg-[#121419] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-3">
            <div className="w-10 h-10 rounded-sm bg-[#1B1E27] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl text-[#F5F2EB]">{t.yieldTitle}</h3>
            <p className="text-xs text-[#9E9A92] leading-relaxed">{t.yieldDesc}</p>
          </div>

          <div className="p-6 rounded-sm bg-[#121419] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-3">
            <div className="w-10 h-10 rounded-sm bg-[#1B1E27] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl text-[#F5F2EB]">{t.turnkeyTitle}</h3>
            <p className="text-xs text-[#9E9A92] leading-relaxed">{t.turnkeyDesc}</p>
          </div>

          <div className="p-6 rounded-sm bg-[#121419] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-3">
            <div className="w-10 h-10 rounded-sm bg-[#1B1E27] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Globe2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl text-[#F5F2EB]">{t.distributionTitle}</h3>
            <p className="text-xs text-[#9E9A92] leading-relaxed">{t.distributionDesc}</p>
          </div>

          <div className="p-6 rounded-sm bg-[#121419] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-3">
            <div className="w-10 h-10 rounded-sm bg-[#1B1E27] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl text-[#F5F2EB]">{t.conciergeTitle}</h3>
            <p className="text-xs text-[#9E9A92] leading-relaxed">{t.conciergeDesc}</p>
          </div>
        </div>

        {/* Interactive Owner Yield & Revenue Simulator */}
        <div
          id="yield-calculator-section"
          className="rounded-sm bg-[#111318] border border-[#D4AF37]/35 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold">
              <Calculator className="w-4 h-4" />
              <span>Financial Modeling</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F5F0]">{t.calcTitle}</h3>
            <p className="text-xs sm:text-sm text-[#A8A49C]">{t.calcSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              {/* Bedroom Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="uppercase tracking-wider text-[#A8A49C] font-semibold">
                    {t.bedroomsLabel}
                  </span>
                  <span className="font-serif-luxury text-lg text-[#E8D39A] font-semibold">
                    {bedrooms} Bedrooms
                  </span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={8}
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#252A36] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[10px] text-[#6E6A62]">
                  <span>2 Suites</span>
                  <span>4 Suites</span>
                  <span>6 Suites</span>
                  <span>8+ Suites Compound</span>
                </div>
              </div>

              {/* Prime Location Selector */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-[#A8A49C] font-semibold block">
                  {t.locationLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'Uluwatu Clifftop', mult: 1.35 },
                    { name: 'Canggu Oceanfront', mult: 1.25 },
                    { name: 'Ubud River Valley', mult: 1.1 },
                    { name: 'Nusa Dua Peninsula', mult: 1.4 },
                    { name: 'Seminyak Enclave', mult: 1.15 },
                    { name: 'Tabanan Panorama', mult: 1.05 },
                  ].map((loc) => (
                    <button
                      key={loc.name}
                      type="button"
                      onClick={() => setLocationMultiplier(loc.mult)}
                      className={`p-2.5 rounded-sm border text-[11px] text-left transition-all ${
                        locationMultiplier === loc.mult
                          ? 'bg-[#1D212B] border-[#D4AF37] text-[#E8D39A] font-semibold'
                          : 'bg-[#151820] border-[#2A2F3D] text-[#8E8A82] hover:text-[#CCC8BE]'
                      }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Demo Dashboard Quick Hook */}
              <div className="p-3.5 rounded-sm bg-[#161922] border border-[#2B303C] flex items-center justify-between">
                <span className="text-xs text-[#CCC8BE]">Want to inspect live portfolio telemetry?</span>
                <button
                  onClick={onOpenDashboard}
                  className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Open Manager Portal</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Right Projected Statement Card */}
            <div className="lg:col-span-6 rounded-sm bg-[#161922] border border-[#D4AF37]/40 p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#2A2F3D] pb-3">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  ESTIMATED ANNUAL YIELD PROJECTION
                </span>
                <span className="text-xs font-mono text-emerald-400">88.5% Occupancy</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#B5B1A8]">
                  <span>{t.estGrossRev}</span>
                  <span className="text-sm font-semibold text-[#EAE6DF]">
                    {formatPrice(calculations.grossAnnualUSD, currentCurrency)}
                  </span>
                </div>

                <div className="flex justify-between text-[#B5B1A8]">
                  <span>{t.managementFee}</span>
                  <span className="text-sm text-[#8E8A82]">
                    - {formatPrice(calculations.managementFeeUSD, currentCurrency)}
                  </span>
                </div>

                <div className="border-t border-[#2F3544] pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] block">
                      {t.netOwnerPayout}
                    </span>
                    <span className="text-[10px] text-[#7E7A72]">
                      Transferred directly to international account (USD/EUR/AUD/GBP)
                    </span>
                  </div>
                  <span className="font-serif-luxury text-3xl font-medium text-[#E8D39A]">
                    {formatPrice(calculations.netOwnerPayoutUSD, currentCurrency)}
                  </span>
                </div>
              </div>

              {/* Proposal Request Form */}
              <div className="pt-3 border-t border-[#2A2F3D]">
                {!proposalSubmitted ? (
                  <form onSubmit={handleProposalSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter owner email for confidential audit..."
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      className="flex-1 bg-[#1E222D] border border-[#313747] focus:border-[#D4AF37] text-xs text-[#EAE6DF] rounded-sm px-3 py-2 outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#D4AF37] hover:bg-[#E2C052] text-[#0C0E11] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
                    >
                      {t.requestProposal}
                    </button>
                  </form>
                ) : (
                  <div className="p-3 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Audit proposal dispatched. Our Villa Asset Director will reach out within 4 hours.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
