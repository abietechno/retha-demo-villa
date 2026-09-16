import React, { useState } from 'react';
import { CurrencyCode, LanguageCode } from '../types';
import { CURRENCY_RATES } from '../utils/currency';
import { TRANSLATIONS } from '../utils/translations';
import {
  Globe,
  Coins,
  LayoutDashboard,
  Sparkles,
  Menu,
  X,
  Compass,
  Building2,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  activeView: 'guest' | 'dashboard';
  onToggleView: (view: 'guest' | 'dashboard') => void;
  onScrollTo: (elementId: string) => void;
}

const LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  activeView,
  onToggleView,
  onScrollTo,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = TRANSLATIONS[currentLanguage].nav;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0C0E11]/90 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <div
            id="brand-logo"
            onClick={() => {
              onToggleView('guest');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#F5E2B3] via-[#D4AF37] to-[#8C6D1F] p-[1px] shadow-lg shadow-[#D4AF37]/10 flex items-center justify-center">
              <div className="w-full h-full bg-[#0C0E11] rounded-[1px] flex items-center justify-center">
                <span className="font-serif-luxury text-base font-semibold tracking-wider text-[#EAD096] group-hover:scale-105 transition-transform">
                  VM
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.06em] text-[#F3EFE6] font-normal">
                  ASHER <span className="text-[#D4AF37] font-sans-modern font-normal text-sm sm:text-base tracking-[0.12em] uppercase">ABHYUDAYA GROUP</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>
              <span className="text-[8px] sm:text-[9px] tracking-[0.14em] sm:tracking-[0.18em] text-[#C5A880] uppercase font-sans-modern font-medium">
                Villa & Exclusive Living Property Management
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              id="nav-sanctuaries"
              onClick={() => {
                onToggleView('guest');
                onScrollTo('sanctuaries-section');
              }}
              className="text-xs uppercase tracking-[0.18em] text-[#D1CEC7] hover:text-[#E8D39A] transition-colors font-medium flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t.sanctuaries}
            </button>
            <button
              id="nav-services"
              onClick={() => {
                onToggleView('guest');
                onScrollTo('services-section');
              }}
              className="text-xs uppercase tracking-[0.18em] text-[#D1CEC7] hover:text-[#E8D39A] transition-colors font-medium flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t.services}
            </button>
            <button
              id="nav-yield"
              onClick={() => {
                onToggleView('guest');
                onScrollTo('yield-calculator-section');
              }}
              className="text-xs uppercase tracking-[0.18em] text-[#D1CEC7] hover:text-[#E8D39A] transition-colors font-medium flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t.yieldCalculator}
            </button>
          </nav>

          {/* Control Right: Currency, Language & View Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency Dropdown */}
            <div className="relative">
              <button
                id="currency-selector-btn"
                onClick={() => {
                  setIsCurrencyOpen(!isCurrencyOpen);
                  setIsLangOpen(false);
                }}
                className="px-3 py-1.5 rounded-sm bg-[#15181E] border border-[#D4AF37]/25 text-xs text-[#EAE6DF] font-sans-modern hover:border-[#D4AF37]/60 transition-colors flex items-center gap-1.5"
              >
                <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-medium">{currentCurrency}</span>
                <span className="text-[#8E8A82]">({CURRENCY_RATES[currentCurrency].symbol.trim()})</span>
              </button>

              {isCurrencyOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-sm bg-[#121419] border border-[#D4AF37]/35 shadow-2xl py-1.5 z-50">
                  {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange(curr);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-[#1C2027] transition-colors ${
                        currentCurrency === curr ? 'text-[#D4AF37] font-semibold bg-[#1C2027]/50' : 'text-[#C5C1B8]'
                      }`}
                    >
                      <span>{CURRENCY_RATES[curr].label}</span>
                      <span className="text-[11px] text-[#8E8A82]">{CURRENCY_RATES[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsCurrencyOpen(false);
                }}
                className="px-3 py-1.5 rounded-sm bg-[#15181E] border border-[#D4AF37]/25 text-xs text-[#EAE6DF] font-sans-modern hover:border-[#D4AF37]/60 transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{LANGUAGES.find((l) => l.code === currentLanguage)?.flag}</span>
                <span className="uppercase text-[11px] font-semibold tracking-wide">{currentLanguage}</span>
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-sm bg-[#121419] border border-[#D4AF37]/35 shadow-2xl py-1.5 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 hover:bg-[#1C2027] transition-colors ${
                        currentLanguage === lang.code ? 'text-[#D4AF37] font-semibold bg-[#1C2027]/50' : 'text-[#C5C1B8]'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Switch between Guest Experience & Real-Time Management Dashboard */}
            <button
              id="toggle-view-btn"
              onClick={() => onToggleView(activeView === 'guest' ? 'dashboard' : 'guest')}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-sans-modern transition-all duration-300 flex items-center gap-2 border ${
                activeView === 'dashboard'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B08D2A] text-[#0C0E11] font-semibold border-[#F3E7C4] shadow-md shadow-[#D4AF37]/20'
                  : 'bg-[#15181E] text-[#E8D39A] border-[#D4AF37]/40 hover:border-[#D4AF37]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>
                {activeView === 'dashboard' ? t.switchGuestView : t.managementDashboard}
              </span>
              {activeView === 'guest' && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-view-toggle-btn"
              onClick={() => onToggleView(activeView === 'guest' ? 'dashboard' : 'guest')}
              className="p-2 rounded-sm bg-[#15181E] border border-[#D4AF37]/40 text-[#E8D39A]"
              title="Switch Mode"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-sm text-[#D4AF37] hover:bg-[#15181E]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-[#D4AF37]/20 bg-[#0C0E11] px-4 pt-4 pb-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                onToggleView('guest');
                onScrollTo('sanctuaries-section');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm uppercase tracking-widest text-[#E6E2D8] py-2 border-b border-[#232731]"
            >
              {t.sanctuaries}
            </button>
            <button
              onClick={() => {
                onToggleView('guest');
                onScrollTo('services-section');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm uppercase tracking-widest text-[#E6E2D8] py-2 border-b border-[#232731]"
            >
              {t.services}
            </button>
            <button
              onClick={() => {
                onToggleView('guest');
                onScrollTo('yield-calculator-section');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-sm uppercase tracking-widest text-[#E6E2D8] py-2 border-b border-[#232731]"
            >
              {t.yieldCalculator}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#232731]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8E8A82]">Currency:</span>
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-[#15181E] border border-[#D4AF37]/40 text-[#EAE6DF] text-xs rounded-sm px-2 py-1"
              >
                {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((curr) => (
                  <option key={curr} value={curr}>
                    {curr} ({CURRENCY_RATES[curr].symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8E8A82]">Lang:</span>
              <select
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                className="bg-[#15181E] border border-[#D4AF37]/40 text-[#EAE6DF] text-xs rounded-sm px-2 py-1"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
