import React, { useState } from 'react';
import {
  Villa,
  Booking,
  ManagementTask,
  OwnerMetrics,
  CurrencyCode,
  LanguageCode,
} from '../types';
import { formatPrice } from '../utils/currency';
import { TRANSLATIONS } from '../utils/translations';
import {
  TrendingUp,
  Users,
  Bed,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  Plus,
  ArrowLeft,
  FileSpreadsheet,
  Download,
  Calendar,
  Sparkles,
  CreditCard,
  DollarSign,
  Filter,
} from 'lucide-react';

interface ManagementDashboardProps {
  villas: Villa[];
  bookings: Booking[];
  tasks: ManagementTask[];
  metrics: OwnerMetrics;
  currentCurrency: CurrencyCode;
  currentLanguage: LanguageCode;
  onUpdateVillaStatus: (villaId: string, newStatus: Villa['housekeepingStatus']) => void;
  onToggleTaskCompleted: (taskId: string) => void;
  onAddDirectBooking: (booking: Booking) => void;
  onReturnToGuestView: () => void;
}

export const ManagementDashboard: React.FC<ManagementDashboardProps> = ({
  villas,
  bookings,
  tasks,
  metrics,
  currentCurrency,
  currentLanguage,
  onUpdateVillaStatus,
  onToggleTaskCompleted,
  onAddDirectBooking,
  onReturnToGuestView,
}) => {
  const t = TRANSLATIONS[currentLanguage].dashboard;

  const [activeTab, setActiveTab] = useState<'overview' | 'villas' | 'bookings' | 'tasks' | 'financials'>('overview');
  const [villaFilter, setVillaFilter] = useState<string>('all');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  // New Direct Booking Modal State
  const [isNewBookingOpen, setIsNewBookingOpen] = useState<boolean>(false);
  const [newGuestName, setNewGuestName] = useState<string>('Baroness Monique Delacroix');
  const [newGuestCountry, setNewGuestCountry] = useState<string>('Monaco');
  const [newVillaId, setNewVillaId] = useState<string>(villas[0]?.id || '');
  const [newNights, setNewNights] = useState<number>(5);
  const [newGuestsCount, setNewGuestsCount] = useState<number>(4);

  const handleExportStatement = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportMessage('Official VÉLORA Owner Financial Statement generated and encrypted (PDF & CSV).');
      setTimeout(() => setExportMessage(null), 4000);
    }, 1200);
  };

  const handleCreateDirectBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const targetVilla = villas.find((v) => v.id === newVillaId) || villas[0];
    const totalUSD = targetVilla.pricePerNightUSD * newNights * 1.1;

    const createdBooking: Booking = {
      id: `VL-${Math.floor(1000 + Math.random() * 9000)}-DIR`,
      villaId: targetVilla.id,
      villaName: targetVilla.name,
      villaImage: targetVilla.heroImage,
      guestName: newGuestName,
      guestEmail: 'concierge.direct@velora-estates.com',
      guestPhone: '+377 98 98 00 12',
      guestCountry: newGuestCountry,
      guestCountryCode: 'MC',
      checkIn: '2026-10-15',
      checkOut: '2026-10-20',
      guestsCount: newGuestsCount,
      nights: newNights,
      baseRateUSD: targetVilla.pricePerNightUSD,
      totalUSD,
      currency: currentCurrency,
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      bookingStatus: 'Confirmed',
      specialRequests: 'Direct VIP Walk-in reservation via Management Portal.',
      selectedAddOns: ['Dedicated Mercedes Maybach & Chauffeur (24/7)'],
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddDirectBooking(createdBooking);
    setIsNewBookingOpen(false);
  };

  const filteredBookings = villaFilter === 'all'
    ? bookings
    : bookings.filter((b) => b.villaId === villaFilter);

  return (
    <div className="min-h-screen bg-[#0A0C0F] text-[#E6E2D8] py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header Controls */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToGuestView}
              className="p-1.5 rounded-sm bg-[#161922] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#1E222D] transition-colors"
              title="Return to Public Guest Experience"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#F7F5F0]">
              {t.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-semibold tracking-wider uppercase">
              LIVE TELEMETRY
            </span>
          </div>
          <p className="text-xs text-[#9E9A92]">{t.subtitle}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsNewBookingOpen(true)}
            className="px-4 py-2 rounded-sm bg-[#D4AF37] hover:bg-[#E2C052] text-[#0C0E11] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md shadow-[#D4AF37]/15"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addNewBooking}</span>
          </button>

          <button
            onClick={handleExportStatement}
            disabled={isExporting}
            className="px-4 py-2 rounded-sm bg-[#161922] hover:bg-[#1E232F] border border-[#D4AF37]/30 text-[#E8D39A] text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating...' : 'Export Owner Financials'}</span>
          </button>
        </div>
      </div>

      {/* Export Notification Toast */}
      {exportMessage && (
        <div className="max-w-7xl mx-auto p-3 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* Real-time KPI Metric Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-sm bg-[#12141B] border border-[#D4AF37]/25 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8E8A82] block">{t.grossRevenue}</span>
          <div className="flex items-baseline gap-1">
            <span className="font-serif-luxury text-2xl font-semibold text-[#F7F4EC]">
              {formatPrice(metrics.totalRevenueUSD, currentCurrency)}
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +19.2% vs prior month
          </span>
        </div>

        <div className="p-4 rounded-sm bg-[#12141B] border border-[#D4AF37]/25 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8E8A82] block">{t.occupancy}</span>
          <span className="font-serif-luxury text-2xl font-semibold text-[#E8D39A]">
            {metrics.portfolioOccupancy}%
          </span>
          <span className="text-[10px] text-[#A8A49C] block">Optimal yield bracket</span>
        </div>

        <div className="p-4 rounded-sm bg-[#12141B] border border-[#D4AF37]/25 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8E8A82] block">{t.adr}</span>
          <span className="font-serif-luxury text-2xl font-semibold text-[#F7F4EC]">
            {formatPrice(metrics.averageDailyRateUSD, currentCurrency)}
          </span>
          <span className="text-[10px] text-emerald-400 block">+28% higher than benchmark</span>
        </div>

        <div className="p-4 rounded-sm bg-[#12141B] border border-[#D4AF37]/25 space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8E8A82] block">{t.revPar}</span>
          <span className="font-serif-luxury text-2xl font-semibold text-[#F7F4EC]">
            {formatPrice(metrics.revPARUSD, currentCurrency)}
          </span>
          <span className="text-[10px] text-[#8E8A82] block">Net yield per room</span>
        </div>

        <div className="p-4 rounded-sm bg-[#12141B] border border-[#D4AF37]/25 space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[10px] uppercase tracking-wider text-[#8E8A82] block">{t.activeGuests}</span>
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury text-2xl font-semibold text-[#E8D39A]">
              {metrics.checkedInGuests}
            </span>
            <span className="text-xs text-[#8E8A82]">HNWI Guests</span>
          </div>
          <span className="text-[10px] text-emerald-400 block">100% Butler service active</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto border-b border-[#242936] flex items-center gap-4 text-xs font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 uppercase tracking-wider transition-colors ${
            activeTab === 'overview'
              ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
              : 'border-transparent text-[#8E8A82] hover:text-[#CCC8BE]'
          }`}
        >
          {t.villasStatus} ({villas.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 border-b-2 uppercase tracking-wider transition-colors ${
            activeTab === 'bookings'
              ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
              : 'border-transparent text-[#8E8A82] hover:text-[#CCC8BE]'
          }`}
        >
          {t.liveBookings} ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`pb-3 border-b-2 uppercase tracking-wider transition-colors ${
            activeTab === 'tasks'
              ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
              : 'border-transparent text-[#8E8A82] hover:text-[#CCC8BE]'
          }`}
        >
          {t.housekeepingTasks} ({tasks.filter((tk) => !tk.completed).length} Pending)
        </button>

        <button
          onClick={() => setActiveTab('financials')}
          className={`pb-3 border-b-2 uppercase tracking-wider transition-colors ${
            activeTab === 'financials'
              ? 'border-[#D4AF37] text-[#D4AF37] font-semibold'
              : 'border-transparent text-[#8E8A82] hover:text-[#CCC8BE]'
          }`}
        >
          {t.ownerPayouts}
        </button>
      </div>

      {/* TAB 1: REAL-TIME ESTATE STATUS & TURNAROUND */}
      {activeTab === 'overview' && (
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {villas.map((villa) => {
              const statusColor =
                villa.housekeepingStatus === 'Ready'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : villa.housekeepingStatus === 'In Cleaning'
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : villa.housekeepingStatus === 'Inspection Pending'
                  ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                  : 'bg-rose-500/15 text-rose-400 border-rose-500/30';

              return (
                <div
                  key={villa.id}
                  className="rounded-sm bg-[#12141A] border border-[#D4AF37]/25 p-5 space-y-4 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={villa.heroImage}
                        alt={villa.name}
                        className="w-14 h-14 object-cover rounded-sm border border-[#2B303C]"
                      />
                      <div>
                        <h3 className="font-serif-luxury text-lg text-[#F5F2EB] leading-tight">
                          {villa.name}
                        </h3>
                        <span className="text-[11px] text-[#8E8A82]">{villa.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator & Live Changer */}
                  <div className="p-3 rounded-sm bg-[#181B24] border border-[#272C39] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#8E8A82] uppercase text-[10px] tracking-wider">Status:</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${statusColor}`}>
                        {villa.housekeepingStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-[#8E8A82]">{t.quickAction}:</span>
                      <select
                        value={villa.housekeepingStatus}
                        onChange={(e) =>
                          onUpdateVillaStatus(
                            villa.id,
                            e.target.value as Villa['housekeepingStatus']
                          )
                        }
                        className="flex-1 bg-[#12141A] border border-[#313747] text-[#EAE6DF] text-[11px] rounded px-2 py-1 outline-none"
                      >
                        <option value="Ready">{t.statusReady}</option>
                        <option value="In Cleaning">{t.statusCleaning}</option>
                        <option value="Inspection Pending">{t.statusInspection}</option>
                        <option value="Scheduled Maintenance">{t.statusMaintenance}</option>
                      </select>
                    </div>
                  </div>

                  {/* Metric stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-[#222733] pt-3">
                    <div>
                      <span className="text-[10px] text-[#7E7A72] block">Occupancy</span>
                      <span className="font-semibold text-[#E8D39A]">{villa.occupancyRatePercent}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7E7A72] block">Current Nightly</span>
                      <span className="font-semibold text-[#F5F2EB]">
                        {formatPrice(villa.pricePerNightUSD, currentCurrency)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7E7A72] block">Director</span>
                      <span className="text-[#CCC8BE] truncate block text-[11px]">{villa.butlerName.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE RESERVATION LEDGER */}
      {activeTab === 'bookings' && (
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Villa Filter */}
          <div className="flex items-center gap-3 bg-[#12141A] p-3 rounded-sm border border-[#2B303C] text-xs">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[#8E8A82] font-medium">Filter by Sanctuary:</span>
            <select
              value={villaFilter}
              onChange={(e) => setVillaFilter(e.target.value)}
              className="bg-[#181B24] border border-[#313747] text-[#EAE6DF] text-xs rounded px-2.5 py-1"
            >
              <option value="all">All Sanctuaries ({bookings.length})</option>
              {villas.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-sm bg-[#12141A] border border-[#D4AF37]/25 overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#161922] text-[#8E8A82] uppercase tracking-wider border-b border-[#242936]">
                <tr>
                  <th className="py-3 px-4">VIP Reference</th>
                  <th className="py-3 px-4">{t.guestName}</th>
                  <th className="py-3 px-4">{t.villa}</th>
                  <th className="py-3 px-4">{t.dates}</th>
                  <th className="py-3 px-4">{t.payout}</th>
                  <th className="py-3 px-4">{t.payment}</th>
                  <th className="py-3 px-4">Special Requests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202532] text-[#CCC8BE]">
                {filteredBookings.map((bk) => (
                  <tr key={bk.id} className="hover:bg-[#181B24] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#E8D39A]">
                      {bk.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#F5F2EB]">{bk.guestName}</div>
                      <div className="text-[11px] text-[#8E8A82]">{bk.guestCountry} ({bk.guestCountryCode})</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#EAE6DF]">{bk.villaName}</td>
                    <td className="py-3.5 px-4">
                      <div className="text-[#EAE6DF]">
                        {bk.checkIn} → {bk.checkOut}
                      </div>
                      <div className="text-[10px] text-[#8E8A82]">
                        {bk.nights} Nights ({bk.guestsCount} Guests)
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-serif-luxury text-sm font-semibold text-[#E8D39A]">
                      {formatPrice(bk.totalUSD, currentCurrency)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {bk.paymentStatus} via {bk.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-[#9E9A92] max-w-xs truncate">
                      {bk.specialRequests || 'Standard VIP protocol'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ENGINEERING & HOUSEKEEPING QUEUE */}
      {activeTab === 'tasks' && (
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-sm border transition-all flex items-start justify-between gap-4 ${
                  task.completed
                    ? 'bg-[#111318] border-[#222732] opacity-60'
                    : 'bg-[#141720] border-[#D4AF37]/30 shadow-md'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold ${
                        task.priority === 'urgent'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : task.priority === 'high'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-[11px] text-[#D4AF37] font-medium">{task.villaName}</span>
                  </div>

                  <h4 className={`text-xs font-semibold ${task.completed ? 'line-through text-[#666]' : 'text-[#F5F2EB]'}`}>
                    {task.title}
                  </h4>

                  <div className="flex items-center gap-4 text-[10px] text-[#8E8A82]">
                    <span>Assignee: {task.assignee}</span>
                    <span>Due: {task.dueTime}</span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleTaskCompleted(task.id)}
                  className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                    task.completed
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : 'bg-[#1E222D] border-[#313747] text-[#CCC8BE] hover:text-[#D4AF37]'
                  }`}
                >
                  {task.completed ? t.completed : t.markComplete}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FINANCIAL ANALYTICS & OWNER PAYOUTS */}
      {activeTab === 'financials' && (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="rounded-sm bg-[#12141A] border border-[#D4AF37]/25 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#232835] pb-4">
              <div>
                <h3 className="font-serif-luxury text-xl text-[#F5F2EB]">
                  Portfolio Net Owner Disbursements (Month-to-Date)
                </h3>
                <p className="text-xs text-[#8E8A82]">
                  15% Turnkey Stewardship Commission deducted automatically. Payouts executed via international SWIFT wire.
                </p>
              </div>

              <button
                onClick={handleExportStatement}
                className="px-4 py-2 rounded-sm bg-[#D4AF37] hover:bg-[#E2C052] text-[#0C0E11] text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Tax Statement</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[#8E8A82] uppercase tracking-wider border-b border-[#232835]">
                  <tr>
                    <th className="py-2.5">Sanctuary Estate</th>
                    <th className="py-2.5">Gross Revenue</th>
                    <th className="py-2.5">VÉLORA Fee (15%)</th>
                    <th className="py-2.5">Operating Reserve (5%)</th>
                    <th className="py-2.5">Net Owner Disbursement</th>
                    <th className="py-2.5">Wire Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#202532] text-[#CCC8BE]">
                  {villas.map((v) => {
                    const gross = v.monthlyRevenueUSD;
                    const fee = Math.round(gross * 0.15);
                    const reserve = Math.round(gross * 0.05);
                    const net = gross - fee - reserve;

                    return (
                      <tr key={v.id} className="hover:bg-[#181B24]">
                        <td className="py-3 font-semibold text-[#F5F2EB]">{v.name}</td>
                        <td className="py-3 font-serif-luxury text-sm text-[#EAE6DF]">
                          {formatPrice(gross, currentCurrency)}
                        </td>
                        <td className="py-3 text-[#8E8A82]">
                          -{formatPrice(fee, currentCurrency)}
                        </td>
                        <td className="py-3 text-[#8E8A82]">
                          -{formatPrice(reserve, currentCurrency)}
                        </td>
                        <td className="py-3 font-serif-luxury text-sm font-semibold text-[#E8D39A]">
                          {formatPrice(net, currentCurrency)}
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Authorized for Settlement
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Direct VIP Booking Input Modal */}
      {isNewBookingOpen && (
        <div className="fixed inset-0 z-50 bg-[#07080A]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-sm bg-[#12141A] border border-[#D4AF37]/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#282D39] pb-3">
              <h3 className="font-serif-luxury text-xl text-[#F5F2EB]">Create Direct VIP Reservation</h3>
              <button onClick={() => setIsNewBookingOpen(false)} className="text-[#8E8A82] hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDirectBooking} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#A8A49C] uppercase tracking-wider block">Lead VIP Guest Name</label>
                <input
                  type="text"
                  required
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full bg-[#1A1D24] border border-[#313747] text-[#EAE6DF] rounded px-3 py-2 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#A8A49C] uppercase tracking-wider block">Country of Origin</label>
                <input
                  type="text"
                  required
                  value={newGuestCountry}
                  onChange={(e) => setNewGuestCountry(e.target.value)}
                  className="w-full bg-[#1A1D24] border border-[#313747] text-[#EAE6DF] rounded px-3 py-2 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#A8A49C] uppercase tracking-wider block">Select Villa Estate</label>
                <select
                  value={newVillaId}
                  onChange={(e) => setNewVillaId(e.target.value)}
                  className="w-full bg-[#1A1D24] border border-[#313747] text-[#EAE6DF] rounded px-3 py-2 outline-none"
                >
                  {villas.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({formatPrice(v.pricePerNightUSD, currentCurrency)}/night)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#A8A49C] uppercase tracking-wider block">Stay Nights</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={newNights}
                    onChange={(e) => setNewNights(Number(e.target.value))}
                    className="w-full bg-[#1A1D24] border border-[#313747] text-[#EAE6DF] rounded px-3 py-2 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#A8A49C] uppercase tracking-wider block">Number of Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={16}
                    value={newGuestsCount}
                    onChange={(e) => setNewGuestsCount(Number(e.target.value))}
                    className="w-full bg-[#1A1D24] border border-[#313747] text-[#EAE6DF] rounded px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewBookingOpen(false)}
                  className="px-4 py-2 bg-[#1C202B] text-[#CCC8BE] rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E2C052] text-[#0C0E11] font-semibold rounded"
                >
                  Confirm & Dispatch Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
