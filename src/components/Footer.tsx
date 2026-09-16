import React from 'react';
import { LanguageCode, CurrencyCode } from '../types';
import { TRANSLATIONS } from '../utils/translations';
import { ShieldCheck, Mail, Phone, MapPin, Sparkles, ExternalLink } from 'lucide-react';

interface FooterProps {
  currentLanguage: LanguageCode;
  currentCurrency: CurrencyCode;
  onOpenOwnerSection: () => void;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  currentCurrency,
  onOpenOwnerSection,
  onOpenDashboard,
}) => {
  const t = TRANSLATIONS[currentLanguage].footer;

  return (
    <footer className="bg-[#08090C] border-t border-[#D4AF37]/20 text-[#A8A49C] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#D4AF37] text-[#0C0E11] font-serif-luxury font-bold text-xs flex items-center justify-center tracking-wider">
                VM
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-xl tracking-[0.08em] text-[#F3EFE6]">
                  ASHER ABHYUDAYA GROUP
                </span>
                <span className="text-[9px] tracking-[0.15em] text-[#C5A880] uppercase font-sans-modern">
                  Villa & Exclusive Living Property Management
                </span>
              </div>
            </div>

            <p className="text-[#8E8A82] text-xs leading-relaxed max-w-sm">
              Curated luxury private sanctuaries and turnkey asset stewardship for high-net-worth property owners worldwide.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#13161E] border border-[#D4AF37]/25 text-[10px] text-[#E8D39A] uppercase tracking-wider">
                PCI-DSS Level 1 Secure
              </span>
              <span className="px-2.5 py-1 rounded bg-[#13161E] border border-[#D4AF37]/25 text-[10px] text-[#E8D39A] uppercase tracking-wider">
                256-bit SSL Gateway
              </span>
            </div>
          </div>

          {/* Worldwide Offices */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm text-[#EAE6DF] uppercase tracking-widest">
              Global Presence
            </h4>
            <ul className="space-y-2 text-[#8E8A82]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Bali: Jl. Pantai Suluban No. 8, Uluwatu</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Singapore: Marina Bay Financial Tower 2</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Côte d'Azur: Boulevard de la Croisette, Cannes</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>London: Berkeley Square, Mayfair W1J</span>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm text-[#EAE6DF] uppercase tracking-widest">
              Private Concierge
            </h4>
            <ul className="space-y-2 text-[#8E8A82]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+62 361 894 8888 (24/7 VIP)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>concierge@villaku-management.com</span>
              </li>
              <li>
                <a
                  href="#services-section"
                  onClick={onOpenOwnerSection}
                  className="text-[#D4AF37] hover:underline"
                >
                  Owner Asset Representation →
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenDashboard}
                  className="text-[#E8D39A] hover:underline text-left"
                >
                  Property Manager Telemetry Portal →
                </button>
              </li>
            </ul>
          </div>

          {/* Curated Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm text-[#EAE6DF] uppercase tracking-widest">
              Private Off-Market Dispatch
            </h4>
            <p className="text-[11px] text-[#8E8A82]">
              Receive confidential off-market villa sales and seasonal sanctuary access.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter VIP email..."
                className="bg-[#14171F] border border-[#2B303C] text-xs text-[#EAE6DF] px-3 py-2 rounded-l-sm outline-none w-full focus:border-[#D4AF37]"
              />
              <button className="bg-[#D4AF37] text-[#0C0E11] px-3 py-2 font-semibold rounded-r-sm hover:bg-[#E2C052] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-[#1C202B] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E6A62]">
          <p>© {new Date().getFullYear()} VillaKu Management - Villa & Exclusive Living Property Management. {t.rights}</p>
          <div className="flex items-center gap-4">
            <span>Privacy Protocol & NDA</span>
            <span>•</span>
            <span>Terms of Governance</span>
            <span>•</span>
            <span>SWIFT Escrow Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
